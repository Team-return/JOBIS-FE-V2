import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import { dirname, resolve } from "path";
import { fileURLToPath } from "url";

const FILE_NAME = fileURLToPath(import.meta.url);
const DIR_NAME = dirname(FILE_NAME);

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      "@": resolve(DIR_NAME, "src")
    }
  },
  build: {
    lib: {
      entry: resolve(DIR_NAME, "src/index.ts"),
      name: "jobis-design-system",
      fileName: format => `jobis-design-system.${format}.js`
    },
    rollupOptions: {
      external: ["react", "react-dom", "@emotion/react", "@emotion/styled"],
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
