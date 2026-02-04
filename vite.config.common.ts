import { type PluginOption, defineConfig, loadEnv } from "vite";
import react from "@vitejs/plugin-react";
import tsconfigPaths from "vite-tsconfig-paths";
import { sentryVitePlugin } from "@sentry/vite-plugin";
import path from "path";
import process from "process";
import { access, constants } from "fs/promises";

type Mode = "development" | "staging" | "production";

const DIR_NAME = import.meta.dirname;

const isLocal = async () => {
  try {
    await access(path.join(DIR_NAME, ".env"), constants.F_OK);
    return true;
  } catch {
    return false;
  }
};

const mode: Mode = (await isLocal())
  ? "development"
  : ((process.env.MODE ?? "development") as Mode);
const env = mode === "development" ? loadEnv(mode, DIR_NAME, "") : process.env;

export const createViteConfig = ({
  app,
  lib
}: {
  app?: {
    name: string;
    version: string;
  };
  lib?: {
    name: string;
  };
}) => {
  if (app) {
    const sentryProjectName = app.name.split("/").pop()!;
    const sentryPlugin = sentryVitePlugin({
      org: "team-return",
      project: sentryProjectName,
      release: {
        name: `jobis-${sentryProjectName}@${app.version}`,
        inject: true,
        create: true,
        finalize: true,
        deploy: {
          env: mode
        }
      },
      authToken: env.SENTRY_AUTH_TOKEN,
      telemetry: false,
      sourcemaps: {
        assets: ["./dist/assets/**"],
        ignore: ["node_modules"]
      }
    });

    return defineConfig({
      build: {
        sourcemap: true
      },
      define: {
        "import.meta.env.MODE": JSON.stringify(mode),
        "import.meta.env.BASE_URL": JSON.stringify(env.BASE_URL),
        "import.meta.env.FILE_URL": JSON.stringify(env.FILE_URL),
        "import.meta.env.SENTRY_DSN": JSON.stringify(
          env[`SENTRY_${sentryProjectName.toUpperCase()}_DSN`]
        ),
        "import.meta.env.VERSION": JSON.stringify(app.version),
        "import.meta.env.APP_DIST": JSON.stringify(sentryProjectName)
      },
      plugins: [react(), tsconfigPaths(), sentryPlugin] as PluginOption[],
      publicDir: path.join(DIR_NAME, "public")
    });
  } else if (lib) {
    return defineConfig({
      plugins: [tsconfigPaths()] as PluginOption[],
      define: {
        "import.meta.env.MODE": JSON.stringify(mode),
        "import.meta.env.BASE_URL": JSON.stringify(env.BASE_URL)
      },
      build: {
        lib: {
          entry: path.join(DIR_NAME, `packages/${lib.name}/src/index.ts`),
          name: `jobis-${lib.name}`,
          fileName: "index",
          formats: ["es"]
        }
      }
    });
  } else {
    throw new Error("[RT] app or lib required");
  }
};
