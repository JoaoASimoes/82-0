/** Função que devolve um número em [0, 1). Injetada na lógica para os testes serem determinísticos. */
export type Rng = () => number;

/** PRNG pequeno e rápido com semente (mulberry32). */
export function seededRng(seed: number): Rng {
  let a = seed >>> 0;
  return () => {
    a = (a + 0x6d2b79f5) >>> 0;
    let t = a;
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

export function pickRandom<T>(items: readonly T[], rng: Rng): T {
  if (items.length === 0) throw new Error('pickRandom: lista vazia');
  return items[Math.floor(rng() * items.length)] as T;
}
