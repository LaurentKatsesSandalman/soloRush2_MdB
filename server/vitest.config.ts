import { defineConfig } from 'vitest/config';

export default defineConfig({
  test: {
    globals: true,            // pour ne pas importer describe, it, expect partout
    environment: 'node',      // environnement backend Node.js
    coverage: {
      provider: 'v8',         // outil de couverture
      reporter: ['text', 'lcov'], // rapports console et fichiers lcov
    },
    include: ['src/**/*.test.ts'], // où sont tes tests backend
  },
});
