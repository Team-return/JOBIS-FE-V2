import type { Meta, StoryObj } from "@storybook/react-vite";
import { expect, fn, userEvent, within } from "storybook/test";
import { MyComponent } from "./MyComponent";

const meta: Meta<typeof MyComponent> = {
  title: "components/MyComponent",
  component: MyComponent,
  tags: ["autodocs"],
  parameters: {
    layout: "centered"
  },
  args: {
    onClick: fn()
  }
};

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    text: "Click Me (Default)",
    $variant: "default"
  },
  play: async ({ args, canvasElement }) => {
    const canvas = within(canvasElement);
    const component = canvas.getByText("Click Me (Default)");
    await userEvent.click(component);
    await expect(args.onClick).toHaveBeenCalledTimes(1);
  }
};

export const Primary: Story = {
  args: {
    text: "Click Me (Primary)",
    $variant: "primary"
  },
  play: async ({ args, canvasElement }) => {
    const canvas = within(canvasElement);
    const component = canvas.getByText("Click Me (Primary)");
    await userEvent.click(component);
    await expect(args.onClick).toHaveBeenCalledTimes(1);
  }
};

export const Secondary: Story = {
  args: {
    text: "Click Me (Secondary)",
    $variant: "secondary"
  },
  play: async ({ args, canvasElement }) => {
    const canvas = within(canvasElement);
    const component = canvas.getByText("Click Me (Secondary)");
    await userEvent.click(component);
    await expect(args.onClick).toHaveBeenCalledTimes(1);
  }
};

export const LongText: Story = {
  args: {
    text: "This is a very long text to demonstrate how the component handles long content within its boundaries.",
    $variant: "default"
  }
};
