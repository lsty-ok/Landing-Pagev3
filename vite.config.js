import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
  ],
  build: {
    // Menaikkan batas peringatan ukuran chunk menjadi 1600 kB karena aplikasi kita menggunakan WebGL/3D (Three.js)
    chunkSizeWarningLimit: 1600,
    rollupOptions: {
      output: {
        // Melakukan Code-Splitting (pemisahan file bundle) agar browser bisa mengunduh file secara paralel
        manualChunks(id) {
          if (id.includes('node_modules')) {
            // Pisahkan pustaka 3D (Three.js & React Three Fiber) ke dalam file tersendiri
            if (id.includes('three') || id.includes('@react-three')) {
              return 'three-vendor'
            }
            // Pisahkan pustaka animasi (GSAP & Lenis) ke dalam file tersendiri
            if (id.includes('gsap') || id.includes('lenis')) {
              return 'animation-vendor'
            }
            // Sisanya masuk ke vendor umum (seperti React, lucide-react)
            return 'vendor'
          }
        }
      }
    }
  }
})
