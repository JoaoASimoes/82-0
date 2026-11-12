# 82-0 · Perfect Season 🏀

Pick 5 NBA legends and try for a perfect 82-win season. Built to be played on an iPhone (PWA: add it to the home screen and it opens like an app). The interface is available in European Portuguese and English (picked on the home screen; defaults to the browser's language).

## How it plays

1. Spin to draw a **team** and a **decade**.
2. Pick one player from that roster for your starting five (2 guards, 2 forwards, 1 center). You only see his **per-game averages** (points, rebounds, assists) for that team and decade.
3. You get **1 team re-roll** and **1 decade re-roll** per game.
4. Simulate 82 games. Win them all for **82-0**.

Each player also has a hidden 0–99 rating for his impact on that team in that decade. It drives the simulation but is never shown to the player. Rosters and averages come from Basketball-Reference data (see below); the rating is derived from them.

## Getting started

You need [Node.js](https://nodejs.org) 22 (see `.nvmrc`).

```bash
npm install
npm run dev
```

Open the address printed in the terminal. To test on an iPhone, use the "Network" address (the phone must be on the same Wi-Fi network).

## Developing with Claude Code

```bash
cd 82-0
claude
```

`CLAUDE.md` explains the project's structure, commands and rules to Claude Code. Example requests:
- "Add a daily challenge mode where everyone gets the same draws"
- "Show 12 players per team and decade instead of 10" (or use the `/jogador` command)
- "Add a playoff round after the regular season"

## Player data

`src/data/players.json` is generated, not hand-written. `scripts/build_players.py` reads the CSVs of the [NBA Stats (1947-present)](https://www.kaggle.com/datasets/sumitrodatta/nba-aba-baa-stats) Kaggle dataset (Basketball-Reference data) and, for each franchise and decade since the 1980s, keeps the 10 players with the biggest total contribution (summed Game Score). It stores their per-game averages and a hidden rating that blends box-score impact (minutes-weighted BPM) with prestige (MVP and DPOY votes, All-NBA/All-Defense teams, All-Star picks and titles with that team), mapped by percentile onto a fixed 0–99 distribution. Titles aren't in the dataset; they're listed in `CHAMPIONS` in the script.

Download the dataset into `data_raw/` (git-ignored, ~32 MB). Only needed to regenerate the JSON; the game and CI use the committed `players.json`.

```bash
python3 -m venv .venv
.venv/bin/pip install -r scripts/requirements.txt
.venv/bin/python scripts/build_players.py   # takes a few seconds
```

## Deploying to GitHub Pages

1. Create a GitHub repository and push this project to the `main` branch.
2. In the repository: **Settings → Pages → Source: GitHub Actions**.
3. Every push to `main` runs the tests and deploys to `https://<user>.github.io/<repository>/`.
4. On the iPhone: open the link in Safari → Share → **Add to Home Screen**.

## Scripts

| Command | What it does |
| --- | --- |
| `npm run dev` | Development server |
| `npm run check` | Typecheck + tests |
| `npm run build` | Production build (`dist/`) |
| `npm run preview` | Serves the build locally |
