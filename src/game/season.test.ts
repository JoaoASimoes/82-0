import { describe, expect, it } from 'vitest';
import { countWins, DEFAULT_SIM, normalQuantile, opponents, SEASON_GAMES, simulateSeason } from './season';

const wins = (strength: number) => countWins(simulateSeason(strength));

describe('simulação', () => {
  it('joga sempre 82 jogos', () => {
    expect(simulateSeason(90)).toHaveLength(SEASON_GAMES);
    expect(opponents()).toHaveLength(SEASON_GAMES);
  });

  it('não tem sorte: a mesma força dá sempre o mesmo resultado, jogo a jogo', () => {
    expect(simulateSeason(91.4)).toEqual(simulateSeason(91.4));
    expect(opponents()).toEqual(opponents());
  });

  it('mais força nunca dá menos vitórias', () => {
    let prev = -1;
    for (let s = 70; s <= 99; s += 0.2) {
      const w = wins(s);
      expect(w).toBeGreaterThanOrEqual(prev);
      prev = w;
    }
  });

  it('o adversário mais forte é o limiar do 82-0', () => {
    expect(Math.max(...opponents())).toBeCloseTo(DEFAULT_SIM.strongest, 6);
    expect(wins(95.2)).toBe(82);
    expect(wins(95.0)).toBe(81);
  });

  it('a inversa da Normal está certa', () => {
    expect(normalQuantile(0.5)).toBeCloseTo(0, 6);
    expect(normalQuantile(0.975)).toBeCloseTo(1.959964, 5);
    expect(normalQuantile(0.01)).toBeCloseTo(-2.326348, 5);
  });

  // Curva de dificuldade: se alterares DEFAULT_SIM, atualiza estes valores de propósito.
  it('mantém a curva de dificuldade', () => {
    expect(wins(85)).toBeGreaterThanOrEqual(18);
    expect(wins(85)).toBeLessThanOrEqual(26);
    expect(wins(90)).toBeGreaterThanOrEqual(64);
    expect(wins(90)).toBeLessThanOrEqual(72);
    expect(wins(93)).toBeGreaterThanOrEqual(77);
    expect(wins(93)).toBeLessThanOrEqual(80);
    expect(wins(95)).toBe(81);
  });
});
