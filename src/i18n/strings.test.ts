import { describe, expect, it } from 'vitest';
import { detectLang, positionList, statLine, STRINGS } from './strings';
import { verdictFor } from '../game/verdict';

describe('línguas', () => {
  it('escolhe português se o browser estiver em português, senão inglês', () => {
    expect(detectLang(['pt-PT'])).toBe('pt');
    expect(detectLang(['en-US', 'pt-BR'])).toBe('pt');
    expect(detectLang(['en-GB'])).toBe('en');
    expect(detectLang([])).toBe('en');
  });

  it('formata as médias em cada língua', () => {
    const stats = { pts: 26, reb: 10.4, ast: 6.5 };
    expect(statLine(stats, STRINGS.pt)).toBe('26.0 PTS · 10.4 RES · 6.5 AST');
    expect(statLine(stats, STRINGS.en)).toBe('26.0 PTS · 10.4 REB · 6.5 AST');
  });

  it('traduz décadas e posições', () => {
    expect(STRINGS.pt.decade(1980)).toBe('Anos 80');
    expect(STRINGS.pt.decade(2010)).toBe('Anos 2010');
    expect(STRINGS.en.decade(1980)).toBe('1980s');
    expect(positionList(['G', 'F'], STRINGS.pt, 'or')).toBe('base ou extremo');
    expect(positionList(['F', 'C'], STRINGS.en, 'and')).toBe('forward and center');
  });

  it('tem texto para todos os veredictos nas duas línguas', () => {
    for (let wins = 0; wins <= 82; wins++) {
      for (const t of Object.values(STRINGS)) {
        expect(t.verdict[verdictFor(wins)].title, `${wins} vitórias`).toBeTruthy();
      }
    }
  });
});
