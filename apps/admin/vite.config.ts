import { defineConfig, loadEnv } from "vite";
import react from "@vitejs/plugin-react";
import { version, name as projectName } from "./package.json";
import tsconfigPaths from "vite-tsconfig-paths";
import { sentryVitePlugin } from "@sentry/vite-plugin";
import path from "path";
import process from "process";
import { access, constants } from "fs/promises";

type Mode = "development" | "staging" | "production";

const envFolderPath = path.join(import.meta.dirname, "../../");

const isLocal = async () => {
  try {
    await access(path.join(envFolderPath, ".env"), constants.F_OK);
    return true;
  } catch {
    return false;
  }
};

const mode: Mode = (await isLocal())
  ? "development"
  : ((process.env.MODE ?? "development") as Mode);
const env =
  mode === "development" ? loadEnv(mode, envFolderPath, "") : process.env;
const sentryProjectName = projectName.split("/").pop();

const sentryPlugin = sentryVitePlugin({
  org: "team-return",
  project: sentryProjectName,
  release: {
    name: `jobis-${sentryProjectName}@${version}`,
    inject: true,
    create: true,
    finalize: true,
    deploy: {
      env: mode
    }
  },
  authToken: env.VITE_SENTRY_AUTH_TOKEN,
  telemetry: false,
  sourcemaps: {
    assets: ["./dist/assets/**"],
    ignore: ["node_modules"]
  }
});

export default defineConfig({
  build: {
    sourcemap: true
  },
  define: {
    "import.meta.env.MODE": JSON.stringify(env.MODE),
    "import.meta.env.BASE_URL": JSON.stringify(env.BASE_URL)
  },
  plugins: [react(), tsconfigPaths(), sentryPlugin]
});
