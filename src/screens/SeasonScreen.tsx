import { useEffect, useRef, useState } from 'react';
import { TEAMS } from '../data/teams';
import { lineupAverage, teamLabel, type Slot } from '../game/draft';
import { countWins, SEASON_GAMES, simulateSeason } from '../game/season';
import { verdictFor } from '../game/verdict';
import { recordSeason } from '../lib/storage';
import { Confetti } from '../components/Confetti';
import { useLang } from '../i18n/LangContext';
import { statLine } from '../i18n/strings';

interface Props {
  lineup: Slot[];
  onAgain: () => void;
  onHome: () => void;
  toast: (msg: string) => void;
}

export function SeasonScreen({ lineup, onAgain, onHome, toast }: Props) {
  const { t } = useLang();
  const avg = lineupAverage(lineup);
  // A época é determinística; a animação só revela os resultados aos poucos.
  const [games] = useState(() => simulateSeason(avg));
  const [revealed, setRevealed] = useState(0);
  const recorded = useRef(false);

  useEffect(() => {
    if (revealed >= SEASON_GAMES) return;
    const t = window.setTimeout(() => setRevealed((n) => n + 1), revealed === 0 ? 300 : revealed > 70 ? 70 : 35);
    return () => window.clearTimeout(t);
  }, [revealed]);

  const finished = revealed >= SEASON_GAMES;
  const wins = countWins(games.slice(0, revealed));
  const losses = revealed - wins;

  useEffect(() => {
    if (!finished || recorded.current) return;
    recorded.current = true;
    const { newBest } = recordSeason(countWins(games));
    if (newBest) toast(t.season.newBest);
  }, [finished, games, toast, t]);

  const verdict = finished ? t.verdict[verdictFor(wins)] : null;

  const copy = async () => {
    const lines = lineup.map((s) => `${s.position} ${s.player!.name} (${s.player!.teamId} '${String(s.player!.decade).slice(2)})`);
    const text = `${t.season.shareText(wins, losses)}\n${lines.join('\n')}`;
    try {
      if (navigator.share) await navigator.share({ text });
      else {
        await navigator.clipboard.writeText(text);
        toast(t.season.copied);
      }
    } catch {
      /* o utilizador cancelou a partilha */
    }
  };

  return (
    <section className="view">
      {finished && wins === 82 && <Confetti />}
      <div className="score display">
        <span className="w">{wins}</span>-<span className="l">{losses}</span>
      </div>
      <div className="verdict">{verdict?.title}</div>
      <div className="sub">{verdict ? verdict.subtitle : t.season.simulating}</div>

      <div className="grid">
        {games.map((g, i) => (
          <div key={i} className={`g ${i < revealed ? g : ''}`} />
        ))}
      </div>

      <div className="card">
        <h3>{t.season.yourFive}</h3>
        <div className="ros">
          {lineup.map((s) => (
            <div key={s.player!.name}>
              <span>
                <b>{s.position}</b> · {s.player!.name}{' '}
                <span className="muted small">
                  {teamLabel(TEAMS, s.player!)} · {t.decade(s.player!.decade)}
                </span>
              </span>
              <span className="r small">{statLine(s.player!.stats, t)}</span>
            </div>
          ))}
        </div>
      </div>

      <div className="row" style={{ visibility: finished ? 'visible' : 'hidden' }}>
        <button className="btn ghost" onClick={copy}>
          {t.season.share}
        </button>
        <button className="btn" onClick={onAgain}>
          {t.season.again}
        </button>
      </div>
      <button className="btn ghost" style={{ marginTop: 10, visibility: finished ? 'visible' : 'hidden' }} onClick={onHome}>
        {t.season.home}
      </button>
    </section>
  );
}
