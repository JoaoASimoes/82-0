import { useState } from 'react';
import type { Slot } from './game/draft';
import { HomeScreen } from './screens/HomeScreen';
import { DraftScreen } from './screens/DraftScreen';
import { SeasonScreen } from './screens/SeasonScreen';
import { Toast, useToast } from './components/Toast';

type Screen = { name: 'home' } | { name: 'draft' } | { name: 'season'; lineup: Slot[] };

export function App() {
  const [screen, setScreen] = useState<Screen>({ name: 'home' });
  // Muda a key a cada jogo novo para os ecrãs começarem do zero.
  const [gameId, setGameId] = useState(0);
  const toast = useToast();

  const newGame = () => {
    setGameId((n) => n + 1);
    setScreen({ name: 'draft' });
    window.scrollTo(0, 0);
  };

  return (
    <div className="wrap">
      {screen.name === 'home' && <HomeScreen onStart={newGame} />}
      {screen.name === 'draft' && (
        <DraftScreen
          key={gameId}
          onQuit={() => setScreen({ name: 'home' })}
          onComplete={(lineup) => {
            setScreen({ name: 'season', lineup });
            window.scrollTo(0, 0);
          }}
        />
      )}
      {screen.name === 'season' && (
        <SeasonScreen key={gameId} lineup={screen.lineup} onAgain={newGame} onHome={() => setScreen({ name: 'home' })} toast={toast.show} />
      )}
      <Toast message={toast.message} />
    </div>
  );
}
