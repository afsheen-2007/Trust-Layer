import path from 'path';
import { fileURLToPath } from 'url';
import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export default defineConfig(({ mode }) => {
    // Load env file based on `mode` in the current working directory.
    // Set the third parameter to '' to load all env regardless of the `VITE_` prefix.
    const env = loadEnv(mode, process.cwd(), '');

    return {
      server: {
        port: 3000,
        host: '0.0.0.0',
      },
      plugins: [react()],
      define: {
        // Vercel and Vite handle env vars differently. 
        // We manually stringify the specific key we need to ensure it's embedded in the build.
        'process.env.API_KEY': JSON.stringify(env.GEMINI_API_KEY),
      },
      resolve: {
        alias: {
          '@': path.resolve(__dirname, '.'),
        }
      },
      build: {
        outDir: 'dist',
        sourcemap: false,
        chunkSizeWarningLimit: 1600,
        rollupOptions: {
          output: {
            manualChunks(id) {
              if (id.includes('node_modules')) {
                if (id.includes('three') || id.includes('@react-three')) {
                  return 'three-vendor';
                }
                if (id.includes('@google/genai')) {
                  return 'genai-vendor';
                }
                if (id.includes('recharts') || id.includes('lucide-react')) {
                  return 'ui-vendor';
                }
                return 'vendor';
              }
            }
          }
        }
      }
    };
});