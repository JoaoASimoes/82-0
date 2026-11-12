import { createContext, useContext, useEffect, useMemo, useState, type ReactNode } from 'react';
import { loadLang, saveLang } from '../lib/storage';
import { track } from '../lib/analytics';
import { detectLang, LANGS, STRINGS, type Lang, type Strings } from './strings';

interface LangState {
  lang: Lang;
  t: Strings;
  setLang: (lang: Lang) => void;
}

const LangContext = createContext<LangState | null>(null);

function initialLang(): Lang {
  const saved = loadLang();
  if (saved && (LANGS as readonly string[]).includes(saved)) return saved as Lang;
  return detectLang(typeof navigator === 'undefined' ? [] : navigator.languages ?? [navigator.language]);
}

export function LangProvider({ children }: { children: ReactNode }) {
  const [lang, setLangState] = useState<Lang>(initialLang);
  const t = STRINGS[lang];

  useEffect(() => {
    document.documentElement.lang = t.htmlLang;
    document.title = t.title;
  }, [t]);

  const value = useMemo<LangState>(
    () => ({
      lang,
      t,
      setLang: (next) => {
        setLangState(next);
        saveLang(next);
        track(`lang-${next}`);
      },
    }),
    [lang, t],
  );
  return <LangContext.Provider value={value}>{children}</LangContext.Provider>;
}

export function useLang(): LangState {
  const ctx = useContext(LangContext);
  if (!ctx) throw new Error('useLang tem de estar dentro de <LangProvider>');
  return ctx;
}
