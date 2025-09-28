import type { Meta, StoryObj } from "@storybook/react-vite";
import { expect, userEvent, within } from "storybook/test";
import { CompanyCard } from "./CompanyCard";

const meta: Meta<typeof CompanyCard> = {
  title: "components/CompanyCard",
  component: CompanyCard,
  parameters: {
    layout: "centered"
  },
  tags: ["autodocs"],
  argTypes: {
    $imgUrl: {
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
    $bookmark: {
      control: "boolean",
      description: "북마크 여부"
    }
  }
};

export default meta;
type Story = StoryObj<typeof CompanyCard>;

export const Default: Story = {
  args: {
    $imgUrl:
      "https://cdn.inflearn.com/public/files/pages/4f05016d-8cb1-4d17-adb1-36a316c60e62/white-logo.png",
    companyName: "주식회사 비바리퍼블리카",
    annualSales: "연매출 1,000억",
    $bookmark: false
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const bookmarkButton = canvas.getByRole("button", { name: "bookmark" });

    expect(bookmarkButton).toHaveAttribute("aria-pressed", "false");

    await userEvent.click(bookmarkButton);

    expect(bookmarkButton).toHaveAttribute("aria-pressed", "true");

    await userEvent.click(bookmarkButton);

    expect(bookmarkButton).toHaveAttribute("aria-pressed", "false");
  }
};

export const Bookmarked: Story = {
  args: {
    ...Default.args,
    $bookmark: true
  }
};
