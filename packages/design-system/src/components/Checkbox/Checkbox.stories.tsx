import type { Meta, StoryObj } from "@storybook/react-vite";
import { expect, fn, userEvent, within } from "storybook/test";

import { Checkbox } from "./Checkbox";

const meta: Meta<typeof Checkbox> = {
  title: "components/Checkbox",
  component: Checkbox,
  tags: ["autodocs"],
  parameters: {
    layout: "centered"
  },
  args: {
    onChange: fn()
  },
  argTypes: {
    label: {
      control: "text",
      description: "텍스트 라벨"
    },
    $checked: {
      control: "boolean",
      description: "체크박스 상태"
    },
    onChange: {
      action: "changed",
      description: "체크박스 상태 변경 이벤트"
    }
  }
};

export default meta;

type Story = StoryObj<typeof Checkbox>;

export const Default: Story = {
  args: {
    label: "Default Checkbox",
    $checked: false
  },
  play: async ({ args, canvasElement }) => {
    const canvas = within(canvasElement);
    const component = canvas.getByRole("checkbox");
    expect(component).toBeInTheDocument();
    await userEvent.click(component);
    await expect(args.onChange).toHaveBeenCalledTimes(1);
  }
};

export const Checked: Story = {
  args: {
    label: "Checked Checkbox",
    $checked: true
  }
};

export const Unchecked: Story = {
  args: {
    label: "Unchecked Checkbox",
    $checked: false
  }
};

export const WithoutLabel: Story = {
  name: "Without Label",
  args: {
    $checked: false
  }
};
