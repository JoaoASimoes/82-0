# 82-0 · Época Perfeita

Jogo mobile-first (PWA para iPhone, em português e inglês) inspirado no desafio viral "82-0": o jogador sorteia equipa + década da NBA, escolhe um cinco inicial e simula uma época de 82 jogos.

## Comandos
- `npm run dev` — servidor local (com `--host`, abre também no telemóvel na mesma rede Wi-Fi)
- `npm run check` — typecheck + testes. **Corre sempre antes de dares uma tarefa por terminada.**
- `npm test` — testes (Vitest)
- `npm run build` — build de produção em `dist/`
- Deploy: automático no push para `main` (GitHub Actions → GitHub Pages)

## Stack
React 19 + TypeScript (strict, `noUncheckedIndexedAccess`) + Vite + vite-plugin-pwa + Vitest. Sem router nem gestor de estado: o `App.tsx` troca de ecrã com `useState`. CSS simples em `src/styles.css` com variáveis em `:root`.

## Estrutura
```
src/
  data/       types.ts (tipos) · teams.ts (30 franquias: nome, cor, nomes históricos) · players.json (plantéis GERADOS) · data.test.ts (valida os dados)
  game/       lógica pura, sem React: draft.ts · season.ts · verdict.ts · rng.ts (+ testes ao lado)
  screens/    HomeScreen · DraftScreen · SeasonScreen
  components/ Lineup · PlayerRow · Toast · Confetti
  i18n/       strings.tsx (textos pt/en) · LangContext.tsx (useLang, língua guardada no localStorage)
  lib/        storage.ts (localStorage) · haptics.ts
public/       ícones da PWA
scripts/      build_players.py (gera players.json a partir do dataset em data_raw/) · requirements.txt
data_raw/     CSVs do dataset do Basketball-Reference (Kaggle). Fora do git.
```

## Regras do projeto
- **Lógica fora dos componentes.** Tudo o que decide o jogo vive em `src/game/` como funções puras, e cada mudança aí leva testes.
- **Aleatoriedade injetada.** Funções de jogo recebem um `Rng`; nos testes usa `seededRng(seed)` para resultados determinísticos. Nunca chamar `Math.random` dentro de `src/game/`.
- **Imutabilidade.** `placePlayer` e afins devolvem objetos novos; não mutar o `lineup`.
- **Interface em duas línguas: português de Portugal e inglês.** Todo o texto visível vive em `src/i18n/strings.tsx` (`pt` e `en`, o TypeScript obriga as duas a ter as mesmas chaves); os componentes usam `const { t } = useLang()`. Nunca escrever texto da interface diretamente num componente nem em `src/game/` (aí devolvem-se códigos, ex.: `VerdictTier`). Português de Portugal: "ecrã", "telemóvel", "equipa", "base/extremo/poste". Código e nomes de variáveis em inglês.
- **Mobile primeiro, com versão de computador.** O CSS base é o do telemóvel (testar a 390×844, respeitar `env(safe-area-inset-*)`, alvos de toque ≥ 40px). A partir de 900px de largura, `@media (min-width: 900px)` no fim de `styles.css` passa o sorteio e a época a duas colunas; `@media (hover: hover) and (pointer: fine)` acrescenta efeitos de rato. Adaptar sempre pela largura e pelo ponteiro, nunca detetar o dispositivo pelo user agent. Testar também a ~1280×800.
- localStorage pode falhar (modo privado do Safari): usar sempre try/catch, como em `lib/storage.ts`.
- **Avisar quando for boa altura para um commit.** Sempre que um conjunto de alterações estiver coerente e o `npm run check` passar (ex.: uma funcionalidade terminada, uma correção, uma mudança grande nos dados), sugere ao utilizador fazer commit e propõe uma mensagem. Não fazer o commit sem ele pedir.
- **Commits e README em inglês.** Mensagens de commit e o `README.md` escrevem-se sempre em inglês (o texto da interface continua em português de Portugal).

