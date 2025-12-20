import { defineConfig } from "vite";
import { dirname, resolve } from "path";
import { fileURLToPath } from "url";
import react from "@vitejs/plugin-react";

const FILE_NAME = fileURLToPath(import.meta.url);
const DIR_NAME = dirname(FILE_NAME);

export default defineConfig({
  plugins: [
    react({
      jsxImportSource: "@emotion/react"
    })
  ],
  resolve: {
    alias: {
      "@": resolve(DIR_NAME, "src")
    }
  },
  build: {
    lib: {
      entry: resolve(DIR_NAME, "src/index.ts"),
      name: "jobis-sentry",
      fileName: "index",
      formats: ["es"]
    },
    rollupOptions: {
      external: [
        "react",
        "react-dom",
        "@sentry/react",
        "@sentry/core",
        "@emotion/styled",
        "@emotion/react"
      ],
      output: {
        globals: {
          "react": "React",
          "react-dom": "ReactDOM",
          "@sentry/react": "SentryReact",
          "@sentry/core": "SentryCore",
          "@emotion/styled": "EmotionStyled",
          "@emotion/react": "EmotionReact"
        }
      }
    }
  }
});
