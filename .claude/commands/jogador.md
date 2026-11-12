---
description: Adiciona ou atualiza jogadores em src/data/teams.ts
argument-hint: <jogador(es), equipa, década, posição, nota, médias>
---

Atualiza `src/data/teams.ts` com o seguinte pedido: $ARGUMENTS

Regras:
- Segue as convenções de dados descritas no CLAUDE.md (década = ano de início da época, posições G/F/C, nota 0–99 do auge nessa equipa e década).
- Cada jogador leva `stats: { pts, reb, ast }` com as médias por jogo nessa equipa e década (uma casa decimal).
- Se faltar a nota, as médias ou a posição, propõe valores coerentes com a escala e com jogadores semelhantes já no ficheiro, e diz quais escolheste.
- Se o jogador já existir nessa equipa e década, atualiza-o em vez de duplicar.
- Mantém os jogadores de cada era ordenados da nota mais alta para a mais baixa.
- No fim corre `npm run check` e mostra um resumo do que mudou.
