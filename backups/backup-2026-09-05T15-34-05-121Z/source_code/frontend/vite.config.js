import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      // Point directly to the pre-built ESM bundle to bypass Vite dep-optimizer issues
      '@inheritage-foundation/sdk': path.resolve(
        __dirname,
        'node_modules/@inheritage-foundation/sdk/dist/index.js'
      ),
    },
  },
  // Exclude the SDK from Vite's esbuild pre-bundling phase;
  // it is already a bundled ESM artifact and doesn't need transformation.
  optimizeDeps: {
    exclude: ['@inheritage-foundation/sdk'],
  },
  server: {
    port: 5173,
    host: true,
    proxy: {
      '/api': {
        target: 'http://localhost:5000',
        changeOrigin: true,
      },
      '/uploads': {
        target: 'http://localhost:5000',
        changeOrigin: true,
      },
    },
  },
  build: {
    target: 'es2020',
    rollupOptions: {
      output: {
        manualChunks: {
          // Core React — small, shared everywhere
          react: ['react', 'react-dom', 'react-router-dom'],
          // Three.js ecosystem — large, only on pages with 3D
          three: ['three', '@react-three/fiber', '@react-three/drei', '@react-three/postprocessing'],
          // MapLibre GL JS — only on ItemDetail
          maplibre: ['maplibre-gl'],
          // Theatre.js — only in Map3D cinematic intro
          theatre: ['@theatre/core', '@theatre/r3f'],
        },
      },
    },
    chunkSizeWarningLimit: 600,
  },
});
