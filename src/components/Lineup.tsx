import type { Slot } from '../game/draft';
import { shortDecade, teamLabel } from '../game/draft';
import { TEAMS } from '../data/teams';
import { StatGrid } from './StatGrid';
import { useLang } from '../i18n/LangContext';
import { positionList, statLine } from '../i18n/strings';

interface Props {
  lineup: Slot[];
  /** Índice do último jogador colocado, para animar. */
  highlight: number | null;
  /** Lugar escolhido para mudar de posição. */
  selected?: number | null;
  /** Lugares para onde o jogador escolhido pode ir. */
  targets?: number[];
  /** Sem `onSlotTap` os lugares não reagem ao toque. */
  onSlotTap?: (index: number) => void;
}

export function Lineup({ lineup, highlight, selected = null, targets = [], onSlotTap }: Props) {
  const { t } = useLang();
  return (
    <div className="lineup">
      {lineup.map((slot, i) => {
        const state = [
          slot.player ? 'full' : '',
          i === highlight ? 'pop' : '',
          i === selected ? 'sel' : '',
          targets.includes(i) ? 'target' : '',
        ].join(' ');
        const other = slot.player?.positions.filter((p) => p !== slot.position) ?? [];
        return (
          <button
            key={slot.player ? `${i}-${slot.player.name}` : i}
            className={`slot ${state}`}
            disabled={!onSlotTap}
            onClick={() => onSlotTap?.(i)}
            aria-pressed={i === selected}
            aria-label={
              slot.player
                ? `${t.draft.slotPlayer(t.positions[slot.position], slot.player.name, positionList(other, t, 'and'))}. ${statLine(slot.player.stats, t)}`
                : t.draft.slotEmpty(t.positions[slot.position])
            }
          >
            <span className="pos">{slot.position}</span>
            {slot.player ? (
              <>
                {other.length > 0 && <span className="alt">↔{other.join('')}</span>}
                <div className="nm">{slot.player.name}</div>
                <div className="tm">
                  {slot.player.teamId} {shortDecade(slot.player.decade)}
                </div>
                {/* Cartão com as médias: só aparece ao passar o rato (ver styles.css). */}
                <span className={`tip ${i < 2 ? 'left' : i > 2 ? 'right' : ''}`} aria-hidden="true">
                  <b>{slot.player.name}</b>
                  <span className="muted small">
                    {teamLabel(TEAMS, slot.player)} · {t.decade(slot.player.decade)}
                  </span>
                  <StatGrid stats={slot.player.stats} />
                </span>
              </>
            ) : (
              <span className="muted small">{t.positions[slot.position]}</span>
            )}
          </button>
        );
      })}
    </div>
  );
}
