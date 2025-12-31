import type { Meta, StoryObj } from "@storybook/react-vite";
import { Footer } from "./Footer";

const meta: Meta<typeof Footer> = {
  title: "components/compound/Footer",
  component: Footer,
  parameters: {
    layout: "fullscreen"
  },
  tags: ["autodocs"]
};

export default meta;
type Story = StoryObj<typeof Footer>;

export const Default: Story = {};
