import type { Meta, StoryObj } from "@storybook/react-vite";
import { ReviewAccordion } from "./ReviewAccordion";

const meta: Meta<typeof ReviewAccordion> = {
  title: "components/compound/ReviewAccordion",
  component: ReviewAccordion,
  parameters: {
    layout: "centered"
  },
  tags: ["autodocs"],
  argTypes: {
    question: {
      control: "text",
      description: "면접 후기 질문"
    },
    answer: {
      control: "text",
      description: "면접 후기 답변"
    },
    year: {
      control: "number",
      description: "작성 연도"
    },
    major: {
      control: "text",
      description: "작성자 전공"
    },
    writer: {
      control: "text",
      description: "작성자 이름"
    }
  }
};

export default meta;
type Story = StoryObj<typeof ReviewAccordion>;

const InteractiveReviewAccordion = (args: Story["args"] = {}) => {
  return (
    <ReviewAccordion
      question={args.question!}
      answer={args.answer!}
      year={args.year!}
      major={args.major!}
      writer={args.writer!}
    />
  );
};

export const Default: Story = {
  args: {
    question: "후기를알려주세용",
    answer:
      "공무원의 신분과 정치적 중립성은 법률이 정하는 바에 의하여 보장된다. 제1항의 지시를 받은 당해 행정기관은 이에 응하여야 한다. 대통령은 국민의 보통·평등·직접·비밀선거에 의하여 선출한다.",
    year: 2024,
    major: "Front-end",
    writer: "김하온온"
  },
  render: args => <InteractiveReviewAccordion {...args} />
};
