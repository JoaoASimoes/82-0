"""Generate src/data/players.json from the Basketball-Reference dataset in data_raw/.

Dataset: "NBA Stats (1947-present)" on Kaggle (Basketball-Reference data). Uses
`Player Totals.csv`, `Advanced.csv`, `Player Play By Play.csv`, `Player Award Shares.csv`,
`End of Season Teams.csv` and `All-Star Selections.csv`. Download it into data_raw/ (git-ignored).

For every franchise and decade (FIRST_DECADE onwards) it picks the PLAYERS_PER_ERA
players with the biggest total contribution to that team in that decade, and stores:
  - per-game averages (pts/reb/ast/stl/blk) for that stint  -> shown in the game
  - a hidden 0-99 rating -> drives the sim. It blends three things (WEIGHTS, `impact_scores`):
      * box-score impact: minutes-weighted BPM (pace-adjusted), scaled by minutes per game
      * production: how far his per-game stats stood above that season's league
      * prestige: MVP votes, All-NBA/All-Defense teams, DPOY votes, All-Star picks and
        championships won with that team in that decade -- the "beyond the stats" part
        that makes Jordan or LeBron who they are.

Usage (from the project root):
    python3 -m venv .venv && .venv/bin/pip install -r scripts/requirements.txt
    .venv/bin/python scripts/build_players.py
"""

from __future__ import annotations

import bisect
import json
import sys
from collections import Counter
from datetime import date
from pathlib import Path

import pandas as pd

ROOT = Path(__file__).resolve().parent.parent
TOTALS = ROOT / 'data_raw' / 'Player Totals.csv'
PLAY_BY_PLAY = ROOT / 'data_raw' / 'Player Play By Play.csv'
ADVANCED = ROOT / 'data_raw' / 'Advanced.csv'
AWARDS = ROOT / 'data_raw' / 'Player Award Shares.csv'
END_OF_SEASON = ROOT / 'data_raw' / 'End of Season Teams.csv'
ALL_STARS = ROOT / 'data_raw' / 'All-Star Selections.csv'
OUT = ROOT / 'src' / 'data' / 'players.json'

FIRST_DECADE = 1980
PLAYERS_PER_ERA = 10
# Ratings are calibrated on each era's top 5 (the size of the original hand-made
# rosters); the deeper bench players fall below that scale.
CALIBRATION_TOP = 5
MIN_RATING = 40
# A player can play every position he historically played, anywhere in his career:
#  - listed there by Basketball-Reference in a season with >= POSITION_MIN_GAMES games, or
#  - (play-by-play data, 1996-97+) >= POSITION_MIN_SHARE % of his minutes there in a
#    season with >= POSITION_MIN_MINUTES minutes.
POSITION_MIN_GAMES = 10
POSITION_MIN_SHARE = 25
POSITION_MIN_MINUTES = 300

# Target rating distribution: the 0th..100th percentiles of the original hand-made ratings.
# Mapping the impact score onto it keeps the difficulty curve that season.test.ts protects,
# and keeps the top narrow (only the top ~1% reach 98-99).
RATING_PERCENTILES = [
    72, 74, 76, 76, 77, 77, 78, 78, 78, 79, 79, 79, 79, 79, 80, 80, 80, 80, 80, 80, 80, 80, 80, 81, 81,
    81, 81, 81, 81, 82, 82, 82, 82, 82, 82, 82, 82, 82, 82, 82, 83, 83, 83, 83, 83, 83, 84, 84, 84, 84,
    84, 84, 84, 84, 84, 85, 85, 85, 85, 85, 85, 85, 86, 86, 86, 86, 86, 86, 86, 87, 87, 87, 87, 87, 88,
    88, 88, 88, 88, 89, 89, 89, 89, 89, 90, 90, 91, 91, 92, 92, 92, 93, 93, 93, 94, 95, 95, 96, 97, 98, 99,
]

# How much each part weighs in the rating (they add up to 1).
WEIGHTS = {
    'impact': 0.47,      # efficiency: minutes-weighted BPM x minutes per game
    'production': 0.15,  # statistical dominance over that season's league (e.g. a 50-ppg season)
    'prestige': 0.38,    # awards and titles
}
# Production: per-game stats compared with the rest of the league THAT season (z-scores among
# players with >= PRODUCTION_MIN_GAMES games), so a 30-ppg season in a low-scoring era counts
# more than one today. Only standing out counts: a weak category never subtracts.
PRODUCTION_STATS = {'pts': 1.0, 'trb': 0.7, 'ast': 0.7, 'stl': 0.4, 'blk': 0.4}
PRODUCTION_MIN_GAMES = 20
# Prestige points per season (awards are per season; a traded player's are split by games).
PRESTIGE = {
    'mvp_share': 4.0,          # x MVP vote share (the winner gets ~0.8-1.0)
    'dpoy_share': 1.0,         # x DPOY vote share
    'All-NBA': {'1st': 2.0, '2nd': 1.2, '3rd': 0.7},
    'All-Defense': {'1st': 0.6, '2nd': 0.3},
    'all_star': 0.5,
    'title': 2.0,              # x min(1, minutes / TITLE_FULL_MINUTES) ** 2: the champion's core, not its bench
}
TITLE_FULL_MINUTES = 2500
# Prestige measures a player's peak with the team: the average of his best PEAK_SEASONS there.
PEAK_SEASONS = 4

