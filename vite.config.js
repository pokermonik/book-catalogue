import { defineConfig } from 'vite';

export default defineConfig({
  base: './', 
  build: {
    outDir: 'dist',
    rollupOptions: {
      output: {
        entryFileNames: `[name].js`,
        chunkFileNames: `[name].js`,
        assetFileNames: (assetInfo) => {
          if (assetInfo.name.endsWith('.css')) return 'style.css';
          return 'assets/[name].[ext]';
        },
      },
    },
  },
});