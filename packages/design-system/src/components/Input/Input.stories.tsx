import type { Meta, StoryObj } from "@storybook/react-vite";
import { fn, userEvent, within, expect } from "storybook/test";
import { Input } from "./Input";

const meta: Meta<typeof Input> = {
  title: "components/Input",
  component: Input,
  tags: ["autodocs"],
  args: {
    $label: "Label",
    onChange: fn(),
    disabled: false,
    value: "",
    placeholder: "텍스트를 입력해주세요.",
    $width: "300px",
    $isError: false,
    $errorMessage: "에러가 발생했습니다."
  },
  argTypes: {
    $label: {
      control: "text",
      description: "인풋 위에 표시될 라벨"
    },
    value: {
      control: "text",
      description: "인풋의 값"
    },
    onChange: {
      action: "changed",
      description: "값이 변경될 때 호출되는 이벤트 핸들러"
    },
    placeholder: {
      control: "text",
      description: "인풋에 표시될 플레이스홀더 텍스트"
    },
    disabled: {
      control: "boolean",
      description: "인풋 비활성화 여부"
    },
    $width: {
      control: "text",
      description: "인풋의 너비"
    },
    $isError: {
      control: "boolean",
      description: "에러 상태 여부"
    },
    $errorMessage: {
      control: "text",
      description: "에러 상태일 때 표시될 메시지"
    }
  }
};

export default meta;
type Story = StoryObj<typeof Input>;

export const Default: Story = {
  play: async ({ args, canvasElement }) => {
    const canvas = within(canvasElement);
    const input = canvas.getByRole("input");
    await userEvent.type(input, "Hello world!");
    await expect(args.onChange).toHaveBeenCalled();
  }
};

export const WithoutLabel: Story = {
  args: {
    $label: ""
  }
};

export const Disabled: Story = {
  args: {
    disabled: true,
    value: "이 인풋은 비활성화되었습니다."
  }
};

export const Error: Story = {
  args: {
    $isError: true,
    value: "error"
  }
};
