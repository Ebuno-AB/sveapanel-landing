import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      // Proxy API calls to your production backend
      '/Web/NewAuth': {
        target: 'https://sveapanelen.se',
        changeOrigin: true,
        secure: true,
      }
    }
  }
})
