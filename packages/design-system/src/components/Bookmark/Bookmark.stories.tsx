import type { Meta, StoryObj } from "@storybook/react-vite";
import { expect, fn, userEvent, within } from "storybook/test";
import { Bookmark } from "./Bookmark";

const meta: Meta<typeof Bookmark> = {
  title: "components/Bookmark",
  component: Bookmark,
  tags: ["autodocs"],
  parameters: {
    layout: "centered"
  },
  args: {
    onClick: fn()
  },
  argTypes: {
    $checked: {
      control: "boolean",
      description: "북마크 체크 상태"
    },
    onClick: {
      action: "clicked",
      description: "북마크 클릭 이벤트"
    }
  }
};

export default meta;
type Story = StoryObj<typeof Bookmark>;

export const Default: Story = {
  args: {
    $checked: false
  },
  play: async ({ args, canvasElement }) => {
    const canvas = within(canvasElement);
    const component = canvas.getByLabelText("bookmark");
    expect(component).toBeInTheDocument();
    await userEvent.click(component);
    await expect(args.onClick).toHaveBeenCalledTimes(1);
  }
};

export const Checked: Story = {
  args: {
    $checked: true
  }
};
