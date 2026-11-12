import { seededRng } from './rng';

export const SEASON_GAMES = 82;

export type GameResult = 'W' | 'L';

/**
 * A época é DETERMINÍSTICA: não há sorte. Os 82 adversários têm forças fixas (iguais para
 * todos os jogadores e todas as épocas) e ganhas um jogo se a força do teu cinco (média das
 * notas) for MAIOR do que a do adversário. Dois cincos iguais fazem sempre o mesmo resultado.
 *
 * As forças seguem os quantis de uma Normal(mean, sd), com o adversário mais forte em
 * `strongest`. Curva atual (média do cinco → vitórias):
 *   80 → 1 · 85 → 22 · 88 → 51 · 90 → 68 · 92 → 77 · 93 → 79 · 94–95 → 81 · 95.2+ → 82-0
 * O mais forte (95.1) destaca-se do segundo (93.8): é o "chefe final" do 82-0.
 * Na prática (simulação de drafts), a média típica é ~90.6 (~70 V) e um jogador típico
 * faz 82-0 em ~3% das tentativas (um perito em ~5%).
 * Se mudares estes números de propósito, atualiza a curva em season.test.ts.
 */
export interface SimConfig {
  /** Força do adversário mediano. */
  mean: number;
  /** O adversário mais forte: para 82-0 a média do cinco tem de ser maior do que isto. */
  strongest: number;
  /** Semente da ordem do calendário (fixa, para os resultados serem iguais para todos). */
  scheduleSeed: number;
}

export const DEFAULT_SIM: SimConfig = { mean: 87, strongest: 95.1, scheduleSeed: 82 };

/**
 * Inversa da função de distribuição da Normal padrão (Acklam; erro relativo < 1.2e-9).
 * Só usada para espalhar as forças dos adversários de forma fixa.
 */
export function normalQuantile(p: number): number {
  if (p <= 0 || p >= 1) throw new Error(`normalQuantile: p fora de (0, 1): ${p}`);
  const a = [-39.69683028665376, 220.9460984245205, -275.9285104469687, 138.357751867269, -30.66479806614716, 2.506628277459239];
  const b = [-54.47609879822406, 161.5858368580409, -155.6989798598866, 66.80131188771972, -13.28068155288572];
  const c = [-0.007784894002430293, -0.3223964580411365, -2.400758277161838, -2.549732539343734, 4.374664141464968, 2.938163982698783];
  const d = [0.007784695709041462, 0.3224671290700398, 2.445134137142996, 3.754408661907416];
  const tail = (q: number) =>
    (((((c[0]! * q + c[1]!) * q + c[2]!) * q + c[3]!) * q + c[4]!) * q + c[5]!) /
    ((((d[0]! * q + d[1]!) * q + d[2]!) * q + d[3]!) * q + 1);
  if (p < 0.02425) return tail(Math.sqrt(-2 * Math.log(p)));
  if (p > 1 - 0.02425) return -tail(Math.sqrt(-2 * Math.log(1 - p)));
  const q = p - 0.5;
  const r = q * q;
  return (
    ((((((a[0]! * r + a[1]!) * r + a[2]!) * r + a[3]!) * r + a[4]!) * r + a[5]!) * q) /
    (((((b[0]! * r + b[1]!) * r + b[2]!) * r + b[3]!) * r + b[4]!) * r + 1)
  );
}

/** As forças dos 82 adversários, pela ordem do calendário. */
export function opponents(config: SimConfig = DEFAULT_SIM): number[] {
  const zTop = normalQuantile((SEASON_GAMES - 0.5) / SEASON_GAMES);
  const sd = (config.strongest - config.mean) / zTop;
  const strengths = Array.from(
    { length: SEASON_GAMES },
    (_, i) => config.mean + sd * normalQuantile((i + 0.5) / SEASON_GAMES),
  );
  // Ordem do calendário: baralhada com uma semente fixa (Fisher–Yates).
  const rng = seededRng(config.scheduleSeed);
  for (let i = strengths.length - 1; i > 0; i--) {
    const j = Math.floor(rng() * (i + 1));
    [strengths[i], strengths[j]] = [strengths[j]!, strengths[i]!];
  }
  return strengths;
}

const SCHEDULE = opponents();

/** Resultado de cada jogo da época: depende só da força do cinco. */
export function simulateSeason(strength: number, schedule: readonly number[] = SCHEDULE): GameResult[] {
  return schedule.map((opp) => (strength > opp ? 'W' : 'L'));
}

export const countWins = (games: readonly GameResult[]) => games.filter((g) => g === 'W').length;
