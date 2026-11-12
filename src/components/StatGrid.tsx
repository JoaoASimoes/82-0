import type { PlayerStats } from '../data/types';
import { STAT_KEYS } from '../data/types';
import { useLang } from '../i18n/LangContext';

/** As 5 médias por jogo, em grelha (usado no cartão do rato e no pop-up do telemóvel). */
export function StatGrid({ stats }: { stats: PlayerStats }) {
  const { t } = useLang();
  return (
    <dl className="statgrid">
      {STAT_KEYS.map((k) => (
        <div key={k} title={t.statName[k]}>
          <dt>{t.stat[k]}</dt>
          <dd>{stats[k].toFixed(1)}</dd>
        </div>
      ))}
    </dl>
  );
}
