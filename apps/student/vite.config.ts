import { defineConfig /* , loadEnv */ } from "vite";
import react from "@vitejs/plugin-react";
import { version } from "./package.json";
// import { sentryVitePlugin } from "@sentry/vite-plugin";

// const env = loadEnv("production", import.meta.dirname);

// const sentryPlugin = sentryVitePlugin({
//   org: "team-return",
//   project: "jobis-student",
//   release: {
//     name: `jobis-student@${version}`,
//     inject: true,
//     create: true,
//     finalize: true,
//     deploy: {
//       env: "production"
//     }
//   },
//   authToken: env.VITE_SENTRY_AUTH_TOKEN,
//   telemetry: false,
//   sourcemaps: {
//     assets: ["./dist/assets/**"],
//     ignore: ["node_modules"]
//   }
// });

export default defineConfig({
  build: {
    sourcemap: true
  },
  define: {
    "import.meta.env.VITE_APP_DIST": JSON.stringify(new Date().toISOString()),
    "__APP_VERSION__": JSON.stringify(version)
  },
  plugins: [react() /*, sentryPlugin */]
});