# NBA champions by season END year. The dataset has no titles, so they live here:
# add each new champion when the season ends.
CHAMPIONS = {
    1981: 'BOS', 1982: 'LAL', 1983: 'PHI', 1984: 'BOS', 1985: 'LAL', 1986: 'BOS', 1987: 'LAL',
    1988: 'LAL', 1989: 'DET', 1990: 'DET', 1991: 'CHI', 1992: 'CHI', 1993: 'CHI', 1994: 'HOU',
    1995: 'HOU', 1996: 'CHI', 1997: 'CHI', 1998: 'CHI', 1999: 'SAS', 2000: 'LAL', 2001: 'LAL',
    2002: 'LAL', 2003: 'SAS', 2004: 'DET', 2005: 'SAS', 2006: 'MIA', 2007: 'SAS', 2008: 'BOS',
    2009: 'LAL', 2010: 'LAL', 2011: 'DAL', 2012: 'MIA', 2013: 'MIA', 2014: 'SAS', 2015: 'GSW',
    2016: 'CLE', 2017: 'GSW', 2018: 'GSW', 2019: 'TOR', 2020: 'LAL', 2021: 'MIL', 2022: 'GSW',
    2023: 'DEN', 2024: 'BOS', 2025: 'OKC',
}

# Basketball-Reference abbreviation -> franchise id used by the game (src/data/teams.ts).
# Follows the NBA's official lineage: the 1988-2002 Charlotte Hornets (CHH) belong to
# today's Charlotte franchise, and the New Orleans Hornets (NOH/NOK) to the Pelicans.
FRANCHISE = {
    'ATL': 'ATL', 'BOS': 'BOS', 'NJN': 'BKN', 'BRK': 'BKN',
    'CHH': 'CHA', 'CHA': 'CHA', 'CHO': 'CHA', 'CHI': 'CHI', 'CLE': 'CLE',
    'DAL': 'DAL', 'DEN': 'DEN', 'DET': 'DET', 'GSW': 'GSW', 'HOU': 'HOU',
    'IND': 'IND', 'SDC': 'LAC', 'LAC': 'LAC', 'LAL': 'LAL',
    'VAN': 'MEM', 'MEM': 'MEM', 'MIA': 'MIA', 'MIL': 'MIL', 'MIN': 'MIN',
    'NOH': 'NOP', 'NOK': 'NOP', 'NOP': 'NOP', 'NYK': 'NYK',
    'SEA': 'OKC', 'OKC': 'OKC', 'ORL': 'ORL', 'PHI': 'PHI', 'PHO': 'PHX',
    'POR': 'POR', 'KCK': 'SAC', 'SAC': 'SAC', 'SAS': 'SAS', 'TOR': 'TOR',
    'UTA': 'UTA', 'WSB': 'WAS', 'WAS': 'WAS',
}
POSITION = {'PG': 'G', 'SG': 'G', 'SF': 'F', 'PF': 'F', 'C': 'C'}


def log(msg: str) -> None:
    print(msg, file=sys.stderr, flush=True)


def game_score(df: pd.DataFrame) -> pd.Series:
    """John Hollinger's Game Score, from a row's season totals."""
    return (df.pts + 0.4 * df.fg - 0.7 * df.fga - 0.4 * (df.fta - df.ft)
            + 0.7 * df.orb + 0.3 * df.drb + df.stl + 0.7 * df.ast + 0.7 * df.blk
            - 0.4 * df.pf - df.tov)


def career_positions(totals: pd.DataFrame) -> dict[str, set[str]]:
    """Every position (G/F/C) each player historically played, over his whole NBA career."""
    out: dict[str, set[str]] = {}
    listed = totals[(totals.g >= POSITION_MIN_GAMES) & totals.pos.isin(POSITION)]
    for pid, pos in zip(listed.player_id, listed.pos):
        out.setdefault(pid, set()).add(POSITION[pos])
    if PLAY_BY_PLAY.exists():
        pbp = pd.read_csv(PLAY_BY_PLAY)
        pbp = pbp[(pbp.lg == 'NBA') & (pbp.mp >= POSITION_MIN_MINUTES)].fillna(0)
        shares = {'G': pbp.pg_percent + pbp.sg_percent, 'F': pbp.sf_percent + pbp.pf_percent, 'C': pbp.c_percent}
        for position, share in shares.items():
            for pid in pbp.player_id[share >= POSITION_MIN_SHARE]:
                out.setdefault(pid, set()).add(position)
    return out


