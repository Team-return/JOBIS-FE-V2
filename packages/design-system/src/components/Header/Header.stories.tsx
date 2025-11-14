import type { Meta, StoryObj } from "@storybook/react-vite";
import { fn } from "storybook/test";
import { Header } from "./Header";
import { headerTypes } from "./Header.types";

const meta: Meta<typeof Header> = {
  title: "components/Header",
  component: Header,
  tags: ["autodocs"],
  parameters: {
    layout: "fullscreen"
  },
  argTypes: {
    types: {
      control: "select",
      options: headerTypes,
      description: "헤더 타입 (admin, company, student)"
    },
    userName: {
      control: "text",
      description: "학생 헤더에서 표시될 사용자 이름"
    },
    onClickProfile: {
      action: "onClickProfile",
      description: "학생 헤더에서 프로필 아이콘 클릭 이벤트"
    },
    onClickLogo: {
      action: "onClickLogo",
      description: "로고 클릭 이벤트"
    },
    alarm: {
      control: "boolean",
      description: "학생 헤더에서 알림 뱃지 표시 여부"
    }
  }
};

export default meta;

type Story = StoryObj<typeof Header>;

export const Admin: Story = {
  args: {
    types: "admin",
    onClickLogo: fn()
  }
};

export const Company: Story = {
  args: {
    types: "company",
    onClickLogo: fn()
  }
};

export const Student: Story = {
  args: {
    types: "student",
    userName: "홍길동",
    alarm: true,
    onClickProfile: fn(),
    onClickLogo: fn()
  }
};

export const Default: Story = {
  args: {
    types: "admin",
    onClickLogo: fn()
  }
};
