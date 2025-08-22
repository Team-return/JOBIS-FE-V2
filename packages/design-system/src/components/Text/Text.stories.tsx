import type { Meta, StoryObj } from "@storybook/react-vite";
import { Text } from "./Text";
import { Props } from "./Text.types";

const meta: Meta<typeof Text> = {
  title: "components/Text",
  component: Text,
  tags: ["autodocs"],
  parameters: {
    layout: "centered"
  },
  argTypes: {
    $size: {
      control: "select",
      options: [
        "h1",
        "h2",
        "h3",
        "h4",
        "h5",
        "h6",
        "body1",
        "body2",
        "caption"
      ],
      description: "텍스트 크기 및 HTML 태그"
    },
    $weight: {
      control: "select",
      options: ["regular", "medium", "bold"],
      description: "폰트 굵기"
    },
    $color: {
      control: "color",
      description: "텍스트 색상"
    },
    $align: {
      control: "select",
      options: ["left", "center", "right"],
      description: "텍스트 정렬"
    },
    $span: {
      control: "boolean",
      description: "span 태그로 렌더링"
    }
  }
};

export default meta;

type Story = StoryObj<typeof Text>;

export const Default: Story = {
  args: {
    $size: "body1",
    children: "기본 텍스트"
  }
};

export const Headings: Story = {
  args: {
    children: "제목 텍스트"
  },
  render: (args: Props) => (
    <>
      <Text {...args} $size="h1">
        Heading 1
      </Text>
      <Text {...args} $size="h2">
        Heading 2
      </Text>
      <Text {...args} $size="h3">
        Heading 3
      </Text>
      <Text {...args} $size="h4">
        Heading 4
      </Text>
      <Text {...args} $size="h5">
        Heading 5
      </Text>
      <Text {...args} $size="h6">
        Heading 6
      </Text>
    </>
  )
};

export const BodyTexts: Story = {
  args: {
    children: "본문 텍스트"
  },
  render: (args: Props) => (
    <>
      <Text {...args} $size="body1">
        Body Text 1 - 기본 본문 텍스트 스타일
      </Text>
      <Text {...args} $size="body2">
        Body Text 2 - 보조 본문 텍스트 스타일
      </Text>
      <Text {...args} $size="caption">
        Caption - 작은 설명 텍스트
      </Text>
    </>
  )
};

export const WithCustomColor: Story = {
  args: {
    $size: "body1",
    $color: "#ff0000",
    children: "빨간색 텍스트"
  }
};

export const FontWeight: Story = {
  args: {
    children: "폰트 굵기별 텍스트"
  },
  render: (args: Props) => (
    <>
      <Text {...args} $size="body1" $weight="regular">
        Regular Weight Text
      </Text>
      <Text {...args} $size="body1" $weight="medium">
        Medium Weight Text
      </Text>
      <Text {...args} $size="body1" $weight="bold">
        Bold Weight Text
      </Text>
    </>
  )
};

export const SpanElement: Story = {
  args: {
    $size: "h4",
    $span: true,
    children: "Span으로 렌더링된 텍스트"
  }
};
