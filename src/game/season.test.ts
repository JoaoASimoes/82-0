import { describe, expect, it } from 'vitest';
import { seededRng } from './rng';
import { countWins, SEASON_GAMES, simulateSeason, winProbability } from './season';

const avgWins = (strength: number, runs = 400) => {
  const rng = seededRng(strength * 1000);
  let total = 0;
  let perfect = 0;
  for (let i = 0; i < runs; i++) {
    const w = countWins(simulateSeason(strength, rng));
    total += w;
    if (w === 82) perfect++;
  }
  return { wins: total / runs, perfectRate: perfect / runs };
};

describe('simulação', () => {
  it('joga sempre 82 jogos', () => {
    expect(simulateSeason(90, seededRng(1))).toHaveLength(SEASON_GAMES);
  });

  it('é determinística com a mesma semente', () => {
    expect(simulateSeason(90, seededRng(5))).toEqual(simulateSeason(90, seededRng(5)));
  });

  it('probabilidade de vitória cresce com a força', () => {
    expect(winProbability(82, 82)).toBeCloseTo(0.5);
    expect(winProbability(95, 82)).toBeGreaterThan(winProbability(88, 82));
  });

  // Curva de dificuldade: se alterares DEFAULT_SIM, atualiza estes intervalos de propósito.
  it('mantém a curva de dificuldade', () => {
    expect(avgWins(85).wins).toBeGreaterThan(44);
    expect(avgWins(85).wins).toBeLessThan(58);
    expect(avgWins(90).wins).toBeGreaterThan(64);
    expect(avgWins(90).wins).toBeLessThan(76);
    expect(avgWins(90).perfectRate).toBeLessThan(0.02);
    const top = avgWins(98);
    expect(top.perfectRate).toBeGreaterThan(0.15);
    expect(top.perfectRate).toBeLessThan(0.6);
  });
});
