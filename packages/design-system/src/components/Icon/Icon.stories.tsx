import type { Meta, StoryObj } from "@storybook/react-vite";
import { Icon } from "./Icon";
import * as icons from "../../../assets/icons";
import { Grid, Text, Flex } from "@/components";
import { IconName } from "./Icon.types";

const meta: Meta<typeof Icon> = {
  title: "components/Icon",
  component: Icon,
  tags: ["autodocs"],
  parameters: {
    layout: "centered"
  },
  argTypes: {
    icon: {
      control: "select",
      options: Object.keys(icons),
      description: "아이콘 이름",
    },
    size: {
      control: { type: "range", min: 16, max: 80, step: 1 },
      description: "아이콘 크기 (기본값: 28)",
    },
  },
};

export default meta;

type Story = StoryObj<typeof Icon>;

export const Default: Story = {
  args: {
    icon: "Bell",
    size: 40
  }
};

export const AllIcons: Story = {
  render: args => (
    <Grid $columns="repeat(5, 1fr)" $gap={16}>
      {Object.keys(icons).map(iconName => (
        <Flex $direction="column" $align="center" $gap={8} key={iconName}>
          <Icon {...args} icon={iconName as IconName} />
          <Text $size="caption">{iconName}</Text>
        </Flex>
      ))}
    </Grid>
  ),
  args: {
    size: 32
  }
};
