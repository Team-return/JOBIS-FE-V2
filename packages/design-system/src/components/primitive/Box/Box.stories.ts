import type { Meta, StoryObj } from "@storybook/react-vite";
import { Box } from "./Box";

const meta: Meta<typeof Box> = {
  title: "components/primitive/Box",
  component: Box,
  tags: ["autodocs"],
  parameters: {
    layout: "centered"
  },
  argTypes: {
    $bg: {
      control: "color",
      description: "배경색"
    },
    $border: {
      control: "text",
      description: "테두리"
    },
    width: {
      control: "text",
      description: "너비"
    },
    height: {
      control: "text",
      description: "높이"
    },
    $padding: {
      control: "text",
      description: "내부 여백"
    },
    $margin: {
      control: "text",
      description: "외부 여백"
    },
    $radius: {
      control: "text",
      description: "둥근 모서리"
    }
  }
};

export default meta;

type Story = StoryObj<typeof Box>;

export const Default: Story = {
  args: {
    $padding: 24,
    width: 200,
    height: 100,
    $bg: "#f0f0f0",
    $border: "1px solid #ccc",
    $radius: 8,
    children: "This is a Box component"
  }
};

export const CustomPaddingAndMargin: Story = {
  args: {
    $padding: ["20px", "30px"],
    $margin: ["10px", 0],
    $bg: "#e9f7ef",
    $border: "2px dashed #2ecc71",
    children: "Box with custom padding and margin"
  }
};

export const DifferentSizes: Story = {
  args: {
    width: "50%",
    height: 150,
    $bg: "#f3e8f8",
    $radius: "50%",
    children: "50% width, 150px height, circle"
  }
};

export const OnlyPadding: Story = {
  args: {
    $padding: 40,
    $bg: "#d4edda",
    children: "Only padding applied"
  }
};
