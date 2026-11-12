import type { DraftedPlayer } from '../data/types';
import { STAT_KEYS } from '../data/types';
import type { SortKey } from '../game/draft';
import { useLang } from '../i18n/LangContext';

interface Props {
  player: DraftedPlayer;
  available: boolean;
  alreadyDrafted: boolean;
  /** Sem vaga agora, mas cabe se alguém do cinco mudar de posição. */
  fitsAfterMove: boolean;
  /** Estatística pela qual a lista está ordenada (fica destacada). */
  sortKey: SortKey;
  /** Escolhido, à espera de que o utilizador indique o lugar no cinco. */
  choosing?: boolean;
  onPick: () => void;
}

export function PlayerRow({ player, available, alreadyDrafted, fitsAfterMove, sortKey, choosing = false, onPick }: Props) {
  const { t } = useLang();
  const why = alreadyDrafted
    ? t.draft.inLineup
    : available
      ? player.positions.map((p) => t.positions[p]).join(' / ')
      : fitsAfterMove
        ? t.draft.fitsAfterMove
        : t.draft.noSlot;
  return (
    <button className={`pl ${choosing ? 'choosing' : ''}`} disabled={!available} onClick={onPick} aria-pressed={choosing}>
      <span className="ps">{player.positions.join('-')}</span>
      <span className="nm">
        {player.name}
        <small>{why}</small>
      </span>
      <span className="sts">
        {STAT_KEYS.map((k) => (
          <span key={k} className={k === sortKey ? 'on' : ''}>
            <b>{player.stats[k].toFixed(1)}</b>
            {t.stat[k]}
          </span>
        ))}
      </span>
    </button>
  );
}
