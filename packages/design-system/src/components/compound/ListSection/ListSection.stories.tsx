import type { Meta, StoryObj } from "@storybook/react-vite";
import { expect, fn, userEvent, within } from "storybook/test";
import { ListSection } from "./ListSection";

const meta: Meta<typeof ListSection> = {
  title: "components/compound/ListSection",
  component: ListSection,
  tags: ["autodocs"],
  argTypes: {
    onClickViewAll: {
      action: "clicked",
      description: "해당 페이지로 이동하는 함수"
    }
  },
  args: {
    onClickViewAll: fn()
  }
};

export default meta;
type Story = StoryObj<typeof ListSection>;

export const Default: Story = {
  play: async ({ args, canvasElement }) => {
    const canvas = within(canvasElement);
    await userEvent.click(canvas.getByRole("button", { name: "전체보기" }));
    await expect(args.onClickViewAll).toHaveBeenCalledTimes(1);
  }
};
