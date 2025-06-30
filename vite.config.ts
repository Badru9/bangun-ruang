// vite.config.ts

import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  test: {
    // Vitest akan mengenali ini secara otomatis jika tipe sudah benar di tsconfig.node.json
    globals: true,
    environment: 'jsdom',
    setupFiles: './src/setupTests.ts',
    css: false, // Penting agar tes tidak mencoba memproses CSS
    coverage: {
      reporter: ['text', 'json', 'html'],
      exclude: [
        'node_modules/',
        'src/main.tsx',
        'src/App.tsx',
        'src/types/index.ts',
        'src/components/',
      ], // Contoh: kecualikan file non-logic dari coverage
    },
  },
});
