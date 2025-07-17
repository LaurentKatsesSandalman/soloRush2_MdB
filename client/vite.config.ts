/// <reference types="vitest" />
import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  test: {
    globals: true,
    environment: 'jsdom', // Pour tester des composants React
    setupFiles: './src/setupTests.js',
  },
  server: {
    port: 3000,
    host: true, // pour rendre accessible depuis l’extérieur du conteneur
  },
});
