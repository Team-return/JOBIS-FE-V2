import type { Meta, StoryObj } from "@storybook/react-vite";
import { Search } from "./Search";
import { fn, userEvent, within, expect } from "storybook/test";

const meta: Meta<typeof Search> = {
  title: "components/Search",
  component: Search,
  tags: ["autodocs"],
  args: {
    placeholder: "검색어를 입력해주세요",
    $width: "300px",
    onChange: fn(),
    onIconClick: fn()
  },
  argTypes: {
    $width: {
      control: "text",
      description: "검색창의 너비"
    },
    value: {
      control: "text",
      description: "검색창의 값"
    },
    placeholder: {
      control: "text",
      description: "검색창에 표시될 플레이스홀더 텍스트"
    },
    onChange: {
      action: "onChange",
      description: "검색창의 값이 변경될 때 호출되는 함수"
    }
  }
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  play: async ({ args, canvasElement }) => {
    const canvas = within(canvasElement);
    const input = canvas.getByRole("search");
    await userEvent.type(input, "Hello world!");
    await expect(args.onChange).toHaveBeenCalled();
    const icon = canvas.getByRole("img");
    await userEvent.click(icon);
  }
};

export const WithValue: Story = {
  args: {
    value: "입력된 값"
  }
};
