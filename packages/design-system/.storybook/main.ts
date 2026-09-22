import type { StorybookConfig } from "@storybook/react-vite";
import { mergeConfig } from "vite";
import { dirname, resolve } from "path";
import { fileURLToPath } from "url";

const FILE_NAME = fileURLToPath(import.meta.url);
const DIR_NAME = dirname(FILE_NAME);

const config: StorybookConfig = {
  framework: "@storybook/react-vite",
  stories: ["../src/**/*.stories.@(ts|tsx)"],
  addons: ["@storybook/addon-docs", "@storybook/addon-vitest"],
  staticDirs: ["../assets"],
  docs: {
    defaultName: "Documentation"
  },
  core: {
    disableWhatsNewNotifications: true
  },
  viteFinal(config) {
    return mergeConfig(config, {
      resolve: {
        alias: {
          "react": resolve(DIR_NAME, "../node_modules/react"),
          "react-dom": resolve(DIR_NAME, "../node_modules/react-dom")
        }
      }
    });
  }
};

export default config;
