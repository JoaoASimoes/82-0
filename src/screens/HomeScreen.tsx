import { useMemo } from 'react';
import { loadStats } from '../lib/storage';

interface Props {
  onStart: () => void;
}

export function HomeScreen({ onStart }: Props) {
  const stats = useMemo(loadStats, []);
  return (
    <section className="view">
      <div className="logo">
        <div className="ball" />
        <h1 className="display">82-0</h1>
      </div>
      <p className="tag">Escolhe 5 lendas da NBA. Consegues a época perfeita?</p>

      <div className="card">
        <h3>Como se joga</h3>
        <ol className="rules">
          <li>Roda para sortear uma <b>equipa</b> e uma <b>década</b>.</li>
          <li>Escolhe um jogador desse plantel para o teu cinco (2 bases, 2 extremos, 1 poste). Só vês as <b>médias</b> dele nessa equipa e década.</li>
          <li>Tens <b>1 troca de equipa</b> e <b>1 troca de década</b> por jogo.</li>
          <li>Simula 82 jogos. Ganha todos para fazer <b>82-0</b>.</li>
        </ol>
      </div>

      <div className="card">
        <h3>O teu histórico</h3>
        <div className="stats">
          <div>
            <b>{stats.best === null ? '—' : `${stats.best}-${82 - stats.best}`}</b>
            <span className="muted small">Melhor época</span>
          </div>
          <div>
            <b>{stats.played}</b>
            <span className="muted small">Épocas</span>
          </div>
          <div>
            <b>{stats.perfect}</b>
            <span className="muted small">82-0</span>
          </div>
        </div>
      </div>

      <button className="btn" onClick={onStart}>
        Jogar
      </button>
      <p className="muted small center" style={{ marginTop: 14 }}>
        Cada jogador tem uma nota secreta do seu impacto nessa equipa e década — é ela que decide a época. Médias aproximadas.
      </p>
    </section>
  );
}
