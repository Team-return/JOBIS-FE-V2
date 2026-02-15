import type { Meta, StoryObj } from "@storybook/react-vite";
import { Dropdown } from "./Dropdown";
import { PeriodDropdown } from "./PeriodDropdown";

const meta: Meta<typeof Dropdown> = {
  title: "components/compound/Dropdown",
  component: Dropdown,
  tags: ["autodocs"],
  argTypes: {
    options: {
      control: "object",
      description: "드롭다운에 표시할 옵션 목록"
    },
    value: {
      control: "text",
      description: "선택된 값 (제어 컴포넌트)"
    },
    $isNoneBorder: {
      control: "boolean",
      description: "드롭다운 박스 border 여부"
    },
    $defaultValue: {
      control: "text",
      description: "기본으로 표시할 옵션"
    },
    onChange: {
      action: "changed",
      description: "선택 값 변경 이벤트 핸들러"
    },
    $width: {
      control: "text",
      description: "드롭다운의 너비 (px, %, 등)"
    },
    $placeholder: {
      control: "text",
      description: "선택되지 않았을 때 표시할 플레이스홀더"
    },
    types: {
      control: "radio",
      options: [undefined, "supportJob"],
      description: "드롭다운 스타일/타입"
    },
    isOpen: {
      control: "boolean",
      description: "드롭다운 열림 상태 (제어 컴포넌트)"
    },
    onToggle: {
      action: "toggled",
      description: "드롭다운 열림/닫힘 상태 변경 이벤트 핸들러"
    }
  }
};

export default meta;
type Story = StoryObj<typeof Dropdown>;

export const Default: Story = {
  args: {
    $placeholder: "분야 선택",
    options: [
      { label: "프론트엔드", value: "frontend" },
      { label: "백엔드", value: "backend" },
      { label: "디자이너", value: "designer" },
      { label: "데브옵스", value: "devops" }
    ]
  },
  argTypes: {
    isOpen: { table: { disable: true } },
    onToggle: { table: { disable: true } }
  }
};

export const Sort: Story = {
  args: {
    $placeholder: "기본순",
    $defaultValue: "기본순",
    $isNoneBorder: true,
    options: [
      { label: "기본순", value: "기본순" },
      { label: "매출순", value: "매출순" },
      { label: "직원", value: "직원-desc", suffixIcon: "SortDesc" },
      { label: "직원", value: "직원-asc", suffixIcon: "SortAsc" }
    ]
  },
  argTypes: {
    isOpen: { table: { disable: true } },
    onToggle: { table: { disable: true } }
  }
};

export const SupportJob: Story = {
  args: {
    types: "supportJob",
    $placeholder: "지원 직무 검색",
    options: [
      { label: "프론트엔드 개발자", value: "frontend" },
      { label: "백엔드 개발자", value: "backend" },
      { label: "풀스택 개발자", value: "fullstack" },
      { label: "UI/UX 디자이너", value: "designer" },
      { label: "데브옵스 엔지니어", value: "devops" },
      { label: "데이터 사이언티스트", value: "data-scientist" },
      { label: "모바일 개발자", value: "mobile" },
      { label: "QA 엔지니어", value: "qa" }
    ]
  },
  argTypes: {
    isOpen: { table: { disable: true } },
    onToggle: { table: { disable: true } }
  }
};

export const PeriodDefault: Story = {
  render: () => <PeriodDropdown />,
  name: "Period Default"
};

export const PeriodWithInitialValue: Story = {
  render: () => (
    <PeriodDropdown
      value={{
        startDate: new Date(2024, 0, 1),
        endDate: new Date(2024, 11, 31),
        isConstant: false
      }}
    />
  ),
  name: "Period With Initial Value"
};

export const PeriodConstantRecruitment: Story = {
  render: () => (
    <PeriodDropdown
      checked={true}
      value={{
        startDate: null,
        endDate: null,
        isConstant: true
      }}
    />
  ),
  name: "Period Constant Recruitment"
};
