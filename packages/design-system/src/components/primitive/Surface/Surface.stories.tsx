import type { Meta, StoryObj } from "@storybook/react";
import { Surface } from "./Surface";
import { Box } from "@/components";

const meta: Meta<typeof Surface> = {
  title: "components/primitive/Surface",
  component: Surface,
  tags: ["autodocs"],
  parameters: {
    layout: "centered"
  },
  argTypes: {
    $shadow: {
      control: "boolean",
      description: "그림자 표시 여부"
    },
    $radius: {
      control: "text",
      description: "둥근 모서리"
    },
    $bg: {
      control: "color",
      description: "배경색"
    },
    $border: {
      control: "text",
      description: "테두리"
    },
    $padding: {
      control: "text",
      description: "내부 여백"
    }
  }
};

export default meta;

type Story = StoryObj<typeof Surface>;

export const Default: Story = {
  args: {
    $bg: "#ebebeb",
    $padding: 24,
    children: <Box>Default Surface</Box>
  }
};

export const WithShadow: Story = {
  args: {
    $bg: "#ebebeb",
    $shadow: true,
    $padding: 24,
    children: <Box>Surface with shadow</Box>
  }
};

export const CustomStyle: Story = {
  args: {
    $shadow: true,
    $radius: "8px",
    $bg: "#ebebeb",
    $border: "1px solid #e5e5e5",
    $padding: 24,
    children: <Box>Custom styled surface</Box>
  }
};

export const WithCustomRadius: Story = {
  args: {
    $bg: "#ebebeb",
    $shadow: true,
    $radius: ["16px", 0, "16px", 0],
    $padding: 24,
    children: <Box>Surface with custom radius</Box>
  }
};
