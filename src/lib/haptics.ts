/** Vibração curta (Android). No iPhone o Safari ignora; não faz mal. */
export function tap() {
  try {
    navigator.vibrate?.(12);
  } catch {
    /* ignora */
  }
}
