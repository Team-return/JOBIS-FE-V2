import type { Meta, StoryObj } from "@storybook/react-vite";
import { fn, userEvent, within, expect } from "storybook/test";
import { TextArea } from "./TextArea";

const meta: Meta<typeof TextArea> = {
  title: "components/compound/TextArea",
  component: TextArea,
  tags: ["autodocs"],
  args: {
    $label: "Label",
    onChange: fn(),
    disabled: false,
    value: "",
    placeholder: "텍스트를 입력해주세요.",
    $width: "300px",
    $errorMessage: "",
    rows: 4,
    maxLength: undefined
  },
  argTypes: {
    $label: {
      control: "text",
      description: "텍스트에어리어 위에 표시될 라벨"
    },
    value: {
      control: "text",
      description: "텍스트에어리어의 값"
    },
    onChange: {
      action: "changed",
      description: "값이 변경될 때 호출되는 이벤트 핸들러"
    },
    placeholder: {
      control: "text",
      description: "텍스트에어리어에 표시될 플레이스홀더 텍스트"
    },
    disabled: {
      control: "boolean",
      description: "텍스트에어리어 비활성화 여부"
    },
    $width: {
      control: "text",
      description: "텍스트에어리어의 너비"
    },
    $height: {
      control: "text",
      description: "텍스트에어리어의 높이"
    },
    $errorMessage: {
      control: "text",
      description: "에러 상태일 때 표시될 메시지"
    },
    rows: {
      control: "number",
      description: "기본 행 수"
    },
    maxLength: {
      control: "number",
      description: "최대 글자 수"
    }
  }
};

export default meta;
type Story = StoryObj<typeof TextArea>;

export const Default: Story = {
  play: async ({ args, canvasElement }) => {
    const canvas = within(canvasElement);
    const textarea = canvas.getByRole("textbox");
    await userEvent.type(textarea, "Hello world!");
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
    value: "이 텍스트에어리어는 비활성화되었습니다."
  }
};

export const Error: Story = {
  args: {
    $errorMessage: "에러가 발생했습니다.",
    value: "error"
  }
};

export const WithMaxLength: Story = {
  args: {
    maxLength: 100,
    placeholder: "최대 100글자까지 입력 가능합니다."
  }
};
