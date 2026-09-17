import type { Meta, StoryObj } from "@storybook/react-vite";
import { expect, fn, userEvent, within } from "storybook/test";

import { RadioGroup } from "./RadioGroup";

const meta: Meta<typeof RadioGroup> = {
  title: "components/compound/RadioGroup",
  component: RadioGroup,
  tags: ["autodocs"],
  parameters: {
    layout: "centered"
  },
  args: {
    onChange: fn()
  },
  argTypes: {
    options: {
      control: "object",
      description: "라디오 옵션 배열"
    },
    onChange: {
      action: "changed",
      description: "선택 변경 이벤트"
    }
  }
};

export default meta;

type Story = StoryObj<typeof RadioGroup>;

export const Default: Story = {
  args: {
    options: [
      { label: "옵션 1", value: "option1" },
      { label: "옵션 2", value: "option2" },
      { label: "옵션 3", value: "option3" }
    ]
  },
  play: async ({ args, canvasElement }) => {
    const canvas = within(canvasElement);
    const radios = canvas.getAllByRole("radio");
    expect(radios).toHaveLength(args.options.length);

    await userEvent.click(radios[0]);
    await expect(args.onChange).toHaveBeenCalledTimes(1);
    await expect(args.onChange).toHaveBeenCalledWith("option1");
  }
};

export const WithPreSelected: Story = {
  name: "With Pre-selected Item",
  args: {
    options: [
      { label: "옵션 1", value: "option1" },
      { label: "옵션 2", value: "option2", checked: true },
      { label: "옵션 3", value: "option3" }
    ]
  }
};
