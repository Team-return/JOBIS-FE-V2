import type { Meta, StoryObj } from "@storybook/react-vite";
import { expect, fn, userEvent, within } from "storybook/test";
import { EmploymentRateBanner } from "./EmploymentRateBanner";

const meta: Meta<typeof EmploymentRateBanner> = {
  title: "components/compound/EmploymentRateBanner",
  component: EmploymentRateBanner,
  tags: ["autodocs"],
  parameters: {
    layout: "fullscreen"
  },
  args: {
    onClick: fn()
  },
  argTypes: {
    onClick: {
      action: "onClick",
      description: "배너 클릭 이벤트"
    }
  }
};

export default meta;
type Story = StoryObj<typeof EmploymentRateBanner>;

export const Default: Story = {
  play: async ({ args, canvasElement }) => {
    const canvas = within(canvasElement);
    const banner = canvas.getByRole("img", { name: "배너 배경 이미지" });
    expect(banner).toBeInTheDocument();
    await userEvent.click(banner);
    await expect(args.onClick).toHaveBeenCalledTimes(1);
  }
};
