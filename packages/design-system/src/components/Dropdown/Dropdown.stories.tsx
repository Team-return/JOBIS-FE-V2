import type { Meta, StoryObj } from "@storybook/react-vite";
import { Dropdown } from "./Dropdown";

const meta: Meta<typeof Dropdown> = {
  title: "Components/Dropdown",
  component: Dropdown,
  tags: ["autodocs"],
  args: {
    placeholder: "분야 선택",
    $options: [
      { label: "프론트엔드", value: "frontend" },
      { label: "백엔드", value: "backend" },
      { label: "디자이너", value: "designer" }
    ]
  }
};
export default meta;
type Story = StoryObj<typeof Dropdown>;

export const Default: Story = {};

export const WithPreselected: Story = {
  args: {
    $options: [
      { label: "프론트엔드", value: "frontend" },
      { label: "백엔드", value: "backend" },
      { label: "디자이너", value: "designer" }
    ]
  }
};
