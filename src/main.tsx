import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { App } from './App';
import { LangProvider } from './i18n/LangContext';
// Fontes servidas pelo próprio site (sem Google Fonts): não bloqueiam o primeiro desenho
// da página, ficam na cache da PWA e não fazem pedidos a terceiros.
// Só latim + latim estendido (nomes como Dončić, Şengün, Porziņģis); os outros alfabetos não são precisos.
import '@fontsource/bebas-neue/latin-400.css';
import '@fontsource/bebas-neue/latin-ext-400.css';
import '@fontsource/inter/latin-400.css';
import '@fontsource/inter/latin-ext-400.css';
import '@fontsource/inter/latin-600.css';
import '@fontsource/inter/latin-ext-600.css';
import '@fontsource/inter/latin-800.css';
import '@fontsource/inter/latin-ext-800.css';
import './styles.css';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <LangProvider>
      <App />
    </LangProvider>
  </StrictMode>,
);
