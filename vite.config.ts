import { defineConfig } from "vitest/config";
import { resolve } from "path";

export default defineConfig({
  envDir: resolve(import.meta.dirname, "./"),
  test: {
    projects: [
      "apps/admin/vite.config.ts",
      "apps/company/vite.config.ts",
      "apps/student/vite.config.ts",
      "packages/api/vite.config.ts",
      "packages/design-system/vite.config.ts"
    ]
  }
});
