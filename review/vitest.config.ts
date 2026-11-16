import { fileURLToPath } from "node:url";
import { defineConfig } from "vitest/config";

// Kører kun review-testsættet: npx vitest run --config review/vitest.config.ts
export default defineConfig({
  root: fileURLToPath(new URL("..", import.meta.url)),
  test: { include: ["review/cases/**/*.test.ts"] }
});
