import type { Meta, StoryObj } from "@storybook/react-vite";
import Button from "./button";
import { buttonVariants, buttonSizes } from "./button.types";

const meta: Meta<typeof Button> = {
  title: "Components/Button",
  component: Button,
  tags: ["autodocs"],
  parameters: {
    docs: {
      description: {
        component: "사용자 인터랙션을 위한 기본 버튼 컴포넌트입니다."
      }
    }
  },
  argTypes: {
    variant: {
      control: "select",
      options: buttonVariants,
      description: "버튼의 종류 (contained, outline)"
    },
    size: {
      control: "select",
      options: buttonSizes,
      description: "버튼의 크기 (md, lg)"
    },
    progressing: {
      control: "boolean",
      description: "버튼 로딩 상태 여부 (contained variant 전용)"
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
    variant: "contained",
    size: "md",
    disabled: false,
    progressing: false
  }
};

export default meta;
type Story = StoryObj<typeof Button>;

export const Default: Story = {};

export const Variants: Story = {
  render: args => (
    <div style={{ display: "flex", gap: "16px" }}>
      <Button {...args} variant="contained">
        Contained
      </Button>
      <Button {...args} variant="outline">
        Outline
      </Button>
    </div>
  )
};

export const Sizes: Story = {
  render: args => (
    <div style={{ display: "flex", alignItems: "center", gap: "16px" }}>
      <Button {...args} size="md">
        Medium
      </Button>
      <Button {...args} size="lg">
        Large
      </Button>
    </div>
  )
};

export const Disabled: Story = {
  render: args => (
    <div style={{ display: "flex", gap: "16px" }}>
      <Button {...args} variant="contained" disabled>
        Contained Disabled
      </Button>
      <Button {...args} variant="outline" disabled>
        Outline Disabled
      </Button>
    </div>
  )
};

export const Progressing: Story = {
  render: args => (
    <div style={{ display: "flex", gap: "16px", alignItems: "center" }}>
      <Button {...args} variant="contained" progressing>
        Will not show
      </Button>
    </div>
  ),
  args: {
    progressing: true
  }
};