def positions_for(stint_games: Counter, career: set[str]) -> list[str]:
    """Main position in this stint first, then every other position he played in his career."""
    order = 'GFC'
    main = stint_games.most_common(1)[0][0] if stint_games else None
    rest = sorted(career - {main}, key=lambda p: (-stint_games.get(p, 0), order.index(p)))
    return ([main] if main else []) + rest or ['F']


def season_prestige(df: pd.DataFrame) -> pd.Series:
    """Prestige points for each (season, team, player) row of `df`."""
    awards = pd.read_csv(AWARDS)
    teams = pd.read_csv(END_OF_SEASON)
    stars = pd.read_csv(ALL_STARS)
    per_season: dict[tuple[int, str], float] = {}

    def add(season, pid, points):
        per_season[(int(season), pid)] = per_season.get((int(season), pid), 0.0) + float(points)

    for award, key in (('nba mvp', 'mvp_share'), ('nba dpoy', 'dpoy_share')):
        for r in awards[awards.award == award].itertuples():
            add(r.season, r.player_id, PRESTIGE[key] * r.share)
    for r in teams[(teams.lg == 'NBA') & teams.type.isin(['All-NBA', 'All-Defense'])].itertuples():
        add(r.season, r.player_id, PRESTIGE[r.type].get(r.number_tm, 0))
    for r in stars[stars.lg == 'NBA'].drop_duplicates(['season', 'player_id']).itertuples():
        add(r.season, r.player_id, PRESTIGE['all_star'])

    # Season awards are split across a traded player's teams by games played.
    season_games = df.groupby(['season', 'player_id']).g.transform('sum').clip(lower=1)
    keys = zip(df.season, df.player_id)
    awards_part = pd.Series([per_season.get((int(s), p), 0.0) for s, p in keys], index=df.index) * df.g / season_games
    champion = df.season.map(CHAMPIONS) == df.franchise
    title_part = champion * PRESTIGE['title'] * (df.mp / TITLE_FULL_MINUTES).clip(upper=1) ** 2
    return awards_part + title_part


def season_production(df: pd.DataFrame) -> pd.Series:
    """Statistical dominance of each row: weighted sum of how many standard deviations each
    per-game stat sits above that season's league (only positive parts count)."""
    out = pd.Series(0.0, index=df.index)
    qualified = df.g >= PRODUCTION_MIN_GAMES
    for col, weight in PRODUCTION_STATS.items():
        per_game = df[col] / df.g.clip(lower=1)
        league = per_game[qualified].groupby(df.season[qualified])
        mean = df.season.map(league.mean())
        std = df.season.map(league.std()).replace(0, 1)
        out += weight * ((per_game - mean) / std).clip(lower=0)
    return out.where(qualified, 0.0)


def impact_scores(stint: pd.DataFrame, pool: pd.DataFrame) -> pd.Series:
    """Blend the WEIGHTS parts into one score, each z-scored on the calibration pool."""
    def z(col: str) -> pd.Series:
        std = pool[col].std() or 1.0
        return (stint[col] - pool[col].mean()) / std
    return sum(weight * z(part) for part, weight in WEIGHTS.items())


