import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig(({ mode }) => {
  // Use '.' instead of process.cwd() to avoid TypeScript error: Property 'cwd' does not exist on type 'Process'
  const env = loadEnv(mode, '.', '');
  return {
    plugins: [react()],
    // Explicitly define public directory to ensure Vercel/Render and local dev server find assets
    publicDir: 'public', 
    define: {
      // Polyfill process.env.API_KEY for the browser
      'process.env.API_KEY': JSON.stringify(env.API_KEY),
    },
    build: {
      // Ensure empty output directory is cleaned but public assets are copied
      emptyOutDir: true,
    }
  };
});