import type { Meta, StoryObj } from "@storybook/react-vite";
import { Toast } from "./Toast";
import { ToastManager } from "./ToastManager";
import { Button } from "@/components";
import { useToast } from "@/hooks";

const meta: Meta<typeof Toast> = {
  title: "components/Toast",
  component: Toast,
  tags: ["autodocs"],
  parameters: {
    layout: "centered"
  },
  argTypes: {
    $label: {
      control: "text",
      description: "토스트에 표시될 내용"
    },
    $type: {
      control: "select",
      options: ["success", "error", "warning", "info"],
      description: "토스트의 종류"
    }
  },
  decorators: [
    Story => {
      return (
        <>
          <Story />
          {ToastManager()}
        </>
      );
    }
  ]
};

export default meta;
type Story = StoryObj<typeof Toast>;

const ToastWithHook = ({
  label,
  type
}: {
  label: string;
  type: "success" | "error" | "warning" | "info";
}) => {
  const { open } = useToast();

  const openToast = () => {
    open(<Toast $label={label} $type={type} />);
  };

  return <Button onClick={openToast}>Show Toast</Button>;
};

export const Default: Story = {
  args: {
    $label: "This is a toast message.",
    $type: "success"
  },
  render: args => (
    <ToastWithHook
      label={args.$label as string}
      type={args.$type as "success" | "error" | "warning" | "info"}
    />
  )
};

export const Success: Story = {
  render: () => <ToastWithHook label="요청에 성공했습니다." type="success" />
};

export const Error: Story = {
  render: () => <ToastWithHook label="에러가 발생했습니다." type="error" />
};

export const Warning: Story = {
  render: () => (
    <ToastWithHook label="주의가 필요한 작업입니다." type="warning" />
  )
};

export const Info: Story = {
  render: () => <ToastWithHook label="정보를 확인해주세요." type="info" />
};

const MultipleToasts = () => {
  const { open } = useToast();

  const openMultipleToasts = () => {
    open(<Toast $label="첫 번째 알림" $type="success" />);
    setTimeout(() => open(<Toast $label="두 번째 알림" $type="info" />), 500);
    setTimeout(
      () => open(<Toast $label="세 번째 알림" $type="warning" />),
      1000
    );
    setTimeout(() => open(<Toast $label="네 번째 알림" $type="error" />), 1500);
  };

  return <Button onClick={openMultipleToasts}>Show Multiple Toasts</Button>;
};

export const Multiple: Story = {
  render: () => <MultipleToasts />
};

export const LongText: Story = {
  render: () => (
    <ToastWithHook
      label="이것은 매우 긴 토스트 메시지입니다. 토스트가 긴 텍스트를 어떻게 처리하는지 확인하기 위한 예시입니다. 최대 너비를 넘으면 자동으로 줄바꿈이 됩니다."
      type="info"
    />
  )
};
