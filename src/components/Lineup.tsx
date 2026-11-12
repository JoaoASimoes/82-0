import type { Slot } from '../game/draft';
import { shortDecade, statLineShort } from '../game/draft';
import { useLang } from '../i18n/LangContext';
import { positionList } from '../i18n/strings';

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
                ? t.draft.slotPlayer(t.positions[slot.position], slot.player.name, positionList(other, t, 'and'))
                : t.draft.slotEmpty(t.positions[slot.position])
            }
          >
            <span className="pos">{slot.position}</span>
            {slot.player ? (
              <>
                {other.length > 0 && <span className="alt">↔{other.join('')}</span>}
                <div className="nm">{slot.player.name}</div>
                <div className="st" title={`${t.stat.pts} / ${t.stat.reb} / ${t.stat.ast}`}>
                  {statLineShort(slot.player.stats)}
                </div>
                <div className="tm">
                  {slot.player.teamId} {shortDecade(slot.player.decade)}
                </div>
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
