import type { Decade, PlayerStats, Position } from '../data/types';
import { STAT_KEYS } from '../data/types';
import type { VerdictTier } from '../game/verdict';

export type Lang = 'pt' | 'en';
export const LANGS: readonly Lang[] = ['pt', 'en'];

/** Língua inicial: a do browser se for português, senão inglês. */
export const detectLang = (browserLangs: readonly string[]): Lang =>
  browserLangs.some((l) => l.toLowerCase().startsWith('pt')) ? 'pt' : 'en';

const pt = {
  langName: 'Português',
  code: 'PT',
  htmlLang: 'pt-PT',
  title: '82-0 · Época Perfeita',
  positions: { G: 'Base', F: 'Extremo', C: 'Poste' } as Record<Position, string>,
  decade: (d: Decade) => (d === 2000 ? 'Anos 2000' : d >= 2010 ? `Anos ${d}` : `Anos ${String(d).slice(2)}`),
  stat: { pts: 'PTS', reb: 'RES', ast: 'AST', stl: 'ROU', blk: 'ABF' } as Record<keyof PlayerStats, string>,
  statName: {
    pts: 'Pontos',
    reb: 'Ressaltos',
    ast: 'Assistências',
    stl: 'Roubos de bola',
    blk: 'Abafos',
  } as Record<keyof PlayerStats, string>,
  or: 'ou',
  and: 'e',

  home: {
    tagline: 'Escolhe 5 lendas da NBA. Consegues a época perfeita?',
    language: 'Língua',
    play: 'Jogar',
    record: (best: number, seasons: number, perfect: number) =>
      `Melhor ${best}-${82 - best} · ${seasons} ${seasons === 1 ? 'época' : 'épocas'} · ${perfect}× 82-0`,
  },

  draft: {
    draw: 'Sorteio',
    closed: 'Cinco fechado!',
    swapTeam: '↻ Sortear outra equipa',
    swapDecade: '↻ Sortear outra década',
    swapHint: 'Só podes usar uma vez por jogo',
    changePosition: 'Mudar de posição',
    close: 'Fechar',
    tapToPick: 'Toca num jogador para o escolher',
    sortBy: 'Ordenar por',
    sortName: 'Nome',
    tapToMove: 'Toca num jogador do cinco para ver as médias ou mudar de posição',
    moveWhere: (name: string) => `Toca no lugar para onde queres mudar ${name}`,
    onlyPlays: (name: string, positions: string) => `${name} só joga a ${positions}`,
    nowhereToMove: (name: string) => `${name} não tem para onde trocar agora`,
    inLineup: 'Já está no teu cinco',
    fitsAfterMove: 'Muda alguém de posição para abrir vaga',
    noSlot: 'Sem lugar livre nesta posição',
    slotEmpty: (position: string) => `${position}: vazio`,
    slotPlayer: (position: string, name: string, others: string) =>
      `${position}: ${name}${others ? `, também joga a ${others}` : ''}`,
    empty: 'vazio',
  },

  season: {
    simulating: 'A simular a época…',
    yourFive: 'O teu cinco',
    share: 'Partilhar',
    again: 'Jogar outra vez',
    home: 'Início',
    newBest: 'Novo recorde pessoal!',
    copied: 'Resultado copiado',
    shareText: (wins: number, losses: number) =>
      `🏀 82-0 — fiz ${wins}-${losses}${wins === 82 ? ' 🏆 ÉPOCA PERFEITA' : ''}`,
  },

  verdict: {
    perfect: { title: '🏆 ÉPOCA PERFEITA! 82-0', subtitle: 'Fizeste história. Nunca ninguém conseguiu isto na NBA.' },
    warriors: { title: '🔥 Melhor que os Warriors de 2016', subtitle: 'Bateste o recorde real de 73-9. Quase perfeito.' },
    bulls: { title: '🐂 Nível Bulls de 1996', subtitle: 'Igualaste uma das maiores equipas de sempre (72-10).' },
    contender: { title: '💍 Candidato ao título', subtitle: 'Época dominante, mas longe da perfeição.' },
    playoffs: { title: '✅ Playoffs garantidos', subtitle: 'Boa equipa. Faltam estrelas para o 82-0.' },
    playIn: { title: '😬 Play-in', subtitle: 'Época mediana. Tenta escolher jogadores mais fortes.' },
    lottery: { title: '📉 Lottery', subtitle: 'Pelo menos tens uma boa escolha no draft…' },
  } as Record<VerdictTier, { title: string; subtitle: string }>,
};

