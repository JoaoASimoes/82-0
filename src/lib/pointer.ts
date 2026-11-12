import { useEffect, useState } from 'react';

/** Rato ou trackpad (ponteiro fino com hover), por oposição a ecrã tátil. */
const QUERY = '(hover: hover) and (pointer: fine)';

const matches = () => typeof window !== 'undefined' && typeof window.matchMedia === 'function' && window.matchMedia(QUERY).matches;

/** true com rato (computador), false com dedo (telemóvel/tablet). Atualiza se o ponteiro mudar. */
export function useFinePointer(): boolean {
  const [fine, setFine] = useState(matches);
  useEffect(() => {
    if (typeof window.matchMedia !== 'function') return;
    const mq = window.matchMedia(QUERY);
    const onChange = () => setFine(mq.matches);
    mq.addEventListener('change', onChange);
    return () => mq.removeEventListener('change', onChange);
  }, []);
  return fine;
}
