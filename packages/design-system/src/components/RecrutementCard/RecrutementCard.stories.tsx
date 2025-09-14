import type { Meta, StoryObj } from "@storybook/react-vite";
import { RecrutementCard } from "./RecrutementCard";

const meta: Meta<typeof RecrutementCard> = {
  title: "Components/RecrutementCard",
  component: RecrutementCard,
  tags: ["autodocs"],
  parameters: { layout: "centered" },
  argTypes: {
    hiringJobs: {
      control: "text",
      description: "채용 직무"
    },
    companyName: {
      control: "text",
      description: "회사 이름"
    },
    companyProfileUrl: {
      control: "text",
      description: "회사 프로필 이미지 URL"
    },
    trainPay: {
      control: "number",
      description: "실습 수당 (만원)"
    },
    militarySupport: {
      control: "boolean",
      description: "병역특례 지원 여부"
    },
    bookmarked: {
      control: "boolean",
      description: "북마크 여부"
    }
  },
  args: {
    hiringJobs: "프론트엔드 개발자",
    companyName: "자비스",
    companyProfileUrl: "https://placehold.co/222x144",
    trainPay: 200,
    militarySupport: true,
    bookmarked: false
  }
};

export default meta;
type Story = StoryObj<typeof RecrutementCard>;

export const Default: Story = {};

export const Bookmarked: Story = {
  args: {
    bookmarked: true
  }
};

export const WithoutMilitarySupport: Story = {
  args: {
    militarySupport: false
  }
};
