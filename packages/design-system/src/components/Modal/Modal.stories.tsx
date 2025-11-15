import type { Meta, StoryObj } from "@storybook/react-vite";
import { Modal } from "./Modal";
import { ModalManager } from "./ModalManager";
import { Button } from "@/components";
import { useModal } from "@/hooks";

const meta: Meta<typeof Modal> = {
  title: "components/Modal",
  component: Modal,
  tags: ["autodocs"],
  argTypes: {
    title: { control: "text" },
    content: { control: "text" },
    onConfirm: { action: "confirmed" },
    onClose: { action: "closed" }
  },
  decorators: [
    Story => {
      return (
        <>
          <Story />
          {ModalManager()}
        </>
      );
    }
  ]
};

export default meta;
type Story = StoryObj<typeof Modal>;

const ModalWithHook = () => {
  const { open, close } = useModal();

  const openCustomModal = () => {
    open(
      <Modal
        title="모달 제목"
        content="모달 내용입니다."
        onConfirm={() => {
          close();
        }}
        onClose={close}
      />
    );
  };

  return <Button onClick={openCustomModal}>Open Modal</Button>;
};

export const Default: Story = {
  render: () => <ModalWithHook />
};
