import type { Meta, StoryObj } from "@storybook/react";
import { Visibility } from "./Visibility";
import { Box } from "@/components";

const meta: Meta<typeof Visibility> = {
  title: "components/primitive/Visibility",
  component: Visibility,
  tags: ["autodocs"],
  parameters: {
    layout: "centered"
  },
  argTypes: {
    $opacity: {
      control: { type: "range", min: 0, max: 1, step: 0.1 },
      description: "요소의 불투명도",
      if: { arg: "hidden", truthy: false }
    },
    $invisible: {
      control: "boolean",
      description: "요소 투명화",
      if: { arg: "hidden", truthy: false }
    },
    hidden: {
      control: "boolean",
      description: "요소를 레이아웃에서 제외"
    }
  }
};

export default meta;

type Story = StoryObj<typeof Visibility>;

export const Default: Story = {
  args: {
    children: (
      <Box $padding={24} $bg="#f0f0f0">
        This is visible content.
      </Box>
    )
  }
};

export const WithOpacity: Story = {
  args: {
    $opacity: 0.5,
    children: (
      <Box $padding={24} $bg="#e9f7ef">
        This content has 50% opacity.
      </Box>
    )
  }
};

export const Invisible: Story = {
  args: {
    $invisible: true,
    children: (
      <Box $padding={24} $bg="#f3e8f8">
        This content is invisible but occupies space.
      </Box>
    )
  }
};

export const Hidden: Story = {
  args: {
    hidden: true,
    children: (
      <Box $padding={24} $bg="#d1e7ff">
        This content is completely removed from layout.
      </Box>
    )
  }
};

export const Combined: Story = {
  args: {
    $opacity: 0.3,
    $invisible: false,
    children: (
      <Box $padding={24} $bg="#fff8e1">
        Combined visibility states.
      </Box>
    )
  }
};
