import type { Meta, StoryObj } from "@storybook/react-vite";
import { DetailHeader } from "./DetailHeader";

const meta: Meta<typeof DetailHeader> = {
  title: "components/compound/DetailHeader",
  component: DetailHeader,
  tags: ["autodocs"],
  parameters: { layout: "centered" },
  argTypes: {
    type: {
      control: "select",
      options: ["company", "recruitment"],
      description: "헤더의 유형 선택"
    },
    title: {
      control: "text",
      description: "회사 이름"
    },
    logoUrl: {
      control: "text",
      description: "회사의 로고 URL"
    },
    businessNumber: {
      control: "text",
      description: "회사의 사업자 등록 번호",
      if: { arg: "type", eq: "company" }
    },
    onMoreClick: {
      action: "onMoreClick",
      description: "케밥메뉴 클릭 이벤트",
      if: { arg: "type", eq: "company" }
    },
    isParticipation: {
      control: "boolean",
      description: "참여기업 여부",
      if: { arg: "type", eq: "recruitment" }
    }
  }
};

export default meta;
type Story = StoryObj<typeof DetailHeader>;

export const Default: Story = {
  args: {
    type: "company",
    title: "(주)비바리퍼블리카",
    logoUrl:
      "https://cdn.digitalasset.works/news/photo/202507/28288_36187_4536.jpg",
    businessNumber: "123456789",
    onMoreClick: () => {}
  }
};

export const Recruitment: Story = {
  args: {
    type: "recruitment",
    title: "(주)비바리퍼블리카",
    logoUrl:
      "https://cdn.digitalasset.works/news/photo/202507/28288_36187_4536.jpg",
    isParticipation: true
  }
};
