import type { Meta, StoryObj } from "@storybook/react-vite";
import { DetailTable } from "./DetailTable";

const meta: Meta<typeof DetailTable> = {
  title: "components/compound/DetailTable",
  component: DetailTable,
  tags: ["autodocs"],
  parameters: { layout: "centered" },
  argTypes: {
    items: {
      control: "object",
      description: "테이블에 표시할 항목들의 배열"
    }
  }
};

export default meta;
type Story = StoryObj<typeof DetailTable>;

export const Default: Story = {
  args: {
    items: [
      { label: "대표", value: "김하온", itemType: "text" },
      { label: "서비스 이름", value: "하이티비", itemType: "text" },
      { label: "회사 소개", value: "하이", itemType: "text" },
      {
        label: "회사 주소(본사)",
        value: "(60202) 서울특별시 강남구 테헤란로 142 12층 (역삼동, 캐",
        itemType: "text"
      },
      { label: "설립일", value: "2006-10-21", itemType: "text" },
      { label: "직원수", value: "10억명", itemType: "text" },
      { label: "연매출", value: "10원", itemType: "text" },
      { label: "사업분야", value: "IT", itemType: "text" },
      {
        label: "첨부파일",
        value: "2023 사업계획서.pdf",
        itemType: "file",
        fileUrl: "https://example.com/사업자등록증.pdf"
      }
    ]
  }
};
