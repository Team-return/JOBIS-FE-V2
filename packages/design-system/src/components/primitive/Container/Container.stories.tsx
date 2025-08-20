import type { Meta, StoryObj } from "@storybook/react";
import { Container } from "./Container";
import { Box } from "@/components";

const meta: Meta<typeof Container> = {
  title: "components/primitive/Container",
  component: Container,
  tags: ["autodocs"],
  parameters: {
    layout: "centered"
  },
  argTypes: {
    $maxWidth: {
      control: "text",
      description: "컨테이너의 최대 너비 (px 또는 %)"
    },
    $padding: {
      control: "text",
      description: "컨테이너 내부 여백 (px)"
    },
    $bg: {
      control: "color",
      description: "배경색"
    }
  }
};

export default meta;

type Story = StoryObj<typeof Container>;

export const Default: Story = {
  args: {
    $maxWidth: 800,
    $padding: 16,
    $bg: "#f4f4f4",
    children: (
      <Box $bg="#cccccc" height={150}>
        Content inside container
      </Box>
    )
  }
};

export const LargeContainer: Story = {
  args: {
    $maxWidth: 1200,
    $bg: "#f4f4f4",
    children: (
      <Box $bg="#e9f7ef" height={200}>
        Content with larger max width
      </Box>
    )
  }
};

export const CustomPadding: Story = {
  args: {
    $maxWidth: 960,
    $padding: [24, 48],
    $bg: "#f4f4f4",
    children: (
      <Box $bg="#f3e8f8" height={100}>
        Content with custom padding
      </Box>
    )
  }
};

export const FullWidthContainer: Story = {
  args: {
    $maxWidth: "100%",
    $padding: 0,
    $bg: "#f4f4f4",
    children: (
      <Box $bg="#d4edda" height={120}>
        Full width container with no padding
      </Box>
    )
  }
};
