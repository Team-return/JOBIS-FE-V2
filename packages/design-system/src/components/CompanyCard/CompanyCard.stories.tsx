import type { Meta, StoryObj } from "@storybook/react-vite";
import { CompanyCard } from "./CompanyCard";
import { useState } from "react";

const meta: Meta<typeof CompanyCard> = {
  title: "components/CompanyCard",
  component: CompanyCard,
  parameters: {
    layout: "centered"
  },
  tags: ["autodocs"],
  argTypes: {
    imgUrl: {
      control: "text",
      description: "회사의 로고/이미지 URL"
    },
    companyName: {
      control: "text",
      description: "회사 이름"
    },
    annualSales: {
      control: "text",
      description: "연매출 정보"
    },
    bookmark: {
      control: "boolean",
      description: "북마크 여부"
    },
    onClick: {
      action: "clicked",
      description: "북마크 버튼 클릭 이벤트"
    }
  }
};

export default meta;
type Story = StoryObj<typeof CompanyCard>;

const InteractiveCompanyCard = (args: Story["args"]) => {
  const [isBookmarked, setIsBookmarked] = useState(args?.bookmark ?? false);

  return (
    <CompanyCard
      imgUrl="https://cdn.inflearn.com/public/files/pages/4f05016d-8cb1-4d17-adb1-36a316c60e62/white-logo.png"
      companyName="테스트 기업"
      annualSales="100억"
      bookmark={isBookmarked}
      onClick={() => setIsBookmarked(prev => !prev)}
    />
  );
};

export const Default: Story = {
  args: {
    imgUrl:
      "https://cdn.inflearn.com/public/files/pages/4f05016d-8cb1-4d17-adb1-36a316c60e62/white-logo.png",
    companyName: "주식회사 비바리퍼블리카",
    annualSales: "연매출 1,000억",
    bookmark: false
  },
  render: args => <InteractiveCompanyCard {...args} />
};

export const Bookmarked: Story = {
  args: {
    ...Default.args,
    bookmark: true
  },
  render: args => <InteractiveCompanyCard {...args} />
};
