import { useEffect, useRef, useState } from 'react';
import { TEAMS } from '../data/teams';
import type { Combo, DraftedPlayer } from '../data/types';
import {
  allCombos,
  canPick,
  createLineup,
  drawCombo,
  findTeam,
  fitsAfterMove,
  isComplete,
  isDrafted,
  moveTargets,
  movePlayer,
  placePlayer,
  DEFAULT_SORT,
  SORT_KEYS,
  sortPlayers,
  type SortKey,
  poolFor,
  teamLabel,
  type Slot,
} from '../game/draft';
import { pickRandom } from '../game/rng';
import { Lineup } from '../components/Lineup';
import { PlayerRow } from '../components/PlayerRow';
import { tap } from '../lib/haptics';
import { useLang } from '../i18n/LangContext';
import { positionList } from '../i18n/strings';

const SPIN_TICKS = 16;

interface Props {
  onComplete: (lineup: Slot[]) => void;
}

export function DraftScreen({ onComplete }: Props) {
  const { t } = useLang();
  const [lineup, setLineup] = useState<Slot[]>(createLineup);
  /** Combinação sorteada e pronta a escolher (null enquanto roda ou antes de rodar). */
  const [combo, setCombo] = useState<Combo | null>(null);
  /** O que o "slot machine" está a mostrar neste instante. */
  const [shown, setShown] = useState<Combo | null>(null);
  const [spinning, setSpinning] = useState(false);
  const [skips, setSkips] = useState({ team: 1, era: 1 });
  const [lastPlaced, setLastPlaced] = useState<number | null>(null);
  /** Lugar escolhido para mudar de posição (null = nenhum). */
  const [selected, setSelected] = useState<number | null>(null);
  const [moveHint, setMoveHint] = useState('');
  /** Ordem da lista do sorteio; mantém-se entre sorteios. */
  const [sortKey, setSortKey] = useState<SortKey>(DEFAULT_SORT);
  const timers = useRef<number[]>([]);

  useEffect(() => () => timers.current.forEach((t) => window.clearTimeout(t)), []);

  const spin = (filter?: (c: Combo) => boolean) => {
    if (spinning) return;
    setSelected(null);
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

  const pick = (player: DraftedPlayer) => {
    if (!combo || !canPick(lineup, player)) return;
    const res = placePlayer(lineup, player);
    setLineup(res.lineup);
    setLastPlaced(res.index);
    setSelected(null);
    setMoveHint('');
    setCombo(null);
    tap();
    if (isComplete(res.lineup)) {
      timers.current.push(window.setTimeout(() => onComplete(res.lineup), 700));
    }
  };

  const picked = lineup.filter((s) => s.player).length;
  const done = picked === 5;

  // Sem combinação sorteada, rodar é a única jogada possível: roda sozinho após uma pausa curta
  // (no início e depois de cada escolha). O timeout, e não uma chamada direta, também evita
  // problemas com o duplo efeito do StrictMode em desenvolvimento.
  useEffect(() => {
    if (combo || spinning || done) return;
    const id = window.setTimeout(() => spin(), picked === 0 ? 300 : 450);
    return () => window.clearTimeout(id);
    // `spin` muda a cada render e fica de fora das dependências de propósito: o que conta é o
    // estado que decide se há algo a sortear (e o cinco, para o sorteio usar o mais recente).
  }, [combo, spinning, done, lineup]);
  const targets = selected === null ? [] : moveTargets(lineup, selected);

  const tapSlot = (index: number) => {
    if (selected !== null && targets.includes(index)) {
      setLineup(movePlayer(lineup, selected, index));
      setLastPlaced(index);
      setSelected(null);
      setMoveHint('');
      tap();
      return;
    }
    const player = lineup[index]?.player;
    if (!player || index === selected) {
      setSelected(null);
      setMoveHint('');
      return;
    }
    if (moveTargets(lineup, index).length === 0) {
      setSelected(null);
      setMoveHint(
        player.positions.length > 1
          ? t.draft.nowhereToMove(player.name)
          : t.draft.onlyPlays(player.name, positionList(player.positions, t, 'or')),
      );
      return;
    }
    setSelected(index);
    setMoveHint(t.draft.moveWhere(player.name));
  };

  return (
    <section className="view draft">
      {/* No computador: esta coluna fica à esquerda e fixa; a lista de jogadores vai à direita. */}
      <div className="draft-side">
        <Lineup
          lineup={lineup}
          highlight={lastPlaced}
          selected={selected}
          targets={targets}
          onSlotTap={done ? undefined : tapSlot}
        />

        <div className={`reel ${spinning ? 'spinning' : ''}`}>
          <div className="stripe" style={{ background: shown ? findTeam(TEAMS, shown.teamId).color : 'var(--acc)' }} />
          <div className="lbl">{t.draft.draw}</div>
          <div className="team">{done ? t.draft.closed : shown && (spinning || combo) ? teamLabel(TEAMS, shown) : '—'}</div>
          <div className="dec">
            {done ? '' : shown && (spinning || combo) ? t.decade(shown.decade) : ''}
          </div>
        </div>

        <div className="skips">
          <button disabled={!combo || spinning || skips.team < 1} onClick={skipTeam} title={t.draft.swapHint}>
            {t.draft.swapTeam}
          </button>
          <button disabled={!combo || spinning || skips.era < 1} onClick={skipEra} title={t.draft.swapHint}>
            {t.draft.swapDecade}
          </button>
        </div>

        <div className="hint">
          {moveHint || (combo ? t.draft.tapToPick : picked > 0 && !done ? t.draft.tapToMove : '')}
        </div>
      </div>

      <div className="draft-main">
        {combo && (
          <div className="sortbar" role="group" aria-label={t.draft.sortBy}>
            {SORT_KEYS.map((k) => (
              <button
                key={k}
                className={k === sortKey ? 'on' : ''}
                aria-pressed={k === sortKey}
                aria-label={`${t.draft.sortBy}: ${k === 'name' ? t.draft.sortName : t.statName[k]}`}
                onClick={() => setSortKey(k)}
              >
                {k === 'name' ? t.draft.sortName : t.stat[k]}
              </button>
            ))}
          </div>
        )}

        {combo && (
          <div className="pool">
            {sortPlayers(poolFor(TEAMS, combo), sortKey).map((p) => (
              <PlayerRow
                key={p.name}
                player={p}
                available={canPick(lineup, p)}
                alreadyDrafted={isDrafted(lineup, p.name)}
                fitsAfterMove={fitsAfterMove(lineup, p)}
                sortKey={sortKey}
                onPick={() => pick(p)}
              />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
