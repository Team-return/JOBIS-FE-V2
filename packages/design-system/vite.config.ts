/// <reference types="vitest" />
import { type PluginOption, defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { dirname, resolve } from "path";
import { fileURLToPath } from "url";
import tsconfigPaths from "vite-tsconfig-paths";
import dts from "vite-plugin-dts";
const FILE_NAME = fileURLToPath(import.meta.url);
const DIR_NAME = dirname(FILE_NAME);

export default defineConfig({
  plugins: [
    react(),
    tsconfigPaths(),
    dts({
      entryRoot: ".",
      outDir: "dist",
      include: ["src/", "assets/"],
      exclude: [
        "src/setupTests.ts",
        ".storybook/*",
        "**/*.stories.ts",
        "**/*.stories.tsx",
        "**/*.test.ts",
        "**/*.test.tsx"
      ]
    })
  ] as PluginOption[],
  build: {
    lib: {
      entry: resolve(DIR_NAME, "src/index.ts"),
      name: "jobis-design-system",
      fileName: "index",
      formats: ["es"]
    },
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
