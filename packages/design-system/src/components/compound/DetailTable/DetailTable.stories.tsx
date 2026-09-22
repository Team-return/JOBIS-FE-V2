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
      {
        label: "모집분야",
        value: "펼쳐서 확인하기",
        itemType: "text",
        expandableContent: [
          {
            label: "직무",
            value: "UX/UI 디자인",
            itemType: "text"
          },
          {
            label: "필요 기술스택",
            value: "Figma, illustrator, Photoshop",
            itemType: "text"
          },
          {
            label: "채용인원",
            value: "10명",
            itemType: "text"
          },
          {
            label: "수행업무",
            value:
              "frontend: 앤트(aaant)의 연구 데이터 통합 기록, 관리 솔류션 LabNotte에 다양한 바아오, 나노 연구\n에 특화된 기능들과 연구원들이 효율적인 협업을 할 수 있도록 도와주는 서비스를 개발합니다. 또한 서비스 중인 기능들을 사용자들의 피드백을 통해 보완 및 고도화를 진행하고\n있습니다. React와 Next로 웹 페이지 구현 및 Redux-toolkit과 SWR로 상태 관리를 합니\n다. Scss와 CSS-in-JS로 컴포넌트 스타일링과 애니메이션을 제작합니다. 통료 개발자들의 토드를 리뷰하고 안정화를 위해 테스트를 병행합니다.\nBackEnd: ",
            itemType: "text"
          }
        ]
      },
      { label: "대표", value: "김하온", itemType: "text" },
      { label: "회사 소개", value: "하이", itemType: "text" },
      {
        label: "회사 우편번호",
        value: "60202",
        itemType: "text"
      },
      {
        label: "회사 주소",
        value: "서울특별시 강남구 테헤란로 142 12층 (역삼동, 캐)",
        itemType: "text"
      },
      { label: "이메일", value: "mittoao205@gmail.com", itemType: "text" },
      { label: "설립일", value: "2006.10.21", itemType: "text" },
      { label: "직원수", value: "50명", itemType: "text" },
      { label: "연매출", value: "10억", itemType: "text" },
      { label: "사업분야", value: "IT", itemType: "text" },
      {
        label: "첨부파일",
        value: "2023 사업계획서",
        itemType: "file",
        fileUrl: "https://example.com/사업자등록증.pdf"
      }
    ]
  }
};
