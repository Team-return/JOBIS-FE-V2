import type { Meta, StoryObj } from "@storybook/react-vite";
import { FileUpload } from "./FileUpload";

const meta: Meta<typeof FileUpload> = {
  title: "components/compound/FileUpload",
  component: FileUpload,
  tags: ["autodocs"],
  parameters: { layout: "centered" },
  argTypes: {
    label: {
      control: "text",
      description: "버튼에 표시될 내용"
    },
    $width: {
      control: "text",
      description: "버튼 너비"
    },
    disabled: {
      control: "boolean",
      description: "비활성화 여부"
    }
  }
};

export default meta;

type Story = StoryObj<typeof FileUpload>;

export const Default: Story = {
  args: {
    label: "파일 추가하기",
    $width: 716
  }
};

export const Disabled: Story = {
  args: {
    label: "업로드 중...",
    $width: 716,
    disabled: true
  }
};
