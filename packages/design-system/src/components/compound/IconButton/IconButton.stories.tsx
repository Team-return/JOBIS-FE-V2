import type { Meta, StoryObj } from "@storybook/react-vite";
import { expect, fn, userEvent, within } from "storybook/test";
import * as icons from "../../../icons";
import { IconButton } from "./IconButton";

const meta: Meta<typeof IconButton> = {
  title: "components/compound/IconButton",
  component: IconButton,
  tags: ["autodocs"],
  parameters: {
    layout: "centered"
  },
  argTypes: {
    iconName: {
      control: "select",
      options: Object.keys(icons),
      description: "사용할 아이콘 이름"
    },
    $color: {
      control: "color",
      description: "아이콘과 테두리 색상"
    },
    $width: {
      control: "text",
      description: "버튼 너비"
    },
    children: {
      control: "text",
      description: "버튼 라벨"
    },
    onClick: {
      action: "clicked",
      description: "클릭 이벤트 핸들러"
    }
  },
  args: {
    iconName: "Bell",
    children: "알림 버튼",
    onClick: fn()
  }
};

export default meta;
type Story = StoryObj<typeof IconButton>;

export const Default: Story = {
  play: async ({ args, canvasElement }) => {
    const canvas = within(canvasElement);
    const button = canvas.getByText(args.children as string);
    expect(button).toBeInTheDocument();
    await userEvent.click(button);
    await expect(args.onClick).toHaveBeenCalledTimes(1);
  }
};

export const CustomColor: Story = {
  args: {
    $color: "#5B8DEF",
    children: "색상 지정 버튼"
  }
};

export const CustomWidth: Story = {
  args: {
    $width: "200px",
    children: "200px 버튼"
  }
};
