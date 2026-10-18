import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// Keep the largest browser dependencies in reusable chunks.
export default defineConfig({
  plugins: [react()],
  build: {
    chunkSizeWarningLimit: 600,
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (id.includes('node_modules')) {
            if (id.includes('recharts')) return 'vendor-recharts';
            if (id.includes('firebase')) return 'vendor-firebase';
            if (id.includes('@phosphor-icons')) return 'vendor-icons';
            if (id.includes('react') || id.includes('react-dom') || id.includes('react-router'))
              return 'vendor-react-core';
            return 'vendor-libs';
          }
        },
      },
    },
  },
});
