import { describe, expect, it } from 'vitest';
import { verdictFor } from './verdict';

describe('veredicto', () => {
  it('82-0 é época perfeita', () => expect(verdictFor(82).title).toContain('PERFEITA'));
  it('74+ bate os Warriors', () => expect(verdictFor(74).title).toContain('Warriors'));
  it('menos de 41 é lottery', () => expect(verdictFor(30).title).toContain('Lottery'));
});
