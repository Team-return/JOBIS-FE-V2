import type { Meta, StoryObj } from "@storybook/react-vite";
import { CompanyTypeChip } from "./CompanyTypeChip";

const meta: Meta<typeof CompanyTypeChip> = {
  title: "components/compound/CompanyTypeChip",
  component: CompanyTypeChip,
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
type Story = StoryObj<typeof CompanyTypeChip>;

export const Default: Story = {
  args: {
    $type: "participation"
  }
};

export const ParticipationType: Story = {
  args: {
    $type: "participation"
  },
  render: args => <CompanyTypeChip {...args} />
};

export const LeaderType: Story = {
  args: {
    $type: "leader"
  },
  render: args => <CompanyTypeChip {...args} />
};

export const Comparison: Story = {
  render: () => (
    <div style={{ display: "flex", gap: "12px" }}>
      <CompanyTypeChip $type="participation" />
      <CompanyTypeChip $type="leader" />
    </div>
  )
};
