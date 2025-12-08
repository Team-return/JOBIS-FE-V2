import { defineConfig } from "vite";
import { dirname, resolve } from "path";
import { fileURLToPath } from "url";

const FILE_NAME = fileURLToPath(import.meta.url);
const DIR_NAME = dirname(FILE_NAME);

export default defineConfig({
  resolve: {
    alias: {
      "@": resolve(DIR_NAME, "src")
    }
  },
  build: {
    lib: {
      entry: resolve(DIR_NAME, "src/index.ts"),
      name: "jobis-api",
      fileName: "index",
      formats: ["es"]
    },
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
