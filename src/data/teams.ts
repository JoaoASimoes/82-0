import type { Team } from './types';

/**
 * Plantéis por franquia e década.
 * - A década é o ano de início da época (1989-90 conta como 1980).
 * - `rating` (0–99) é o impacto do jogador NESSA equipa e década. Fica escondido do utilizador.
 * - `stats` são as médias por jogo (pontos/ressaltos/assistências) nessa equipa e década — é o que o utilizador vê.
 * - `label` substitui o nome da equipa quando a franquia tinha outro nome/cidade.
 * Os testes em data.test.ts validam este ficheiro: corre `npm test` depois de editar.
 */
export const TEAMS: Team[] = [
  {
    id: 'ATL',
    name: 'Atlanta Hawks',
    color: '#E03A3E',
    eras: {
      1980: {
        players: [
          { name: 'Dominique Wilkins', positions: ['F'], rating: 94, stats: { pts: 28.4, reb: 6.9, ast: 2.6 } },
          { name: 'Doc Rivers', positions: ['G'], rating: 82, stats: { pts: 10.8, reb: 3.2, ast: 6.4 } },
          { name: 'Kevin Willis', positions: ['F', 'C'], rating: 81, stats: { pts: 13.3, reb: 8.4, ast: 1.2 } },
          { name: 'Spud Webb', positions: ['G'], rating: 75, stats: { pts: 8.6, reb: 2.2, ast: 5.1 } },
          { name: 'Tree Rollins', positions: ['C'], rating: 76, stats: { pts: 6.0, reb: 6.9, ast: 0.8 } },
        ],
      },
      1990: {
        players: [
          { name: 'Dikembe Mutombo', positions: ['C'], rating: 89, stats: { pts: 12.7, reb: 12.0, ast: 1.6 } },
          { name: 'Mookie Blaylock', positions: ['G'], rating: 84, stats: { pts: 16.5, reb: 4.6, ast: 6.9 } },
          { name: 'Steve Smith', positions: ['G'], rating: 83, stats: { pts: 16.6, reb: 4.2, ast: 4.4 } },
          { name: 'Dominique Wilkins', positions: ['F'], rating: 91, stats: { pts: 27.3, reb: 7.6, ast: 3.0 } },
          { name: 'Stacey Augmon', positions: ['F'], rating: 76, stats: { pts: 9.6, reb: 4.3, ast: 1.6 } },
        ],
      },
      2000: {
        players: [
          { name: 'Joe Johnson', positions: ['G', 'F'], rating: 87, stats: { pts: 20.5, reb: 4.4, ast: 4.7 } },
          { name: 'Josh Smith', positions: ['F'], rating: 84, stats: { pts: 15.3, reb: 8.3, ast: 3.2 } },
          { name: 'Al Horford', positions: ['C'], rating: 85, stats: { pts: 11.1, reb: 9.4, ast: 2.0 } },
          { name: 'Shareef Abdur-Rahim', positions: ['F'], rating: 84, stats: { pts: 20.6, reb: 9.0, ast: 3.0 } },
          { name: 'Jason Terry', positions: ['G'], rating: 82, stats: { pts: 17.1, reb: 2.9, ast: 5.1 } },
        ],
      },
      2010: {
        players: [
          { name: 'Al Horford', positions: ['C'], rating: 88, stats: { pts: 16.3, reb: 8.6, ast: 3.0 } },
          { name: 'Paul Millsap', positions: ['F'], rating: 86, stats: { pts: 17.3, reb: 8.1, ast: 3.3 } },
          { name: 'Jeff Teague', positions: ['G'], rating: 82, stats: { pts: 13.6, reb: 2.5, ast: 6.1 } },
          { name: 'Kyle Korver', positions: ['G', 'F'], rating: 82, stats: { pts: 11.5, reb: 3.8, ast: 2.4 } },
          { name: 'Dennis Schröder', positions: ['G'], rating: 79, stats: { pts: 11.4, reb: 2.7, ast: 4.8 } },
        ],
      },
      2020: {
        players: [
          { name: 'Trae Young', positions: ['G'], rating: 90, stats: { pts: 26.4, reb: 4.0, ast: 9.8 } },
          { name: 'Dejounte Murray', positions: ['G'], rating: 84, stats: { pts: 21.1, reb: 5.5, ast: 5.9 } },
          { name: 'John Collins', positions: ['F'], rating: 82, stats: { pts: 15.6, reb: 7.8, ast: 1.6 } },
          { name: 'Clint Capela', positions: ['C'], rating: 82, stats: { pts: 11.3, reb: 11.8, ast: 1.0 } },
          { name: 'Bogdan Bogdanović', positions: ['G'], rating: 80, stats: { pts: 14.4, reb: 3.4, ast: 3.0 } },
        ],
      },
    },
  },
  {
    id: 'BOS',
    name: 'Boston Celtics',
    color: '#007A33',
    eras: {
      1980: {
        players: [
          { name: 'Larry Bird', positions: ['F'], rating: 98, stats: { pts: 26.0, reb: 10.4, ast: 6.5 } },
          { name: 'Kevin McHale', positions: ['F'], rating: 92, stats: { pts: 19.6, reb: 8.2, ast: 1.8 } },
          { name: 'Robert Parish', positions: ['C'], rating: 89, stats: { pts: 17.0, reb: 10.6, ast: 1.5 } },
          { name: 'Dennis Johnson', positions: ['G'], rating: 84, stats: { pts: 13.5, reb: 3.4, ast: 6.4 } },
          { name: 'Danny Ainge', positions: ['G'], rating: 81, stats: { pts: 11.6, reb: 3.4, ast: 4.4 } },
        ],
      },
      1990: {
        players: [
          { name: 'Reggie Lewis', positions: ['G', 'F'], rating: 84, stats: { pts: 19.7, reb: 4.8, ast: 3.0 } },
          { name: 'Antoine Walker', positions: ['F'], rating: 84, stats: { pts: 20.1, reb: 8.8, ast: 3.6 } },
          { name: 'Kevin McHale', positions: ['F'], rating: 85, stats: { pts: 15.4, reb: 6.8, ast: 1.7 } },
          { name: 'Robert Parish', positions: ['C'], rating: 83, stats: { pts: 13.8, reb: 8.5, ast: 1.0 } },
          { name: 'Dino Radja', positions: ['F', 'C'], rating: 79, stats: { pts: 15.9, reb: 8.0, ast: 1.6 } },
          { name: 'Dee Brown', positions: ['G'], rating: 75, stats: { pts: 11.6, reb: 2.6, ast: 4.6 } },
        ],
      },
      2000: {
        players: [
          { name: 'Kevin Garnett', positions: ['F', 'C'], rating: 93, stats: { pts: 18.6, reb: 8.9, ast: 3.0 } },
          { name: 'Paul Pierce', positions: ['F'], rating: 91, stats: { pts: 24.2, reb: 6.2, ast: 4.0 } },
          { name: 'Ray Allen', positions: ['G'], rating: 89, stats: { pts: 17.1, reb: 3.8, ast: 2.7 } },
          { name: 'Rajon Rondo', positions: ['G'], rating: 84, stats: { pts: 11.0, reb: 4.8, ast: 8.2 } },
          { name: 'Antoine Walker', positions: ['F'], rating: 83, stats: { pts: 21.2, reb: 9.0, ast: 4.5 } },
        ],
      },
      2010: {
        players: [
          { name: 'Kyrie Irving', positions: ['G'], rating: 89, stats: { pts: 24.4, reb: 3.4, ast: 5.5 } },
          { name: 'Rajon Rondo', positions: ['G'], rating: 86, stats: { pts: 11.2, reb: 5.3, ast: 10.6 } },
          { name: 'Isaiah Thomas', positions: ['G'], rating: 86, stats: { pts: 26.0, reb: 2.9, ast: 6.0 } },
          { name: 'Al Horford', positions: ['C'], rating: 84, stats: { pts: 14.5, reb: 7.2, ast: 5.0 } },
          { name: 'Gordon Hayward', positions: ['F'], rating: 80, stats: { pts: 15.2, reb: 4.9, ast: 3.4 } },
        ],
      },
      2020: {
        players: [
          { name: 'Jayson Tatum', positions: ['F'], rating: 94, stats: { pts: 26.8, reb: 8.2, ast: 4.6 } },
          { name: 'Jaylen Brown', positions: ['G', 'F'], rating: 89, stats: { pts: 23.7, reb: 5.8, ast: 3.5 } },
          { name: 'Kristaps Porziņģis', positions: ['C'], rating: 86, stats: { pts: 19.7, reb: 6.9, ast: 1.9 } },
          { name: 'Jrue Holiday', positions: ['G'], rating: 85, stats: { pts: 12.3, reb: 5.0, ast: 4.7 } },
          { name: 'Derrick White', positions: ['G'], rating: 83, stats: { pts: 13.2, reb: 4.0, ast: 4.4 } },
          { name: 'Marcus Smart', positions: ['G'], rating: 80, stats: { pts: 11.5, reb: 3.6, ast: 5.5 } },
        ],
      },
    },
  },
  {
    id: 'BKN',
    name: 'Brooklyn Nets',
    color: '#9aa0a6',
    eras: {
      1980: {
        label: 'New Jersey Nets',
        players: [
          { name: 'Buck Williams', positions: ['F'], rating: 85, stats: { pts: 16.4, reb: 11.9, ast: 1.4 } },
          { name: 'Micheal Ray Richardson', positions: ['G'], rating: 82, stats: { pts: 20.1, reb: 4.9, ast: 7.2 } },
          { name: 'Otis Birdsong', positions: ['G'], rating: 80, stats: { pts: 17.8, reb: 2.8, ast: 3.6 } },
          { name: 'Darryl Dawkins', positions: ['C'], rating: 78, stats: { pts: 13.6, reb: 6.6, ast: 1.5 } },
          { name: 'Mike Gminski', positions: ['C'], rating: 77, stats: { pts: 14.8, reb: 8.7, ast: 1.6 } },
        ],
      },
      1990: {
        label: 'New Jersey Nets',
        players: [
          { name: 'Drazen Petrović', positions: ['G'], rating: 87, stats: { pts: 22.3, reb: 2.8, ast: 3.5 } },
          { name: 'Derrick Coleman', positions: ['F'], rating: 86, stats: { pts: 19.6, reb: 10.6, ast: 3.1 } },
          { name: 'Kenny Anderson', positions: ['G'], rating: 83, stats: { pts: 16.4, reb: 3.8, ast: 8.0 } },
          { name: 'Kerry Kittles', positions: ['G'], rating: 78, stats: { pts: 16.0, reb: 4.5, ast: 2.4 } },
          { name: 'Jayson Williams', positions: ['F', 'C'], rating: 78, stats: { pts: 9.8, reb: 11.7, ast: 0.8 } },
        ],
      },
      2000: {
        label: 'New Jersey Nets',
        players: [
          { name: 'Jason Kidd', positions: ['G'], rating: 92, stats: { pts: 14.6, reb: 6.9, ast: 8.9 } },
          { name: 'Vince Carter', positions: ['G', 'F'], rating: 89, stats: { pts: 23.6, reb: 5.5, ast: 4.6 } },
          { name: 'Richard Jefferson', positions: ['F'], rating: 83, stats: { pts: 16.2, reb: 5.7, ast: 3.0 } },
          { name: 'Kenyon Martin', positions: ['F'], rating: 82, stats: { pts: 13.6, reb: 7.7, ast: 2.1 } },
          { name: 'Nenad Krstić', positions: ['C'], rating: 77, stats: { pts: 12.0, reb: 6.5, ast: 1.3 } },
        ],
      },
      2010: {
        players: [
          { name: 'Deron Williams', positions: ['G'], rating: 86, stats: { pts: 18.4, reb: 3.3, ast: 8.1 } },
          { name: 'Brook Lopez', positions: ['C'], rating: 84, stats: { pts: 18.6, reb: 6.9, ast: 1.5 } },
          { name: 'Joe Johnson', positions: ['G', 'F'], rating: 83, stats: { pts: 15.0, reb: 3.4, ast: 3.3 } },
          { name: "D'Angelo Russell", positions: ['G'], rating: 82, stats: { pts: 20.1, reb: 3.7, ast: 5.9 } },
          { name: 'Spencer Dinwiddie', positions: ['G'], rating: 79, stats: { pts: 14.5, reb: 3.7, ast: 6.0 } },
        ],
      },
      2020: {
        players: [
          { name: 'Kevin Durant', positions: ['F'], rating: 96, stats: { pts: 28.6, reb: 7.2, ast: 5.8 } },
          { name: 'James Harden', positions: ['G'], rating: 92, stats: { pts: 24.5, reb: 8.0, ast: 10.2 } },
          { name: 'Kyrie Irving', positions: ['G'], rating: 90, stats: { pts: 26.9, reb: 4.6, ast: 5.6 } },
          { name: 'Mikal Bridges', positions: ['F'], rating: 83, stats: { pts: 26.1, reb: 4.4, ast: 3.3 } },
          { name: 'Cam Thomas', positions: ['G'], rating: 79, stats: { pts: 19.1, reb: 3.2, ast: 2.6 } },
        ],
      },
    },
  },
  {
    id: 'CHA',
    name: 'Charlotte Hornets',
    color: '#00788C',
    eras: {
      1980: {
        players: [
          { name: 'Kelly Tripucka', positions: ['F'], rating: 78, stats: { pts: 22.6, reb: 5.0, ast: 3.1 } },
          { name: 'Rex Chapman', positions: ['G'], rating: 77, stats: { pts: 16.9, reb: 2.8, ast: 3.9 } },
          { name: 'Dell Curry', positions: ['G'], rating: 76, stats: { pts: 14.8, reb: 3.5, ast: 2.2 } },
          { name: 'Muggsy Bogues', positions: ['G'], rating: 74, stats: { pts: 7.1, reb: 2.6, ast: 9.2 } },
        ],
      },
      1990: {
        players: [
          { name: 'Alonzo Mourning', positions: ['C'], rating: 89, stats: { pts: 21.3, reb: 10.1, ast: 1.4 } },
          { name: 'Larry Johnson', positions: ['F'], rating: 87, stats: { pts: 19.6, reb: 9.2, ast: 3.9 } },
          { name: 'Glen Rice', positions: ['F'], rating: 87, stats: { pts: 23.1, reb: 4.6, ast: 2.2 } },
          { name: 'Dell Curry', positions: ['G'], rating: 79, stats: { pts: 16.0, reb: 3.2, ast: 2.3 } },
          { name: 'Muggsy Bogues', positions: ['G'], rating: 79, stats: { pts: 8.8, reb: 2.7, ast: 8.8 } },
        ],
      },
      2000: {
        label: 'Charlotte Hornets/Bobcats',
        players: [
          { name: 'Baron Davis', positions: ['G'], rating: 85, stats: { pts: 19.0, reb: 4.5, ast: 7.6 } },
          { name: 'Jamal Mashburn', positions: ['F'], rating: 84, stats: { pts: 21.8, reb: 6.7, ast: 4.4 } },
          { name: 'Gerald Wallace', positions: ['F'], rating: 82, stats: { pts: 16.5, reb: 7.2, ast: 2.3 } },
          { name: 'Emeka Okafor', positions: ['C'], rating: 81, stats: { pts: 14.0, reb: 10.6, ast: 1.0 } },
          { name: 'Raymond Felton', positions: ['G'], rating: 78, stats: { pts: 13.6, reb: 3.5, ast: 6.0 } },
        ],
      },
      2010: {
        players: [
          { name: 'Kemba Walker', positions: ['G'], rating: 87, stats: { pts: 19.8, reb: 4.0, ast: 5.5 } },
          { name: 'Al Jefferson', positions: ['C'], rating: 83, stats: { pts: 19.0, reb: 9.8, ast: 1.8 } },
          { name: 'Nicolas Batum', positions: ['F'], rating: 80, stats: { pts: 14.1, reb: 6.0, ast: 5.1 } },
          { name: 'Gerald Wallace', positions: ['F'], rating: 80, stats: { pts: 13.9, reb: 6.6, ast: 2.0 } },
          { name: 'Michael Kidd-Gilchrist', positions: ['F'], rating: 74, stats: { pts: 8.9, reb: 6.5, ast: 1.1 } },
        ],
      },
      2020: {
        players: [
          { name: 'LaMelo Ball', positions: ['G'], rating: 87, stats: { pts: 22.3, reb: 6.2, ast: 7.4 } },
          { name: 'Miles Bridges', positions: ['F'], rating: 81, stats: { pts: 18.4, reb: 6.6, ast: 3.4 } },
          { name: 'Terry Rozier', positions: ['G'], rating: 81, stats: { pts: 20.4, reb: 4.3, ast: 4.4 } },
          { name: 'Brandon Miller', positions: ['F'], rating: 80, stats: { pts: 17.3, reb: 4.6, ast: 2.2 } },
          { name: 'Gordon Hayward', positions: ['F'], rating: 79, stats: { pts: 14.6, reb: 4.3, ast: 3.4 } },
        ],
      },
    },
  },
  {
    id: 'CHI',
    name: 'Chicago Bulls',
    color: '#CE1141',
    eras: {
      1980: {
        players: [
          { name: 'Michael Jordan', positions: ['G'], rating: 98, stats: { pts: 32.6, reb: 5.7, ast: 5.9 } },
          { name: 'Scottie Pippen', positions: ['F'], rating: 86, stats: { pts: 14.6, reb: 7.0, ast: 4.5 } },
          { name: 'Artis Gilmore', positions: ['C'], rating: 82, stats: { pts: 18.9, reb: 10.1, ast: 1.6 } },
          { name: 'Horace Grant', positions: ['F'], rating: 80, stats: { pts: 11.8, reb: 8.9, ast: 1.6 } },
          { name: 'Charles Oakley', positions: ['F'], rating: 80, stats: { pts: 12.4, reb: 12.6, ast: 2.3 } },
        ],
      },
      1990: {
        players: [
          { name: 'Michael Jordan', positions: ['G'], rating: 99, stats: { pts: 30.1, reb: 6.1, ast: 5.3 } },
          { name: 'Scottie Pippen', positions: ['F'], rating: 94, stats: { pts: 20.2, reb: 7.5, ast: 6.1 } },
          { name: 'Dennis Rodman', positions: ['F'], rating: 87, stats: { pts: 5.2, reb: 15.3, ast: 2.9 } },
          { name: 'Horace Grant', positions: ['F'], rating: 84, stats: { pts: 13.4, reb: 9.0, ast: 2.8 } },
          { name: 'Toni Kukoč', positions: ['F'], rating: 82, stats: { pts: 13.1, reb: 4.7, ast: 4.2 } },
          { name: 'Ron Harper', positions: ['G'], rating: 79, stats: { pts: 7.4, reb: 3.0, ast: 2.9 } },
        ],
      },
      2000: {
        players: [
          { name: 'Derrick Rose', positions: ['G'], rating: 85, stats: { pts: 18.3, reb: 3.6, ast: 6.0 } },
          { name: 'Elton Brand', positions: ['F'], rating: 84, stats: { pts: 20.0, reb: 10.1, ast: 2.4 } },
          { name: 'Luol Deng', positions: ['F'], rating: 82, stats: { pts: 16.2, reb: 6.5, ast: 2.3 } },
          { name: 'Ben Gordon', positions: ['G'], rating: 81, stats: { pts: 16.4, reb: 2.9, ast: 2.9 } },
          { name: 'Kirk Hinrich', positions: ['G'], rating: 79, stats: { pts: 13.8, reb: 3.6, ast: 6.2 } },
        ],
      },
      2010: {
        players: [
          { name: 'Derrick Rose', positions: ['G'], rating: 93, stats: { pts: 21.0, reb: 3.8, ast: 6.6 } },
          { name: 'Jimmy Butler', positions: ['G', 'F'], rating: 88, stats: { pts: 16.5, reb: 5.0, ast: 3.4 } },
          { name: 'Joakim Noah', positions: ['C'], rating: 86, stats: { pts: 9.8, reb: 9.9, ast: 3.0 } },
          { name: 'Pau Gasol', positions: ['C'], rating: 85, stats: { pts: 17.7, reb: 11.4, ast: 3.6 } },
          { name: 'Luol Deng', positions: ['F'], rating: 83, stats: { pts: 16.6, reb: 6.5, ast: 2.6 } },
        ],
      },
      2020: {
        players: [
          { name: 'DeMar DeRozan', positions: ['G', 'F'], rating: 87, stats: { pts: 23.9, reb: 4.8, ast: 4.9 } },
          { name: 'Zach LaVine', positions: ['G'], rating: 86, stats: { pts: 24.4, reb: 4.8, ast: 4.6 } },
          { name: 'Nikola Vučević', positions: ['C'], rating: 84, stats: { pts: 17.9, reb: 11.0, ast: 3.3 } },
          { name: 'Lonzo Ball', positions: ['G'], rating: 80, stats: { pts: 13.0, reb: 5.4, ast: 5.1 } },
          { name: 'Coby White', positions: ['G'], rating: 80, stats: { pts: 15.5, reb: 3.9, ast: 3.6 } },
        ],
      },
    },
  },
  {
    id: 'CLE',
    name: 'Cleveland Cavaliers',
    color: '#860038',
    eras: {
      1980: {
        players: [
          { name: 'Mark Price', positions: ['G'], rating: 86, stats: { pts: 16.6, reb: 2.8, ast: 8.0 } },
          { name: 'Brad Daugherty', positions: ['C'], rating: 86, stats: { pts: 18.0, reb: 10.0, ast: 3.6 } },
          { name: 'Larry Nance', positions: ['F'], rating: 85, stats: { pts: 18.2, reb: 9.0, ast: 2.7 } },
          { name: 'Ron Harper', positions: ['G'], rating: 83, stats: { pts: 21.2, reb: 5.2, ast: 4.6 } },
          { name: 'World B. Free', positions: ['G'], rating: 82, stats: { pts: 24.2, reb: 3.0, ast: 4.3 } },
        ],
      },
      1990: {
        players: [
          { name: 'Mark Price', positions: ['G'], rating: 88, stats: { pts: 17.4, reb: 2.8, ast: 7.5 } },
          { name: 'Brad Daugherty', positions: ['C'], rating: 87, stats: { pts: 19.6, reb: 9.9, ast: 3.7 } },
          { name: 'Shawn Kemp', positions: ['F'], rating: 85, stats: { pts: 18.6, reb: 9.6, ast: 2.4 } },
          { name: 'Terrell Brandon', positions: ['G'], rating: 82, stats: { pts: 14.9, reb: 3.4, ast: 6.5 } },
          { name: 'Zydrunas Ilgauskas', positions: ['C'], rating: 80, stats: { pts: 13.4, reb: 7.6, ast: 0.8 } },
        ],
      },
      2000: {
        players: [
          { name: 'LeBron James', positions: ['F'], rating: 97, stats: { pts: 27.8, reb: 7.0, ast: 7.0 } },
          { name: 'Zydrunas Ilgauskas', positions: ['C'], rating: 82, stats: { pts: 16.3, reb: 8.1, ast: 1.5 } },
          { name: 'Mo Williams', positions: ['G'], rating: 81, stats: { pts: 16.2, reb: 3.3, ast: 4.4 } },
          { name: 'Andre Miller', positions: ['G'], rating: 80, stats: { pts: 18.4, reb: 3.5, ast: 7.4 } },
          { name: 'Larry Hughes', positions: ['G'], rating: 79, stats: { pts: 14.6, reb: 4.0, ast: 3.0 } },
        ],
      },
      2010: {
        players: [
          { name: 'LeBron James', positions: ['F'], rating: 98, stats: { pts: 26.0, reb: 7.8, ast: 8.5 } },
          { name: 'Kyrie Irving', positions: ['G'], rating: 90, stats: { pts: 21.6, reb: 3.7, ast: 5.5 } },
          { name: 'Kevin Love', positions: ['F'], rating: 87, stats: { pts: 18.2, reb: 10.0, ast: 2.4 } },
          { name: 'Tristan Thompson', positions: ['C'], rating: 78, stats: { pts: 9.3, reb: 8.6, ast: 1.0 } },
          { name: 'J.R. Smith', positions: ['G'], rating: 78, stats: { pts: 11.7, reb: 3.1, ast: 1.9 } },
        ],
      },
      2020: {
        players: [
          { name: 'Donovan Mitchell', positions: ['G'], rating: 91, stats: { pts: 26.6, reb: 4.7, ast: 5.0 } },
          { name: 'Evan Mobley', positions: ['F', 'C'], rating: 86, stats: { pts: 15.6, reb: 8.9, ast: 2.9 } },
          { name: 'Darius Garland', positions: ['G'], rating: 85, stats: { pts: 19.3, reb: 2.9, ast: 7.1 } },
          { name: 'Jarrett Allen', positions: ['C'], rating: 84, stats: { pts: 14.8, reb: 10.4, ast: 1.8 } },
          { name: 'Caris LeVert', positions: ['G'], rating: 79, stats: { pts: 13.0, reb: 3.6, ast: 3.2 } },
        ],
      },
    },
  },
  {
    id: 'DAL',
    name: 'Dallas Mavericks',
    color: '#00538C',
    eras: {
      1980: {
        players: [
          { name: 'Mark Aguirre', positions: ['F'], rating: 88, stats: { pts: 24.6, reb: 5.9, ast: 3.4 } },
          { name: 'Rolando Blackman', positions: ['G'], rating: 85, stats: { pts: 19.6, reb: 3.6, ast: 3.2 } },
          { name: 'Derek Harper', positions: ['G'], rating: 82, stats: { pts: 13.7, reb: 2.8, ast: 6.0 } },
          { name: 'Sam Perkins', positions: ['F'], rating: 81, stats: { pts: 14.2, reb: 7.4, ast: 1.5 } },
          { name: 'Roy Tarpley', positions: ['F', 'C'], rating: 80, stats: { pts: 13.6, reb: 10.6, ast: 1.8 } },
        ],
      },
      1990: {
        players: [
          { name: 'Jason Kidd', positions: ['G'], rating: 86, stats: { pts: 13.1, reb: 6.5, ast: 8.5 } },
          { name: 'Jamal Mashburn', positions: ['F'], rating: 83, stats: { pts: 21.2, reb: 4.6, ast: 3.4 } },
          { name: 'Michael Finley', positions: ['G', 'F'], rating: 83, stats: { pts: 19.6, reb: 5.3, ast: 4.0 } },
          { name: 'Jim Jackson', positions: ['G', 'F'], rating: 82, stats: { pts: 20.6, reb: 4.9, ast: 4.3 } },
          { name: 'Dirk Nowitzki', positions: ['F'], rating: 80, stats: { pts: 8.2, reb: 3.4, ast: 1.0 } },
        ],
      },
      2000: {
        players: [
          { name: 'Dirk Nowitzki', positions: ['F'], rating: 95, stats: { pts: 24.0, reb: 9.0, ast: 2.8 } },
          { name: 'Steve Nash', positions: ['G'], rating: 88, stats: { pts: 16.5, reb: 3.2, ast: 7.6 } },
          { name: 'Michael Finley', positions: ['G', 'F'], rating: 85, stats: { pts: 18.6, reb: 5.2, ast: 3.4 } },
          { name: 'Jason Terry', positions: ['G'], rating: 84, stats: { pts: 16.0, reb: 2.7, ast: 3.5 } },
          { name: 'Josh Howard', positions: ['F'], rating: 82, stats: { pts: 16.9, reb: 6.6, ast: 1.8 } },
        ],
      },
      2010: {
        players: [
          { name: 'Dirk Nowitzki', positions: ['F'], rating: 92, stats: { pts: 20.5, reb: 6.4, ast: 2.4 } },
          { name: 'Luka Dončić', positions: ['G'], rating: 85, stats: { pts: 21.2, reb: 7.8, ast: 6.0 } },
          { name: 'Tyson Chandler', positions: ['C'], rating: 83, stats: { pts: 10.0, reb: 10.3, ast: 0.9 } },
          { name: 'Jason Kidd', positions: ['G'], rating: 82, stats: { pts: 7.9, reb: 4.4, ast: 6.6 } },
          { name: 'Monta Ellis', positions: ['G'], rating: 81, stats: { pts: 19.0, reb: 3.5, ast: 4.9 } },
        ],
      },
      2020: {
        players: [
          { name: 'Luka Dončić', positions: ['G'], rating: 97, stats: { pts: 30.5, reb: 8.9, ast: 8.6 } },
          { name: 'Anthony Davis', positions: ['F', 'C'], rating: 92, stats: { pts: 20.0, reb: 10.4, ast: 4.4 } },
          { name: 'Kyrie Irving', positions: ['G'], rating: 89, stats: { pts: 25.6, reb: 4.9, ast: 5.4 } },
          { name: 'Kristaps Porziņģis', positions: ['C'], rating: 84, stats: { pts: 19.6, reb: 8.3, ast: 1.9 } },
          { name: 'Jalen Brunson', positions: ['G'], rating: 82, stats: { pts: 16.3, reb: 3.5, ast: 4.8 } },
          { name: 'Dereck Lively II', positions: ['C'], rating: 79, stats: { pts: 8.4, reb: 7.5, ast: 1.5 } },
        ],
      },
    },
  },
  {
    id: 'DEN',
    name: 'Denver Nuggets',
    color: '#FEC524',
    eras: {
      1980: {
        players: [
          { name: 'Alex English', positions: ['F'], rating: 90, stats: { pts: 25.9, reb: 5.6, ast: 4.4 } },
          { name: 'Kiki Vandeweghe', positions: ['F'], rating: 86, stats: { pts: 26.7, reb: 5.0, ast: 3.0 } },
          { name: 'Fat Lever', positions: ['G'], rating: 85, stats: { pts: 18.3, reb: 8.4, ast: 7.6 } },
          { name: 'Dan Issel', positions: ['C'], rating: 84, stats: { pts: 19.8, reb: 7.5, ast: 2.1 } },
          { name: 'Michael Adams', positions: ['G'], rating: 79, stats: { pts: 13.0, reb: 2.5, ast: 5.2 } },
        ],
      },
      1990: {
        players: [
          { name: 'Dikembe Mutombo', positions: ['C'], rating: 87, stats: { pts: 13.8, reb: 12.3, ast: 1.8 } },
          { name: 'Antonio McDyess', positions: ['F'], rating: 84, stats: { pts: 18.6, reb: 9.1, ast: 1.6 } },
          { name: 'Mahmoud Abdul-Rauf', positions: ['G'], rating: 82, stats: { pts: 18.6, reb: 2.3, ast: 4.8 } },
          { name: 'Nick Van Exel', positions: ['G'], rating: 81, stats: { pts: 19.3, reb: 3.1, ast: 8.5 } },
          { name: 'LaPhonso Ellis', positions: ['F'], rating: 80, stats: { pts: 15.2, reb: 7.5, ast: 2.2 } },
        ],
      },
      2000: {
        players: [
          { name: 'Carmelo Anthony', positions: ['F'], rating: 91, stats: { pts: 25.2, reb: 6.4, ast: 3.0 } },
          { name: 'Allen Iverson', positions: ['G'], rating: 89, stats: { pts: 25.9, reb: 3.0, ast: 7.0 } },
          { name: 'Chauncey Billups', positions: ['G'], rating: 87, stats: { pts: 17.6, reb: 3.3, ast: 6.1 } },
          { name: 'Marcus Camby', positions: ['C'], rating: 84, stats: { pts: 11.5, reb: 10.8, ast: 2.6 } },
          { name: 'Nenê', positions: ['C'], rating: 79, stats: { pts: 12.6, reb: 7.4, ast: 2.0 } },
        ],
      },
      2010: {
        players: [
          { name: 'Nikola Jokić', positions: ['C'], rating: 92, stats: { pts: 18.4, reb: 9.9, ast: 5.8 } },
          { name: 'Carmelo Anthony', positions: ['F'], rating: 88, stats: { pts: 26.2, reb: 7.0, ast: 3.0 } },
          { name: 'Jamal Murray', positions: ['G'], rating: 84, stats: { pts: 17.6, reb: 4.2, ast: 4.6 } },
          { name: 'Ty Lawson', positions: ['G'], rating: 82, stats: { pts: 16.2, reb: 3.2, ast: 7.0 } },
          { name: 'Danilo Gallinari', positions: ['F'], rating: 82, stats: { pts: 15.9, reb: 5.6, ast: 2.4 } },
        ],
      },
      2020: {
        players: [
          { name: 'Nikola Jokić', positions: ['C'], rating: 99, stats: { pts: 26.0, reb: 12.6, ast: 9.6 } },
          { name: 'Jamal Murray', positions: ['G'], rating: 88, stats: { pts: 20.6, reb: 4.0, ast: 6.2 } },
          { name: 'Michael Porter Jr.', positions: ['F'], rating: 83, stats: { pts: 16.6, reb: 6.6, ast: 1.3 } },
          { name: 'Aaron Gordon', positions: ['F'], rating: 82, stats: { pts: 13.7, reb: 6.0, ast: 2.9 } },
          { name: 'Kentavious Caldwell-Pope', positions: ['G'], rating: 78, stats: { pts: 10.3, reb: 2.6, ast: 2.2 } },
        ],
      },
    },
  },
  {
    id: 'DET',
    name: 'Detroit Pistons',
    color: '#C8102E',
    eras: {
      1980: {
        players: [
          { name: 'Isiah Thomas', positions: ['G'], rating: 94, stats: { pts: 19.4, reb: 3.7, ast: 9.6 } },
          { name: 'Adrian Dantley', positions: ['F'], rating: 87, stats: { pts: 20.3, reb: 4.9, ast: 2.9 } },
          { name: 'Joe Dumars', positions: ['G'], rating: 85, stats: { pts: 15.6, reb: 2.5, ast: 5.0 } },
          { name: 'Bill Laimbeer', positions: ['C'], rating: 85, stats: { pts: 14.0, reb: 10.6, ast: 2.1 } },
          { name: 'Dennis Rodman', positions: ['F'], rating: 82, stats: { pts: 8.0, reb: 9.3, ast: 1.3 } },
        ],
      },
      1990: {
        players: [
          { name: 'Grant Hill', positions: ['F'], rating: 91, stats: { pts: 21.6, reb: 7.9, ast: 6.3 } },
          { name: 'Isiah Thomas', positions: ['G'], rating: 88, stats: { pts: 16.6, reb: 3.0, ast: 7.4 } },
          { name: 'Joe Dumars', positions: ['G'], rating: 86, stats: { pts: 17.9, reb: 2.4, ast: 4.1 } },
          { name: 'Dennis Rodman', positions: ['F'], rating: 85, stats: { pts: 7.3, reb: 16.5, ast: 2.3 } },
          { name: 'Allan Houston', positions: ['G'], rating: 80, stats: { pts: 12.6, reb: 3.1, ast: 2.2 } },
        ],
      },
      2000: {
        players: [
          { name: 'Chauncey Billups', positions: ['G'], rating: 88, stats: { pts: 17.3, reb: 3.4, ast: 6.0 } },
          { name: 'Ben Wallace', positions: ['C'], rating: 87, stats: { pts: 9.0, reb: 11.7, ast: 1.6 } },
          { name: 'Rasheed Wallace', positions: ['F', 'C'], rating: 86, stats: { pts: 14.5, reb: 7.3, ast: 1.9 } },
          { name: 'Richard Hamilton', positions: ['G'], rating: 85, stats: { pts: 18.9, reb: 3.4, ast: 3.8 } },
          { name: 'Tayshaun Prince', positions: ['F'], rating: 81, stats: { pts: 13.4, reb: 4.8, ast: 2.6 } },
        ],
      },
      2010: {
        players: [
          { name: 'Blake Griffin', positions: ['F'], rating: 86, stats: { pts: 20.8, reb: 7.0, ast: 5.2 } },
          { name: 'Andre Drummond', positions: ['C'], rating: 85, stats: { pts: 14.6, reb: 14.2, ast: 1.2 } },
          { name: 'Reggie Jackson', positions: ['G'], rating: 80, stats: { pts: 15.6, reb: 3.3, ast: 5.8 } },
          { name: 'Greg Monroe', positions: ['C'], rating: 80, stats: { pts: 15.6, reb: 9.2, ast: 2.2 } },
          { name: 'Tobias Harris', positions: ['F'], rating: 80, stats: { pts: 17.0, reb: 6.4, ast: 2.0 } },
        ],
      },
      2020: {
        players: [
          { name: 'Cade Cunningham', positions: ['G'], rating: 89, stats: { pts: 22.0, reb: 5.6, ast: 7.6 } },
          { name: 'Jerami Grant', positions: ['F'], rating: 82, stats: { pts: 20.6, reb: 4.0, ast: 2.6 } },
          { name: 'Jalen Duren', positions: ['C'], rating: 81, stats: { pts: 11.6, reb: 9.9, ast: 1.8 } },
          { name: 'Jaden Ivey', positions: ['G'], rating: 79, stats: { pts: 16.1, reb: 4.2, ast: 4.4 } },
          { name: 'Ausar Thompson', positions: ['F'], rating: 78, stats: { pts: 10.6, reb: 6.5, ast: 2.0 } },
        ],
      },
    },
  },
  {
    id: 'GSW',
    name: 'Golden State Warriors',
    color: '#1D428A',
    eras: {
      1980: {
        players: [
          { name: 'Chris Mullin', positions: ['F'], rating: 87, stats: { pts: 20.7, reb: 4.1, ast: 3.6 } },
          { name: 'Mitch Richmond', positions: ['G'], rating: 84, stats: { pts: 22.8, reb: 5.8, ast: 4.2 } },
          { name: 'Joe Barry Carroll', positions: ['C'], rating: 81, stats: { pts: 21.0, reb: 8.4, ast: 1.8 } },
          { name: 'Sleepy Floyd', positions: ['G'], rating: 81, stats: { pts: 16.7, reb: 3.3, ast: 6.4 } },
          { name: 'Purvis Short', positions: ['F'], rating: 80, stats: { pts: 17.5, reb: 4.4, ast: 2.6 } },
        ],
      },
      1990: {
        players: [
          { name: 'Chris Mullin', positions: ['F'], rating: 89, stats: { pts: 22.6, reb: 5.0, ast: 3.5 } },
          { name: 'Tim Hardaway', positions: ['G'], rating: 89, stats: { pts: 22.9, reb: 3.9, ast: 9.3 } },
          { name: 'Latrell Sprewell', positions: ['G'], rating: 86, stats: { pts: 21.0, reb: 4.4, ast: 4.0 } },
          { name: 'Mitch Richmond', positions: ['G'], rating: 86, stats: { pts: 22.4, reb: 4.3, ast: 3.4 } },
          { name: 'Chris Webber', positions: ['F'], rating: 85, stats: { pts: 17.5, reb: 9.1, ast: 3.6 } },
        ],
      },
      2000: {
        players: [
          { name: 'Baron Davis', positions: ['G'], rating: 87, stats: { pts: 20.1, reb: 4.4, ast: 8.4 } },
          { name: 'Monta Ellis', positions: ['G'], rating: 84, stats: { pts: 19.0, reb: 4.1, ast: 4.0 } },
          { name: 'Antawn Jamison', positions: ['F'], rating: 84, stats: { pts: 20.6, reb: 8.0, ast: 1.9 } },
          { name: 'Stephen Jackson', positions: ['G', 'F'], rating: 82, stats: { pts: 19.5, reb: 4.4, ast: 4.7 } },
          { name: 'Jason Richardson', positions: ['G'], rating: 82, stats: { pts: 18.6, reb: 5.4, ast: 2.6 } },
        ],
      },
      2010: {
        players: [
          { name: 'Stephen Curry', positions: ['G'], rating: 98, stats: { pts: 24.4, reb: 4.6, ast: 6.6 } },
          { name: 'Kevin Durant', positions: ['F'], rating: 97, stats: { pts: 25.8, reb: 7.1, ast: 5.4 } },
          { name: 'Klay Thompson', positions: ['G'], rating: 89, stats: { pts: 20.0, reb: 3.6, ast: 2.4 } },
          { name: 'Draymond Green', positions: ['F'], rating: 87, stats: { pts: 9.5, reb: 7.6, ast: 6.6 } },
          { name: 'Andre Iguodala', positions: ['G', 'F'], rating: 80, stats: { pts: 7.3, reb: 4.0, ast: 3.3 } },
        ],
      },
      2020: {
        players: [
          { name: 'Stephen Curry', positions: ['G'], rating: 96, stats: { pts: 25.9, reb: 4.9, ast: 5.6 } },
          { name: 'Jimmy Butler', positions: ['F'], rating: 86, stats: { pts: 17.5, reb: 4.9, ast: 5.5 } },
          { name: 'Klay Thompson', positions: ['G'], rating: 84, stats: { pts: 18.6, reb: 3.6, ast: 2.2 } },
          { name: 'Draymond Green', positions: ['F'], rating: 84, stats: { pts: 8.6, reb: 7.2, ast: 6.4 } },
          { name: 'Andrew Wiggins', positions: ['F'], rating: 81, stats: { pts: 16.2, reb: 4.8, ast: 2.2 } },
        ],
      },
    },
  },
  {
    id: 'HOU',
    name: 'Houston Rockets',
    color: '#CE1141',
    eras: {
      1980: {
        players: [
          { name: 'Hakeem Olajuwon', positions: ['C'], rating: 94, stats: { pts: 22.8, reb: 11.8, ast: 2.0 } },
          { name: 'Moses Malone', positions: ['C'], rating: 93, stats: { pts: 27.8, reb: 15.0, ast: 1.6 } },
          { name: 'Ralph Sampson', positions: ['C'], rating: 87, stats: { pts: 19.5, reb: 10.7, ast: 3.2 } },
          { name: 'Rodney McCray', positions: ['F'], rating: 79, stats: { pts: 11.4, reb: 6.6, ast: 3.7 } },
          { name: 'Robert Reid', positions: ['F'], rating: 77, stats: { pts: 12.4, reb: 4.2, ast: 4.8 } },
          { name: 'Lewis Lloyd', positions: ['G'], rating: 77, stats: { pts: 13.0, reb: 2.8, ast: 3.4 } },
        ],
      },
      1990: {
        players: [
          { name: 'Hakeem Olajuwon', positions: ['C'], rating: 98, stats: { pts: 24.5, reb: 11.6, ast: 3.0 } },
          { name: 'Clyde Drexler', positions: ['G'], rating: 90, stats: { pts: 19.0, reb: 6.2, ast: 4.6 } },
          { name: 'Charles Barkley', positions: ['F'], rating: 86, stats: { pts: 16.5, reb: 11.6, ast: 3.6 } },
          { name: 'Otis Thorpe', positions: ['F'], rating: 82, stats: { pts: 14.5, reb: 9.4, ast: 2.4 } },
          { name: 'Kenny Smith', positions: ['G'], rating: 79, stats: { pts: 11.8, reb: 2.2, ast: 4.8 } },
          { name: 'Vernon Maxwell', positions: ['G'], rating: 78, stats: { pts: 13.6, reb: 3.1, ast: 3.6 } },
        ],
      },
      2000: {
        players: [
          { name: 'Tracy McGrady', positions: ['G', 'F'], rating: 93, stats: { pts: 22.7, reb: 5.9, ast: 5.4 } },
          { name: 'Yao Ming', positions: ['C'], rating: 91, stats: { pts: 19.0, reb: 9.2, ast: 1.6 } },
          { name: 'Steve Francis', positions: ['G'], rating: 86, stats: { pts: 19.5, reb: 6.2, ast: 6.2 } },
          { name: 'Cuttino Mobley', positions: ['G'], rating: 80, stats: { pts: 15.0, reb: 4.4, ast: 2.6 } },
          { name: 'Shane Battier', positions: ['F'], rating: 79, stats: { pts: 10.0, reb: 4.4, ast: 1.6 } },
        ],
      },
      2010: {
        players: [
          { name: 'James Harden', positions: ['G'], rating: 96, stats: { pts: 29.6, reb: 6.0, ast: 7.7 } },
          { name: 'Chris Paul', positions: ['G'], rating: 91, stats: { pts: 15.6, reb: 4.7, ast: 7.9 } },
          { name: 'Dwight Howard', positions: ['C'], rating: 87, stats: { pts: 17.2, reb: 12.6, ast: 1.3 } },
          { name: 'Clint Capela', positions: ['C'], rating: 82, stats: { pts: 12.4, reb: 11.6, ast: 1.0 } },
          { name: 'Kevin Martin', positions: ['G'], rating: 82, stats: { pts: 21.4, reb: 3.2, ast: 2.5 } },
        ],
      },
      2020: {
        players: [
          { name: 'Kevin Durant', positions: ['F'], rating: 92, stats: { pts: 26.2, reb: 6.0, ast: 4.2 } },
          { name: 'Alperen Şengün', positions: ['C'], rating: 86, stats: { pts: 19.6, reb: 10.0, ast: 5.3 } },
          { name: 'Russell Westbrook', positions: ['G'], rating: 85, stats: { pts: 22.2, reb: 10.7, ast: 9.6 } },
          { name: 'Fred VanVleet', positions: ['G'], rating: 82, stats: { pts: 17.0, reb: 3.8, ast: 7.7 } },
          { name: 'Amen Thompson', positions: ['F'], rating: 82, stats: { pts: 12.8, reb: 7.4, ast: 3.5 } },
          { name: 'Jalen Green', positions: ['G'], rating: 81, stats: { pts: 18.6, reb: 4.8, ast: 3.6 } },
        ],
      },
    },
  },
  {
    id: 'IND',
    name: 'Indiana Pacers',
    color: '#FDBB30',
    eras: {
      1980: {
        players: [
          { name: 'Chuck Person', positions: ['F'], rating: 84, stats: { pts: 20.5, reb: 7.0, ast: 3.4 } },
          { name: 'Reggie Miller', positions: ['G'], rating: 84, stats: { pts: 19.0, reb: 3.2, ast: 3.0 } },
          { name: 'Herb Williams', positions: ['C'], rating: 78, stats: { pts: 16.0, reb: 8.0, ast: 2.0 } },
          { name: 'Clark Kellogg', positions: ['F'], rating: 78, stats: { pts: 18.9, reb: 10.0, ast: 3.4 } },
          { name: 'Vern Fleming', positions: ['G'], rating: 77, stats: { pts: 12.1, reb: 3.3, ast: 5.6 } },
        ],
      },
      1990: {
        players: [
          { name: 'Reggie Miller', positions: ['G'], rating: 91, stats: { pts: 20.3, reb: 3.1, ast: 3.0 } },
          { name: 'Rik Smits', positions: ['C'], rating: 84, stats: { pts: 15.3, reb: 6.5, ast: 1.7 } },
          { name: 'Detlef Schrempf', positions: ['F'], rating: 84, stats: { pts: 17.8, reb: 8.6, ast: 4.1 } },
          { name: 'Mark Jackson', positions: ['G'], rating: 81, stats: { pts: 9.0, reb: 4.2, ast: 8.4 } },
          { name: 'Jalen Rose', positions: ['G', 'F'], rating: 80, stats: { pts: 12.8, reb: 4.0, ast: 3.4 } },
          { name: 'Dale Davis', positions: ['F'], rating: 79, stats: { pts: 10.6, reb: 9.6, ast: 0.9 } },
        ],
      },
      2000: {
        players: [
          { name: "Jermaine O'Neal", positions: ['F', 'C'], rating: 89, stats: { pts: 17.8, reb: 9.8, ast: 2.0 } },
          { name: 'Ron Artest', positions: ['F'], rating: 86, stats: { pts: 17.9, reb: 5.0, ast: 3.1 } },
          { name: 'Danny Granger', positions: ['F'], rating: 85, stats: { pts: 19.6, reb: 5.6, ast: 2.0 } },
          { name: 'Reggie Miller', positions: ['G'], rating: 84, stats: { pts: 14.0, reb: 2.8, ast: 2.6 } },
          { name: 'Jalen Rose', positions: ['G', 'F'], rating: 83, stats: { pts: 18.2, reb: 4.6, ast: 4.6 } },
        ],
      },
      2010: {
        players: [
          { name: 'Paul George', positions: ['F'], rating: 90, stats: { pts: 18.6, reb: 6.6, ast: 3.3 } },
          { name: 'Victor Oladipo', positions: ['G'], rating: 87, stats: { pts: 21.0, reb: 5.4, ast: 4.1 } },
          { name: 'Roy Hibbert', positions: ['C'], rating: 82, stats: { pts: 11.5, reb: 7.4, ast: 1.3 } },
          { name: 'David West', positions: ['F'], rating: 82, stats: { pts: 13.0, reb: 7.0, ast: 2.3 } },
          { name: 'Domantas Sabonis', positions: ['C'], rating: 82, stats: { pts: 16.5, reb: 11.6, ast: 3.6 } },
          { name: 'George Hill', positions: ['G'], rating: 80, stats: { pts: 12.6, reb: 3.6, ast: 3.9 } },
        ],
      },
      2020: {
        players: [
          { name: 'Tyrese Haliburton', positions: ['G'], rating: 89, stats: { pts: 17.8, reb: 4.0, ast: 9.7 } },
          { name: 'Pascal Siakam', positions: ['F'], rating: 87, stats: { pts: 20.6, reb: 7.0, ast: 3.6 } },
          { name: 'Domantas Sabonis', positions: ['C'], rating: 85, stats: { pts: 19.4, reb: 12.3, ast: 5.6 } },
          { name: 'Myles Turner', positions: ['C'], rating: 82, stats: { pts: 15.3, reb: 7.0, ast: 1.4 } },
          { name: 'Andrew Nembhard', positions: ['G'], rating: 79, stats: { pts: 10.1, reb: 3.0, ast: 4.5 } },
        ],
      },
    },
  },
  {
    id: 'LAC',
    name: 'LA Clippers',
    color: '#C8102E',
    eras: {
      1980: {
        players: [
          { name: 'Terry Cummings', positions: ['F'], rating: 84, stats: { pts: 21.6, reb: 9.4, ast: 2.4 } },
          { name: 'Marques Johnson', positions: ['F'], rating: 84, stats: { pts: 18.2, reb: 5.8, ast: 4.3 } },
          { name: 'Norm Nixon', positions: ['G'], rating: 82, stats: { pts: 15.4, reb: 2.5, ast: 8.0 } },
          { name: 'Benoit Benjamin', positions: ['C'], rating: 76, stats: { pts: 13.5, reb: 8.0, ast: 1.5 } },
          { name: 'Danny Manning', positions: ['F'], rating: 76, stats: { pts: 18.0, reb: 6.8, ast: 2.5 } },
        ],
      },
      1990: {
        players: [
          { name: 'Danny Manning', positions: ['F'], rating: 86, stats: { pts: 21.0, reb: 6.6, ast: 3.4 } },
          { name: 'Ron Harper', positions: ['G'], rating: 83, stats: { pts: 19.5, reb: 5.2, ast: 4.8 } },
          { name: 'Loy Vaught', positions: ['F'], rating: 78, stats: { pts: 14.9, reb: 9.5, ast: 1.4 } },
          { name: 'Maurice Taylor', positions: ['F'], rating: 76, stats: { pts: 13.7, reb: 5.0, ast: 1.0 } },
          { name: 'Lamond Murray', positions: ['F'], rating: 75, stats: { pts: 12.8, reb: 4.2, ast: 1.6 } },
        ],
      },
      2000: {
        players: [
          { name: 'Elton Brand', positions: ['F'], rating: 88, stats: { pts: 20.8, reb: 10.8, ast: 2.5 } },
          { name: 'Corey Maggette', positions: ['F'], rating: 83, stats: { pts: 18.6, reb: 5.2, ast: 2.4 } },
          { name: 'Lamar Odom', positions: ['F'], rating: 82, stats: { pts: 16.6, reb: 7.8, ast: 4.6 } },
          { name: 'Sam Cassell', positions: ['G'], rating: 82, stats: { pts: 17.6, reb: 3.3, ast: 4.7 } },
          { name: 'Chris Kaman', positions: ['C'], rating: 80, stats: { pts: 11.5, reb: 8.8, ast: 1.3 } },
        ],
      },
      2010: {
        players: [
          { name: 'Chris Paul', positions: ['G'], rating: 93, stats: { pts: 18.8, reb: 4.4, ast: 9.8 } },
          { name: 'Kawhi Leonard', positions: ['F'], rating: 92, stats: { pts: 27.1, reb: 7.3, ast: 4.1 } },
          { name: 'Blake Griffin', positions: ['F'], rating: 90, stats: { pts: 21.6, reb: 9.3, ast: 4.2 } },
          { name: 'DeAndre Jordan', positions: ['C'], rating: 85, stats: { pts: 10.0, reb: 13.0, ast: 0.8 } },
          { name: 'Lou Williams', positions: ['G'], rating: 80, stats: { pts: 19.2, reb: 2.6, ast: 5.0 } },
          { name: 'J.J. Redick', positions: ['G'], rating: 79, stats: { pts: 14.9, reb: 2.2, ast: 1.6 } },
        ],
      },
      2020: {
        players: [
          { name: 'Kawhi Leonard', positions: ['F'], rating: 93, stats: { pts: 25.3, reb: 6.5, ast: 4.0 } },
          { name: 'Paul George', positions: ['F'], rating: 89, stats: { pts: 23.0, reb: 5.6, ast: 5.0 } },
          { name: 'James Harden', positions: ['G'], rating: 87, stats: { pts: 18.6, reb: 5.5, ast: 8.5 } },
          { name: 'Ivica Zubac', positions: ['C'], rating: 82, stats: { pts: 10.8, reb: 9.7, ast: 1.4 } },
          { name: 'Norman Powell', positions: ['G'], rating: 81, stats: { pts: 18.6, reb: 3.2, ast: 1.8 } },
        ],
      },
    },
  },
  {
    id: 'LAL',
    name: 'Los Angeles Lakers',
    color: '#552583',
    eras: {
      1980: {
        players: [
          { name: 'Magic Johnson', positions: ['G'], rating: 98, stats: { pts: 19.5, reb: 7.2, ast: 11.3 } },
          { name: 'Kareem Abdul-Jabbar', positions: ['C'], rating: 95, stats: { pts: 21.0, reb: 7.6, ast: 2.8 } },
          { name: 'James Worthy', positions: ['F'], rating: 89, stats: { pts: 19.0, reb: 5.2, ast: 3.0 } },
          { name: 'Byron Scott', positions: ['G'], rating: 82, stats: { pts: 15.2, reb: 3.0, ast: 2.6 } },
          { name: 'A.C. Green', positions: ['F'], rating: 79, stats: { pts: 9.2, reb: 7.8, ast: 1.0 } },
          { name: 'Michael Cooper', positions: ['G'], rating: 78, stats: { pts: 8.6, reb: 3.0, ast: 3.6 } },
        ],
      },
      1990: {
        players: [
          { name: "Shaquille O'Neal", positions: ['C'], rating: 95, stats: { pts: 27.2, reb: 12.3, ast: 2.9 } },
          { name: 'Magic Johnson', positions: ['G'], rating: 93, stats: { pts: 15.0, reb: 5.7, ast: 7.0 } },
          { name: 'Kobe Bryant', positions: ['G'], rating: 86, stats: { pts: 14.4, reb: 3.5, ast: 2.4 } },
          { name: 'Eddie Jones', positions: ['G'], rating: 83, stats: { pts: 13.6, reb: 3.6, ast: 2.7 } },
          { name: 'Nick Van Exel', positions: ['G'], rating: 83, stats: { pts: 15.8, reb: 2.6, ast: 7.4 } },
          { name: 'Vlade Divac', positions: ['C'], rating: 82, stats: { pts: 11.4, reb: 8.4, ast: 3.2 } },
        ],
      },
      2000: {
        players: [
          { name: "Shaquille O'Neal", positions: ['C'], rating: 98, stats: { pts: 27.3, reb: 12.0, ast: 3.0 } },
          { name: 'Kobe Bryant', positions: ['G'], rating: 97, stats: { pts: 27.6, reb: 5.7, ast: 4.9 } },
          { name: 'Pau Gasol', positions: ['F', 'C'], rating: 89, stats: { pts: 17.7, reb: 9.9, ast: 3.5 } },
          { name: 'Lamar Odom', positions: ['F'], rating: 82, stats: { pts: 13.6, reb: 9.6, ast: 3.3 } },
          { name: 'Andrew Bynum', positions: ['C'], rating: 81, stats: { pts: 13.1, reb: 8.8, ast: 1.1 } },
          { name: 'Derek Fisher', positions: ['G'], rating: 76, stats: { pts: 9.4, reb: 2.3, ast: 3.0 } },
        ],
      },
      2010: {
        players: [
          { name: 'Kobe Bryant', positions: ['G'], rating: 93, stats: { pts: 23.0, reb: 4.7, ast: 4.8 } },
          { name: 'LeBron James', positions: ['F'], rating: 93, stats: { pts: 26.5, reb: 8.0, ast: 8.2 } },
          { name: 'Pau Gasol', positions: ['F', 'C'], rating: 88, stats: { pts: 17.4, reb: 10.0, ast: 3.4 } },
          { name: 'Dwight Howard', positions: ['C'], rating: 85, stats: { pts: 17.1, reb: 12.4, ast: 1.4 } },
          { name: 'Lamar Odom', positions: ['F'], rating: 82, stats: { pts: 14.2, reb: 8.7, ast: 3.0 } },
        ],
      },
      2020: {
        players: [
          { name: 'LeBron James', positions: ['F'], rating: 95, stats: { pts: 26.0, reb: 7.8, ast: 8.0 } },
          { name: 'Luka Dončić', positions: ['G'], rating: 95, stats: { pts: 28.2, reb: 8.2, ast: 7.7 } },
          { name: 'Anthony Davis', positions: ['F', 'C'], rating: 93, stats: { pts: 25.2, reb: 11.6, ast: 3.0 } },
          { name: 'Austin Reaves', positions: ['G'], rating: 82, stats: { pts: 14.4, reb: 4.1, ast: 4.6 } },
          { name: 'Russell Westbrook', positions: ['G'], rating: 79, stats: { pts: 15.5, reb: 6.8, ast: 7.3 } },
        ],
      },
    },
  },
  {
    id: 'MEM',
    name: 'Memphis Grizzlies',
    color: '#5D76A9',
    eras: {
      1990: {
        label: 'Vancouver Grizzlies',
        players: [
          { name: 'Shareef Abdur-Rahim', positions: ['F'], rating: 85, stats: { pts: 19.8, reb: 7.2, ast: 3.1 } },
          { name: 'Mike Bibby', positions: ['G'], rating: 80, stats: { pts: 13.2, reb: 2.7, ast: 6.5 } },
          { name: 'Bryant Reeves', positions: ['C'], rating: 78, stats: { pts: 12.5, reb: 7.4, ast: 1.4 } },
          { name: 'Blue Edwards', positions: ['G'], rating: 73, stats: { pts: 13.0, reb: 4.0, ast: 3.0 } },
        ],
      },
      2000: {
        players: [
          { name: 'Pau Gasol', positions: ['F', 'C'], rating: 88, stats: { pts: 18.8, reb: 8.6, ast: 2.5 } },
          { name: 'Rudy Gay', positions: ['F'], rating: 83, stats: { pts: 17.2, reb: 5.6, ast: 2.0 } },
          { name: 'Mike Miller', positions: ['F'], rating: 80, stats: { pts: 13.8, reb: 4.6, ast: 3.5 } },
          { name: 'Shane Battier', positions: ['F'], rating: 79, stats: { pts: 10.0, reb: 5.0, ast: 1.6 } },
          { name: 'Jason Williams', positions: ['G'], rating: 78, stats: { pts: 11.8, reb: 2.7, ast: 7.0 } },
        ],
      },
      2010: {
        players: [
          { name: 'Marc Gasol', positions: ['C'], rating: 88, stats: { pts: 15.7, reb: 7.7, ast: 3.4 } },
          { name: 'Zach Randolph', positions: ['F'], rating: 86, stats: { pts: 17.0, reb: 10.6, ast: 1.8 } },
          { name: 'Mike Conley', positions: ['G'], rating: 85, stats: { pts: 14.6, reb: 2.9, ast: 5.6 } },
          { name: 'Rudy Gay', positions: ['F'], rating: 82, stats: { pts: 18.6, reb: 5.8, ast: 2.4 } },
          { name: 'Tony Allen', positions: ['G'], rating: 78, stats: { pts: 9.0, reb: 4.4, ast: 1.5 } },
        ],
      },
      2020: {
        players: [
          { name: 'Ja Morant', positions: ['G'], rating: 91, stats: { pts: 23.6, reb: 5.4, ast: 7.3 } },
          { name: 'Jaren Jackson Jr.', positions: ['F', 'C'], rating: 86, stats: { pts: 18.0, reb: 6.4, ast: 1.4 } },
          { name: 'Desmond Bane', positions: ['G'], rating: 84, stats: { pts: 18.3, reb: 4.3, ast: 3.7 } },
          { name: 'Dillon Brooks', positions: ['F'], rating: 78, stats: { pts: 12.4, reb: 3.2, ast: 1.9 } },
          { name: 'Steven Adams', positions: ['C'], rating: 78, stats: { pts: 8.6, reb: 11.5, ast: 2.4 } },
        ],
      },
    },
  },
  {
    id: 'MIA',
    name: 'Miami Heat',
    color: '#98002E',
    eras: {
      1980: {
        players: [
          { name: 'Rony Seikaly', positions: ['C'], rating: 77, stats: { pts: 12.9, reb: 10.3, ast: 1.1 } },
          { name: 'Glen Rice', positions: ['F'], rating: 76, stats: { pts: 13.6, reb: 4.8, ast: 1.8 } },
          { name: 'Grant Long', positions: ['F'], rating: 74, stats: { pts: 11.8, reb: 6.7, ast: 1.8 } },
          { name: 'Kevin Edwards', positions: ['G'], rating: 74, stats: { pts: 11.5, reb: 3.2, ast: 4.0 } },
        ],
      },
      1990: {
        players: [
          { name: 'Alonzo Mourning', positions: ['C'], rating: 90, stats: { pts: 20.3, reb: 10.0, ast: 1.8 } },
          { name: 'Tim Hardaway', positions: ['G'], rating: 88, stats: { pts: 18.6, reb: 3.4, ast: 7.6 } },
          { name: 'Glen Rice', positions: ['F'], rating: 84, stats: { pts: 19.3, reb: 4.6, ast: 2.0 } },
          { name: 'Jamal Mashburn', positions: ['F'], rating: 82, stats: { pts: 16.5, reb: 6.4, ast: 3.4 } },
          { name: 'Rony Seikaly', positions: ['C'], rating: 80, stats: { pts: 16.6, reb: 10.4, ast: 1.4 } },
        ],
      },
      2000: {
        players: [
          { name: 'Dwyane Wade', positions: ['G'], rating: 95, stats: { pts: 25.6, reb: 5.1, ast: 6.6 } },
          { name: "Shaquille O'Neal", positions: ['C'], rating: 91, stats: { pts: 19.8, reb: 9.0, ast: 2.6 } },
          { name: 'Alonzo Mourning', positions: ['C'], rating: 84, stats: { pts: 13.6, reb: 7.0, ast: 1.6 } },
          { name: 'Eddie Jones', positions: ['G'], rating: 82, stats: { pts: 16.6, reb: 4.0, ast: 3.2 } },
          { name: 'Udonis Haslem', positions: ['F'], rating: 76, stats: { pts: 9.6, reb: 8.2, ast: 0.7 } },
        ],
      },
      2010: {
        players: [
          { name: 'LeBron James', positions: ['F'], rating: 98, stats: { pts: 26.9, reb: 7.6, ast: 6.7 } },
          { name: 'Dwyane Wade', positions: ['G'], rating: 93, stats: { pts: 22.0, reb: 5.0, ast: 4.6 } },
          { name: 'Chris Bosh', positions: ['F', 'C'], rating: 89, stats: { pts: 18.0, reb: 7.6, ast: 2.0 } },
          { name: 'Goran Dragić', positions: ['G'], rating: 82, stats: { pts: 17.0, reb: 3.6, ast: 5.4 } },
          { name: 'Hassan Whiteside', positions: ['C'], rating: 81, stats: { pts: 14.0, reb: 11.8, ast: 0.8 } },
        ],
      },
      2020: {
        players: [
          { name: 'Jimmy Butler', positions: ['F'], rating: 90, stats: { pts: 21.6, reb: 5.8, ast: 5.7 } },
          { name: 'Bam Adebayo', positions: ['C'], rating: 87, stats: { pts: 18.5, reb: 9.8, ast: 3.8 } },
          { name: 'Tyler Herro', positions: ['G'], rating: 85, stats: { pts: 18.2, reb: 5.0, ast: 3.6 } },
          { name: 'Kyle Lowry', positions: ['G'], rating: 80, stats: { pts: 12.0, reb: 4.5, ast: 6.0 } },
          { name: 'Duncan Robinson', positions: ['G'], rating: 76, stats: { pts: 12.4, reb: 3.0, ast: 1.7 } },
        ],
      },
    },
  },
  {
    id: 'MIL',
    name: 'Milwaukee Bucks',
    color: '#00471B',
    eras: {
      1980: {
        players: [
          { name: 'Sidney Moncrief', positions: ['G'], rating: 89, stats: { pts: 18.8, reb: 5.0, ast: 4.0 } },
          { name: 'Marques Johnson', positions: ['F'], rating: 87, stats: { pts: 22.4, reb: 7.2, ast: 3.6 } },
          { name: 'Terry Cummings', positions: ['F'], rating: 85, stats: { pts: 22.8, reb: 8.6, ast: 3.0 } },
          { name: 'Bob Lanier', positions: ['C'], rating: 84, stats: { pts: 17.6, reb: 6.2, ast: 3.2 } },
          { name: 'Jack Sikma', positions: ['C'], rating: 82, stats: { pts: 13.0, reb: 8.0, ast: 3.1 } },
          { name: 'Paul Pressey', positions: ['G'], rating: 80, stats: { pts: 13.7, reb: 5.2, ast: 6.5 } },
        ],
      },
      1990: {
        players: [
          { name: 'Ray Allen', positions: ['G'], rating: 87, stats: { pts: 18.5, reb: 4.4, ast: 3.6 } },
          { name: 'Glenn Robinson', positions: ['F'], rating: 85, stats: { pts: 21.6, reb: 6.4, ast: 2.6 } },
          { name: 'Vin Baker', positions: ['F'], rating: 85, stats: { pts: 19.4, reb: 9.6, ast: 2.1 } },
          { name: 'Sam Cassell', positions: ['G'], rating: 82, stats: { pts: 15.6, reb: 3.6, ast: 7.0 } },
          { name: 'Alvin Robertson', positions: ['G'], rating: 80, stats: { pts: 13.8, reb: 5.4, ast: 4.6 } },
        ],
      },
      2000: {
        players: [
          { name: 'Ray Allen', positions: ['G'], rating: 89, stats: { pts: 21.8, reb: 4.8, ast: 4.0 } },
          { name: 'Michael Redd', positions: ['G'], rating: 86, stats: { pts: 21.5, reb: 4.6, ast: 2.3 } },
          { name: 'Glenn Robinson', positions: ['F'], rating: 85, stats: { pts: 22.0, reb: 6.4, ast: 3.0 } },
          { name: 'Sam Cassell', positions: ['G'], rating: 85, stats: { pts: 19.0, reb: 3.8, ast: 7.4 } },
          { name: 'Andrew Bogut', positions: ['C'], rating: 81, stats: { pts: 11.4, reb: 9.2, ast: 2.6 } },
        ],
      },
      2010: {
        players: [
          { name: 'Giannis Antetokounmpo', positions: ['F'], rating: 96, stats: { pts: 21.6, reb: 9.4, ast: 4.9 } },
          { name: 'Khris Middleton', positions: ['F'], rating: 86, stats: { pts: 16.6, reb: 5.0, ast: 3.8 } },
          { name: 'Eric Bledsoe', positions: ['G'], rating: 82, stats: { pts: 17.4, reb: 4.4, ast: 5.2 } },
          { name: 'Brook Lopez', positions: ['C'], rating: 82, stats: { pts: 13.0, reb: 4.9, ast: 1.8 } },
          { name: 'Brandon Jennings', positions: ['G'], rating: 80, stats: { pts: 16.8, reb: 3.4, ast: 5.4 } },
        ],
      },
      2020: {
        players: [
          { name: 'Giannis Antetokounmpo', positions: ['F'], rating: 98, stats: { pts: 29.8, reb: 11.4, ast: 6.0 } },
          { name: 'Damian Lillard', positions: ['G'], rating: 90, stats: { pts: 17.2, reb: 5.2, ast: 4.8 } },
          { name: 'Khris Middleton', positions: ['F'], rating: 86, stats: { pts: 25.4, reb: 4.4, ast: 7.0 } },
          { name: 'Jrue Holiday', positions: ['G'], rating: 86, stats: { pts: 17.4, reb: 4.8, ast: 6.6 } },
          { name: 'Brook Lopez', positions: ['C'], rating: 83, stats: { pts: 13.8, reb: 5.6, ast: 1.3 } },
        ],
      },
    },
  },
  {
    id: 'MIN',
    name: 'Minnesota Timberwolves',
    color: '#236192',
    eras: {
      1980: {
        players: [
          { name: 'Tony Campbell', positions: ['F'], rating: 77, stats: { pts: 23.2, reb: 6.2, ast: 2.4 } },
          { name: 'Pooh Richardson', positions: ['G'], rating: 75, stats: { pts: 11.4, reb: 2.7, ast: 8.2 } },
          { name: 'Tyrone Corbin', positions: ['F'], rating: 74, stats: { pts: 18.2, reb: 7.2, ast: 3.0 } },
          { name: 'Sam Mitchell', positions: ['F'], rating: 72, stats: { pts: 12.7, reb: 5.3, ast: 1.2 } },
        ],
      },
      1990: {
        players: [
          { name: 'Kevin Garnett', positions: ['F'], rating: 92, stats: { pts: 18.6, reb: 9.6, ast: 3.4 } },
          { name: 'Stephon Marbury', positions: ['G'], rating: 84, stats: { pts: 17.6, reb: 3.0, ast: 8.0 } },
          { name: 'Tom Gugliotta', positions: ['F'], rating: 82, stats: { pts: 17.5, reb: 8.6, ast: 3.4 } },
          { name: 'Isaiah Rider', positions: ['G'], rating: 81, stats: { pts: 19.6, reb: 4.2, ast: 2.4 } },
          { name: 'Christian Laettner', positions: ['F', 'C'], rating: 80, stats: { pts: 17.0, reb: 8.5, ast: 2.6 } },
        ],
      },
      2000: {
        players: [
          { name: 'Kevin Garnett', positions: ['F'], rating: 97, stats: { pts: 23.2, reb: 13.3, ast: 5.0 } },
          { name: 'Sam Cassell', positions: ['G'], rating: 86, stats: { pts: 18.5, reb: 3.6, ast: 6.8 } },
          { name: 'Latrell Sprewell', positions: ['G'], rating: 83, stats: { pts: 17.0, reb: 4.1, ast: 3.4 } },
          { name: 'Al Jefferson', positions: ['C'], rating: 82, stats: { pts: 17.0, reb: 10.0, ast: 1.5 } },
          { name: 'Wally Szczerbiak', positions: ['F'], rating: 80, stats: { pts: 15.0, reb: 4.0, ast: 2.6 } },
        ],
      },
      2010: {
        players: [
          { name: 'Kevin Love', positions: ['F'], rating: 90, stats: { pts: 23.0, reb: 13.4, ast: 2.5 } },
          { name: 'Karl-Anthony Towns', positions: ['C'], rating: 89, stats: { pts: 22.6, reb: 11.6, ast: 2.6 } },
          { name: 'Jimmy Butler', positions: ['G', 'F'], rating: 88, stats: { pts: 22.2, reb: 5.3, ast: 4.9 } },
          { name: 'Andrew Wiggins', positions: ['F'], rating: 80, stats: { pts: 19.4, reb: 4.4, ast: 2.0 } },
          { name: 'Ricky Rubio', positions: ['G'], rating: 79, stats: { pts: 9.6, reb: 4.4, ast: 8.6 } },
        ],
      },
      2020: {
        players: [
          { name: 'Anthony Edwards', positions: ['G'], rating: 93, stats: { pts: 25.4, reb: 5.4, ast: 4.8 } },
          { name: 'Karl-Anthony Towns', positions: ['C'], rating: 87, stats: { pts: 23.6, reb: 9.6, ast: 4.4 } },
          { name: 'Rudy Gobert', positions: ['C'], rating: 86, stats: { pts: 13.6, reb: 12.6, ast: 1.4 } },
          { name: 'Julius Randle', positions: ['F'], rating: 83, stats: { pts: 17.6, reb: 6.6, ast: 4.5 } },
          { name: 'Jaden McDaniels', positions: ['F'], rating: 79, stats: { pts: 11.0, reb: 4.0, ast: 1.8 } },
          { name: 'Mike Conley', positions: ['G'], rating: 79, stats: { pts: 11.4, reb: 2.7, ast: 5.3 } },
        ],
      },
    },
  },
  {
    id: 'NOP',
    name: 'New Orleans Pelicans',
    color: '#85714D',
    eras: {
      2000: {
        label: 'New Orleans Hornets',
        players: [
          { name: 'Chris Paul', positions: ['G'], rating: 95, stats: { pts: 20.0, reb: 4.6, ast: 10.0 } },
          { name: 'David West', positions: ['F'], rating: 85, stats: { pts: 17.0, reb: 8.2, ast: 2.2 } },
          { name: 'Baron Davis', positions: ['G'], rating: 84, stats: { pts: 20.0, reb: 4.6, ast: 7.6 } },
          { name: 'Tyson Chandler', positions: ['C'], rating: 82, stats: { pts: 9.0, reb: 11.5, ast: 0.9 } },
          { name: 'Peja Stojaković', positions: ['F'], rating: 81, stats: { pts: 16.4, reb: 4.6, ast: 1.4 } },
        ],
      },
      2010: {
        players: [
          { name: 'Anthony Davis', positions: ['F', 'C'], rating: 95, stats: { pts: 24.0, reb: 10.7, ast: 2.2 } },
          { name: 'Chris Paul', positions: ['G'], rating: 93, stats: { pts: 18.0, reb: 4.0, ast: 9.4 } },
          { name: 'DeMarcus Cousins', positions: ['C'], rating: 89, stats: { pts: 27.0, reb: 12.9, ast: 5.0 } },
          { name: 'Jrue Holiday', positions: ['G'], rating: 85, stats: { pts: 17.0, reb: 4.2, ast: 6.8 } },
          { name: 'Eric Gordon', positions: ['G'], rating: 80, stats: { pts: 15.8, reb: 2.6, ast: 2.8 } },
        ],
      },
      2020: {
        players: [
          { name: 'Zion Williamson', positions: ['F'], rating: 89, stats: { pts: 25.1, reb: 7.0, ast: 4.4 } },
          { name: 'Brandon Ingram', positions: ['F'], rating: 86, stats: { pts: 22.8, reb: 5.3, ast: 5.4 } },
          { name: 'CJ McCollum', positions: ['G'], rating: 83, stats: { pts: 19.6, reb: 4.3, ast: 5.0 } },
          { name: 'Jonas Valančiūnas', positions: ['C'], rating: 80, stats: { pts: 14.1, reb: 10.6, ast: 2.0 } },
          { name: 'Trey Murphy III', positions: ['F'], rating: 80, stats: { pts: 17.0, reb: 4.6, ast: 2.0 } },
          { name: 'Herbert Jones', positions: ['F'], rating: 78, stats: { pts: 9.0, reb: 4.0, ast: 2.2 } },
        ],
      },
    },
  },
  {
    id: 'NYK',
    name: 'New York Knicks',
    color: '#F58426',
    eras: {
      1980: {
        players: [
          { name: 'Bernard King', positions: ['F'], rating: 92, stats: { pts: 32.9, reb: 5.8, ast: 3.5 } },
          { name: 'Patrick Ewing', positions: ['C'], rating: 90, stats: { pts: 21.9, reb: 9.3, ast: 1.7 } },
          { name: 'Mark Jackson', positions: ['G'], rating: 81, stats: { pts: 13.6, reb: 4.3, ast: 9.0 } },
          { name: 'Charles Oakley', positions: ['F'], rating: 81, stats: { pts: 12.2, reb: 12.6, ast: 2.6 } },
          { name: 'Bill Cartwright', positions: ['C'], rating: 80, stats: { pts: 16.2, reb: 7.3, ast: 1.4 } },
        ],
      },
      1990: {
        players: [
          { name: 'Patrick Ewing', positions: ['C'], rating: 93, stats: { pts: 23.4, reb: 10.8, ast: 2.2 } },
          { name: 'Allan Houston', positions: ['G'], rating: 83, stats: { pts: 18.0, reb: 3.4, ast: 2.6 } },
          { name: 'Latrell Sprewell', positions: ['G'], rating: 83, stats: { pts: 17.6, reb: 4.4, ast: 3.8 } },
          { name: 'John Starks', positions: ['G'], rating: 82, stats: { pts: 13.2, reb: 2.6, ast: 5.0 } },
          { name: 'Charles Oakley', positions: ['F'], rating: 82, stats: { pts: 10.6, reb: 9.6, ast: 2.2 } },
          { name: 'Larry Johnson', positions: ['F'], rating: 81, stats: { pts: 14.5, reb: 6.0, ast: 2.5 } },
        ],
      },
      2000: {
        players: [
          { name: 'Stephon Marbury', positions: ['G'], rating: 85, stats: { pts: 19.5, reb: 3.0, ast: 8.4 } },
          { name: 'Allan Houston', positions: ['G'], rating: 83, stats: { pts: 18.6, reb: 3.2, ast: 2.6 } },
          { name: 'Latrell Sprewell', positions: ['G'], rating: 82, stats: { pts: 18.0, reb: 4.4, ast: 3.4 } },
          { name: 'Zach Randolph', positions: ['F'], rating: 82, stats: { pts: 17.5, reb: 9.8, ast: 1.9 } },
          { name: 'Jamal Crawford', positions: ['G'], rating: 80, stats: { pts: 18.4, reb: 3.0, ast: 4.0 } },
          { name: 'David Lee', positions: ['F'], rating: 80, stats: { pts: 16.4, reb: 10.6, ast: 2.2 } },
        ],
      },
      2010: {
        players: [
          { name: 'Carmelo Anthony', positions: ['F'], rating: 91, stats: { pts: 24.7, reb: 6.6, ast: 3.2 } },
          { name: "Amar'e Stoudemire", positions: ['F', 'C'], rating: 88, stats: { pts: 20.6, reb: 8.8, ast: 1.4 } },
          { name: 'Tyson Chandler', positions: ['C'], rating: 84, stats: { pts: 10.0, reb: 9.9, ast: 1.0 } },
          { name: 'Kristaps Porziņģis', positions: ['F', 'C'], rating: 83, stats: { pts: 17.7, reb: 7.0, ast: 1.4 } },
          { name: 'J.R. Smith', positions: ['G'], rating: 79, stats: { pts: 13.6, reb: 3.6, ast: 2.6 } },
        ],
      },
      2020: {
        players: [
          { name: 'Jalen Brunson', positions: ['G'], rating: 92, stats: { pts: 26.4, reb: 3.6, ast: 7.0 } },
          { name: 'Karl-Anthony Towns', positions: ['C'], rating: 88, stats: { pts: 24.4, reb: 12.8, ast: 3.1 } },
          { name: 'Julius Randle', positions: ['F'], rating: 85, stats: { pts: 23.6, reb: 9.8, ast: 5.0 } },
          { name: 'OG Anunoby', positions: ['F'], rating: 83, stats: { pts: 14.6, reb: 4.6, ast: 1.8 } },
          { name: 'Mikal Bridges', positions: ['F'], rating: 82, stats: { pts: 18.6, reb: 3.3, ast: 3.4 } },
          { name: 'Josh Hart', positions: ['G'], rating: 80, stats: { pts: 10.2, reb: 9.0, ast: 4.6 } },
        ],
      },
    },
  },
  {
    id: 'OKC',
    name: 'Oklahoma City Thunder',
    color: '#007AC1',
    eras: {
      1980: {
        label: 'Seattle SuperSonics',
        players: [
          { name: 'Gus Williams', positions: ['G'], rating: 86, stats: { pts: 22.0, reb: 2.6, ast: 6.4 } },
          { name: 'Dale Ellis', positions: ['G'], rating: 86, stats: { pts: 23.6, reb: 5.6, ast: 1.6 } },
          { name: 'Tom Chambers', positions: ['F'], rating: 85, stats: { pts: 20.6, reb: 7.4, ast: 2.4 } },
          { name: 'Xavier McDaniel', positions: ['F'], rating: 84, stats: { pts: 21.4, reb: 7.8, ast: 2.6 } },
          { name: 'Jack Sikma', positions: ['C'], rating: 84, stats: { pts: 18.6, reb: 10.2, ast: 3.2 } },
        ],
      },
      1990: {
        label: 'Seattle SuperSonics',
        players: [
          { name: 'Gary Payton', positions: ['G'], rating: 94, stats: { pts: 18.8, reb: 4.2, ast: 7.5 } },
          { name: 'Shawn Kemp', positions: ['F'], rating: 91, stats: { pts: 17.6, reb: 9.8, ast: 2.0 } },
          { name: 'Detlef Schrempf', positions: ['F'], rating: 85, stats: { pts: 17.0, reb: 7.6, ast: 4.2 } },
          { name: 'Vin Baker', positions: ['F'], rating: 84, stats: { pts: 16.8, reb: 8.4, ast: 1.6 } },
          { name: 'Hersey Hawkins', positions: ['G'], rating: 81, stats: { pts: 14.2, reb: 3.6, ast: 2.6 } },
        ],
      },
      2000: {
        label: 'SuperSonics / Thunder',
        players: [
          { name: 'Ray Allen', positions: ['G'], rating: 90, stats: { pts: 24.6, reb: 4.6, ast: 3.8 } },
          { name: 'Gary Payton', positions: ['G'], rating: 88, stats: { pts: 19.6, reb: 4.4, ast: 8.0 } },
          { name: 'Kevin Durant', positions: ['F'], rating: 86, stats: { pts: 22.3, reb: 5.2, ast: 2.6 } },
          { name: 'Rashard Lewis', positions: ['F'], rating: 85, stats: { pts: 17.2, reb: 5.6, ast: 1.8 } },
          { name: 'Russell Westbrook', positions: ['G'], rating: 80, stats: { pts: 15.3, reb: 4.9, ast: 5.3 } },
        ],
      },
      2010: {
        players: [
          { name: 'Kevin Durant', positions: ['F'], rating: 97, stats: { pts: 28.0, reb: 7.4, ast: 3.8 } },
          { name: 'Russell Westbrook', positions: ['G'], rating: 95, stats: { pts: 23.4, reb: 7.6, ast: 8.6 } },
          { name: 'Paul George', positions: ['F'], rating: 91, stats: { pts: 22.8, reb: 6.6, ast: 3.4 } },
          { name: 'James Harden', positions: ['G'], rating: 87, stats: { pts: 14.8, reb: 3.2, ast: 3.4 } },
          { name: 'Serge Ibaka', positions: ['F', 'C'], rating: 84, stats: { pts: 12.6, reb: 7.8, ast: 0.9 } },
        ],
      },
      2020: {
        players: [
          { name: 'Shai Gilgeous-Alexander', positions: ['G'], rating: 98, stats: { pts: 28.6, reb: 5.2, ast: 6.0 } },
          { name: 'Jalen Williams', positions: ['F'], rating: 87, stats: { pts: 17.9, reb: 4.8, ast: 4.6 } },
          { name: 'Chet Holmgren', positions: ['C'], rating: 86, stats: { pts: 15.6, reb: 8.1, ast: 2.3 } },
          { name: 'Isaiah Hartenstein', positions: ['C'], rating: 80, stats: { pts: 8.6, reb: 9.4, ast: 3.4 } },
          { name: 'Luguentz Dort', positions: ['G'], rating: 79, stats: { pts: 11.4, reb: 3.8, ast: 1.5 } },
        ],
      },
    },
  },
  {
    id: 'ORL',
    name: 'Orlando Magic',
    color: '#0077C0',
    eras: {
      1980: {
        players: [
          { name: 'Reggie Theus', positions: ['G'], rating: 79, stats: { pts: 17.8, reb: 2.6, ast: 7.0 } },
          { name: 'Terry Catledge', positions: ['F'], rating: 76, stats: { pts: 15.4, reb: 6.0, ast: 1.1 } },
          { name: 'Otis Smith', positions: ['F'], rating: 73, stats: { pts: 15.0, reb: 5.2, ast: 1.8 } },
          { name: 'Sam Vincent', positions: ['G'], rating: 72, stats: { pts: 13.6, reb: 3.0, ast: 5.6 } },
        ],
      },
      1990: {
        players: [
          { name: "Shaquille O'Neal", positions: ['C'], rating: 95, stats: { pts: 27.2, reb: 12.5, ast: 2.4 } },
          { name: 'Penny Hardaway', positions: ['G'], rating: 91, stats: { pts: 19.0, reb: 4.9, ast: 6.3 } },
          { name: 'Horace Grant', positions: ['F'], rating: 83, stats: { pts: 12.0, reb: 9.8, ast: 2.6 } },
          { name: 'Nick Anderson', positions: ['G', 'F'], rating: 82, stats: { pts: 15.4, reb: 4.6, ast: 3.4 } },
          { name: 'Dennis Scott', positions: ['F'], rating: 80, stats: { pts: 14.0, reb: 3.0, ast: 2.0 } },
        ],
      },
      2000: {
        players: [
          { name: 'Tracy McGrady', positions: ['G', 'F'], rating: 95, stats: { pts: 28.1, reb: 7.5, ast: 5.3 } },
          { name: 'Dwight Howard', positions: ['C'], rating: 92, stats: { pts: 18.4, reb: 13.0, ast: 1.5 } },
          { name: 'Grant Hill', positions: ['F'], rating: 84, stats: { pts: 14.8, reb: 5.6, ast: 3.4 } },
          { name: 'Rashard Lewis', positions: ['F'], rating: 83, stats: { pts: 18.4, reb: 5.7, ast: 2.2 } },
          { name: 'Hedo Türkoğlu', positions: ['F'], rating: 82, stats: { pts: 16.6, reb: 5.3, ast: 4.6 } },
          { name: 'Jameer Nelson', positions: ['G'], rating: 81, stats: { pts: 13.6, reb: 3.1, ast: 5.4 } },
        ],
      },
      2010: {
        players: [
          { name: 'Dwight Howard', positions: ['C'], rating: 93, stats: { pts: 19.6, reb: 13.2, ast: 1.6 } },
          { name: 'Nikola Vučević', positions: ['C'], rating: 85, stats: { pts: 18.6, reb: 11.2, ast: 3.0 } },
          { name: 'Aaron Gordon', positions: ['F'], rating: 81, stats: { pts: 13.8, reb: 7.2, ast: 2.4 } },
          { name: 'Victor Oladipo', positions: ['G'], rating: 80, stats: { pts: 15.7, reb: 4.4, ast: 4.0 } },
          { name: 'Evan Fournier', positions: ['G'], rating: 79, stats: { pts: 15.6, reb: 3.0, ast: 2.8 } },
        ],
      },
      2020: {
        players: [
          { name: 'Paolo Banchero', positions: ['F'], rating: 88, stats: { pts: 22.6, reb: 7.3, ast: 5.0 } },
          { name: 'Franz Wagner', positions: ['F'], rating: 86, stats: { pts: 18.6, reb: 5.2, ast: 4.0 } },
          { name: 'Nikola Vučević', positions: ['C'], rating: 83, stats: { pts: 18.4, reb: 10.9, ast: 3.4 } },
          { name: 'Jalen Suggs', positions: ['G'], rating: 80, stats: { pts: 11.6, reb: 3.6, ast: 3.6 } },
          { name: 'Wendell Carter Jr.', positions: ['C'], rating: 78, stats: { pts: 13.0, reb: 9.2, ast: 2.2 } },
        ],
      },
    },
  },
  {
    id: 'PHI',
    name: 'Philadelphia 76ers',
    color: '#006BB6',
    eras: {
      1980: {
        players: [
          { name: 'Moses Malone', positions: ['C'], rating: 95, stats: { pts: 23.0, reb: 13.3, ast: 1.4 } },
          { name: 'Julius Erving', positions: ['F'], rating: 93, stats: { pts: 22.6, reb: 6.6, ast: 4.0 } },
          { name: 'Charles Barkley', positions: ['F'], rating: 92, stats: { pts: 23.3, reb: 11.6, ast: 3.7 } },
          { name: 'Maurice Cheeks', positions: ['G'], rating: 85, stats: { pts: 12.6, reb: 3.0, ast: 7.6 } },
          { name: 'Andrew Toney', positions: ['G'], rating: 84, stats: { pts: 16.4, reb: 2.6, ast: 4.4 } },
        ],
      },
      1990: {
        players: [
          { name: 'Allen Iverson', positions: ['G'], rating: 90, stats: { pts: 26.5, reb: 4.0, ast: 6.6 } },
          { name: 'Charles Barkley', positions: ['F'], rating: 90, stats: { pts: 25.0, reb: 11.2, ast: 4.4 } },
          { name: 'Hersey Hawkins', positions: ['G'], rating: 82, stats: { pts: 19.6, reb: 3.6, ast: 3.3 } },
          { name: 'Jerry Stackhouse', positions: ['G', 'F'], rating: 81, stats: { pts: 19.0, reb: 4.0, ast: 3.0 } },
          { name: 'Theo Ratliff', positions: ['C'], rating: 79, stats: { pts: 8.6, reb: 7.6, ast: 0.8 } },
        ],
      },
      2000: {
        players: [
          { name: 'Allen Iverson', positions: ['G'], rating: 96, stats: { pts: 29.6, reb: 3.7, ast: 6.4 } },
          { name: 'Dikembe Mutombo', positions: ['C'], rating: 86, stats: { pts: 11.6, reb: 11.8, ast: 1.0 } },
          { name: 'Andre Iguodala', positions: ['G', 'F'], rating: 84, stats: { pts: 15.0, reb: 5.8, ast: 4.8 } },
          { name: 'Chris Webber', positions: ['F'], rating: 82, stats: { pts: 12.2, reb: 7.6, ast: 3.2 } },
          { name: 'Elton Brand', positions: ['F'], rating: 81, stats: { pts: 13.6, reb: 7.6, ast: 1.5 } },
        ],
      },
      2010: {
        players: [
          { name: 'Joel Embiid', positions: ['C'], rating: 92, stats: { pts: 25.6, reb: 11.5, ast: 3.3 } },
          { name: 'Jimmy Butler', positions: ['G', 'F'], rating: 86, stats: { pts: 18.2, reb: 5.3, ast: 4.0 } },
          { name: 'Ben Simmons', positions: ['G', 'F'], rating: 85, stats: { pts: 15.9, reb: 8.1, ast: 7.7 } },
          { name: 'Jrue Holiday', positions: ['G'], rating: 84, stats: { pts: 18.0, reb: 4.0, ast: 6.6 } },
          { name: 'Andre Iguodala', positions: ['G', 'F'], rating: 83, stats: { pts: 16.6, reb: 6.0, ast: 5.0 } },
        ],
      },
      2020: {
        players: [
          { name: 'Joel Embiid', positions: ['C'], rating: 97, stats: { pts: 31.0, reb: 11.4, ast: 5.0 } },
          { name: 'James Harden', positions: ['G'], rating: 89, stats: { pts: 21.0, reb: 6.4, ast: 10.6 } },
          { name: 'Tyrese Maxey', positions: ['G'], rating: 88, stats: { pts: 22.4, reb: 3.6, ast: 5.6 } },
          { name: 'Paul George', positions: ['F'], rating: 83, stats: { pts: 16.4, reb: 5.2, ast: 4.2 } },
          { name: 'Tobias Harris', positions: ['F'], rating: 81, stats: { pts: 18.0, reb: 6.6, ast: 3.0 } },
        ],
      },
    },
  },
  {
    id: 'PHX',
    name: 'Phoenix Suns',
    color: '#E56020',
    eras: {
      1980: {
        players: [
          { name: 'Kevin Johnson', positions: ['G'], rating: 88, stats: { pts: 20.2, reb: 3.9, ast: 11.4 } },
          { name: 'Walter Davis', positions: ['G'], rating: 87, stats: { pts: 21.4, reb: 3.5, ast: 4.6 } },
          { name: 'Tom Chambers', positions: ['F'], rating: 86, stats: { pts: 25.7, reb: 8.0, ast: 2.4 } },
          { name: 'Larry Nance', positions: ['F'], rating: 85, stats: { pts: 16.6, reb: 7.4, ast: 2.4 } },
          { name: 'Alvan Adams', positions: ['C'], rating: 82, stats: { pts: 14.1, reb: 7.0, ast: 4.1 } },
        ],
      },
      1990: {
        players: [
          { name: 'Charles Barkley', positions: ['F'], rating: 95, stats: { pts: 23.4, reb: 11.6, ast: 4.6 } },
          { name: 'Kevin Johnson', positions: ['G'], rating: 89, stats: { pts: 19.6, reb: 3.3, ast: 9.6 } },
          { name: 'Jason Kidd', positions: ['G'], rating: 88, stats: { pts: 16.9, reb: 6.4, ast: 9.0 } },
          { name: 'Tom Chambers', positions: ['F'], rating: 83, stats: { pts: 19.3, reb: 7.2, ast: 2.2 } },
          { name: 'Dan Majerle', positions: ['G', 'F'], rating: 82, stats: { pts: 13.6, reb: 4.6, ast: 3.0 } },
        ],
      },
      2000: {
        players: [
          { name: 'Steve Nash', positions: ['G'], rating: 94, stats: { pts: 17.3, reb: 3.3, ast: 10.5 } },
          { name: "Amar'e Stoudemire", positions: ['F', 'C'], rating: 91, stats: { pts: 23.0, reb: 8.9, ast: 1.5 } },
          { name: 'Shawn Marion', positions: ['F'], rating: 88, stats: { pts: 18.4, reb: 10.0, ast: 2.0 } },
          { name: 'Stephon Marbury', positions: ['G'], rating: 85, stats: { pts: 22.0, reb: 3.2, ast: 8.2 } },
          { name: 'Joe Johnson', positions: ['G', 'F'], rating: 82, stats: { pts: 14.6, reb: 4.5, ast: 3.0 } },
        ],
      },
      2010: {
        players: [
          { name: 'Steve Nash', positions: ['G'], rating: 87, stats: { pts: 15.4, reb: 3.0, ast: 10.8 } },
          { name: 'Devin Booker', positions: ['G'], rating: 86, stats: { pts: 22.0, reb: 3.6, ast: 4.6 } },
          { name: 'Goran Dragić', positions: ['G'], rating: 86, stats: { pts: 16.4, reb: 3.4, ast: 5.4 } },
          { name: 'Eric Bledsoe', positions: ['G'], rating: 81, stats: { pts: 16.6, reb: 4.2, ast: 5.6 } },
          { name: 'Marcin Gortat', positions: ['C'], rating: 80, stats: { pts: 13.6, reb: 9.6, ast: 1.5 } },
          { name: 'DeAndre Ayton', positions: ['C'], rating: 80, stats: { pts: 16.5, reb: 10.6, ast: 1.6 } },
        ],
      },
      2020: {
        players: [
          { name: 'Kevin Durant', positions: ['F'], rating: 93, stats: { pts: 27.6, reb: 6.6, ast: 4.8 } },
          { name: 'Devin Booker', positions: ['G'], rating: 92, stats: { pts: 26.5, reb: 4.6, ast: 6.2 } },
          { name: 'Chris Paul', positions: ['G'], rating: 89, stats: { pts: 15.6, reb: 4.2, ast: 9.2 } },
          { name: 'Bradley Beal', positions: ['G'], rating: 83, stats: { pts: 17.6, reb: 4.4, ast: 5.0 } },
          { name: 'DeAndre Ayton', positions: ['C'], rating: 83, stats: { pts: 16.6, reb: 10.4, ast: 1.6 } },
        ],
      },
    },
  },
  {
    id: 'POR',
    name: 'Portland Trail Blazers',
    color: '#E03A3E',
    eras: {
      1980: {
        players: [
          { name: 'Clyde Drexler', positions: ['G'], rating: 91, stats: { pts: 21.0, reb: 6.9, ast: 5.6 } },
          { name: 'Kiki Vandeweghe', positions: ['F'], rating: 85, stats: { pts: 26.2, reb: 3.6, ast: 2.9 } },
          { name: 'Terry Porter', positions: ['G'], rating: 84, stats: { pts: 13.6, reb: 3.3, ast: 7.5 } },
          { name: 'Jerome Kersey', positions: ['F'], rating: 80, stats: { pts: 15.2, reb: 8.0, ast: 2.4 } },
          { name: 'Mychal Thompson', positions: ['F', 'C'], rating: 80, stats: { pts: 14.1, reb: 8.6, ast: 1.9 } },
        ],
      },
      1990: {
        players: [
          { name: 'Clyde Drexler', positions: ['G'], rating: 93, stats: { pts: 22.0, reb: 6.5, ast: 5.8 } },
          { name: 'Terry Porter', positions: ['G'], rating: 85, stats: { pts: 17.4, reb: 3.6, ast: 6.6 } },
          { name: 'Rasheed Wallace', positions: ['F', 'C'], rating: 84, stats: { pts: 14.8, reb: 6.4, ast: 1.6 } },
          { name: 'Arvydas Sabonis', positions: ['C'], rating: 84, stats: { pts: 12.4, reb: 7.6, ast: 2.4 } },
          { name: 'Buck Williams', positions: ['F'], rating: 81, stats: { pts: 13.0, reb: 9.0, ast: 1.1 } },
          { name: 'Damon Stoudamire', positions: ['G'], rating: 81, stats: { pts: 15.6, reb: 3.6, ast: 7.6 } },
        ],
      },
      2000: {
        players: [
          { name: 'Brandon Roy', positions: ['G'], rating: 88, stats: { pts: 22.0, reb: 4.6, ast: 5.0 } },
          { name: 'Rasheed Wallace', positions: ['F', 'C'], rating: 87, stats: { pts: 18.6, reb: 7.6, ast: 2.0 } },
          { name: 'Scottie Pippen', positions: ['F'], rating: 84, stats: { pts: 11.0, reb: 5.3, ast: 4.7 } },
          { name: 'Zach Randolph', positions: ['F'], rating: 84, stats: { pts: 18.1, reb: 8.6, ast: 1.5 } },
          { name: 'LaMarcus Aldridge', positions: ['F'], rating: 83, stats: { pts: 17.0, reb: 7.9, ast: 1.8 } },
        ],
      },
      2010: {
        players: [
          { name: 'Damian Lillard', positions: ['G'], rating: 93, stats: { pts: 24.6, reb: 4.3, ast: 6.7 } },
          { name: 'LaMarcus Aldridge', positions: ['F'], rating: 88, stats: { pts: 21.5, reb: 8.8, ast: 1.9 } },
          { name: 'CJ McCollum', positions: ['G'], rating: 85, stats: { pts: 19.0, reb: 3.6, ast: 3.2 } },
          { name: 'Nicolas Batum', positions: ['F'], rating: 81, stats: { pts: 12.6, reb: 5.6, ast: 4.4 } },
          { name: 'Jusuf Nurkić', positions: ['C'], rating: 79, stats: { pts: 12.0, reb: 9.3, ast: 2.4 } },
        ],
      },
      2020: {
        players: [
          { name: 'Damian Lillard', positions: ['G'], rating: 92, stats: { pts: 28.6, reb: 4.2, ast: 7.4 } },
          { name: 'Deni Avdija', positions: ['F'], rating: 82, stats: { pts: 16.2, reb: 7.8, ast: 4.6 } },
          { name: 'Anfernee Simons', positions: ['G'], rating: 81, stats: { pts: 18.1, reb: 3.0, ast: 4.2 } },
          { name: 'Jerami Grant', positions: ['F'], rating: 81, stats: { pts: 20.6, reb: 3.6, ast: 2.2 } },
          { name: 'Jusuf Nurkić', positions: ['C'], rating: 79, stats: { pts: 12.0, reb: 10.8, ast: 2.4 } },
        ],
      },
    },
  },
  {
    id: 'SAC',
    name: 'Sacramento Kings',
    color: '#5A2D81',
    eras: {
      1980: {
        players: [
          { name: 'Reggie Theus', positions: ['G'], rating: 84, stats: { pts: 18.6, reb: 3.1, ast: 7.8 } },
          { name: 'Eddie Johnson', positions: ['F'], rating: 83, stats: { pts: 20.6, reb: 5.0, ast: 2.6 } },
          { name: 'Otis Thorpe', positions: ['F'], rating: 80, stats: { pts: 14.5, reb: 8.4, ast: 1.8 } },
          { name: 'LaSalle Thompson', positions: ['C'], rating: 78, stats: { pts: 11.8, reb: 9.0, ast: 1.4 } },
          { name: 'Mike Woodson', positions: ['G'], rating: 78, stats: { pts: 18.0, reb: 3.0, ast: 3.0 } },
        ],
      },
      1990: {
        players: [
          { name: 'Mitch Richmond', positions: ['G'], rating: 89, stats: { pts: 23.3, reb: 4.0, ast: 3.8 } },
          { name: 'Chris Webber', positions: ['F'], rating: 87, stats: { pts: 21.4, reb: 10.4, ast: 4.2 } },
          { name: 'Vlade Divac', positions: ['C'], rating: 81, stats: { pts: 11.4, reb: 8.7, ast: 3.4 } },
          { name: 'Jason Williams', positions: ['G'], rating: 80, stats: { pts: 11.4, reb: 3.0, ast: 6.6 } },
          { name: 'Lionel Simmons', positions: ['F'], rating: 78, stats: { pts: 15.0, reb: 7.6, ast: 3.3 } },
        ],
      },
      2000: {
        players: [
          { name: 'Chris Webber', positions: ['F'], rating: 93, stats: { pts: 25.0, reb: 10.5, ast: 4.6 } },
          { name: 'Peja Stojaković', positions: ['F'], rating: 88, stats: { pts: 21.0, reb: 5.2, ast: 2.0 } },
          { name: 'Mike Bibby', positions: ['G'], rating: 85, stats: { pts: 17.0, reb: 3.0, ast: 5.4 } },
          { name: 'Vlade Divac', positions: ['C'], rating: 82, stats: { pts: 11.4, reb: 7.6, ast: 3.6 } },
          { name: 'Kevin Martin', positions: ['G'], rating: 82, stats: { pts: 22.0, reb: 4.2, ast: 2.4 } },
          { name: 'Doug Christie', positions: ['G'], rating: 79, stats: { pts: 11.0, reb: 4.5, ast: 3.6 } },
        ],
      },
      2010: {
        players: [
          { name: 'DeMarcus Cousins', positions: ['C'], rating: 90, stats: { pts: 21.8, reb: 10.9, ast: 3.2 } },
          { name: 'Rudy Gay', positions: ['F'], rating: 83, stats: { pts: 18.0, reb: 6.0, ast: 2.6 } },
          { name: "De'Aaron Fox", positions: ['G'], rating: 82, stats: { pts: 14.4, reb: 3.0, ast: 4.8 } },
          { name: 'Isaiah Thomas', positions: ['G'], rating: 81, stats: { pts: 16.7, reb: 2.8, ast: 4.8 } },
          { name: 'Buddy Hield', positions: ['G'], rating: 80, stats: { pts: 14.6, reb: 4.0, ast: 2.0 } },
        ],
      },
      2020: {
        players: [
          { name: 'Domantas Sabonis', positions: ['C'], rating: 88, stats: { pts: 19.8, reb: 13.0, ast: 7.1 } },
          { name: "De'Aaron Fox", positions: ['G'], rating: 88, stats: { pts: 23.6, reb: 4.0, ast: 6.4 } },
          { name: 'DeMar DeRozan', positions: ['F'], rating: 84, stats: { pts: 21.8, reb: 4.0, ast: 4.7 } },
          { name: 'Zach LaVine', positions: ['G'], rating: 83, stats: { pts: 21.6, reb: 4.2, ast: 3.0 } },
          { name: 'Malik Monk', positions: ['G'], rating: 80, stats: { pts: 14.4, reb: 2.8, ast: 3.9 } },
          { name: 'Keegan Murray', positions: ['F'], rating: 80, stats: { pts: 13.0, reb: 4.8, ast: 1.6 } },
        ],
      },
    },
  },
  {
    id: 'SAS',
    name: 'San Antonio Spurs',
    color: '#C4CED4',
    eras: {
      1980: {
        players: [
          { name: 'George Gervin', positions: ['G'], rating: 92, stats: { pts: 25.6, reb: 4.6, ast: 2.6 } },
          { name: 'David Robinson', positions: ['C'], rating: 85, stats: { pts: 24.3, reb: 12.0, ast: 2.0 } },
          { name: 'Alvin Robertson', positions: ['G'], rating: 84, stats: { pts: 15.8, reb: 5.8, ast: 6.0 } },
          { name: 'Artis Gilmore', positions: ['C'], rating: 84, stats: { pts: 17.8, reb: 10.6, ast: 1.8 } },
          { name: 'Mike Mitchell', positions: ['F'], rating: 82, stats: { pts: 21.6, reb: 5.2, ast: 1.6 } },
        ],
      },
      1990: {
        players: [
          { name: 'David Robinson', positions: ['C'], rating: 96, stats: { pts: 24.0, reb: 11.6, ast: 3.0 } },
          { name: 'Tim Duncan', positions: ['F', 'C'], rating: 92, stats: { pts: 21.7, reb: 11.4, ast: 2.6 } },
          { name: 'Dennis Rodman', positions: ['F'], rating: 85, stats: { pts: 7.7, reb: 17.5, ast: 2.3 } },
          { name: 'Sean Elliott', positions: ['F'], rating: 83, stats: { pts: 14.7, reb: 4.4, ast: 2.4 } },
          { name: 'Avery Johnson', positions: ['G'], rating: 79, stats: { pts: 10.6, reb: 2.3, ast: 7.6 } },
        ],
      },
      2000: {
        players: [
          { name: 'Tim Duncan', positions: ['F', 'C'], rating: 98, stats: { pts: 21.8, reb: 11.6, ast: 3.2 } },
          { name: 'Tony Parker', positions: ['G'], rating: 89, stats: { pts: 16.8, reb: 3.3, ast: 5.6 } },
          { name: 'Manu Ginóbili', positions: ['G'], rating: 89, stats: { pts: 15.0, reb: 4.0, ast: 3.8 } },
          { name: 'David Robinson', positions: ['C'], rating: 86, stats: { pts: 10.6, reb: 7.6, ast: 1.4 } },
          { name: 'Bruce Bowen', positions: ['F'], rating: 77, stats: { pts: 7.0, reb: 3.0, ast: 1.4 } },
        ],
      },
      2010: {
        players: [
          { name: 'Kawhi Leonard', positions: ['F'], rating: 94, stats: { pts: 19.0, reb: 6.4, ast: 2.6 } },
          { name: 'Tim Duncan', positions: ['F', 'C'], rating: 89, stats: { pts: 14.6, reb: 9.0, ast: 2.6 } },
          { name: 'Tony Parker', positions: ['G'], rating: 87, stats: { pts: 15.4, reb: 2.6, ast: 5.4 } },
          { name: 'LaMarcus Aldridge', positions: ['F'], rating: 87, stats: { pts: 19.0, reb: 8.2, ast: 2.0 } },
          { name: 'DeMar DeRozan', positions: ['G', 'F'], rating: 85, stats: { pts: 21.3, reb: 5.4, ast: 6.0 } },
          { name: 'Manu Ginóbili', positions: ['G'], rating: 84, stats: { pts: 11.6, reb: 3.0, ast: 3.3 } },
        ],
      },
      2020: {
        players: [
          { name: 'Victor Wembanyama', positions: ['C'], rating: 95, stats: { pts: 22.5, reb: 10.6, ast: 3.6 } },
          { name: "De'Aaron Fox", positions: ['G'], rating: 85, stats: { pts: 19.4, reb: 3.5, ast: 6.2 } },
          { name: 'Dejounte Murray', positions: ['G'], rating: 82, stats: { pts: 17.0, reb: 7.4, ast: 7.0 } },
          { name: 'Devin Vassell', positions: ['G'], rating: 80, stats: { pts: 15.2, reb: 3.8, ast: 2.8 } },
          { name: 'Stephon Castle', positions: ['G'], rating: 80, stats: { pts: 14.7, reb: 3.7, ast: 4.0 } },
          { name: 'Keldon Johnson', positions: ['F'], rating: 78, stats: { pts: 14.8, reb: 5.6, ast: 2.4 } },
        ],
      },
    },
  },
  {
    id: 'TOR',
    name: 'Toronto Raptors',
    color: '#CE1141',
    eras: {
      1990: {
        players: [
          { name: 'Vince Carter', positions: ['G', 'F'], rating: 89, stats: { pts: 18.3, reb: 5.8, ast: 3.8 } },
          { name: 'Damon Stoudamire', positions: ['G'], rating: 83, stats: { pts: 19.6, reb: 4.0, ast: 9.3 } },
          { name: 'Tracy McGrady', positions: ['F'], rating: 82, stats: { pts: 11.3, reb: 5.2, ast: 1.6 } },
          { name: 'Marcus Camby', positions: ['C'], rating: 79, stats: { pts: 12.5, reb: 7.0, ast: 1.2 } },
          { name: 'Doug Christie', positions: ['G'], rating: 79, stats: { pts: 13.2, reb: 4.6, ast: 3.6 } },
        ],
      },
      2000: {
        players: [
          { name: 'Vince Carter', positions: ['G', 'F'], rating: 92, stats: { pts: 25.2, reb: 5.8, ast: 4.2 } },
          { name: 'Chris Bosh', positions: ['F', 'C'], rating: 89, stats: { pts: 20.2, reb: 9.4, ast: 2.0 } },
          { name: 'Jalen Rose', positions: ['G'], rating: 82, stats: { pts: 15.6, reb: 4.0, ast: 4.8 } },
          { name: 'Antonio Davis', positions: ['F', 'C'], rating: 80, stats: { pts: 11.2, reb: 9.0, ast: 1.4 } },
          { name: 'Andrea Bargnani', positions: ['F', 'C'], rating: 78, stats: { pts: 14.2, reb: 4.6, ast: 1.2 } },
        ],
      },
      2010: {
        players: [
          { name: 'Kawhi Leonard', positions: ['F'], rating: 96, stats: { pts: 26.6, reb: 7.3, ast: 3.3 } },
          { name: 'Kyle Lowry', positions: ['G'], rating: 89, stats: { pts: 16.4, reb: 4.6, ast: 7.0 } },
          { name: 'DeMar DeRozan', positions: ['G', 'F'], rating: 88, stats: { pts: 20.6, reb: 4.2, ast: 3.9 } },
          { name: 'Pascal Siakam', positions: ['F'], rating: 84, stats: { pts: 13.0, reb: 6.0, ast: 2.6 } },
          { name: 'Jonas Valančiūnas', positions: ['C'], rating: 80, stats: { pts: 12.0, reb: 9.4, ast: 0.9 } },
        ],
      },
      2020: {
        players: [
          { name: 'Pascal Siakam', positions: ['F'], rating: 87, stats: { pts: 21.4, reb: 7.2, ast: 4.6 } },
          { name: 'Scottie Barnes', positions: ['F'], rating: 86, stats: { pts: 18.6, reb: 7.8, ast: 5.4 } },
          { name: 'Fred VanVleet', positions: ['G'], rating: 84, stats: { pts: 18.4, reb: 4.2, ast: 6.6 } },
          { name: 'OG Anunoby', positions: ['F'], rating: 82, stats: { pts: 16.6, reb: 5.3, ast: 2.0 } },
          { name: 'RJ Barrett', positions: ['F'], rating: 81, stats: { pts: 20.6, reb: 6.1, ast: 3.4 } },
          { name: 'Immanuel Quickley', positions: ['G'], rating: 80, stats: { pts: 15.6, reb: 4.4, ast: 5.6 } },
        ],
      },
    },
  },
  {
    id: 'UTA',
    name: 'Utah Jazz',
    color: '#F9A01B',
    eras: {
      1980: {
        players: [
          { name: 'Karl Malone', positions: ['F'], rating: 92, stats: { pts: 23.2, reb: 10.4, ast: 2.5 } },
          { name: 'John Stockton', positions: ['G'], rating: 91, stats: { pts: 13.1, reb: 2.8, ast: 12.1 } },
          { name: 'Adrian Dantley', positions: ['F'], rating: 90, stats: { pts: 26.6, reb: 6.4, ast: 3.3 } },
          { name: 'Darrell Griffith', positions: ['G'], rating: 82, stats: { pts: 18.0, reb: 3.6, ast: 2.2 } },
          { name: 'Mark Eaton', positions: ['C'], rating: 82, stats: { pts: 6.2, reb: 8.6, ast: 0.8 } },
        ],
      },
      1990: {
        players: [
          { name: 'Karl Malone', positions: ['F'], rating: 96, stats: { pts: 27.4, reb: 10.3, ast: 4.0 } },
          { name: 'John Stockton', positions: ['G'], rating: 92, stats: { pts: 14.0, reb: 2.9, ast: 11.4 } },
          { name: 'Jeff Hornacek', positions: ['G'], rating: 83, stats: { pts: 14.6, reb: 3.1, ast: 4.2 } },
          { name: 'Bryon Russell', positions: ['F'], rating: 77, stats: { pts: 8.6, reb: 3.6, ast: 1.6 } },
          { name: 'Greg Ostertag', positions: ['C'], rating: 72, stats: { pts: 4.6, reb: 6.6, ast: 0.5 } },
        ],
      },
      2000: {
        players: [
          { name: 'Deron Williams', positions: ['G'], rating: 89, stats: { pts: 17.4, reb: 3.2, ast: 9.6 } },
          { name: 'Karl Malone', positions: ['F'], rating: 89, stats: { pts: 22.0, reb: 8.8, ast: 4.0 } },
          { name: 'Carlos Boozer', positions: ['F'], rating: 86, stats: { pts: 19.6, reb: 10.6, ast: 2.4 } },
          { name: 'Andrei Kirilenko', positions: ['F'], rating: 86, stats: { pts: 13.0, reb: 6.0, ast: 2.8 } },
          { name: 'Mehmet Okur', positions: ['C'], rating: 81, stats: { pts: 15.6, reb: 7.6, ast: 2.0 } },
        ],
      },
      2010: {
        players: [
          { name: 'Rudy Gobert', positions: ['C'], rating: 89, stats: { pts: 13.7, reb: 11.8, ast: 1.3 } },
          { name: 'Donovan Mitchell', positions: ['G'], rating: 88, stats: { pts: 23.8, reb: 4.3, ast: 4.2 } },
          { name: 'Gordon Hayward', positions: ['F'], rating: 86, stats: { pts: 15.6, reb: 4.6, ast: 3.4 } },
          { name: 'Paul Millsap', positions: ['F'], rating: 84, stats: { pts: 15.0, reb: 8.0, ast: 2.4 } },
          { name: 'Al Jefferson', positions: ['C'], rating: 83, stats: { pts: 17.5, reb: 9.6, ast: 2.0 } },
        ],
      },
      2020: {
        players: [
          { name: 'Donovan Mitchell', positions: ['G'], rating: 90, stats: { pts: 26.4, reb: 4.4, ast: 5.0 } },
          { name: 'Rudy Gobert', positions: ['C'], rating: 88, stats: { pts: 14.6, reb: 13.4, ast: 1.3 } },
          { name: 'Lauri Markkanen', positions: ['F'], rating: 87, stats: { pts: 22.4, reb: 8.5, ast: 1.6 } },
          { name: 'Mike Conley', positions: ['G'], rating: 83, stats: { pts: 14.0, reb: 3.0, ast: 5.4 } },
          { name: 'Bojan Bogdanović', positions: ['F'], rating: 81, stats: { pts: 18.4, reb: 4.0, ast: 2.0 } },
          { name: 'Jordan Clarkson', positions: ['G'], rating: 80, stats: { pts: 17.0, reb: 3.4, ast: 3.6 } },
        ],
      },
    },
  },
  {
    id: 'WAS',
    name: 'Washington Wizards',
    color: '#E31837',
    eras: {
      1980: {
        label: 'Washington Bullets',
        players: [
          { name: 'Moses Malone', positions: ['C'], rating: 88, stats: { pts: 25.0, reb: 11.6, ast: 1.5 } },
          { name: 'Bernard King', positions: ['F'], rating: 85, stats: { pts: 21.0, reb: 5.0, ast: 3.0 } },
          { name: 'Jeff Malone', positions: ['G'], rating: 84, stats: { pts: 20.4, reb: 3.0, ast: 2.6 } },
          { name: 'Jeff Ruland', positions: ['C'], rating: 82, stats: { pts: 18.8, reb: 11.0, ast: 3.8 } },
          { name: 'Gus Williams', positions: ['G'], rating: 80, stats: { pts: 14.6, reb: 2.6, ast: 5.0 } },
          { name: 'Manute Bol', positions: ['C'], rating: 72, stats: { pts: 3.7, reb: 6.0, ast: 0.3 } },
        ],
      },
      1990: {
        label: 'Washington Bullets/Wizards',
        players: [
          { name: 'Chris Webber', positions: ['F'], rating: 87, stats: { pts: 21.0, reb: 9.7, ast: 4.4 } },
          { name: 'Juwan Howard', positions: ['F'], rating: 84, stats: { pts: 18.6, reb: 7.8, ast: 3.6 } },
          { name: 'Rod Strickland', positions: ['G'], rating: 84, stats: { pts: 16.4, reb: 4.8, ast: 9.0 } },
          { name: 'Tom Gugliotta', positions: ['F'], rating: 80, stats: { pts: 15.4, reb: 8.6, ast: 3.2 } },
          { name: 'Gheorghe Mureșan', positions: ['C'], rating: 77, stats: { pts: 12.0, reb: 8.0, ast: 0.8 } },
        ],
      },
      2000: {
        players: [
          { name: 'Gilbert Arenas', positions: ['G'], rating: 91, stats: { pts: 25.0, reb: 4.4, ast: 5.6 } },
          { name: 'Antawn Jamison', positions: ['F'], rating: 86, stats: { pts: 21.0, reb: 8.0, ast: 1.9 } },
          { name: 'Michael Jordan', positions: ['G'], rating: 86, stats: { pts: 21.2, reb: 5.9, ast: 4.4 } },
          { name: 'Caron Butler', positions: ['F'], rating: 84, stats: { pts: 18.6, reb: 5.8, ast: 2.6 } },
          { name: 'Larry Hughes', positions: ['G'], rating: 81, stats: { pts: 18.0, reb: 5.2, ast: 4.8 } },
        ],
      },
      2010: {
        players: [
          { name: 'John Wall', positions: ['G'], rating: 90, stats: { pts: 19.0, reb: 4.3, ast: 9.2 } },
          { name: 'Bradley Beal', positions: ['G'], rating: 88, stats: { pts: 21.0, reb: 4.0, ast: 3.8 } },
          { name: 'Otto Porter Jr.', positions: ['F'], rating: 80, stats: { pts: 12.0, reb: 6.0, ast: 1.6 } },
          { name: 'Marcin Gortat', positions: ['C'], rating: 80, stats: { pts: 10.6, reb: 9.6, ast: 1.6 } },
          { name: 'Nenê', positions: ['C'], rating: 77, stats: { pts: 11.4, reb: 6.4, ast: 2.0 } },
        ],
      },
      2020: {
        players: [
          { name: 'Bradley Beal', positions: ['G'], rating: 89, stats: { pts: 23.2, reb: 4.6, ast: 5.4 } },
          { name: 'Russell Westbrook', positions: ['G'], rating: 86, stats: { pts: 20.0, reb: 10.8, ast: 10.4 } },
          { name: 'Kristaps Porziņģis', positions: ['C'], rating: 84, stats: { pts: 22.0, reb: 8.8, ast: 2.2 } },
          { name: 'Kyle Kuzma', positions: ['F'], rating: 81, stats: { pts: 19.6, reb: 6.8, ast: 3.2 } },
          { name: 'Jordan Poole', positions: ['G'], rating: 78, stats: { pts: 15.6, reb: 3.0, ast: 4.4 } },
          { name: 'Alex Sarr', positions: ['C'], rating: 77, stats: { pts: 13.0, reb: 6.4, ast: 2.0 } },
        ],
      },
    },
  },
];
