import { gaussian, type Rng } from './rng';

export const SEASON_GAMES = 82;

export type GameResult = 'W' | 'L';

/**
 * Afinação da simulação. Valores atuais (média do cinco → vitórias esperadas, % de 82-0):
 *   85 → ~51 V · 90 → ~70 V · 94 → ~78 V (2%) · 96 → ~80 V (13%) · 98 → ~81 V (35%)
 * Se mudares estes números, corre `npm test` (season.test.ts verifica a curva).
 */
export interface SimConfig {
  /** Força média dos adversários. */
  opponentMean: number;
  /** Desvio-padrão da força dos adversários. */
  opponentSd: number;
  opponentMin: number;
  opponentMax: number;
  /** Quanto maior, mais aleatório é cada jogo. */
  spread: number;
  /** Variação de forma da equipa na época inteira. */
  formSd: number;
}

export const DEFAULT_SIM: SimConfig = {
  opponentMean: 82,
  opponentSd: 5,
  opponentMin: 68,
  opponentMax: 97,
  spread: 2.4,
  formSd: 0.6,
};

export function winProbability(strength: number, opponent: number, spread = DEFAULT_SIM.spread): number {
  return 1 / (1 + Math.exp(-(strength - opponent) / spread));
}

export function simulateSeason(strength: number, rng: Rng, config: SimConfig = DEFAULT_SIM): GameResult[] {
  const form = strength + gaussian(rng) * config.formSd;
  return Array.from({ length: SEASON_GAMES }, () => {
    const opp = Math.min(config.opponentMax, Math.max(config.opponentMin, config.opponentMean + gaussian(rng) * config.opponentSd));
    return rng() < winProbability(form, opp, config.spread) ? 'W' : 'L';
  });
}

export const countWins = (games: readonly GameResult[]) => games.filter((g) => g === 'W').length;
