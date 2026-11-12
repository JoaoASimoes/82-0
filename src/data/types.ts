/** G = base/ala-base, F = extremo/ala-poste, C = poste. */
export type Position = 'G' | 'F' | 'C';

/** Ano de início da década (a época 1989-90 conta como 1980). */
export type Decade = 1980 | 1990 | 2000 | 2010 | 2020;

export const DECADES: readonly Decade[] = [1980, 1990, 2000, 2010, 2020];

export interface Player {
  name: string;
  /** Uma ou duas posições; ex.: ['G', 'F'] pode jogar a base ou extremo. */
  positions: Position[];
  /**
   * Impacto 0–99 do jogador nesta equipa e década. Decide a simulação,
   * mas é ESCONDIDO do jogador: na interface só aparecem as `stats`.
   */
  rating: number;
  /** Médias por jogo nesta equipa e década (o que o jogador vê). */
  stats: PlayerStats;
}

/** Médias por jogo: pontos, ressaltos e assistências. */
export interface PlayerStats {
  pts: number;
  reb: number;
  ast: number;
}

export interface Era {
  /** Nome histórico da equipa nesta década, se diferente (ex.: "Seattle SuperSonics"). */
  label?: string;
  players: Player[];
}

export interface Team {
  /** Sigla de 3 letras, única. */
  id: string;
  name: string;
  /** Cor principal em hex, usada na faixa do sorteio. */
  color: string;
  eras: Partial<Record<Decade, Era>>;
}

/** Um jogador tal como foi sorteado: sabe de que equipa e década veio. */
export interface DraftedPlayer extends Player {
  teamId: string;
  decade: Decade;
}

/** Resultado de uma rodagem: uma equipa numa década. */
export interface Combo {
  teamId: string;
  decade: Decade;
}