## Dados dos jogadores (`src/data/players.json`)
- **Gerados, não editados à mão.** `scripts/build_players.py` lê os CSVs em `data_raw/` (dataset [NBA Stats (1947-present)](https://www.kaggle.com/datasets/sumitrodatta/nba-aba-baa-stats), dados do Basketball-Reference) para escolher, por franquia e década, os 10 jogadores com maior contribuição total (soma do Game Score; `PLAYERS_PER_ERA`) e calcular as médias e a nota. Para mudar dados, muda o script e volta a corrê-lo (ver `/jogador`).
- Siglas antigas (SEA, NJN, VAN, KCK, CHH, NOH…) convertem-se para as franquias do jogo em `FRANCHISE`, no script. Segue a linhagem oficial da NBA: os Charlotte Hornets de 1988-2002 contam para CHA, os New Orleans Hornets para NOP.
- No CSV, `season` é o ano em que a época ACABA (2027 = 2026-27); o script converte.
- Década = ano de início da época (1989-90 → `1980`).
- `positions`: todas as posições (`G`, `F`, `C`) em que o jogador jogou na carreira, a principal primeiro (ex.: `['F', 'C']`). Ver `career_positions` no script. No cinco, um jogador pode ser trocado para qualquer lugar de uma dessas posições (`moveTargets`/`movePlayer` em `draft.ts`).
- `rating` 0–99 = impacto do jogador NAQUELA equipa e década, mistura de três partes (`WEIGHTS` e `impact_scores` no script): **impacto** (47%: BPM ponderado pelos minutos, ajustado ao ritmo de jogo, × minutos por jogo), **produção** (15%: quantos desvios-padrão as médias por jogo ficaram acima da liga NESSA época — pontos, ressaltos, assistências, roubos, abafos; só conta o que se destaca; prepara as décadas antigas, ex.: os 50 pontos do Wilt) e **prestígio** (38%: votos de MVP e DPOY, equipas All-NBA/All-Defense, All-Star e títulos com essa equipa). Produção e prestígio contam a média das 4 melhores épocas na equipa. O prestígio é o que separa lendas como Jordan e LeBron, cuja grandeza vai além da estatística. O resultado converte-se por percentil para a distribuição das notas originais (`RATING_PERCENTILES`, mantém a curva de dificuldade), calibrada com os 5 principais de cada era. Os títulos não vêm no dataset: estão em `CHAMPIONS`, no script — acrescentar o campeão de cada nova época. Escala: 95+ superestrela histórica, 88–94 all-star, 80–87 titular sólido, <80 rotação. **É secreto: nunca o mostrar na interface** — decide a simulação, mas o utilizador só vê as `stats`. No `players.json` vem **ofuscado** no campo `x` (`encode_rating` no script, `src/data/codec.ts` no jogo; o `teams.ts` descodifica ao carregar). Não é segurança (a chave está no código), só evita que se leia a nota a olho; os dois lados têm de bater certo (`codec.test.ts`).
- `stats` = médias por jogo `{ pts, reb, ast, stl, blk }` (uma casa decimal) desse jogador nessa equipa e década. É a única informação de valor que aparece no ecrã.
- Cada era vem por ordem alfabética, e a lista do sorteio ordena-se por estatística ou por nome (`sortPlayers`; começa por pontos, `DEFAULT_SORT`). **Nunca ordenar pela nota**: revelaria quem é melhor.
- `labels` (em `teams.ts`, à mão) quando a franquia tinha outro nome (Seattle SuperSonics, New Jersey Nets, Washington Bullets…).
- Mínimo 10 jogadores por década (eras com menos ficam de fora); sem nomes repetidos na mesma era. `data.test.ts` verifica isto.

## Simulação (`src/game/season.ts`)
**Sem sorte:** o resultado depende só do cinco — dois cincos iguais fazem sempre o mesmo resultado, jogo a jogo. Força da equipa = média das notas. Os 82 adversários têm forças fixas (quantis de uma Normal com mediana 87; o mais forte, 95.1, é o limiar do 82-0) e um calendário fixo; ganhas um jogo se a tua força for maior do que a do adversário. Para 82-0 é preciso média ≥ 95.2 (~3% dos drafts de um jogador típico). A curva está documentada em `DEFAULT_SIM` e protegida por `season.test.ts` — se mudares a afinação de propósito, atualiza o teste. Não usar `Rng` na simulação da época.

## Ideias para próximas funcionalidades
Tarefas já planeadas e detalhadas estão em `TODO.md` (ex.: décadas de 1950, 1960 e 1970).
- Desafio diário (mesma semente para todos, com `seededRng` a partir da data)
- Química entre jogadores da mesma equipa/década
- Playoffs depois da época regular
- Mais ligas/temas (ex.: Liga Portugal)
