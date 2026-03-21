import type { Meta, StoryObj } from "@storybook/react-vite";
import { CompanyCard } from "./CompanyCard";

const meta: Meta<typeof CompanyCard> = {
  title: "components/compound/CompanyCard",
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
    hasRecruitment: {
      control: "boolean",
      description: "모집 상태"
    },
    onClick: {
      action: "onClick",
      description: "컴포넌트 클릭 이벤트"
    }
  }
};

export default meta;
type Story = StoryObj<typeof CompanyCard>;

const InteractiveCompanyCard = (args: Story["args"] = {}) => {
  return (
    <CompanyCard
      imgUrl={args.imgUrl!}
      companyName={args.companyName!}
      annualSales={args.annualSales!}
      hasRecruitment={args.hasRecruitment!}
      onClick={() => args.onClick?.()}
    />
  );
};

export const Default: Story = {
  args: {
    imgUrl:
      "https://cdn.inflearn.com/public/files/pages/4f05016d-8cb1-4d17-adb1-36a316c60e62/white-logo.png",
    companyName: "주식회사 비바리퍼블리카",
    annualSales: 1000,
    hasRecruitment: true
  },
  render: args => <InteractiveCompanyCard {...args} />
};

export const Bookmarked: Story = {
  args: {
    ...Default.args,
    hasRecruitment: false
  },
  render: args => <InteractiveCompanyCard {...args} />
};
