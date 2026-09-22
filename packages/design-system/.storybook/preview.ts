import type { Preview } from "@storybook/react-vite";
import { withCustomTheme } from "./withCustomTheme";

if (typeof document !== "undefined") {
  if (!document.getElementById("toast-root")) {
    const toastDiv = document.createElement("div");
    toastDiv.id = "toast-root";
    document.body.appendChild(toastDiv);
  }

  if (!document.getElementById("modal-root")) {
    const modalDiv = document.createElement("div");
    modalDiv.id = "modal-root";
    document.body.appendChild(modalDiv);
  }
}

const preview: Preview = {
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i
      },
      expanded: true
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
  decorators: [withCustomTheme]
};

export default preview;
