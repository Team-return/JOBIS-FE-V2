/// <reference types="vitest" />
import { defineConfig, type Plugin } from "vitest/config";
import { dirname, resolve } from "path";
import { fileURLToPath } from "url";
import react from "@vitejs/plugin-react-swc";
import svgr from "vite-plugin-svgr";

const FILE_NAME = fileURLToPath(import.meta.url);
const DIR_NAME = dirname(FILE_NAME);

export default defineConfig({
  plugins: [react(), svgr()] as Plugin[],
  test: {
    environment: "jsdom",
    globals: true,
    setupFiles: "./src/setupTests.ts",
    alias: {
      "@": resolve(DIR_NAME, "src")
    }
  }
});
