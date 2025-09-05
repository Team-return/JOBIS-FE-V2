import type { Meta, StoryObj } from "@storybook/react-vite";
import { Toast } from "./Toast";

const meta: Meta<typeof Toast> = {
  title: "components/Toast",
  component: Toast,
  tags: ["autodocs"],
  parameters: {
    layout: "centered"
  },
  argTypes: {
    label: {
      control: "text",
      description: "토스트에 표시될 내용"
    },
    $type: {
      control: "select",
      options: ["success", "error", "warning", "info"],
      description: "토스트의 종류"
    }
  }
};

export default meta;
type Story = StoryObj<typeof Toast>;

export const Default: Story = {
  args: {
    label: "This is a toast message.",
    $type: "success"
  }
};

export const Success: Story = {
  args: {
    label: "요청에 성공했습니다.",
    $type: "success"
  }
};

export const Error: Story = {
  args: {
    label: "에러가 발생했습니다.",
    $type: "error"
  }
};

export const Warning: Story = {
  args: {
    label: "주의가 필요한 작업입니다.",
    $type: "warning"
  }
};

export const Info: Story = {
  args: {
    label: "정보를 확인해주세요.",
    $type: "info"
  }
};
