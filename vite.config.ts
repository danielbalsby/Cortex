import react from "@vitejs/plugin-react";
import { viteSingleFile } from "vite-plugin-singlefile";
import { defineConfig } from "vitest/config";

// Bygger hele appen til én selvstændig HTML-fil (dist/index.html → cortex.html),
// som kan åbnes med dobbeltklik uden installation og uden netværk.
export default defineConfig({
  plugins: [react(), viteSingleFile()],
  test: {
    include: ["src/**/*.test.ts", "lib/**/*.test.ts", "indhold/**/*.test.ts", "review/cases/**/*.test.ts"]
  }
});
