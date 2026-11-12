export interface Verdict {
  title: string;
  subtitle: string;
}

/** Mensagem final consoante o número de vitórias. Ordem: do melhor para o pior. */
export function verdictFor(wins: number): Verdict {
  if (wins === 82) return { title: '🏆 ÉPOCA PERFEITA! 82-0', subtitle: 'Fizeste história. Nunca ninguém conseguiu isto na NBA.' };
  if (wins >= 74) return { title: '🔥 Melhor que os Warriors de 2016', subtitle: 'Bateste o recorde real de 73-9. Quase perfeito.' };
  if (wins >= 72) return { title: '🐂 Nível Bulls de 1996', subtitle: 'Igualaste uma das maiores equipas de sempre (72-10).' };
  if (wins >= 65) return { title: '💍 Candidato ao título', subtitle: 'Época dominante, mas longe da perfeição.' };
  if (wins >= 50) return { title: '✅ Playoffs garantidos', subtitle: 'Boa equipa. Faltam estrelas para o 82-0.' };
  if (wins >= 41) return { title: '😬 Play-in', subtitle: 'Época mediana. Tenta escolher notas mais altas.' };
  return { title: '📉 Lottery', subtitle: 'Pelo menos tens uma boa escolha no draft…' };
}
