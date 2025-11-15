import { screen, fireEvent } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import { Modal } from "./Modal";
import { renderWithTheme } from "@/utils";
import { useModal } from "../../hooks/useModal";
import { ModalManager } from "../ModalManager";
import { Button } from "../Button";

describe("Modal with useModal", () => {
  const onConfirm = vi.fn();
  const onClose = vi.fn();

  const TestComponent = () => {
    const { open } = useModal();

    const openModal = () => {
      open(
        <Modal
          title="Test Modal"
          content="This is the modal content."
          onConfirm={onConfirm}
          onClose={onClose}
        />
      );
    };

    return <Button onClick={openModal}>Open Modal</Button>;
  };

  const renderTestComponent = () => {
    renderWithTheme(
      <>
        <TestComponent />
        {ModalManager()}
      </>
    );
  };

  it("should open and show the modal", async () => {
    renderTestComponent();
    fireEvent.click(screen.getByText("Open Modal"));

    expect(await screen.findByText("Test Modal")).toBeInTheDocument();
    expect(screen.getByText("This is the modal content.")).toBeInTheDocument();
  });

  it("should call onConfirm when confirm button is clicked", async () => {
    renderTestComponent();
    fireEvent.click(screen.getByText("Open Modal"));

    const confirmButton = await screen.findByText("확인");
    fireEvent.click(confirmButton);
    expect(onConfirm).toHaveBeenCalledTimes(1);
  });

  it("should call onClose when cancel button is clicked", async () => {
    renderTestComponent();
    fireEvent.click(screen.getByText("Open Modal"));

    const cancelButton = await screen.findByText("취소");
    fireEvent.click(cancelButton);
    expect(onClose).toHaveBeenCalledTimes(1);
  });

  it("should call onClose when backdrop is clicked", async () => {
    renderTestComponent();
    fireEvent.click(screen.getByText("Open Modal"));

    const dialog = await screen.findByRole("dialog");
    fireEvent.click(dialog.parentElement!);
    expect(onClose).toHaveBeenCalledTimes(1);
  });

  it("should call onClose when Escape key is pressed", async () => {
    renderTestComponent();
    fireEvent.click(screen.getByText("Open Modal"));

    await screen.findByRole("dialog");
    fireEvent.keyDown(window, { key: "Escape", code: "Escape" });
    expect(onClose).toHaveBeenCalledTimes(1);
  });
});
