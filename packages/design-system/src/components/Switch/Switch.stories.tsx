import type { Meta, StoryObj } from "@storybook/react-vite";
import { expect, fn, userEvent, within } from "storybook/test";
import { Switch } from "./Switch";

const meta: Meta<typeof Switch> = {
  title: "components/Switch",
  component: Switch,
  tags: ["autodocs"],
  parameters: {
    layout: "centered"
  },
  args: {
    onChange: fn()
  },
  argTypes: {
    $checked: {
      control: "boolean",
      description: "스위치 상태"
    },
    onChange: {
      action: "changed",
      description: "스위치 상태 변경 이벤트"
    }
  }
};

export default meta;

type Story = StoryObj<typeof Switch>;

export const Default: Story = {
  args: {
    $checked: false
  },
  play: async ({ args, canvasElement }) => {
    const canvas = within(canvasElement);
    const component = canvas.getByRole("switch");
    expect(component).toBeInTheDocument();
    await userEvent.click(component);
    await expect(args.onChange).toHaveBeenCalledTimes(1);
  }
};

export const Checked: Story = {
  args: {
    $checked: true
  }
};
