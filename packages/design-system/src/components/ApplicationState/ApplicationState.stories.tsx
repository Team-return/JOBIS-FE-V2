import type { Meta, StoryObj } from "@storybook/react-vite";
import { ApplicationState } from "./ApplicationState";
import type { StatusType } from "./ApplicationState.types";

const statusTypes: StatusType[] = [
  "rejected",
  "failed",
  "approved",
  "pending",
  "passed",
  "internship",
  "contract",
  "applying"
];

const meta: Meta<typeof ApplicationState> = {
  title: "components/ApplicationState",
  component: ApplicationState,
  parameters: {
    layout: "centered"
  },
  tags: ["autodocs"],
  argTypes: {
    types: {
      control: "select",
      options: statusTypes,
      description: "지원의 현재 상태"
    },
    imgUrl: {
      control: "text",
      description: "회사 로고 URL"
    },
    companyName: {
      control: "text",
      description: "회사 이름"
    },
    date: {
      control: "text",
      description: "상태 변경 날짜"
    }
  }
};

export default meta;
type Story = StoryObj<typeof ApplicationState>;

export const Default: Story = {
  args: {
    types: "pending",
    imgUrl:
      "https://cdn.inflearn.com/public/files/pages/4f05016d-8cb1-4d17-adb1-36a316c60e62/white-logo.png",
    companyName: "주식회사 비바리퍼블리카",
    date: "2025-09-28"
  }
};

export const Rejected: Story = {
  args: {
    ...Default.args,
    types: "rejected"
  }
};
export const Failed: Story = {
  args: {
    ...Default.args,
    types: "failed"
  }
};
export const Approved: Story = {
  args: {
    ...Default.args,
    types: "approved"
  }
};
export const Pending: Story = {
  args: {
    ...Default.args,
    types: "pending"
  }
};

export const Passed: Story = {
  args: {
    ...Default.args,
    types: "passed"
  }
};

export const Internship: Story = {
  args: {
    ...Default.args,
    types: "internship"
  }
};
export const Contract: Story = {
  args: {
    ...Default.args,
    types: "contract"
  }
};
export const Applying: Story = {
  args: {
    ...Default.args,
    types: "applying"
  }
};
