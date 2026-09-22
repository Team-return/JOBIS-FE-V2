import type { Meta, StoryObj } from "@storybook/react-vite";
import { Header } from "./Header";

export const headerTypes = ["admin", "company", "student"] as const;

const mockNotifications = [
  {
    notification_id: 1,
    title: "지원 현황",
    content: "{REQUESTED} 상태로 변경되었습니다.",
    topic: "application",
    detail_id: 1,
    created_at: new Date().toISOString(),
    new: true
  },
  {
    notification_id: 2,
    title: "모집 공고",
    content: "새로운 {APPROVED} 공고가 올라왔습니다.",
    topic: "recruitment",
    detail_id: 2,
    created_at: new Date(Date.now() - 86400000).toISOString(),
    new: true
  },
  {
    notification_id: 2,
    title: "모집 공고",
    content: "새로운 {APPROVED} 공고가 올라왔습니다.",
    topic: "recruitment",
    detail_id: 2,
    created_at: new Date(Date.now() - 86400000).toISOString(),
    new: true
  },
  {
    notification_id: 3,
    title: "지원 현황",
    content: "{PASS} 상태로 변경되었습니다.",
    topic: "application",
    detail_id: 3,
    created_at: new Date(Date.now() - 172800000).toISOString(),
    new: false
  }
];

const meta: Meta<typeof Header> = {
  title: "components/compound/Header",
  component: Header,
  tags: ["autodocs"],
  parameters: {
    layout: "fullscreen"
  },
  argTypes: {
    type: {
      control: "select",
      options: headerTypes,
      description: "헤더 타입 (admin, company, student)"
    },
    userName: {
      control: "text",
      description: "학생 헤더에서 표시될 사용자 이름"
    },
    notifications: {
      control: "object",
      description: "학생 헤더에서 표시될 알림 목록"
    }
  }
};

export default meta;

type Story = StoryObj<typeof Header>;

export const Admin: Story = {
  args: {
    type: "admin"
  }
};

export const Company: Story = {
  args: {
    type: "company"
  }
};

export const Student: Story = {
  args: {
    type: "student",
    userName: "홍길동",
    notifications: mockNotifications
  }
};

export const Default: Story = {
  args: {
    type: "admin"
  }
};
