---
description: Atualiza os plantéis e estatísticas a partir do dataset do Basketball-Reference
argument-hint: [opcional: o que mudar, ex. "12 jogadores por era"]
---

Os jogadores NÃO se escrevem à mão: `src/data/players.json` é gerado por `scripts/build_players.py` a partir de `data_raw/Player Totals.csv` (dataset "NBA Stats (1947-present)" do Kaggle). Pedido: $ARGUMENTS

Passos:
- Se o pedido mudar a seleção ou a nota (nº de jogadores por era, década inicial, fórmula do impacto, distribuição das notas), altera as constantes/funções em `scripts/build_players.py`.
- Ambiente: `python3 -m venv .venv && .venv/bin/pip install -r scripts/requirements.txt` (só da primeira vez).
- Se faltar `data_raw/`, pede ao utilizador para descarregar o dataset do Kaggle para lá. Para dados mais recentes (ex.: época em curso), substitui os CSVs por uma versão nova do dataset.
- Corre `.venv/bin/python scripts/build_players.py` (segundos).
- Nomes antigos das franquias (`labels`) e cores ficam em `src/data/teams.ts`, à mão. Siglas novas no CSV vão para `FRANCHISE` no script (o script falha se encontrar uma sigla desconhecida).
- No fim corre `npm run check` e mostra um resumo do que mudou no JSON (jogadores que entraram/saíram, notas que mudaram muito).
