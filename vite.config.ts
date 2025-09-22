import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { viteStaticCopy } from "vite-plugin-static-copy";

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    viteStaticCopy({
      targets: [
        {
          src: "react/public",
          dest: "react"
        }
      ]
    })
  ],
  build: {
    outDir: "dist",       // keep index.html in root
    assetsDir: "react/bundle/assets", // put everything else in here
    emptyOutDir: true
  },
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
