import type { Meta, StoryObj } from "@storybook/react-vite";
import { Dropdown } from "./Dropdown";

const meta: Meta<typeof Dropdown> = {
  title: "Components/Dropdown",
  component: Dropdown,
  tags: ["autodocs"],
  args: {
    $placeholder: "분야 선택",
    options: [
      { label: "프론트엔드", value: "frontend" },
      { label: "백엔드", value: "backend" },
      { label: "디자이너", value: "designer" },
      { label: "데브옵스", value: "devops" }
    ]
  },
  argTypes: {
    options: {
      control: "object",
      description: "드롭다운에 표시할 옵션 목록"
    },
    value: {
      control: "text",
      description: "선택된 값 (제어 컴포넌트)"
    },
    defaultValue: {
      control: "text",
      description: "기본 선택 값"
    },
    onChange: {
      action: "changed",
      description: "선택 값 변경 이벤트 핸들러"
    },
    $width: {
      control: "text",
      description: "드롭다운의 너비 (px, %, 등)"
    },
    $placeholder: {
      control: "text",
      description: "선택되지 않았을 때 표시할 플레이스홀더"
    },
    types: {
      control: "radio",
      options: [undefined, "supportJob", "period"],
      description: "드롭다운 스타일/타입"
    }
  }
};

export default meta;
type Story = StoryObj<typeof Dropdown>;

export const Default: Story = {};

export const WithPreselected: Story = {
  args: {
    defaultValue: "backend"
  }
};

export const Controlled: Story = {
  args: {
    value: "designer"
  }
};
