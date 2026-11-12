# 82-0 · Época Perfeita

Jogo mobile-first (PWA para iPhone) inspirado no desafio viral "82-0": o jogador sorteia equipa + década da NBA, escolhe um cinco inicial e simula uma época de 82 jogos.

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
  data/       types.ts (tipos) · teams.ts (plantéis: 30 franquias × décadas) · data.test.ts (valida os dados)
  game/       lógica pura, sem React: draft.ts · season.ts · verdict.ts · rng.ts (+ testes ao lado)
  screens/    HomeScreen · DraftScreen · SeasonScreen
  components/ Lineup · PlayerRow · Toast · Confetti
  lib/        storage.ts (localStorage) · haptics.ts
public/       ícones da PWA
```

## Regras do projeto
- **Lógica fora dos componentes.** Tudo o que decide o jogo vive em `src/game/` como funções puras, e cada mudança aí leva testes.
- **Aleatoriedade injetada.** Funções de jogo recebem um `Rng`; nos testes usa `seededRng(seed)` para resultados determinísticos. Nunca chamar `Math.random` dentro de `src/game/`.
- **Imutabilidade.** `placePlayer` e afins devolvem objetos novos; não mutar o `lineup`.
- **Texto da interface em português de Portugal** (ex.: "ecrã", "telemóvel", "equipa", "base/extremo/poste"). Código e nomes de variáveis em inglês.
- **Mobile primeiro.** Testar a 390×844. Respeitar `env(safe-area-inset-*)`. Alvos de toque ≥ 40px.
- localStorage pode falhar (modo privado do Safari): usar sempre try/catch, como em `lib/storage.ts`.
- **Avisar quando for boa altura para um commit.** Sempre que um conjunto de alterações estiver coerente e o `npm run check` passar (ex.: uma funcionalidade terminada, uma correção, uma mudança grande nos dados), sugere ao utilizador fazer commit e propõe uma mensagem. Não fazer o commit sem ele pedir.
- **Commits e README em inglês.** Mensagens de commit e o `README.md` escrevem-se sempre em inglês (o texto da interface continua em português de Portugal).

## Dados dos jogadores (`src/data/teams.ts`)
- Década = ano de início da época (1989-90 → `1980`).
- `positions`: `G`, `F`, `C` ou duas (ex.: `['G', 'F']`).
- `rating` 0–99 = impacto do jogador NAQUELA equipa e década (não é estatística oficial). Escala: 95+ superestrela histórica, 88–94 all-star, 80–87 titular sólido, <80 rotação. **É secreto: nunca o mostrar na interface** — decide a simulação, mas o utilizador só vê as `stats`.
- `stats` = médias por jogo `{ pts, reb, ast }` (uma casa decimal) desse jogador nessa equipa e década. É a única informação de valor que aparece no ecrã.
- `label` quando a franquia tinha outro nome (Seattle SuperSonics, New Jersey Nets, Washington Bullets…).
- Mínimo 4 jogadores por década; sem nomes repetidos na mesma era. `data.test.ts` verifica isto.

## Simulação (`src/game/season.ts`)
Força da equipa = média das notas. Cada jogo: adversário ~ Normal(82, 5); P(vitória) logística com `spread` 2.4. A curva de dificuldade está documentada em `DEFAULT_SIM` e protegida por `season.test.ts` — se mudares a afinação de propósito, atualiza os intervalos do teste.

## Ideias para próximas funcionalidades
- Desafio diário (mesma semente para todos, com `seededRng` a partir da data)
- Química entre jogadores da mesma equipa/década
- Playoffs depois da época regular
- Mais ligas/temas (ex.: Liga Portugal)
