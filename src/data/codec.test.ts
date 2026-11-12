import { describe, expect, it } from 'vitest';
import { decodeRating, encodeRating, ratingKey } from './codec';

describe('ofuscação da nota', () => {
  it('codifica e descodifica todas as notas possíveis', () => {
    const key = ratingKey('CHI', 1990, 'Michael Jordan');
    for (let r = 0; r <= 99; r++) expect(decodeRating(encodeRating(r, key), key)).toBe(r);
  });

  // Valores calculados com encode_rating() de scripts/build_players.py: os dois lados têm de bater certo.
  it('é igual à do script Python (incluindo nomes com acentos)', () => {
    expect(encodeRating(99, ratingKey('CHI', 1990, 'Michael Jordan'))).toBe('ffqd3s');
    expect(encodeRating(99, ratingKey('DEN', 2020, 'Nikola Jokić'))).toBe('1fxe6qf');
  });

  it('a mesma nota dá códigos diferentes para jogadores diferentes', () => {
    expect(encodeRating(90, ratingKey('BOS', 1980, 'Larry Bird'))).not.toBe(encodeRating(90, ratingKey('LAL', 1980, 'Magic Johnson')));
  });

  it('recusa códigos que não correspondem à chave', () => {
    const code = encodeRating(80, ratingKey('BOS', 1980, 'Larry Bird'));
    expect(() => decodeRating(code, ratingKey('BOS', 1980, 'Kevin McHale'))).toThrow();
  });
});
