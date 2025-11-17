import type { Meta, StoryObj } from "@storybook/react-vite";
import { expect, fn, userEvent, within } from "storybook/test";

import { CheckboxGroup } from "./CheckboxGroup";

const meta: Meta<typeof CheckboxGroup> = {
  title: "components/compound/CheckboxGroup",
  component: CheckboxGroup,
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
      description: "체크박스 옵션 배열"
    },
    onChange: {
      action: "changed",
      description: "선택 변경 이벤트"
    }
  }
};

export default meta;

type Story = StoryObj<typeof CheckboxGroup>;

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
    const checkboxes = canvas.getAllByRole("checkbox");
    expect(checkboxes).toHaveLength(args.options.length);

    await userEvent.click(checkboxes[0]);
    await expect(args.onChange).toHaveBeenCalledTimes(1);
    await expect(args.onChange).toHaveBeenCalledWith(["option1"]);
  }
};

export const WithPreChecked: Story = {
  name: "With Pre-checked Items",
  args: {
    options: [
      { label: "선택된 옵션", value: "option1", checked: true },
      { label: "선택되지 않은 옵션", value: "option2" },
      { label: "또 다른 선택된 옵션", value: "option3", checked: true }
    ]
  }
};
