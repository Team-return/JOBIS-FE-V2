import type { StorybookConfig } from "@storybook/react-vite";
import svgr from "vite-plugin-svgr";

const config: StorybookConfig = {
  framework: "@storybook/react-vite",
  stories: ["../src/**/*.stories.@(ts|tsx)"],
  addons: ["@storybook/addon-a11y", "@storybook/addon-docs"],
  docs: {
    defaultName: "Documentation"
  },
  core: {
    disableWhatsNewNotifications: true
  },
  viteFinal: async config => {
    config.plugins = [...(config.plugins || []), svgr()];
    return config;
  }
};

export default config;
