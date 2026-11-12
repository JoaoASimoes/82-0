"""Generate src/data/players.json from the Basketball-Reference dataset in data_raw/.

Dataset: "NBA Stats (1947-present)" on Kaggle (Basketball-Reference data). Uses
`Player Totals.csv` and `Player Play By Play.csv`. Download it into data_raw/ (git-ignored).

For every franchise and decade (FIRST_DECADE onwards) it picks the PLAYERS_PER_ERA
players with the biggest total contribution to that team in that decade, and stores:
  - per-game averages (pts/reb/ast) for that stint  -> shown in the game
  - a hidden 0-99 rating derived from per-game Game Score -> drives the sim

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

# Target rating distribution (21 quantiles, 0%..100%), taken from the original
# hand-made ratings. Mapping Game Score onto it keeps the difficulty curve that
# season.test.ts protects.
RATING_QUANTILES = [72, 77, 79, 80, 80, 81, 82, 82, 83, 83, 84, 85, 85, 86, 87, 88, 89, 90, 92, 95, 99]

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


def to_rating(score: float, sorted_scores: list[float]) -> int:
    """Map a per-game Game Score onto RATING_QUANTILES by its percentile in `sorted_scores`
    (the calibration pool). Scores below the pool extrapolate linearly below the scale."""
    lowest = sorted_scores[0]
    if score < lowest:
        # Slope of the bottom 5% of the scale: rating points per Game Score point.
        ref = sorted_scores[len(sorted_scores) // 20]
        slope = (RATING_QUANTILES[1] - RATING_QUANTILES[0]) / max(ref - lowest, 0.1)
        return max(MIN_RATING, round(RATING_QUANTILES[0] - (lowest - score) * slope))
    pct = bisect.bisect_left(sorted_scores, score) / max(1, len(sorted_scores) - 1)
    pos = min(pct, 1.0) * (len(RATING_QUANTILES) - 1)
    lo = int(pos)
    hi = min(lo + 1, len(RATING_QUANTILES) - 1)
    return round(RATING_QUANTILES[lo] + (RATING_QUANTILES[hi] - RATING_QUANTILES[lo]) * (pos - lo))


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

    out: dict[str, dict[str, list[dict]]] = {}
    eras: dict[tuple[str, int], pd.DataFrame] = {}
    for (team, decade), rows in df.groupby(['franchise', 'decade']):
        stint = rows.groupby('player_id').agg(
            name=('player', 'first'), g=('g', 'sum'), pts=('pts', 'sum'),
            trb=('trb', 'sum'), ast=('ast', 'sum'), gmsc=('gmsc', 'sum'))
        stint = stint[stint.g > 0].sort_values('gmsc', ascending=False)
        stint = stint.drop_duplicates('name').head(PLAYERS_PER_ERA)
        if len(stint) < PLAYERS_PER_ERA:
            log(f'skipping {team} {decade}: only {len(stint)} players')
            continue
        stint['per_game'] = stint.gmsc / stint.g
        eras[(team, int(decade))] = stint

    # `stint` is ranked by total contribution, so head(CALIBRATION_TOP) are the core players.
    pool = sorted(v for s in eras.values() for v in s.per_game.head(CALIBRATION_TOP))
    for (team, decade), stint in sorted(eras.items()):
        rows = df[(df.franchise == team) & (df.decade == decade)]
        entries = []
        for pid, s in stint.iterrows():
            games = Counter()
            for _, r in rows[rows.player_id == pid].iterrows():
                if isinstance(r.position, str):
                    games[r.position] += r.g
            stats = {'pts': round(s.pts / s.g, 1), 'reb': round(s.trb / s.g, 1), 'ast': round(s.ast / s.g, 1)}
            entries.append({
                'name': s['name'],
                'positions': positions_for(games, career.get(pid, set())),
                'rating': to_rating(s.per_game, pool),
                'stats': stats,
            })
        entries.sort(key=lambda e: (-e['rating'], e['name']))
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
