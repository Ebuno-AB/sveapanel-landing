import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";

export default defineConfig({
  root: "", // React app lives here
  plugins: [
    react(),
  ],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "react"), // import from '/react/...'
    },
  },
  build: {
    outDir: "dist", // put build output at project/dist
    assetsDir: "react/bundle/assets", // put assets under dist/react/bundle/assets
    emptyOutDir: true,
  },
  server: {
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
