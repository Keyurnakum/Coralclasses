import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';
import path from 'path';
import {defineConfig, loadEnv} from 'vite';
import fs from 'fs';

export default defineConfig(({mode}) => {
  const env = loadEnv(mode, '.', '');
  return {
    plugins: [
      react(),
      tailwindcss(),
      {
        name: 'spa-fallback',
        apply: 'serve',
        enforce: 'post',
        configureServer(server) {
          return () => {
            server.middlewares.use((req, res, next) => {
              const isFile = /\.\w+$/.test(req.url);
              const isApi = req.url.startsWith('/api');
              const isGet = req.method === 'GET';
              
              if (isGet && !isFile && !isApi) {
                const indexPath = path.resolve(__dirname, 'index.html');
                const content = fs.readFileSync(indexPath, 'utf-8');
                res.setHeader('Content-Type', 'text/html');
                res.end(content);
              } else {
                next();
              }
            });
          };
        },
      },
    ],
    define: {
      'process.env.GEMINI_API_KEY': JSON.stringify(env.GEMINI_API_KEY),
    },
    resolve: {
      alias: {
        '@': path.resolve(__dirname, '.'),
      },
    },
    server: {
      hmr: process.env.DISABLE_HMR !== 'true',
      host: true,
      proxy: {
        '/api': {
          target: 'http://localhost:8787',
          changeOrigin: true,
        },
      },
    },
    preview: {
      host: true,
    },
  };
});
