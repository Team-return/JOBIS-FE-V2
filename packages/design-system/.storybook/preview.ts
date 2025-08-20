import { definePreview } from "@storybook/react-vite";
import { withCustomTheme } from "./withCustomTheme";
import docs from "@storybook/addon-docs";
import a11y from "@storybook/addon-a11y";

const preview = definePreview({
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i
      },
      expanded: true
    },
    a11y: {
      test: "error"
    },
    options: {
      storySort: {
        method: "alphabetical",
        order: ["Components", "Hooks", "*"]
      }
    }
  },
  addons: [docs(), a11y()],
  decorators: [withCustomTheme]
});

export default preview;
