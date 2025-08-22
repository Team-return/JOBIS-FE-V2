import type { Meta, StoryObj } from "@storybook/react-vite";
import { Image } from "./Image";

const meta: Meta<typeof Image> = {
  title: "components/primitive/Image",
  component: Image,
  tags: ["autodocs"],
  parameters: {
    layout: "centered"
  },
  argTypes: {
    src: {
      control: "text",
      description: "이미지 소스 URL"
    },
    alt: {
      control: "text",
      description: "이미지 대체 텍스트"
    },
    width: {
      control: "text",
      description: "이미지 너비 (px 또는 %)"
    },
    height: {
      control: "text",
      description: "이미지 높이 (px 또는 %)"
    },
    $radius: {
      control: "text",
      description: "이미지 모서리 둥글기 (px 또는 %)"
    },
    $fit: {
      control: {
        type: "select",
        options: ["cover", "contain"]
      },
      description: "이미지 채우기 기준"
    }
  }
};

export default meta;

type Story = StoryObj<typeof Image>;

export const Default: Story = {
  args: {
    src: "https://placehold.co/300",
    alt: "A placeholder image",
    width: 300,
    height: 300,
    $radius: 8
  }
};

export const CustomSize: Story = {
  args: {
    src: "https://placehold.co/500x200",
    alt: "A wide placeholder image",
    width: 500,
    height: 200,
    $radius: 0
  }
};

export const Rounded: Story = {
  args: {
    src: "https://placehold.co/200",
    alt: "A rounded image",
    width: 200,
    height: 200,
    $radius: "50%"
  }
};

export const WithBorderRadiusArray: Story = {
  args: {
    src: "https://placehold.co/250",
    alt: "An image with custom border radius",
    width: 250,
    height: 250,
    $radius: [10, 20, 30, 40]
  }
};
