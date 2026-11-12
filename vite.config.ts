import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { VitePWA } from 'vite-plugin-pwa';

// base './' faz o build funcionar em qualquer subpasta (ex.: GitHub Pages em /<repo>/).
export default defineConfig({
  base: './',
  plugins: [
    react(),
    VitePWA({
      registerType: 'autoUpdate',
      includeAssets: ['icon.svg', 'apple-touch-icon.png'],
      manifest: {
        name: '82-0 · Época Perfeita',
        short_name: '82-0',
        description: 'Escolhe 5 lendas da NBA e tenta uma época perfeita de 82 vitórias.',
        lang: 'pt-PT',
        theme_color: '#0b0f1a',
        background_color: '#0b0f1a',
        display: 'standalone',
        orientation: 'portrait',
        start_url: './',
        scope: './',
        icons: [
          { src: 'icon-192.png', sizes: '192x192', type: 'image/png' },
          { src: 'icon-512.png', sizes: '512x512', type: 'image/png' },
          { src: 'icon-maskable-512.png', sizes: '512x512', type: 'image/png', purpose: 'maskable' },
        ],
      },
      workbox: {
        // Inclui as fontes (.woff2), que agora são servidas pelo próprio site.
        globPatterns: ['**/*.{js,css,html,svg,png,woff2}'],
      },
    }),
  ],
});
