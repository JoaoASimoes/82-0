# TODO

## Campeão de 2025-26

`CHAMPIONS` em `scripts/build_players.py` vai até 2024-25. Acrescentar o campeão de 2025-26 (e de cada época seguinte) e voltar a gerar o `players.json`.

## Acrescentar as décadas de 1950, 1960 e 1970

O dataset em `data_raw/` (Basketball-Reference) tem dados desde 1946-47 (BAA, NBA e ABA), mas há coisas a resolver:

- **Estatísticas em falta nas épocas antigas.** Roubos, abafos e ressaltos ofensivos/defensivos só existem desde 1973-74, as perdas de bola desde 1977-78, e nos anos 50 nem há sempre minutos (antes de 1951-52) ou ressaltos (antes de 1950-51). Com o Game Score atual, os jogadores antigos ficariam com notas injustamente baixas.
  → Calcular a nota **por percentil dentro de cada década**, em vez de comparar todas as décadas juntas, ou usar uma fórmula só com o que existe em todas as épocas (PTS, REB, AST, FG%, FT%).
- **Tipos do jogo:** acrescentar `1950 | 1960 | 1970` a `Decade` e a `DECADES` em `src/data/types.ts`; baixar `FIRST_DECADE` em `scripts/build_players.py` e acrescentar as siglas antigas a `FRANCHISE`.
- **Nomes históricos (`labels` em `src/data/teams.ts`):** Buffalo Braves (LAC), Cincinnati Royals / KC-Omaha Kings (SAC), Philadelphia / San Francisco Warriors (GSW), Tri-Cities / Milwaukee / St. Louis Hawks (ATL), Syracuse Nationals (PHI), Fort Wayne Pistons (DET), Minneapolis Lakers (LAL), New Orleans Jazz (UTA), Chicago Packers/Zephyrs → Baltimore/Capital Bullets (WAS), San Diego Rockets (HOU), Seattle SuperSonics (OKC), New York/New Jersey Nets (BKN)…
- **Equipas da ABA** (Nuggets, Pacers, Spurs, Nets): o dataset tem os anos da ABA (`lg == 'ABA'`, até 1976), mas o script só lê a NBA. Decidir se contam (a ABA era uma liga mais fraca: talvez descontar na nota).
- **Poucas franquias nos anos 50** (8 a 10 equipas): o sorteio fica com poucas combinações nessa década. Confirmar que o teste "o draft nunca encrava" continua a passar.
