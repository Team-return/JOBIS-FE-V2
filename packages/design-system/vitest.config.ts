/// <reference types="vitest" />
import { type Plugin, defineConfig } from "vitest/config";
import { storybookTest } from "@storybook/addon-vitest/vitest-plugin";
import tsconfigPaths from "vite-tsconfig-paths";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [
    tsconfigPaths() as Plugin,
    react() as Plugin[],
    storybookTest({
      configDir: ".storybook"
    })
  ],
  test: {
    name: "storybook",
    browser: {
      enabled: true,
      headless: true,
      provider: "playwright",
      instances: [{ browser: "chromium" }]
    },
    setupFiles: ["src/vitest.setup.ts"],
    exclude: [
      "**/node_modules/**",
      "**/dist/**",
      "**/.storybook/**",
      "**/node_modules/@storybook/addon-vitest/**"
    ],
    coverage: {
      provider: "v8",
      reporter: ["text", "json", "html"],
      exclude: [
        "node_modules/",
        "dist/",
        ".storybook/",
        "**/*.stories.{ts,tsx}",
        "**/*.test.{ts,tsx}",
        "**/*.spec.{ts,tsx}",
        "**/vitest.setup.ts"
      ]
    }
  }
});
