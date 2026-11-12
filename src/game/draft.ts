import type { Combo, Decade, DraftedPlayer, PlayerStats, Position, Team } from '../data/types';
import { pickRandom, type Rng } from './rng';

/** Formato do cinco: 2 bases, 2 extremos, 1 poste. */
export const SLOT_POSITIONS: readonly Position[] = ['G', 'G', 'F', 'F', 'C'];

export const POSITION_NAME: Record<Position, string> = { G: 'Base', F: 'Extremo', C: 'Poste' };

export interface Slot {
  position: Position;
  player: DraftedPlayer | null;
}

export type Lineup = readonly Slot[];

export function createLineup(): Slot[] {
  return SLOT_POSITIONS.map((position) => ({ position, player: null }));
}

export const isComplete = (lineup: Lineup) => lineup.every((s) => s.player !== null);

export const openPositions = (lineup: Lineup): Position[] =>
  lineup.filter((s) => s.player === null).map((s) => s.position);

export const isDrafted = (lineup: Lineup, name: string) => lineup.some((s) => s.player?.name === name);

/** Pode entrar se há vaga numa das suas posições e ainda não está no cinco (o mesmo jogador pode aparecer em várias equipas). */
export function canPick(lineup: Lineup, player: { name: string; positions: Position[] }): boolean {
  const open = openPositions(lineup);
  return !isDrafted(lineup, player.name) && player.positions.some((p) => open.includes(p));
}

/** Coloca o jogador na posição com mais vagas livres. Devolve um novo cinco (imutável) e o índice usado. */
export function placePlayer(lineup: Lineup, player: DraftedPlayer): { lineup: Slot[]; index: number } {
  if (!canPick(lineup, player)) throw new Error(`${player.name} não cabe neste cinco`);
  const open = openPositions(lineup);
  const count = (p: Position) => open.filter((x) => x === p).length;
  const best = player.positions.filter((p) => open.includes(p)).sort((a, b) => count(b) - count(a))[0];
  const index = lineup.findIndex((s) => s.player === null && s.position === best);
  const next = lineup.map((s, i) => (i === index ? { ...s, player } : s));
  return { lineup: next, index };
}

/** O jogador pode ocupar um lugar desta posição? */
export const playsPosition = (player: { positions: Position[] }, position: Position) => player.positions.includes(position);

/**
 * Lugares para onde o jogador do lugar `from` pode ir: um lugar de outra posição que ele joga,
 * vazio ou ocupado por alguém que possa ir para o lugar `from` (aí os dois trocam).
 */
export function moveTargets(lineup: Lineup, from: number): number[] {
  const source = lineup[from];
  if (!source?.player) return [];
  const mover = source.player;
  return lineup.flatMap((slot, i) => {
    if (i === from || slot.position === source.position || !playsPosition(mover, slot.position)) return [];
    return !slot.player || playsPosition(slot.player, source.position) ? [i] : [];
  });
}

/** Move o jogador de `from` para `to` (trocando com quem lá estiver). Devolve um novo cinco. */
export function movePlayer(lineup: Lineup, from: number, to: number): Slot[] {
  if (!moveTargets(lineup, from).includes(to)) throw new Error(`Não dá para mover o lugar ${from} para ${to}`);
  return lineup.map((s, i) =>
    i === from ? { ...s, player: lineup[to]!.player } : i === to ? { ...s, player: lineup[from]!.player } : s,
  );
}

/**
 * Não há vaga para este jogador, mas haveria se alguém do cinco mudasse para um lugar vazio
 * de outra posição que joga? (Serve para sugerir a troca na interface.)
 */
export function fitsAfterMove(lineup: Lineup, player: { name: string; positions: Position[] }): boolean {
  if (isDrafted(lineup, player.name) || canPick(lineup, player)) return false;
  return lineup.some(
    (slot, i) =>
      slot.player !== null &&
      playsPosition(player, slot.position) &&
      moveTargets(lineup, i).some((j) => lineup[j]!.player === null),
  );
}

export function lineupAverage(lineup: Lineup): number {
  const ratings = lineup.flatMap((s) => (s.player ? [s.player.rating] : []));
  return ratings.length ? ratings.reduce((a, b) => a + b, 0) / ratings.length : 0;
}

export function findTeam(teams: readonly Team[], id: string): Team {
  const team = teams.find((t) => t.id === id);
  if (!team) throw new Error(`Equipa desconhecida: ${id}`);
  return team;
}

export function allCombos(teams: readonly Team[]): Combo[] {
  return teams.flatMap((t) =>
    (Object.keys(t.eras) as unknown as string[]).map((d) => ({ teamId: t.id, decade: Number(d) as Decade })),
  );
}

export function poolFor(teams: readonly Team[], combo: Combo): DraftedPlayer[] {
  const era = findTeam(teams, combo.teamId).eras[combo.decade];
  return (era?.players ?? []).map((p) => ({ ...p, teamId: combo.teamId, decade: combo.decade }));
}

export const comboHasPick = (teams: readonly Team[], lineup: Lineup, combo: Combo) =>
  poolFor(teams, combo).some((p) => canPick(lineup, p));

/**
 * Sorteia uma equipa+década que tenha pelo menos um jogador escolhível.
 * `filter` restringe o sorteio (usado nas trocas de equipa/década); se nada passar no filtro, ignora-o.
 */
export function drawCombo(
  teams: readonly Team[],
  lineup: Lineup,
  rng: Rng,
  filter: (c: Combo) => boolean = () => true,
): Combo {
  const useful = allCombos(teams).filter((c) => comboHasPick(teams, lineup, c));
  const filtered = useful.filter(filter);
  return pickRandom(filtered.length ? filtered : useful, rng);
}

export function teamLabel(teams: readonly Team[], combo: Combo): string {
  const team = findTeam(teams, combo.teamId);
  return team.eras[combo.decade]?.label ?? team.name;
}

export const decadeLabel = (d: Decade) => (d === 2000 ? 'Anos 2000' : d >= 2010 ? `Anos ${d}` : `Anos ${String(d).slice(2)}`);
export const shortDecade = (d: Decade) => `'${String(d).slice(2)}`;

/** Linha curta com as médias, ex.: "26.0 PTS · 10.4 RES · 6.5 AST". */
export const statLine = (s: PlayerStats) =>
  `${s.pts.toFixed(1)} PTS · ${s.reb.toFixed(1)} RES · ${s.ast.toFixed(1)} AST`;

/** Versão compacta para espaços estreitos, ex.: "26.0/10.4/6.5" (PTS/RES/AST). */
export const statLineShort = (s: PlayerStats) => [s.pts, s.reb, s.ast].map((v) => v.toFixed(1)).join('/');
