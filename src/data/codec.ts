/**
 * Ofuscação da nota secreta dos jogadores.
 *
 * Em `players.json` a nota não aparece em texto simples: cada jogador tem um código `x`
 * (base 36) misturado com uma chave que depende da equipa, da década e do nome. Assim, quem
 * espreita o repositório ou o código do site não vê "rating: 99" nem encontra padrões
 * (duas notas iguais dão códigos diferentes).
 *
 * NÃO é segurança: a chave está aqui, no código. Serve só para tirar a tentação a quem
 * espreita. Tem de bater certo com `encode_rating` em `scripts/build_players.py`.
 */

/** Multiplicador da nota (primo; 99 × isto cabe folgadamente em 32 bits). */
const SCALE = 104729;

/** FNV-1a de 32 bits, por ponto de código (igual ao do script Python). */
function fnv1a(text: string): number {
  let h = 0x811c9dc5;
  for (const ch of text) {
    h ^= ch.codePointAt(0)!;
    h = Math.imul(h, 16777619) >>> 0;
  }
  return h;
}

export const ratingKey = (teamId: string, decade: number, name: string) => fnv1a(`${teamId}|${decade}|${name}`);

export function encodeRating(rating: number, key: number): string {
  return ((key + rating * SCALE) >>> 0).toString(36);
}

export function decodeRating(code: string, key: number): number {
  const scaled = (parseInt(code, 36) - key) >>> 0;
  const rating = scaled / SCALE;
  if (!Number.isInteger(rating) || rating < 0 || rating > 99) throw new Error(`Código de nota inválido: ${code}`);
  return rating;
}
