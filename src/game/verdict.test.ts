import { describe, expect, it } from 'vitest';
import { verdictFor } from './verdict';

describe('veredicto', () => {
  it('82-0 é época perfeita', () => expect(verdictFor(82)).toBe('perfect'));
  it('74+ bate os Warriors', () => {
    expect(verdictFor(81)).toBe('warriors');
    expect(verdictFor(74)).toBe('warriors');
  });
  it('72-73 é nível Bulls', () => expect(verdictFor(72)).toBe('bulls'));
  it('41-49 é play-in', () => expect(verdictFor(41)).toBe('playIn'));
  it('menos de 41 é lottery', () => expect(verdictFor(30)).toBe('lottery'));
});
