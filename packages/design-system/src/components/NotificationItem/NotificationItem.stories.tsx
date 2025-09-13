import type { Meta, StoryObj } from "@storybook/react-vite";
import { NotificationItem } from "./NotificationItem";
import { expect, fn, userEvent, within } from "storybook/test";

const meta: Meta<typeof NotificationItem> = {
  title: "components/NotificationItem",
  component: NotificationItem,
  tags: ["autodocs"],
  parameters: {
    layout: "centered"
  },
  argTypes: {
    title: {
      control: "text",
      description: "제목"
    },
    content: {
      control: "text",
      description: "내용"
    },
    date: {
      control: "text",
      description: "날짜 (ISO 형식)"
    },
    onClick: {
      action: "clicked",
      description: "아이템 클릭 이벤트 핸들러"
    }
  },
  args: {
    onClick: fn()
  }
};

export default meta;

type Story = StoryObj<typeof NotificationItem>;

export const Default: Story = {
  args: {
    title: "관리자",
    content: "지원서 상태가 {REQUESTED}으로 변경되었습니다.",
    date: "2023-05-15"
  },
  play: async ({ args, canvasElement }) => {
    const canvas = within(canvasElement);
    const component = canvas.getByText("관리자").closest("div") as HTMLElement;
    await userEvent.click(component);
    await expect(args.onClick).toHaveBeenCalledTimes(1);
  }
};

export const Passed: Story = {
  args: {
    title: "관리자",
    content: "지원서가 {PASS}으로 변경되었습니다",
    date: "2023-05-16"
  },
  play: async ({ args, canvasElement }) => {
    const canvas = within(canvasElement);
    const component = canvas.getByText("관리자").closest("div") as HTMLElement;
    await userEvent.click(component);
    await expect(args.onClick).toHaveBeenCalledTimes(1);
  }
};
