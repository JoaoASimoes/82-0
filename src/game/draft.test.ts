import { describe, expect, it } from 'vitest';
import { TEAMS } from '../data/teams';
import type { DraftedPlayer } from '../data/types';
import {
  statLineShort,
  canPick,
  placementOptions,
  placePlayerAt,
  DEFAULT_SORT,
  SORT_KEYS,
  sortPlayers,
  fitsAfterMove,
  movePlayer,
  moveTargets,
  comboHasPick,
  createLineup,
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
  stats: { pts: 20, reb: 5, ast: 5, stl: 1, blk: 1 },
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
  });

  it('formata as médias com uma casa decimal', () => {
    const stats = { pts: 26, reb: 10.4, ast: 6.5, stl: 1.2, blk: 0.4 };
    expect(statLineShort(stats)).toBe('26.0/10.4/6.5');
  });

  describe('trocar de posição', () => {
    // Cinco: 0 G, 1 G, 2 F, 3 F, 4 C
    const build = (...players: (DraftedPlayer | null)[]) =>
      createLineup().map((slot, i) => ({ ...slot, player: players[i] ?? null }));

    it('um jogador F/C pode ir para o lugar de poste vazio', () => {
      const lineup = build(null, null, p('Duncan', ['F', 'C']));
      expect(moveTargets(lineup, 2)).toEqual([4]);
      const next = movePlayer(lineup, 2, 4);
      expect(next[4]!.player?.name).toBe('Duncan');
      expect(next[2]!.player).toBeNull();
      expect(lineup[2]!.player?.name).toBe('Duncan'); // imutável
    });

    it('troca dois jogadores quando ambos podem jogar no lugar do outro', () => {
      const lineup = build(null, null, p('Garnett', ['F', 'C']), null, p('Dirk', ['C', 'F']));
      expect(moveTargets(lineup, 2)).toEqual([4]);
      const next = movePlayer(lineup, 2, 4);
      expect(next[2]!.player?.name).toBe('Dirk');
      expect(next[4]!.player?.name).toBe('Garnett');
    });

    it('não troca se o outro não pode jogar no lugar de origem', () => {
      const lineup = build(null, null, p('Garnett', ['F', 'C']), null, p('Jokić', ['C']));
      expect(moveTargets(lineup, 2)).toEqual([]);
      expect(() => movePlayer(lineup, 2, 4)).toThrow();
    });

    it('não sugere lugares da mesma posição nem posições que o jogador não joga', () => {
      const lineup = build(p('Stockton', ['G']));
      expect(moveTargets(lineup, 0)).toEqual([]);
      expect(moveTargets(lineup, 3)).toEqual([]); // lugar vazio
    });

    it('fitsAfterMove: um poste puro cabe se o F/C no lugar de poste mudar para extremo', () => {
      const lineup = build(null, null, null, null, p('Duncan', ['F', 'C']));
      const jokic = p('Jokić', ['C']);
      expect(canPick(lineup, jokic)).toBe(false);
      expect(fitsAfterMove(lineup, jokic)).toBe(true);
      expect(fitsAfterMove(build(null, null, null, null, p('Shaq', ['C'])), jokic)).toBe(false);
    });
  });

  describe('ordenar a lista do sorteio', () => {
    const withStats = (name: string, pts: number, blk: number) => ({ ...p(name, ['F'], 99), stats: { pts, reb: 5, ast: 5, stl: 1, blk } });
    const pool = [withStats('Rodman', 7, 0.6), withStats('Jordan', 30, 0.8), withStats('Bird', 25, 0.8)];

    it('por nome, A→Z', () => {
      expect(sortPlayers(pool, 'name').map((x) => x.name)).toEqual(['Bird', 'Jordan', 'Rodman']);
    });

    it('por estatística, maior primeiro, empates por nome', () => {
      expect(sortPlayers(pool, 'pts').map((x) => x.name)).toEqual(['Jordan', 'Bird', 'Rodman']);
      expect(sortPlayers(pool, 'blk').map((x) => x.name)).toEqual(['Bird', 'Jordan', 'Rodman']);
    });

    it('começa por pontos e deixa o nome para último', () => {
      expect(DEFAULT_SORT).toBe('pts');
      expect(SORT_KEYS[0]).toBe('pts');
      expect(SORT_KEYS.at(-1)).toBe('name');
    });

    it('não altera a lista original', () => {
      sortPlayers(pool, 'pts');
      expect(pool.map((x) => x.name)).toEqual(['Rodman', 'Jordan', 'Bird']);
    });
  });

  describe('escolher o lugar', () => {
    // Cinco: 0 G, 1 G, 2 F, 3 F, 4 C
    it('um lugar por posição livre que o jogador joga', () => {
      expect(placementOptions(createLineup(), p('Duncan', ['F', 'C']))).toEqual([2, 4]);
      expect(placementOptions(createLineup(), p('Iverson', ['G']))).toEqual([0]);
      expect(placementOptions(createLineup(), p('Giannis', ['F', 'G', 'C']))).toEqual([0, 2, 4]);
    });

    it('ignora lugares ocupados e jogadores já no cinco', () => {
      const lineup = placePlayerAt(createLineup(), p('Shaq', ['C']), 4);
      expect(placementOptions(lineup, p('Duncan', ['F', 'C']))).toEqual([2]);
      expect(placementOptions(lineup, p('Shaq', ['C']))).toEqual([]);
    });

    it('coloca no lugar escolhido sem mexer no cinco original', () => {
      const empty = createLineup();
      const next = placePlayerAt(empty, p('Duncan', ['F', 'C']), 4);
      expect(next[4]!.player?.name).toBe('Duncan');
      expect(empty[4]!.player).toBeNull();
      expect(() => placePlayerAt(empty, p('Iverson', ['G']), 4)).toThrow();
      expect(() => placePlayerAt(next, p('Shaq', ['C']), 4)).toThrow();
    });
  });
});
