import { screen, fireEvent } from "@testing-library/react";
import { describe, it, expect, vi, beforeEach } from "vitest";
import { Modal } from "./Modal";
import { renderWithTheme } from "@/utils";

describe("Modal", () => {
  const onConfirm = vi.fn();
  const onClose = vi.fn();

  beforeEach(() => {
    onConfirm.mockClear();
    onClose.mockClear();
  });

  it("should render the modal with title and content", () => {
    renderWithTheme(
      <Modal
        title="Test Modal"
        content="This is the modal content."
        onConfirm={onConfirm}
        onClose={onClose}
      />
    );

    expect(screen.getByText("Test Modal")).toBeInTheDocument();
    expect(screen.getByText("This is the modal content.")).toBeInTheDocument();
  });

  it("should call onConfirm when confirm button is clicked", async () => {
    renderWithTheme(
      <Modal
        title="Test Modal"
        content="This is the modal content."
        onConfirm={onConfirm}
        onClose={onClose}
      />
    );

    const confirmButton = screen.getByText("확인");
    fireEvent.click(confirmButton);
    expect(onConfirm).toHaveBeenCalledTimes(1);
    expect(onClose).not.toHaveBeenCalled();
  });

  it("should call onClose when cancel button is clicked", () => {
    renderWithTheme(
      <Modal
        title="Test Modal"
        content="This is the modal content."
        onConfirm={onConfirm}
        onClose={onClose}
      />
    );

    const cancelButton = screen.getByText("취소");
    fireEvent.click(cancelButton);
    expect(onClose).toHaveBeenCalledTimes(1);
    expect(onConfirm).not.toHaveBeenCalled();
  });

  it("should call onClose when backdrop is clicked", async () => {
    renderWithTheme(
      <Modal
        title="Test Modal"
        content="This is the modal content."
        onConfirm={onConfirm}
        onClose={onClose}
      />
    );

    const dialog = screen.getByRole("dialog");
    fireEvent.click(dialog.parentElement!);
    expect(onClose).toHaveBeenCalledTimes(1);
    expect(onConfirm).not.toHaveBeenCalled();
  });

  it("should call onClose when Escape key is pressed", async () => {
    renderWithTheme(
      <Modal
        title="Test Modal"
        content="This is the modal content."
        onConfirm={onConfirm}
        onClose={onClose}
      />
    );

    fireEvent.keyDown(document, { key: "Escape", code: "Escape" });
    expect(onClose).toHaveBeenCalledTimes(1);
    expect(onConfirm).not.toHaveBeenCalled();
  });

  it("should not call onClose when backdrop is clicked if disableBackdropClick is true", () => {
    renderWithTheme(
      <Modal
        title="Test Modal"
        content="This is the modal content."
        onConfirm={onConfirm}
        onClose={onClose}
        disableBackdropClick={true}
      />
    );

    const dialog = screen.getByRole("dialog");
    fireEvent.click(dialog.parentElement!);
    expect(onClose).not.toHaveBeenCalled();
  });

  it("should not call onClose when Escape key is pressed if disableEscapeKey is true", () => {
    renderWithTheme(
      <Modal
        title="Test Modal"
        content="This is the modal content."
        onConfirm={onConfirm}
        onClose={onClose}
        disableEscapeKey={true}
      />
    );

    fireEvent.keyDown(document, { key: "Escape", code: "Escape" });
    expect(onClose).not.toHaveBeenCalled();
  });
});
