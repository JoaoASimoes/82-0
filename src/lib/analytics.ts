/**
 * Estatísticas de utilização com o GoatCounter (https://jogo820.goatcounter.com).
 *
 * - Só no site publicado (github.io): `npm run dev` e `npm run preview` não contam.
 * - Sem cookies nem dados pessoais; o GoatCounter conta a visita sozinho ao carregar o script.
 * - Os eventos do jogo (`track`) aparecem no painel como "caminhos" próprios (ex.: wins-72).
 * - Falha em silêncio (bloqueadores de anúncios, offline): o jogo nunca depende disto.
 */

const ENDPOINT = 'https://jogo820.goatcounter.com/count';
const SCRIPT = 'https://gc.zgo.at/count.js';
const PRODUCTION_HOST = 'github.io';

interface GoatCounter {
  count?: (vars: { path: string; title?: string; event?: boolean }) => void;
}

declare global {
  interface Window {
    goatcounter?: GoatCounter;
  }
}

/** Eventos conhecidos (nomes curtos, em inglês, como aparecem no painel). */
export type AnalyticsEvent =
  | 'game-start'
  | 'season-end'
  | 'perfect-season'
  | 'reroll-team'
  | 'reroll-decade'
  | `wins-${number}`
  | `lang-${string}`
  | `device-${'mobile' | 'desktop'}`;

/** Só envia no site publicado. */
export function analyticsEnabled(hostname: string, production: boolean): boolean {
  return production && (hostname === PRODUCTION_HOST || hostname.endsWith(`.${PRODUCTION_HOST}`));
}

const enabled = () => typeof location !== 'undefined' && analyticsEnabled(location.hostname, import.meta.env.PROD);

/** Eventos registados antes de o script do GoatCounter acabar de carregar. */
const pending: AnalyticsEvent[] = [];

function send(event: AnalyticsEvent): boolean {
  const count = window.goatcounter?.count;
  if (!count) return false;
  count({ path: event, title: event, event: true });
  return true;
}

function flush() {
  try {
    while (pending.length && send(pending[0]!)) pending.shift();
  } catch {
    /* estatísticas nunca podem partir o jogo */
  }
}

/** Carrega o script do GoatCounter (que conta a visita) e regista o tipo de dispositivo. */
export function initAnalytics(): void {
  if (!enabled()) return;
  try {
    const script = document.createElement('script');
    script.async = true;
    script.src = SCRIPT;
    script.dataset.goatcounter = ENDPOINT;
    script.addEventListener('load', flush);
    document.head.appendChild(script);
    const desktop = window.matchMedia?.('(hover: hover) and (pointer: fine)').matches;
    track(desktop ? 'device-desktop' : 'device-mobile');
  } catch {
    /* sem estatísticas */
  }
}

/** Regista um evento do jogo. Não faz nada fora do site publicado. */
export function track(event: AnalyticsEvent): void {
  if (!enabled()) return;
  try {
    if (!send(event)) pending.push(event);
  } catch {
    /* sem estatísticas */
  }
}
