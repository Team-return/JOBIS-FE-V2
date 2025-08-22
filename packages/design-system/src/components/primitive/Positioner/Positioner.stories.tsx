import type { Meta, StoryObj } from "@storybook/react-vite";
import { Positioner } from "./Positioner";
import { Box } from "@/components";

const meta: Meta<typeof Positioner> = {
  title: "components/primitive/Positioner",
  component: Positioner,
  parameters: {
    layout: "centered"
  }
};

export default meta;
type Story = StoryObj<typeof Positioner>;

export const Default: Story = {
  args: {
    $position: "absolute",
    $top: 0,
    $left: 0,
    children: (
      <Box $padding={4} $bg="lightcoral">
        Positioned Box
      </Box>
    )
  },
  decorators: [
    Story => (
      <Box width={300} height={100} $border="1px solid black">
        <Story />
      </Box>
    )
  ]
};
