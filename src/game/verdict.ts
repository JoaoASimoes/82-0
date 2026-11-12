/** Escalão do resultado final. O texto de cada escalão está em `src/i18n/strings.tsx`. */
export type VerdictTier = 'perfect' | 'warriors' | 'bulls' | 'contender' | 'playoffs' | 'playIn' | 'lottery';

/** Escalão consoante o número de vitórias. Ordem: do melhor para o pior. */
export function verdictFor(wins: number): VerdictTier {
  if (wins === 82) return 'perfect';
  if (wins >= 74) return 'warriors';
  if (wins >= 72) return 'bulls';
  if (wins >= 65) return 'contender';
  if (wins >= 50) return 'playoffs';
  if (wins >= 41) return 'playIn';
  return 'lottery';
}
