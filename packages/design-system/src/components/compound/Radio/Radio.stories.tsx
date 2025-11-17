import type { Meta, StoryObj } from "@storybook/react-vite";
import { expect, fn, userEvent, within } from "storybook/test";

import { Radio } from "./Radio";

const meta: Meta<typeof Radio> = {
  title: "components/compound/Radio",
  component: Radio,
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
      description: "라디오 상태"
    },
    onChange: {
      action: "changed",
      description: "라디오 상태 변경 이벤트"
    }
  }
};

export default meta;

type Story = StoryObj<typeof Radio>;

export const Default: Story = {
  args: {
    label: "Default Radio",
    $checked: false
  },
  play: async ({ args, canvasElement }) => {
    const canvas = within(canvasElement);
    const component = canvas.getByRole("radio");
    expect(component).toBeInTheDocument();
    await userEvent.click(component);
    await expect(args.onChange).toHaveBeenCalledTimes(1);
  }
};

export const Checked: Story = {
  args: {
    label: "Checked Radio",
    $checked: true
  }
};

export const Unchecked: Story = {
  args: {
    label: "Unchecked Radio",
    $checked: false
  }
};

export const WithoutLabel: Story = {
  name: "Without Label",
  args: {
    $checked: false
  }
};
