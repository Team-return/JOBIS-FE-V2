import { Meta, StoryObj } from "@storybook/react-vite";
import { Skeleton } from "./Skeleton";

const meta: Meta<typeof Skeleton> = {
  title: "components/core/Skeleton",
  component: Skeleton,
  tags: ["autodocs"],
  parameters: { layout: "centered" },
  argTypes: {
    width: {
      control: "text",
      description: "너비"
    },
    height: {
      control: "text",
      description: "높이"
    },
    $radius: {
      control: "text",
      description: "둥근 모서리"
    }
  }
};

export default meta;

type Story = StoryObj<typeof Skeleton>;

export const Default: Story = {
  args: {
    width: "200px",
    height: "100px",
    $radius: "8px"
  }
};
