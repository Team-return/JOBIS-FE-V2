import type { Meta, StoryObj } from "@storybook/react-vite";
import { CompanyTypeClip } from "./CompanyTypeClip";

const meta: Meta<typeof CompanyTypeClip> = {
  title: "components/compound/CompanyTypeClip",
  component: CompanyTypeClip,
  tags: ["autodocs"],
  parameters: { layout: "centered" },
  argTypes: {
    $type: {
      control: "radio",
      options: ["participation", "leader"],
      description: "기업 타입",
      mapping: {
        participation: "participation",
        leader: "leader"
      }
    }
  },
  args: {
    $type: "participation"
  }
};

export default meta;
type Story = StoryObj<typeof CompanyTypeClip>;

export const Default: Story = {
  args: {
    $type: "participation"
  }
};

export const ParticipationType: Story = {
  args: {
    $type: "participation"
  },
  render: args => <CompanyTypeClip {...args} />
};

export const LeaderType: Story = {
  args: {
    $type: "leader"
  },
  render: args => <CompanyTypeClip {...args} />
};

export const Comparison: Story = {
  render: () => (
    <div style={{ display: "flex", gap: "12px" }}>
      <CompanyTypeClip $type="participation" />
      <CompanyTypeClip $type="leader" />
    </div>
  )
};
