import type { DraftedPlayer } from '../data/types';
import { POSITION_NAME } from '../game/draft';

interface Props {
  player: DraftedPlayer;
  available: boolean;
  alreadyDrafted: boolean;
  /** Sem vaga agora, mas cabe se alguém do cinco mudar de posição. */
  fitsAfterMove: boolean;
  onPick: () => void;
}

export function PlayerRow({ player, available, alreadyDrafted, fitsAfterMove, onPick }: Props) {
  const why = alreadyDrafted
    ? 'Já está no teu cinco'
    : available
      ? player.positions.map((p) => POSITION_NAME[p]).join(' / ')
      : fitsAfterMove
        ? 'Muda alguém de posição para abrir vaga'
        : 'Sem lugar livre nesta posição';
  return (
    <button className="pl" disabled={!available} onClick={onPick}>
      <span className="ps">{player.positions.join('-')}</span>
      <span className="nm">
        {player.name}
        <small>{why}</small>
      </span>
      <span className="sts">
        <span><b>{player.stats.pts.toFixed(1)}</b>PTS</span>
        <span><b>{player.stats.reb.toFixed(1)}</b>RES</span>
        <span><b>{player.stats.ast.toFixed(1)}</b>AST</span>
      </span>
    </button>
  );
}
