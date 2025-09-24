import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { viteStaticCopy } from "vite-plugin-static-copy";
import path from "path";

export default defineConfig({
  root: "", // React app lives here
  plugins: [
    react(),
    viteStaticCopy({
      targets: [
        {
          src: "public/*", // relative to /react
          dest: "", // copies into dist root (alongside index.html)
        },
      ],
    }),
  ],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "react"), // import from '/react/...'
    },
  },
  build: {
    outDir: "../dist", // put build output at project/dist
    assetsDir: "react/bundle/assets", // put assets under dist/react/bundle/assets
    emptyOutDir: true,
  },
  server: {
    host: true, // or "0.0.0.0" to listen on all interfaces
    port: 5173,
    proxy: {
      "/Web/NewAuth": {
        target: "https://sveapanelen.se",
        changeOrigin: true,
        secure: true,
      },
      "/Web/Referral": {
        target: "https://sveapanelen.se",
        changeOrigin: true,
        secure: true,
      },
    },
  },
});
