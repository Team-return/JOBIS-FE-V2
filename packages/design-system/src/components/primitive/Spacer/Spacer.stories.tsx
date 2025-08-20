import type { Meta, StoryObj } from "@storybook/react";
import { Spacer } from "./Spacer";
import { Box, Flex } from "@/components";

const meta: Meta<typeof Spacer> = {
  title: "components/primitive/Spacer",
  component: Spacer,
  tags: ["autodocs"],
  parameters: {
    layout: "centered"
  },
  argTypes: {
    $flex: {
      control: { type: "range", min: 1, max: 10, step: 1 }
    }
  }
};

export default meta;

type Story = StoryObj<typeof Spacer>;

export const Default: Story = {
  decorators: [
    Story => (
      <Box width={400} $border="1px solid black">
        <Flex>
          <Box $bg="skyblue" width={50} height={50} />
          <Story />
          <Box $bg="coral" width={50} height={50} />
        </Flex>
      </Box>
    )
  ],
  args: {}
};

export const MultipleSpacers: Story = {
  decorators: [
    Story => (
      <Box width={400} $border="1px solid black">
        <Flex>
          <Box $bg="skyblue" width={50} height={50} />
          <Spacer $flex={2} />
          <Box $bg="coral" width={50} height={50} />
          <Story />
          <Box $bg="lightgreen" width={50} height={50} />
        </Flex>
      </Box>
    )
  ],
  args: {}
};
