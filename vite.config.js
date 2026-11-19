import { defineConfig } from 'vite';

// Khi build cho GitHub Pages, web nằm ở https://hoaiditest.github.io/phongkham/
export default defineConfig(({ command }) => ({
  base: command === 'build' ? '/phongkham/' : '/',
  server: { port: 5173, strictPort: true },
}));