def to_rating(score: float, sorted_scores: list[float]) -> int:
    """Map a score onto RATING_PERCENTILES by its percentile in `sorted_scores` (the
    calibration pool). Scores below the pool extrapolate linearly below the scale."""
    lowest = sorted_scores[0]
    if score < lowest:
        # Slope of the bottom 5% of the scale: rating points per score point.
        ref = sorted_scores[len(sorted_scores) // 20]
        slope = (RATING_PERCENTILES[5] - RATING_PERCENTILES[0]) / max(ref - lowest, 0.01)
        return max(MIN_RATING, round(RATING_PERCENTILES[0] - (lowest - score) * slope))
    pct = bisect.bisect_left(sorted_scores, score) / max(1, len(sorted_scores) - 1)
    pos = min(pct, 1.0) * (len(RATING_PERCENTILES) - 1)
    lo = int(pos)
    hi = min(lo + 1, len(RATING_PERCENTILES) - 1)
    return round(RATING_PERCENTILES[lo] + (RATING_PERCENTILES[hi] - RATING_PERCENTILES[lo]) * (pos - lo))


def main() -> None:
    if not TOTALS.exists():
        sys.exit(f'missing {TOTALS.relative_to(ROOT)}: download the dataset into data_raw/ (see the docstring)')
    df = pd.read_csv(TOTALS)
    career = career_positions(df[df.lg == 'NBA'])
    # `season` is the END year (2027 = 2026-27); the game's decade uses the START year.
    df = df[(df.lg == 'NBA') & (df.season - 1 >= FIRST_DECADE)].copy()
    # Rows like "2TM" are a traded player's combined season: keep only per-team rows.
    unknown = sorted(set(df.team) - set(FRANCHISE) - {t for t in df.team if t.endswith('TM')})
    if unknown:
        sys.exit(f'unmapped team abbreviations: {unknown}')
    df = df[df.team.isin(FRANCHISE)].copy()
    df['franchise'] = df.team.map(FRANCHISE)
    df['decade'] = (df.season - 1) // 10 * 10
    df['gmsc'] = game_score(df.fillna({c: 0 for c in ('orb', 'drb', 'stl', 'blk', 'tov')}))
    df['position'] = df.pos.map(POSITION)
    adv = pd.read_csv(ADVANCED)[['season', 'team', 'player_id', 'bpm']]
    df = df.merge(adv, on=['season', 'team', 'player_id'], how='left')
    df['bpm'] = df.bpm.fillna(-2.0)  # missing BPM (tiny samples) = replacement level
    df['bpm_min'] = df.bpm * df.mp
    df['prestige'] = season_prestige(df)
    df['production'] = season_production(df)

    out: dict[str, dict[str, list[dict]]] = {}
    eras: dict[tuple[str, int], pd.DataFrame] = {}
    for (team, decade), rows in df.groupby(['franchise', 'decade']):
        stint = rows.groupby('player_id').agg(
            name=('player', 'first'), g=('g', 'sum'), pts=('pts', 'sum'),
            trb=('trb', 'sum'), ast=('ast', 'sum'), stl=('stl', 'sum'), blk=('blk', 'sum'), gmsc=('gmsc', 'sum'),
            mp=('mp', 'sum'), bpm_min=('bpm_min', 'sum'), prestige=('prestige', 'sum'))
        stint = stint[stint.g > 0].sort_values('gmsc', ascending=False)
        stint = stint.drop_duplicates('name').head(PLAYERS_PER_ERA)
        if len(stint) < PLAYERS_PER_ERA:
            log(f'skipping {team} {decade}: only {len(stint)} players')
            continue
        # Box-score impact per game: (BPM + 2) is value over replacement per 100 possessions,
        # scaled by the share of the game he was on the floor (VORP per game, in effect).
        bpm = stint.bpm_min / stint.mp.clip(lower=1)
        stint['impact'] = (bpm + 2) * (stint.mp / stint.g) / 48
        # Prestige at his peak with the team: mean of his best PEAK_SEASONS seasons there.
        by_season = rows.groupby(['player_id', 'season']).prestige.sum()
        peak = by_season.groupby(level=0).apply(lambda v: v.nlargest(PEAK_SEASONS).mean())
        stint['prestige'] = peak.reindex(stint.index).fillna(0)
        by_season = rows.groupby(['player_id', 'season']).production.sum()
        peak = by_season.groupby(level=0).apply(lambda v: v.nlargest(PEAK_SEASONS).mean())
        stint['production'] = peak.reindex(stint.index).fillna(0)
        eras[(team, int(decade))] = stint

    # `stint` is ranked by total contribution, so head(CALIBRATION_TOP) are the core players.
    core = pd.concat(s.head(CALIBRATION_TOP) for s in eras.values())
    for stint in eras.values():
        stint['score'] = impact_scores(stint, core)
    pool = sorted(impact_scores(core, core))
    for (team, decade), stint in sorted(eras.items()):
        rows = df[(df.franchise == team) & (df.decade == decade)]
        entries = []
        for pid, s in stint.iterrows():
            games = Counter()
            for _, r in rows[rows.player_id == pid].iterrows():
                if isinstance(r.position, str):
                    games[r.position] += r.g
            stats = {k: round(s[col] / s.g, 1) for k, col in
                     (('pts', 'pts'), ('reb', 'trb'), ('ast', 'ast'), ('stl', 'stl'), ('blk', 'blk'))}
            entries.append({
                'name': s['name'],
                'positions': positions_for(games, career.get(pid, set())),
                'rating': to_rating(s.score, pool),
                'stats': stats,
            })
        # Alphabetical: the order must not give away the hidden rating.
        entries.sort(key=lambda e: e['name'])
        out.setdefault(team, {})[str(decade)] = entries

    OUT.write_text(json.dumps({
        'source': 'Basketball-Reference via the Kaggle "NBA Stats (1947-present)" dataset',
        'generated': date.today().isoformat(),
        'teams': dict(sorted(out.items())),
    }, ensure_ascii=False, indent=1) + '\n')
    log(f'wrote {OUT.relative_to(ROOT)}: {sum(len(e) for t in out.values() for e in t.values())} players '
        f'in {len(eras)} eras')


if __name__ == '__main__':
    main()
