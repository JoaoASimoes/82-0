import { SORT_KEYS, type SortKey } from '../game/draft';
import { useLang } from '../i18n/LangContext';

interface Props {
  value: SortKey;
  onChange: (key: SortKey) => void;
  /** 'only-mobile' ou 'only-desktop': o ecrã do sorteio desenha-a em dois sítios e o CSS mostra um. */
  className?: string;
}

/** Botões para ordenar a lista do sorteio por estatística ou por nome. */
export function SortBar({ value, onChange, className = '' }: Props) {
  const { t } = useLang();
  return (
    <div className={`sortbar ${className}`} role="group" aria-label={t.draft.sortBy}>
      {SORT_KEYS.map((k) => (
        <button
          key={k}
          className={k === value ? 'on' : ''}
          aria-pressed={k === value}
          aria-label={`${t.draft.sortBy}: ${k === 'name' ? t.draft.sortName : t.statName[k]}`}
          onClick={() => onChange(k)}
        >
          {k === 'name' ? t.draft.sortName : t.stat[k]}
        </button>
      ))}
    </div>
  );
}
