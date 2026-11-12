import { describe, expect, it } from 'vitest';
import { analyticsEnabled, track } from './analytics';

describe('estatísticas', () => {
  it('só envia no site publicado (github.io, build de produção)', () => {
    expect(analyticsEnabled('joaoasimoes.github.io', true)).toBe(true);
    expect(analyticsEnabled('joaoasimoes.github.io', false)).toBe(false); // npm run dev
    expect(analyticsEnabled('localhost', true)).toBe(false); // npm run preview
    expect(analyticsEnabled('192.168.1.20', true)).toBe(false);
    expect(analyticsEnabled('github.io.evil.com', true)).toBe(false);
  });

  it('nos testes não faz nada nem rebenta', () => {
    expect(() => track('game-start')).not.toThrow();
  });
});
