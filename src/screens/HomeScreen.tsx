import { useMemo } from 'react';
import { loadStats } from '../lib/storage';
import { useLang } from '../i18n/LangContext';
import { LangSwitch } from '../components/LangSwitch';

interface Props {
  onStart: () => void;
}

export function HomeScreen({ onStart }: Props) {
  const stats = useMemo(loadStats, []);
  const { t } = useLang();
  return (
    <section className="view home">
      <div className="topbar">
        <LangSwitch />
      </div>

      <div className="hero">
        <h1 className="display">82-0</h1>
        <p className="tag">{t.home.tagline}</p>
        <button className="btn" onClick={onStart}>
          {t.home.play}
        </button>
        {stats.played > 0 && (
          <p className="record">{t.home.record(stats.best ?? 0, stats.played, stats.perfect)}</p>
        )}
      </div>
    </section>
  );
}
