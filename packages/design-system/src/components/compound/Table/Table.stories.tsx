import type { Meta, StoryObj } from "@storybook/react-vite";
import { Table } from "./Table";
import { TableSkeleton } from "./TableSkeleton";

const meta: Meta<typeof Table> = {
  title: "components/compound/Table",
  component: Table,
  tags: ["autodocs"],
  args: {
    headers: [
      "상태",
      "기업명",
      "직군",
      "구분",
      "모집인원",
      "지원요청",
      "지원자",
      "모집시작일",
      "모집종료일"
    ],
    rows: [
      [
        "모집종료",
        "(주)프리위린",
        "보안프로그래밍/모의해킹/보안기타",
        "참여",
        "1명",
        "2명",
        "2명",
        "2021-06-12",
        "2021-06-21"
      ],
      [
        "모집중",
        "(주)테크컴퍼니",
        "웹프로그래밍/풀스택개발",
        "채용",
        "3명",
        "5명",
        "8명",
        "2024-01-15",
        "2024-02-15"
      ]
    ],
    columnWidths: [100, 150, 120, 80, 90, 90, 80, 120, 120],
    checkbox: true
  },
  argTypes: {
    headers: {
      control: "object",
      description: "테이블 헤더에 표시할 텍스트 배열"
    },
    rows: {
      control: "object",
      description: "테이블 바디에 표시할 데이터 2차원 배열"
    },
    columnWidths: {
      control: "object",
      description: "각 컬럼의 너비 배열 (px 단위, 생략 시 자동)"
    },
    checkbox: {
      control: "boolean",
      description: "첫 번째 컬럼에 체크박스 표시 여부"
    },
    headerBg: {
      control: "text",
      description: "테이블 헤더 배경색상"
    },
    headerHeight: {
      control: "number",
      description: "테이블 헤더 높이"
    },
    headerTextProps: {
      control: "object",
      description: "테이블 헤더 Text 스타일"
    },
    rowHeight: {
      control: "number",
      description: "테이블 행 높이"
    }
  }
};

export default meta;
type Story = StoryObj<typeof Table>;

export const Default: Story = {};

export const WithoutCheckbox: Story = {
  args: {
    checkbox: false,
    headers: ["기업명", "지역", "직군", "구분", "모집인원"],
    rows: [
      ["(주)프리위린", "대전", "보안프로그래밍", "참여", "1명"],
      ["(주)테크컴퍼니", "서울", "웹프로그래밍", "채용", "3명"]
    ],
    columnWidths: [150, 100, 200, 80, 90]
  }
};

export const AutoWidth: Story = {
  args: {
    columnWidths: undefined,
    headers: ["이름", "이메일", "연락처"],
    rows: [
      ["홍길동", "hong@example.com", "010-1234-5678"],
      ["김철수", "kim@example.com", "010-9876-5432"]
    ]
  }
};

export const Skeleton: Story = {
  render: () => (
    <TableSkeleton
      checkbox
      columnWidths={[100, 150, 120, 80, 90, 90, 80, 120, 120]}
      rows={2}
    />
  )
};
