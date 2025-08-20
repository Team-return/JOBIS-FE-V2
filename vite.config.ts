import { defineConfig } from "vite";
import { resolve } from "path";

export default defineConfig({
  envDir: resolve(import.meta.dirname, "./")
});
