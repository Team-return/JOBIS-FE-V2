import type { Meta, StoryObj } from "@storybook/react-vite";
import { RecrutementCard } from "./RecrutementCard";
import { expect, fn, userEvent, within } from "storybook/test";

const meta: Meta<typeof RecrutementCard> = {
  title: "components/compound/RecrutementCard",
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
    recruitmentStatus: {
      control: "boolean",
      description: "모집 여부"
    },
    militarySupport: {
      control: "boolean",
      description: "병역특례 지원 여부"
    },
    bookmarked: {
      control: "boolean",
      description: "북마크 여부"
    },
    onClick: {
      action: "clicked",
      description: "카드 클릭 이벤트 핸들러"
    }
  },
  args: {
    hiringJobs: "프론트엔드 개발자",
    companyName: "자비스",
    companyProfileUrl: "https://placehold.co/222x144",
    recruitmentStatus: "모집중" as const,
    militarySupport: true,
    bookmarked: false
  }
};

export default meta;
type Story = StoryObj<typeof RecrutementCard>;

export const Default: Story = {
  args: {
    onClick: fn()
  },
  play: async ({ args, canvasElement }) => {
    const canvas = within(canvasElement);
    const component = canvas.getByRole("cell");
    expect(component).toBeInTheDocument();
    await userEvent.click(component);
    await expect(args.onClick).toHaveBeenCalledTimes(1);
  }
};

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
