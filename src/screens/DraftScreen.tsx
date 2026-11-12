import { useEffect, useRef, useState } from 'react';
import { TEAMS } from '../data/teams';
import type { Combo } from '../data/types';
import {
  allCombos,
  canPick,
  createLineup,
  decadeLabel,
  drawCombo,
  findTeam,
  isComplete,
  isDrafted,
  placePlayer,
  poolFor,
  teamLabel,
  type Slot,
} from '../game/draft';
import { pickRandom } from '../game/rng';
import { Lineup } from '../components/Lineup';
import { PlayerRow } from '../components/PlayerRow';
import { tap } from '../lib/haptics';

const SPIN_TICKS = 16;

interface Props {
  onComplete: (lineup: Slot[]) => void;
  onQuit: () => void;
}

export function DraftScreen({ onComplete, onQuit }: Props) {
  const [lineup, setLineup] = useState<Slot[]>(createLineup);
  /** Combinação sorteada e pronta a escolher (null enquanto roda ou antes de rodar). */
  const [combo, setCombo] = useState<Combo | null>(null);
  /** O que o "slot machine" está a mostrar neste instante. */
  const [shown, setShown] = useState<Combo | null>(null);
  const [spinning, setSpinning] = useState(false);
  const [skips, setSkips] = useState({ team: 1, era: 1 });
  const [lastPlaced, setLastPlaced] = useState<number | null>(null);
  const timers = useRef<number[]>([]);

  useEffect(() => () => timers.current.forEach((t) => window.clearTimeout(t)), []);

  const spin = (filter?: (c: Combo) => boolean) => {
    if (spinning) return;
    const target = drawCombo(TEAMS, lineup, Math.random, filter);
    const decoys = allCombos(TEAMS).filter(filter ?? (() => true));
    setCombo(null);
    setSpinning(true);
    let delay = 0;
    for (let t = 0; t < SPIN_TICKS; t++) {
      delay += 30 + t * t * 0.7; // abranda no fim
      const last = t === SPIN_TICKS - 1;
      timers.current.push(
        window.setTimeout(() => {
          if (last) {
            setShown(target);
            setCombo(target);
            setSpinning(false);
            tap();
          } else {
            setShown(pickRandom(decoys, Math.random));
          }
        }, delay),
      );
    }
  };

  const skipTeam = () => {
    if (!combo || skips.team < 1) return;
    setSkips((s) => ({ ...s, team: s.team - 1 }));
    spin((c) => c.decade === combo.decade && c.teamId !== combo.teamId);
  };
  const skipEra = () => {
    if (!combo || skips.era < 1) return;
    setSkips((s) => ({ ...s, era: s.era - 1 }));
    spin((c) => c.teamId === combo.teamId && c.decade !== combo.decade);
  };

  const pick = (index: number) => {
    if (!combo) return;
    const player = poolFor(TEAMS, combo)[index];
    if (!player || !canPick(lineup, player)) return;
    const res = placePlayer(lineup, player);
    setLineup(res.lineup);
    setLastPlaced(res.index);
    setCombo(null);
    tap();
    if (isComplete(res.lineup)) {
      timers.current.push(window.setTimeout(() => onComplete(res.lineup), 700));
    }
  };

  const picked = lineup.filter((s) => s.player).length;
  const done = picked === 5;

  return (
    <section className="view">
      <div className="top">
        <button className="chip" onClick={onQuit}>
          ✕ Sair
        </button>
        <span className="display">{done ? 'Cinco completo' : `Escolha ${picked + 1}/5`}</span>
        <span className="chip">{picked}/5</span>
      </div>

      <Lineup lineup={lineup} highlight={lastPlaced} />

      <div className={`reel ${spinning ? 'spinning' : ''}`}>
        <div className="stripe" style={{ background: shown ? findTeam(TEAMS, shown.teamId).color : 'var(--acc)' }} />
        <div className="lbl">Sorteio</div>
        <div className="team">{done ? 'Cinco fechado!' : shown && (spinning || combo) ? teamLabel(TEAMS, shown) : '—'}</div>
        <div className="dec">
          {done ? '' : shown && (spinning || combo) ? decadeLabel(shown.decade) : picked ? 'Roda outra vez' : 'Carrega em Rodar'}
        </div>
      </div>

      <div className="skips">
        <button disabled={!combo || spinning || skips.team < 1} onClick={skipTeam}>
          ↻ Trocar equipa ({skips.team})
        </button>
        <button disabled={!combo || spinning || skips.era < 1} onClick={skipEra}>
          ↻ Trocar década ({skips.era})
        </button>
      </div>

      <div className="hint">{combo ? 'Toca num jogador para o escolher' : ''}</div>

      {combo && (
        <div className="pool">
          {poolFor(TEAMS, combo).map((p, i) => (
            <PlayerRow
              key={p.name}
              player={p}
              available={canPick(lineup, p)}
              alreadyDrafted={isDrafted(lineup, p.name)}
              onPick={() => pick(i)}
            />
          ))}
        </div>
      )}

      {!combo && !spinning && !done && (
        <button className="btn" onClick={() => spin()}>
          Rodar
        </button>
      )}
    </section>
  );
}
