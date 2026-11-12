import { useCallback, useRef, useState } from 'react';

export function useToast() {
  const [message, setMessage] = useState<string | null>(null);
  const timer = useRef<number | undefined>(undefined);
  const show = useCallback((msg: string) => {
    setMessage(msg);
    window.clearTimeout(timer.current);
    timer.current = window.setTimeout(() => setMessage(null), 1800);
  }, []);
  return { message, show };
}

export function Toast({ message }: { message: string | null }) {
  return <div className={`toast ${message ? 'on' : ''}`}>{message}</div>;
}
