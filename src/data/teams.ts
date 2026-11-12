import type { Decade, Era, Player, Team } from './types';
import { DECADES } from './types';
import generated from './players.json';
import { decodeRating, ratingKey } from './codec';

/**
 * Franquias da NBA. Os plantéis NÃO são escritos à mão: vêm de `players.json`,
 * gerado por `scripts/build_players.py` a partir do dataset do Basketball-Reference em `data_raw/`.
 * - A década é o ano de início da época (1989-90 conta como 1980).
 * - `rating` (0–99) vem ofuscado no JSON (campo `x`, ver codec.ts) e é descodificado aqui. É o impacto
 *   do jogador nessa equipa e década, calculado a partir
 *   do Game Score por jogo. Fica escondido do utilizador.
 * - `stats` são as médias por jogo (pontos/ressaltos/assistências) nessa equipa e década.
 * Aqui só se mantém o nome, a cor e os nomes históricos (`labels`) de cada franquia.
 */
interface TeamInfo {
  id: string;
  name: string;
  color: string;
  /** Nome histórico por década, quando a franquia tinha outro nome/cidade. */
  labels?: Partial<Record<Decade, string>>;
}

const TEAM_INFO: TeamInfo[] = [
  { id: 'ATL', name: 'Atlanta Hawks', color: '#E03A3E' },
  { id: 'BOS', name: 'Boston Celtics', color: '#007A33' },
  {
    id: 'BKN',
    name: 'Brooklyn Nets',
    color: '#9aa0a6',
    labels: { 1980: 'New Jersey Nets', 1990: 'New Jersey Nets', 2000: 'New Jersey Nets', 2010: 'New Jersey / Brooklyn Nets' },
  },
  {
    id: 'CHA',
    name: 'Charlotte Hornets',
    color: '#00788C',
    labels: { 2000: 'Charlotte Hornets/Bobcats', 2010: 'Charlotte Bobcats/Hornets' },
  },
  { id: 'CHI', name: 'Chicago Bulls', color: '#CE1141' },
  { id: 'CLE', name: 'Cleveland Cavaliers', color: '#860038' },
  { id: 'DAL', name: 'Dallas Mavericks', color: '#00538C' },
  { id: 'DEN', name: 'Denver Nuggets', color: '#FEC524' },
  { id: 'DET', name: 'Detroit Pistons', color: '#C8102E' },
  { id: 'GSW', name: 'Golden State Warriors', color: '#1D428A' },
  { id: 'HOU', name: 'Houston Rockets', color: '#CE1141' },
  { id: 'IND', name: 'Indiana Pacers', color: '#FDBB30' },
  { id: 'LAC', name: 'LA Clippers', color: '#C8102E', labels: { 1980: 'San Diego / LA Clippers' } },
  { id: 'LAL', name: 'Los Angeles Lakers', color: '#552583' },
  { id: 'MEM', name: 'Memphis Grizzlies', color: '#5D76A9', labels: { 1990: 'Vancouver Grizzlies' } },
  { id: 'MIA', name: 'Miami Heat', color: '#98002E' },
  { id: 'MIL', name: 'Milwaukee Bucks', color: '#00471B' },
  { id: 'MIN', name: 'Minnesota Timberwolves', color: '#236192' },
  {
    id: 'NOP',
    name: 'New Orleans Pelicans',
    color: '#85714D',
    labels: { 2000: 'New Orleans Hornets', 2010: 'New Orleans Hornets/Pelicans' },
  },
  { id: 'NYK', name: 'New York Knicks', color: '#F58426' },
  {
    id: 'OKC',
    name: 'Oklahoma City Thunder',
    color: '#007AC1',
    labels: { 1980: 'Seattle SuperSonics', 1990: 'Seattle SuperSonics', 2000: 'SuperSonics / Thunder' },
  },
  { id: 'ORL', name: 'Orlando Magic', color: '#0077C0' },
  { id: 'PHI', name: 'Philadelphia 76ers', color: '#006BB6' },
  { id: 'PHX', name: 'Phoenix Suns', color: '#E56020' },
  { id: 'POR', name: 'Portland Trail Blazers', color: '#E03A3E' },
  { id: 'SAC', name: 'Sacramento Kings', color: '#5A2D81', labels: { 1980: 'Kansas City / Sacramento Kings' } },
  { id: 'SAS', name: 'San Antonio Spurs', color: '#C4CED4' },
  { id: 'TOR', name: 'Toronto Raptors', color: '#CE1141' },
  { id: 'UTA', name: 'Utah Jazz', color: '#F9A01B' },
  {
    id: 'WAS',
    name: 'Washington Wizards',
    color: '#E31837',
    labels: { 1980: 'Washington Bullets', 1990: 'Washington Bullets/Wizards' },
  },
];

/** Jogador tal como vem em `players.json`: a nota vem ofuscada no campo `x` (ver codec.ts). */
type StoredPlayer = Omit<Player, 'rating'> & { x: string };
/** Formato de `players.json`: equipa → década → jogadores. */
type GeneratedRosters = Record<string, Partial<Record<string, StoredPlayer[]>>>;
const ROSTERS = (generated as { teams: GeneratedRosters }).teams;

export const TEAMS: Team[] = TEAM_INFO.map(({ labels, ...info }) => {
  const eras: Partial<Record<Decade, Era>> = {};
  for (const decade of DECADES) {
    const stored = ROSTERS[info.id]?.[String(decade)];
    if (!stored?.length) continue;
    const players = stored.map(({ x, ...p }) => ({ ...p, rating: decodeRating(x, ratingKey(info.id, decade, p.name)) }));
    eras[decade] = { label: labels?.[decade], players };
  }
  return { ...info, eras };
});
