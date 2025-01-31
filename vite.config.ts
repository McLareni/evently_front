import react from '@vitejs/plugin-react';
import path from 'path';
import { defineConfig } from 'vite';

export default defineConfig({
  plugins: [react()],
  base: '/',
  server: {
    port: 5173
  },
  build: {
    outDir: 'dist',
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src/'),
      components: path.resolve(__dirname, './src/components/'),
      public: path.resolve(__dirname, './public/'),
      pages: path.resolve(__dirname, './src/pages'),
      types: path.resolve(__dirname, './src/@types'),
    },
  },
});
