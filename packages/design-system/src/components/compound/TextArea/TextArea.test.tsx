import { describe, it, expect, vi } from "vitest";
import { screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { renderWithTheme } from "@/utils/render";
import { TextArea } from "./TextArea";

describe("TextArea", () => {
  it("should render with a placeholder", () => {
    renderWithTheme(<TextArea placeholder="Enter text here" />);
    expect(screen.getByPlaceholderText("Enter text here")).toBeInTheDocument();
  });

  it("should display the value", () => {
    renderWithTheme(<TextArea value="Test value" />);
    expect(screen.getByDisplayValue("Test value")).toBeInTheDocument();
  });

  it("should be disabled when disabled prop is true", () => {
    renderWithTheme(<TextArea disabled placeholder="disabled-textarea" />);
    const textarea = screen.getByPlaceholderText("disabled-textarea");
    expect(textarea).toBeDisabled();
  });

  it("should call onChange handler when user types", async () => {
    const user = userEvent.setup();
    const handleChange = vi.fn();
    renderWithTheme(<TextArea onChange={handleChange} placeholder="test" />);
    const textarea = screen.getByPlaceholderText("test");

    await user.type(textarea, "hello world");

    expect(handleChange).toHaveBeenCalled();
    expect(handleChange).toHaveBeenLastCalledWith("hello world");
  });

  describe("Label", () => {
    it("should render with a label", () => {
      const labelText = "Description";
      renderWithTheme(<TextArea $label={labelText} />);
      expect(screen.getByText(labelText)).toBeInTheDocument();
    });

    it("should be associated with the textarea", () => {
      const labelText = "Description";
      renderWithTheme(
        <TextArea $label={labelText} placeholder="textarea-input" />
      );
      const textarea = screen.getByLabelText(labelText);
      expect(textarea).toHaveAttribute("placeholder", "textarea-input");
    });
  });

  describe("Error state", () => {
    it("should display an error message", () => {
      const errorMessage = "This field is required";
      renderWithTheme(<TextArea $errorMessage={errorMessage} />);
      expect(screen.getByText(errorMessage)).toBeInTheDocument();
    });

    it("should have aria-invalid attribute", () => {
      renderWithTheme(
        <TextArea placeholder="error-textarea" $errorMessage="error message" />
      );
      const textarea = screen.getByPlaceholderText("error-textarea");
      expect(textarea).toHaveAttribute("aria-invalid", "true");
    });
  });

  describe("maxLength", () => {
    it("should enforce maxLength", () => {
      renderWithTheme(<TextArea maxLength={10} placeholder="test" />);
      const textarea = screen.getByPlaceholderText(
        "test"
      ) as HTMLTextAreaElement;
      expect(textarea).toHaveAttribute("maxLength", "10");
    });
  });
});
