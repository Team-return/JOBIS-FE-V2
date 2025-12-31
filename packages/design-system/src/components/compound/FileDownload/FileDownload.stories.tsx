import type { Meta, StoryObj } from "@storybook/react-vite";
import { expect, userEvent, within } from "storybook/test";
import { FileDownload } from "./FileDownload";

const meta: Meta<typeof FileDownload> = {
  title: "components/compound/FileDownload",
  component: FileDownload,
  tags: ["autodocs"],
  parameters: { layout: "centered" },
  argTypes: {
    label: {
      control: "text",
      description: "다운로드에 표시될 내용"
    },
    $done: {
      control: "boolean",
      description: "다운로드 완료 여부"
    },
    fileUrl: {
      control: "text",
      description: "다운로드할 파일 주소"
    }
  }
};

export default meta;
type Story = StoryObj<typeof FileDownload>;

export const Default: Story = {
  args: {
    label: "File Download",
    $done: false,
    fileUrl: "/mock.pdf"
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const buttons = canvas.getAllByRole("button");
    const fileDownloadButton = buttons.find(button =>
      button.textContent?.includes("File Download")
    );
    expect(fileDownloadButton).toBeInTheDocument();
    await userEvent.click(fileDownloadButton!);
  }
};

export const Done: Story = {
  args: {
    label: "File Download",
    $done: true,
    fileUrl: "/mock.pdf"
  }
};
