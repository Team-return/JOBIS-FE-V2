import type { Meta, StoryObj } from "@storybook/react-vite";
import { Grid } from "./Grid";
import { Box } from "@/components";

const meta: Meta<typeof Grid> = {
  title: "components/primitive/Grid",
  component: Grid,
  tags: ["autodocs"],
  parameters: {
    layout: "centered"
  },
  argTypes: {
    $columns: {
      control: "text",
      description: "행 템플릿"
    },
    $rows: {
      control: "text",
      description: "열 템플릿"
    },
    $gap: {
      control: { type: "range", min: 0, max: 50, step: 1 },
      description: "아이템 간격"
    }
  },
  args: {
    children: [
      <Box width={100} height={100} $bg="skyblue" key={"box1"} />,
      <Box width={100} height={100} $bg="coral" key={"box2"} />,
      <Box width={100} height={100} $bg="lightgreen" key={"box3"} />,
      <Box width={100} height={100} $bg="gold" key={"box4"} />
    ]
  }
};

export default meta;

type Story = StoryObj<typeof Grid>;

export const BasicGrid: Story = {
  args: {
    $columns: "repeat(2, 1fr)",
    $gap: 16
  }
};

export const ThreeColumnGrid: Story = {
  args: {
    $columns: "repeat(3, 1fr)",
    $gap: 20
  }
};

export const ExplicitColumns: Story = {
  args: {
    $columns: "100px 150px 200px",
    $gap: 10
  }
};

export const GridWithRows: Story = {
  args: {
    $columns: "repeat(2, 1fr)",
    $rows: "100px 150px",
    $gap: 15
  }
};

export const LargeGapGrid: Story = {
  args: {
    $columns: "repeat(2, 1fr)",
    $gap: 30
  }
};
