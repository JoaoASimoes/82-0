import { describe, expect, it } from 'vitest';
import { TEAMS } from './teams';
import { DECADES, type Decade, type Era, type Team } from './types';
import { allCombos, poolFor } from '../game/draft';

describe('dados das equipas', () => {
  it('tem 30 franquias com siglas únicas', () => {
    expect(TEAMS).toHaveLength(30);
    expect(new Set(TEAMS.map((t) => t.id)).size).toBe(30);
  });

  it.each(TEAMS.map((t) => [t.id, t] as const))('%s tem dados válidos', (_id: string, team: Team) => {
    expect(team.id).toMatch(/^[A-Z]{3}$/);
    expect(team.color).toMatch(/^#[0-9A-Fa-f]{6}$/);
    for (const [d, era] of Object.entries(team.eras) as [string, Era][]) {
      expect(DECADES).toContain(Number(d) as Decade);
      expect(era.players.length, `${team.id} ${d}: mínimo 10 jogadores`).toBeGreaterThanOrEqual(10);
      const names = era.players.map((p) => p.name);
      expect(new Set(names).size, `${team.id} ${d}: nomes repetidos`).toBe(names.length);
      for (const p of era.players) {
        expect(p.rating, p.name).toBeGreaterThanOrEqual(40);
        expect(p.rating, p.name).toBeLessThanOrEqual(99);
        for (const [k, max] of [['pts', 40], ['reb', 20], ['ast', 14]] as const) {
          const v = p.stats[k];
          expect(v, `${p.name} ${k}`).toBeGreaterThanOrEqual(0);
          expect(v, `${p.name} ${k}`).toBeLessThanOrEqual(max);
          expect(Math.round(v * 10), `${p.name} ${k}: uma casa decimal`).toBeCloseTo(v * 10, 6);
        }
        expect(p.positions.length, p.name).toBeGreaterThanOrEqual(1);
        expect(p.positions.length, p.name).toBeLessThanOrEqual(2);
        for (const pos of p.positions) expect(['G', 'F', 'C']).toContain(pos);
      }
    }
  });

  it('cada década tem jogadores para todas as posições (o draft nunca encrava)', () => {
    for (const d of DECADES) {
      const players = allCombos(TEAMS)
        .filter((c) => c.decade === d)
        .flatMap((c) => poolFor(TEAMS, c));
      for (const pos of ['G', 'F', 'C'] as const) {
        expect(players.filter((p) => p.positions.includes(pos)).length, `${d} ${pos}`).toBeGreaterThan(5);
      }
    }
  });
});
