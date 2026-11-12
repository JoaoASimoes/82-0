import { useLang } from '../i18n/LangContext';
import { LANGS, STRINGS } from '../i18n/strings';

/** Seletor compacto de língua (PT | EN), para o canto superior direito. */
export function LangSwitch() {
  const { lang, t, setLang } = useLang();
  return (
    <div className="langswitch" role="group" aria-label={t.home.language}>
      {LANGS.map((l) => (
        <button
          key={l}
          className={l === lang ? 'on' : ''}
          aria-pressed={l === lang}
          aria-label={STRINGS[l].langName}
          title={STRINGS[l].langName}
          lang={STRINGS[l].htmlLang}
          onClick={() => setLang(l)}
        >
          {STRINGS[l].code}
        </button>
      ))}
    </div>
  );
}
