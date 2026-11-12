import type { DraftedPlayer } from '../data/types';
import { useLang } from '../i18n/LangContext';

interface Props {
  player: DraftedPlayer;
  available: boolean;
  alreadyDrafted: boolean;
  /** Sem vaga agora, mas cabe se alguém do cinco mudar de posição. */
  fitsAfterMove: boolean;
  onPick: () => void;
}

export function PlayerRow({ player, available, alreadyDrafted, fitsAfterMove, onPick }: Props) {
  const { t } = useLang();
  const why = alreadyDrafted
    ? t.draft.inLineup
    : available
      ? player.positions.map((p) => t.positions[p]).join(' / ')
      : fitsAfterMove
        ? t.draft.fitsAfterMove
        : t.draft.noSlot;
  return (
    <button className="pl" disabled={!available} onClick={onPick}>
      <span className="ps">{player.positions.join('-')}</span>
      <span className="nm">
        {player.name}
        <small>{why}</small>
      </span>
      <span className="sts">
        {(['pts', 'reb', 'ast'] as const).map((k) => (
          <span key={k}>
            <b>{player.stats[k].toFixed(1)}</b>
            {t.stat[k]}
          </span>
        ))}
      </span>
    </button>
  );
}
