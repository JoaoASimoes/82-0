import { describe, expect, it } from 'vitest';
import { TEAMS } from '../data/teams';
import type { DraftedPlayer } from '../data/types';
import {
  statLine,
  statLineShort,
  canPick,
  comboHasPick,
  createLineup,
  decadeLabel,
  drawCombo,
  isComplete,
  lineupAverage,
  openPositions,
  placePlayer,
  teamLabel,
} from './draft';
import { seededRng } from './rng';

const p = (name: string, positions: DraftedPlayer['positions'], rating = 90): DraftedPlayer => ({
  name,
  positions,
  rating,
  stats: { pts: 20, reb: 5, ast: 5 },
  teamId: 'CHI',
  decade: 1990,
});

describe('draft', () => {
  it('começa com 2 G, 2 F e 1 C livres', () => {
    expect(openPositions(createLineup()).sort()).toEqual(['C', 'F', 'F', 'G', 'G']);
  });

  it('coloca jogadores e calcula a média', () => {
    let { lineup } = placePlayer(createLineup(), p('A', ['G'], 90));
    ({ lineup } = placePlayer(lineup, p('B', ['C'], 80)));
    expect(lineupAverage(lineup)).toBe(85);
    expect(openPositions(lineup).sort()).toEqual(['F', 'F', 'G']);
  });

  it('não deixa escolher o mesmo jogador duas vezes nem posições cheias', () => {
    const { lineup } = placePlayer(createLineup(), p('Shaq', ['C']));
    expect(canPick(lineup, p('Shaq', ['C']))).toBe(false);
    expect(canPick(lineup, p('Hakeem', ['C']))).toBe(false);
    expect(canPick(lineup, p('Jordan', ['G']))).toBe(true);
    expect(() => placePlayer(lineup, p('Hakeem', ['C']))).toThrow();
  });

  it('jogador com duas posições vai para a posição com mais vagas', () => {
    let { lineup } = placePlayer(createLineup(), p('G1', ['G']));
    const res = placePlayer(lineup, p('Swing', ['G', 'F']));
    lineup = res.lineup;
    expect(lineup[res.index]?.position).toBe('F');
  });

  it('drawCombo só devolve combinações com jogadores escolhíveis', () => {
    const rng = seededRng(42);
    let lineup = createLineup();
    for (let i = 0; i < 5; i++) {
      const combo = drawCombo(TEAMS, lineup, rng);
      expect(comboHasPick(TEAMS, lineup, combo)).toBe(true);
      const pick = TEAMS.find((t) => t.id === combo.teamId)!.eras[combo.decade]!.players.find((pl) =>
        canPick(lineup, pl),
      )!;
      lineup = placePlayer(lineup, { ...pick, ...combo }).lineup;
    }
    expect(isComplete(lineup)).toBe(true);
  });

  it('respeita o filtro nas trocas', () => {
    const rng = seededRng(7);
    for (let i = 0; i < 20; i++) {
      const c = drawCombo(TEAMS, createLineup(), rng, (x) => x.decade === 1990 && x.teamId !== 'CHI');
      expect(c.decade).toBe(1990);
      expect(c.teamId).not.toBe('CHI');
    }
  });

  it('usa o nome histórico da equipa', () => {
    expect(teamLabel(TEAMS, { teamId: 'OKC', decade: 1990 })).toBe('Seattle SuperSonics');
    expect(teamLabel(TEAMS, { teamId: 'OKC', decade: 2020 })).toBe('Oklahoma City Thunder');
    expect(decadeLabel(1980)).toBe('Anos 80');
    expect(decadeLabel(2010)).toBe('Anos 2010');
  });

  it('formata as médias com uma casa decimal', () => {
    const stats = { pts: 26, reb: 10.4, ast: 6.5 };
    expect(statLine(stats)).toBe('26.0 PTS · 10.4 RES · 6.5 AST');
    expect(statLineShort(stats)).toBe('26.0/10.4/6.5');
  });
});
