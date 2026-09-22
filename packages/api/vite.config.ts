import { defineConfig } from "vite";
import { createViteConfig } from "../../vite.config.common";

const baseConfig = createViteConfig({
  lib: {
    name: "api"
  }
});

export default defineConfig({
  ...baseConfig,
  build: {
    ...baseConfig.build,
    rollupOptions: {
      external: ["@tanstack/react-query", "axios"],
      output: {
        globals: {
          "@tanstack/react-query": "ReactQuery",
          "axios": "axios"
        }
      }
    }
  }
});
