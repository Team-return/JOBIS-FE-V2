import type { Meta, StoryObj } from "@storybook/react-vite";
import { Stack } from "./Stack";
import { Box } from "@/components";

const meta: Meta<typeof Stack> = {
  title: "components/primitive/Stack",
  component: Stack,
  tags: ["autodocs"],
  parameters: {
    layout: "centered"
  },
  argTypes: {
    $direction: {
      control: "select",
      options: ["row", "column"]
    },
    $gap: {
      control: { type: "range", min: 0, max: 50, step: 1 }
    }
  },
  args: {
    children: [
      <Box width={100} height={50} $bg="skyblue" />,
      <Box width={100} height={50} $bg="coral" />,
      <Box width={100} height={50} $bg="lightgreen" />
    ]
  }
};

export default meta;

type Story = StoryObj<typeof Stack>;

export const VerticalStack: Story = {
  args: {
    $direction: "column",
    $gap: 12
  }
};

export const HorizontalStack: Story = {
  args: {
    $direction: "row",
    $gap: 12
  }
};

export const LargeGap: Story = {
  args: {
    $gap: 32
  }
};

export const NoGap: Story = {
  args: {
    $gap: 0
  }
};
