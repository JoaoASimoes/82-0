import { useEffect } from 'react';
import type { DraftedPlayer, Position } from '../data/types';
import { TEAMS } from '../data/teams';
import { teamLabel } from '../game/draft';
import { useLang } from '../i18n/LangContext';
import { StatGrid } from './StatGrid';

interface Props {
  player: DraftedPlayer;
  /** Posição do lugar onde está no cinco. */
  position: Position;
  /** Texto a explicar porque não pode mudar de posição (null = pode). */
  cantMove: string | null;
  onMove: () => void;
  onClose: () => void;
}

/** Pop-up (telemóvel) com as médias de um jogador do cinco e a opção de mudar de posição. */
export function PlayerSheet({ player, position, cantMove, onMove, onClose }: Props) {
  const { t } = useLang();
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && onClose();
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [onClose]);

  return (
    <div className="sheet-backdrop" onClick={onClose}>
      <div className="sheet" role="dialog" aria-modal="true" aria-label={player.name} onClick={(e) => e.stopPropagation()}>
        <div className="sheet-head">
          <b>{player.name}</b>
          <span className="muted small">
            {t.positions[position]} · {teamLabel(TEAMS, player)} · {t.decade(player.decade)}
          </span>
        </div>
        <StatGrid stats={player.stats} />
        {cantMove ? (
          <p className="muted small center">{cantMove}</p>
        ) : (
          <button className="btn" onClick={onMove}>
            {t.draft.changePosition}
          </button>
        )}
        <button className="btn ghost" onClick={onClose} style={{ marginTop: 8 }}>
          {t.draft.close}
        </button>
      </div>
    </div>
  );
}
