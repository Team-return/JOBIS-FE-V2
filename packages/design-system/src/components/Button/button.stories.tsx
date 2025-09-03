import type { Meta, StoryObj } from "@storybook/react-vite";
import { Button } from "./Button";
import { buttonVariants, buttonSizes } from "./Button.types";
import { expect, fn, userEvent, within } from "storybook/test";

const meta: Meta<typeof Button> = {
  title: "Components/Button",
  component: Button,
  tags: ["autodocs"],
  parameters: { layout: "centered" },
  argTypes: {
    $variant: {
      control: "select",
      options: buttonVariants,
      description: "버튼의 종류"
    },
    $size: {
      control: "select",
      options: buttonSizes,
      description: "버튼의 크기"
    },
    $progressing: {
      control: "boolean",
      description: "버튼 로딩 상태 여부"
    },
    disabled: {
      control: "boolean",
      description: "버튼 비활성화 여부"
    },
    children: {
      control: "text",
      description: "버튼 내부에 표시될 컨텐츠"
    },
    onClick: { action: "clicked", description: "버튼 클릭 이벤트 핸들러" }
  },
  args: {
    children: "Button",
    $variant: "contained",
    $size: "md",
    disabled: false,
    $progressing: false
  }
};

export default meta;
type Story = StoryObj<typeof Button>;

export const Default: Story = {
  args: {
    onClick: fn()
  },
  play: async ({ args, canvasElement }) => {
    const canvas = within(canvasElement);
    const component = canvas.getByRole("button");
    expect(component).toBeInTheDocument();
    await userEvent.click(component);
    await expect(args.onClick).toHaveBeenCalledTimes(1);
  }
};

export const Variants: Story = {
  render: args => (
    <div style={{ display: "flex", gap: "16px" }}>
      <Button {...args} $variant="contained">
        Contained
      </Button>
      <Button {...args} $variant="outline">
        Outline
      </Button>
    </div>
  )
};

export const Sizes: Story = {
  render: args => (
    <div style={{ display: "flex", alignItems: "center", gap: "16px" }}>
      <Button {...args} $size="md">
        Medium
      </Button>
      <Button {...args} $size="lg">
        Large
      </Button>
    </div>
  )
};

export const Disabled: Story = {
  render: args => (
    <div style={{ display: "flex", gap: "16px" }}>
      <Button {...args} $variant="contained" disabled>
        Contained Disabled
      </Button>
      <Button {...args} $variant="outline" disabled>
        Outline Disabled
      </Button>
    </div>
  )
};

export const Progressing: Story = {
  render: args => (
    <div style={{ display: "flex", gap: "16px", alignItems: "center" }}>
      <Button {...args} $variant="contained" $progressing>
        Will not show
      </Button>
    </div>
  ),
  args: {
    $progressing: true
  }
};
