import { defineConfig } from "vitest/config";

export default defineConfig({
  resolve: {
    tsconfigPaths: true
  },
  test: {
    environment: "node",
    globals: false,
    include: ["engine/**/*.test.ts", "clinical/**/*.test.ts"],
    exclude: ["e2e/**"]
  }
});
