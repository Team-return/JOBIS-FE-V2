import { type PluginOption, defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { createViteConfig } from "../../vite.config.common";

const baseConfig = createViteConfig({
  lib: {
    name: "sentry"
  }
});

export default defineConfig({
  ...baseConfig,
  plugins: [
    ...(baseConfig.plugins as PluginOption[]),
    react({
      jsxImportSource: "@emotion/react"
    })
  ],
  build: {
    ...baseConfig.build,
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
