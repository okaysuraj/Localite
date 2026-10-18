import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  build: {
    chunkSizeWarningLimit: 600,
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (id.includes('node_modules')) {
            if (id.includes('three') || id.includes('@react-three')) return 'vendor-three';
            if (id.includes('leaflet') || id.includes('react-leaflet')) return 'vendor-leaflet';
            if (id.includes('recharts')) return 'vendor-recharts';
            if (id.includes('firebase')) return 'vendor-firebase';
            if (id.includes('framer-motion') || id.includes('gsap') || id.includes('lenis')) return 'vendor-motion';
            if (id.includes('@phosphor-icons') || id.includes('lucide-react')) return 'vendor-icons';
            if (id.includes('react') || id.includes('react-dom') || id.includes('react-router')) return 'vendor-react-core';
            return 'vendor-libs';
          }
        }
      }
    }
  }
})

