import { defineConfig } from "vitest/config";
import tsconfigPaths from "vite-tsconfig-paths";
import type { Plugin } from "vitest/config";

export default defineConfig({
  plugins: [tsconfigPaths() as Plugin],
  test: {
    environment: "node",
    include: ["src/**/*.test.ts", "src/**/*.test.tsx"],
    exclude: ["**/node_modules/**", "**/dist/**"]
  }
});