export type Strings = typeof pt;

const en: Strings = {
  langName: 'English',
  code: 'EN',
  htmlLang: 'en',
  title: '82-0 · Perfect Season',
  positions: { G: 'Guard', F: 'Forward', C: 'Center' },
  decade: (d: Decade) => `${d}s`,
  stat: { pts: 'PTS', reb: 'REB', ast: 'AST', stl: 'STL', blk: 'BLK' },
  statName: { pts: 'Points', reb: 'Rebounds', ast: 'Assists', stl: 'Steals', blk: 'Blocks' },
  or: 'or',
  and: 'and',

  home: {
    tagline: 'Pick 5 NBA legends. Can you go 82-0?',
    language: 'Language',
    play: 'Play',
    record: (best, seasons, perfect) =>
      `Best ${best}-${82 - best} · ${seasons} ${seasons === 1 ? 'season' : 'seasons'} · ${perfect}× 82-0`,
  },

  draft: {
    draw: 'Draw',
    closed: 'Five locked in!',
    swapTeam: '↻ Re-roll team',
    swapDecade: '↻ Re-roll decade',
    swapHint: 'You can only use it once per game',
    changePosition: 'Change position',
    close: 'Close',
    tapToPick: 'Tap a player to pick him',
    sortBy: 'Sort by',
    sortName: 'Name',
    tapToMove: 'Tap a player in your five to see his averages or change his position',
    moveWhere: (name) => `Tap the spot to move ${name} to`,
    onlyPlays: (name, positions) => `${name} only plays ${positions}`,
    nowhereToMove: (name) => `${name} has nowhere to move right now`,
    inLineup: 'Already in your five',
    fitsAfterMove: 'Move someone to another position to make room',
    noSlot: 'No open spot at this position',
    slotEmpty: (position) => `${position}: empty`,
    slotPlayer: (position, name, others) => `${position}: ${name}${others ? `, also plays ${others}` : ''}`,
    empty: 'empty',
  },

  season: {
    simulating: 'Simulating the season…',
    yourFive: 'Your five',
    share: 'Share',
    again: 'Play again',
    home: 'Home',
    newBest: 'New personal best!',
    copied: 'Result copied',
    shareText: (wins, losses) => `🏀 82-0 — I went ${wins}-${losses}${wins === 82 ? ' 🏆 PERFECT SEASON' : ''}`,
  },

  verdict: {
    perfect: { title: '🏆 PERFECT SEASON! 82-0', subtitle: 'You made history. No NBA team has ever done this.' },
    warriors: { title: '🔥 Better than the 2016 Warriors', subtitle: 'You beat the real 73-9 record. Almost perfect.' },
    bulls: { title: '🐂 1996 Bulls level', subtitle: 'You matched one of the greatest teams ever (72-10).' },
    contender: { title: '💍 Title contender', subtitle: 'A dominant season, but far from perfect.' },
    playoffs: { title: '✅ Playoff team', subtitle: 'Good team. You need more stars for 82-0.' },
    playIn: { title: '😬 Play-in', subtitle: 'An average season. Try picking stronger players.' },
    lottery: { title: '📉 Lottery', subtitle: 'At least you get a good draft pick…' },
  },
};

export const STRINGS: Record<Lang, Strings> = { pt, en };

/** "26.0 PTS · 10.4 RES · 6.5 AST · 1.2 ROU · 0.4 ABF" na língua escolhida. */
export const statLine = (s: PlayerStats, t: Strings) =>
  STAT_KEYS.map((k) => `${s[k].toFixed(1)} ${t.stat[k]}`).join(' · ');

/** "base ou extremo" / "guard or forward". */
export const positionList = (positions: readonly Position[], t: Strings, joiner: 'or' | 'and') =>
  positions.map((p) => t.positions[p].toLowerCase()).join(` ${t[joiner]} `);
