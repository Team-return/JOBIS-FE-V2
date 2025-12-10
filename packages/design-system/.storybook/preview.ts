import { definePreview } from "@storybook/react-vite";
import { withCustomTheme } from "./withCustomTheme";
import docs from "@storybook/addon-docs";
import a11y from "@storybook/addon-a11y";

if (typeof document !== "undefined" && !document.getElementById("toast-root")) {
  const div = document.createElement("div");
  div.id = "toast-root";
  document.body.appendChild(div);
}

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
    backgrounds: {
      default: "light",
      disable: true,
      options: {
        light: { name: "Light", value: "#fff" },
        dark: { name: "Dark", value: "#000" }
      }
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
