import { useMemo } from 'react';
import { loadStats } from '../lib/storage';
import { useLang } from '../i18n/LangContext';
import { LANGS, STRINGS } from '../i18n/strings';

interface Props {
  onStart: () => void;
}

export function HomeScreen({ onStart }: Props) {
  const stats = useMemo(loadStats, []);
  const { lang, t, setLang } = useLang();
  return (
    <section className="view">
      <div className="logo">
        <div className="ball" />
        <h1 className="display">82-0</h1>
      </div>
      <p className="tag">{t.home.tagline}</p>

      <div className="seg" role="group" aria-label={t.home.language}>
        {LANGS.map((l) => (
          <button key={l} className={l === lang ? 'on' : ''} aria-pressed={l === lang} lang={STRINGS[l].htmlLang} onClick={() => setLang(l)}>
            {STRINGS[l].langName}
          </button>
        ))}
      </div>

      <div className="card">
        <h3>{t.home.howTo}</h3>
        <ol className="rules">
          {t.home.rules.map((rule, i) => (
            <li key={i}>{rule}</li>
          ))}
        </ol>
      </div>

      <div className="card">
        <h3>{t.home.history}</h3>
        <div className="stats">
          <div>
            <b>{stats.best === null ? '—' : `${stats.best}-${82 - stats.best}`}</b>
            <span className="muted small">{t.home.best}</span>
          </div>
          <div>
            <b>{stats.played}</b>
            <span className="muted small">{t.home.seasons}</span>
          </div>
          <div>
            <b>{stats.perfect}</b>
            <span className="muted small">82-0</span>
          </div>
        </div>
      </div>

      <button className="btn" onClick={onStart}>
        {t.home.play}
      </button>
      <p className="muted small center" style={{ marginTop: 14 }}>
        {t.home.footnote}
      </p>
    </section>
  );
}
