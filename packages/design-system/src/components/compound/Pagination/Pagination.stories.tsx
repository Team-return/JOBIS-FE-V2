import type { Meta, StoryObj } from "@storybook/react-vite";
import { Pagination } from "./Pagination";
import { fn, userEvent, within, expect } from "storybook/test";
import { useState } from "react";

const meta: Meta<typeof Pagination> = {
  title: "components/compound/Pagination",
  component: Pagination,
  tags: ["autodocs"],
  parameters: {
    layout: "centered"
  },
  args: {
    start: 1,
    end: 10,
    current: 1,
    onChange: fn()
  },
  argTypes: {
    start: {
      control: "number",
      description: "시작 페이지"
    },
    end: {
      control: "number",
      description: "끝 페이지"
    },
    current: {
      control: "number",
      description: "현재 페이지"
    },
    onChange: {
      action: "changed",
      description: "페이지 변경 이벤트"
    }
  }
};

export default meta;
type Story = StoryObj<typeof Pagination>;

const PaginationWrapper = (args: Story["args"]) => {
  const [current, setCurrent] = useState(args?.current ?? 1);

  const handleChange = (page: number) => {
    setCurrent(page);
    args?.onChange?.(page);
  };

  return (
    <Pagination
      start={args!.start!}
      end={args!.end!}
      current={current}
      onChange={handleChange}
    />
  );
};

export const Default: Story = {
  render: args => <PaginationWrapper {...args} />,
  play: async ({ args, canvasElement }) => {
    const canvas = within(canvasElement);

    const page2Button = canvas.getByText("2");
    await userEvent.click(page2Button);
    expect(args.onChange).toHaveBeenCalledWith(2);
  }
};

export const MiddlePage: Story = {
  args: {
    current: 5
  },
  render: args => <PaginationWrapper {...args} />
};

export const LastPage: Story = {
  args: {
    current: 10
  },
  render: args => <PaginationWrapper {...args} />
};
