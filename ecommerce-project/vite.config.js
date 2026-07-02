import { defineConfig } from "vite";
import react, { reactCompilerPreset } from "@vitejs/plugin-react";
import babel from "@rolldown/plugin-babel";

export default defineConfig({
  plugins: [
    react(),
    babel({
      babelConfig: reactCompilerPreset(),
    }),
  ],
  server: {
    proxy: {
      "/api": { target: "http://localhost:3000" },
      "/images": { target: "http://localhost:3000" },
    },
  },
  build: {
    outDir: "../ecommerce-backend/dist",
  },
});
