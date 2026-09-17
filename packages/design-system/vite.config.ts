/// <reference types="vitest" />
import { type PluginOption, defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import dts from "vite-plugin-dts";
import { createViteConfig } from "../../vite.config.common";

const baseConfig = createViteConfig({
  lib: {
    name: "design-system"
  }
});

export default defineConfig({
  ...baseConfig,
  plugins: [
    ...(baseConfig.plugins as PluginOption[]),
    react(),
    dts({
      entryRoot: ".",
      outDir: "dist",
      include: ["src/", "assets/"],
      exclude: [
        "src/setupTests.ts",
        "src/vitest.setup.ts",
        ".storybook/*",
        "**/*.stories.ts",
        "**/*.stories.tsx",
        "**/*.test.ts",
        "**/*.test.tsx"
      ]
    })
  ] as PluginOption[],
  build: {
    ...baseConfig.build,
    rollupOptions: {
      external: [
        "react",
        "react-dom",
        "react/jsx-runtime",
        "react/jsx-dev-runtime",
        "zustand",
        "@emotion/react",
        "@emotion/styled",
        "@testing-library/react"
      ],
      output: {
        globals: {
          "react": "React",
          "react-dom": "ReactDOM",
          "@emotion/react": "emotionReact",
          "@emotion/styled": "emotionStyled"
        }
      }
    }
  }
});
