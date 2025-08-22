import type { Meta, StoryObj } from "@storybook/react-vite";
import { Layer } from "./Layer";
import { Box, Positioner } from "@/components";

const meta: Meta<typeof Layer> = {
  title: "components/primitive/Layer",
  component: Layer,
  parameters: {
    layout: "centered"
  }
};

export default meta;
type Story = StoryObj<typeof Layer>;

export const Default: Story = {
  args: {
    children: "Layer with z-index"
  },
  decorators: [
    () => (
      <Box width={300} height={150} $border="1px solid black">
        <Positioner $position="absolute" $top={0} $left={0}>
          <Layer $level={1}>
            <Box $padding={4} $bg="lightblue">
              Layer 1
            </Box>
          </Layer>
        </Positioner>
        <Positioner $position="absolute" $top={20} $left={20}>
          <Layer $level={2}>
            <Box $padding={4} $bg="lightcoral">
              Layer 2 (On Top)
            </Box>
          </Layer>
        </Positioner>
        <Positioner $position="absolute" $top={40} $left={40}>
          <Layer $level={1}>
            <Box $padding={4} $bg="lightgreen">
              Layer 1
            </Box>
          </Layer>
        </Positioner>
      </Box>
    )
  ]
};
