import type { Meta, StoryObj } from "@storybook/react";
import { Flex } from "./Flex";
import { Box } from "@/components";

const meta: Meta<typeof Flex> = {
  title: "components/primitive/Flex",
  component: Flex,
  tags: ["autodocs"],
  parameters: {
    layout: "centered"
  },
  argTypes: {
    $direction: {
      control: "select",
      options: ["row", "column", "row-reverse", "column-reverse"]
    },
    $align: {
      control: "select",
      options: ["flex-start", "center", "flex-end", "stretch", "baseline"]
    },
    $justify: {
      control: "select",
      options: [
        "flex-start",
        "center",
        "flex-end",
        "space-between",
        "space-around",
        "space-evenly"
      ]
    },
    $gap: {
      control: { type: "range", min: 0, max: 50, step: 1 }
    },
    $wrap: {
      control: "boolean"
    }
  },
  args: {
    children: [
      <Box width={100} height={100} $bg="skyblue" key={"box1"} />,
      <Box width={100} height={100} $bg="coral" key={"box2"} />,
      <Box width={100} height={100} $bg="lightgreen" key={"box3"} />
    ]
  }
};

export default meta;

type Story = StoryObj<typeof Flex>;

export const RowWithGap: Story = {
  args: {
    $direction: "row",
    $gap: 16
  }
};

export const ColumnWithGap: Story = {
  args: {
    $direction: "column",
    $gap: 16
  }
};

export const AlignCenter: Story = {
  args: {
    $align: "center",
    $gap: 10
  }
};

export const JustifySpaceBetween: Story = {
  args: {
    $justify: "space-between"
  },
  decorators: [
    Story => (
      <Box width={600} $border="1px solid black">
        <Story />
      </Box>
    )
  ]
};

export const WrapEnabled: Story = {
  args: {
    $wrap: true,
    $gap: 10,
    children: [
      <Box width={100} height={100} $bg="skyblue" key={"box4"} />,
      <Box width={100} height={100} $bg="coral" key={"box5"} />,
      <Box width={100} height={100} $bg="lightgreen" key={"box6"} />,
      <Box width={100} height={100} $bg="gold" key={"box7"} />
    ]
  },
  decorators: [
    Story => (
      <Box width={400} $border="1px solid black">
        <Story />
      </Box>
    )
  ]
};
