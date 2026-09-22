import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  // relative base so the build also works when opened straight from disk (file://)
  base: './',
  plugins: [react(), tailwindcss()],
  server: { port: 5183 },
  build: {
    // one JS chunk and one CSS file makes the single-file bundle trivial to assemble
    cssCodeSplit: false,
    assetsInlineLimit: 0,
    rollupOptions: {
      output: {
        inlineDynamicImports: true,
        entryFileNames: 'app.js',
        assetFileNames: '[name][extname]',
      },
    },
  },
})
