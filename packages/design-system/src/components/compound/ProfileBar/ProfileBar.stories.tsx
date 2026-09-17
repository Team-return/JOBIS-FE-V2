import type { Meta, StoryObj } from "@storybook/react-vite";
import { ProfileBar } from "./ProfileBar";
import { expect, fn, userEvent, within } from "storybook/test";

const meta: Meta<typeof ProfileBar> = {
  title: "components/compound/ProfileBar",
  component: ProfileBar,
  tags: ["autodocs"],
  parameters: { layout: "centered" },
  argTypes: {
    name: {
      control: "text",
      description: "학생 이름"
    },
    studentNumber: {
      control: "text",
      description: "학번"
    },
    department: {
      control: "text",
      description: "학과"
    },
    profileImageUrl: {
      control: "text",
      description: "프로필 이미지 URL"
    },
    menuItems: {
      description: "드롭다운 메뉴 항목 목록"
    }
  },
  args: {
    name: "마시마로",
    studentNumber: "2101",
    department: "소프트웨어 개발과"
  }
};

export default meta;
type Story = StoryObj<typeof ProfileBar>;

export const Default: Story = {
  args: {
    menuItems: [
      { label: "비밀번호 변경", onClick: fn() },
      { label: "로그아웃", onClick: fn() }
    ]
  }
};

export const WithProfileImage: Story = {
  args: {
    profileImageUrl: "https://placehold.co/84x84",
    menuItems: [
      { label: "비밀번호 변경", onClick: fn() },
      { label: "로그아웃", onClick: fn() }
    ]
  }
};

export const WithoutMenu: Story = {
  args: {}
};

export const MenuOpen: Story = {
  args: {
    menuItems: [
      { label: "비밀번호 변경", onClick: fn() },
      { label: "로그아웃", onClick: fn() }
    ]
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const kebapMenu = canvas.getByLabelText("KebapMenu");
    await userEvent.click(kebapMenu);
    const menu = canvas.getByRole("menu");
    await expect(menu).toBeInTheDocument();
    await expect(canvas.getByText("비밀번호 변경")).toBeInTheDocument();
    await expect(canvas.getByText("로그아웃")).toBeInTheDocument();
  }
};
