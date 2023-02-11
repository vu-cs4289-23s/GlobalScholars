import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import viteCompression from "vite-plugin-compression";

// https://vitejs.dev/config/
export default defineConfig({
  server: {
    port: 3000,
    proxy: {
      "/api/v1": {
        target: "http://localhost:8080/",
      },
    },
  },
  plugins: [
    react(),
    viteCompression({
      algorithm: "brotliCompress",
      verbose: true,
      threshold: 500,
    }),
  ],
});
