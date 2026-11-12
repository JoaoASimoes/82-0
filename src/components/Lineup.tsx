import type { Slot } from '../game/draft';
import { POSITION_NAME, shortDecade, statLineShort } from '../game/draft';

interface Props {
  lineup: Slot[];
  /** Índice do último jogador colocado, para animar. */
  highlight: number | null;
}

export function Lineup({ lineup, highlight }: Props) {
  return (
    <div className="lineup">
      {lineup.map((slot, i) =>
        slot.player ? (
          <div key={`${i}-${slot.player.name}`} className={`slot full ${i === highlight ? 'pop' : ''}`}>
            <span className="pos">{slot.position}</span>
            <div className="nm">{slot.player.name}</div>
            <div className="st" title="PTS / RES / AST">{statLineShort(slot.player.stats)}</div>
            <div className="tm">
              {slot.player.teamId} {shortDecade(slot.player.decade)}
            </div>
          </div>
        ) : (
          <div key={i} className="slot">
            <span className="pos">{slot.position}</span>
            <span className="muted small">{POSITION_NAME[slot.position]}</span>
          </div>
        ),
      )}
    </div>
  );
}
