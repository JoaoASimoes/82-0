/** Estatísticas pessoais guardadas no browser (localStorage). Falha em silêncio se o armazenamento não existir. */
export interface Stats {
  played: number;
  perfect: number;
  best: number | null;
}

const KEY = '820stats';
const EMPTY: Stats = { played: 0, perfect: 0, best: null };

export function loadStats(): Stats {
  try {
    const raw = localStorage.getItem(KEY);
    return raw ? { ...EMPTY, ...(JSON.parse(raw) as Partial<Stats>) } : { ...EMPTY };
  } catch {
    return { ...EMPTY };
  }
}

/** Regista uma época e devolve as novas estatísticas e se foi recorde pessoal. */
export function recordSeason(wins: number): { stats: Stats; newBest: boolean } {
  const prev = loadStats();
  const newBest = prev.best === null || wins > prev.best;
  const stats: Stats = {
    played: prev.played + 1,
    perfect: prev.perfect + (wins === 82 ? 1 : 0),
    best: newBest ? wins : prev.best,
  };
  try {
    localStorage.setItem(KEY, JSON.stringify(stats));
  } catch {
    /* sem armazenamento: ignora */
  }
  return { stats, newBest: newBest && prev.played > 0 };
}
