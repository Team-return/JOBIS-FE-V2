import { describe, it, expect, vi } from "vitest";
import { screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { renderWithTheme } from "@/utils";
import { Input } from "./Input";

describe("Input", () => {
  it("should render with a placeholder", () => {
    renderWithTheme(<Input placeholder="Enter text here" />);
    expect(screen.getByPlaceholderText("Enter text here")).toBeInTheDocument();
  });

  it("should display the value", () => {
    renderWithTheme(<Input value="Test value" />);
    expect(screen.getByDisplayValue("Test value")).toBeInTheDocument();
  });

  it("should be disabled when disabled prop is true", () => {
    renderWithTheme(<Input disabled placeholder="disabled-input" />);
    const input = screen.getByPlaceholderText("disabled-input");
    expect(input).toBeDisabled();
  });

  it("should call onChange handler when user types", async () => {
    const user = userEvent.setup();
    const handleChange = vi.fn();
    renderWithTheme(<Input onChange={handleChange} placeholder="test" />);
    const input = screen.getByPlaceholderText("test");

    await user.type(input, "hello");

    expect(handleChange).toHaveBeenCalled();
    expect(handleChange).toHaveBeenLastCalledWith("hello");
  });

  describe("Label", () => {
    it("should render with a label", () => {
      const labelText = "Username";
      renderWithTheme(<Input $label={labelText} />);
      expect(screen.getByText(labelText)).toBeInTheDocument();
    });

    it("should be associated with the input", () => {
      const labelText = "Username";
      renderWithTheme(<Input $label={labelText} placeholder="user-input" />);
      const input = screen.getByLabelText(labelText);
      expect(input).toHaveAttribute("placeholder", "user-input");
    });
  });

  describe("Error state", () => {
    it("should display an error message", () => {
      const errorMessage = "This field is required";
      renderWithTheme(<Input $errorMessage={errorMessage} />);
      expect(screen.getByText(errorMessage)).toBeInTheDocument();
    });

    it("should have aria-invalid attribute", () => {
      renderWithTheme(
        <Input placeholder="error-input" $errorMessage="error message" />
      );
      const input = screen.getByPlaceholderText("error-input");
      expect(input).toHaveAttribute("aria-invalid", "true");
    });
  });

  describe("Icon", () => {
    it("should render an icon", () => {
      renderWithTheme(<Input $iconName="Search" />);
      const icon = screen.getByRole("img");
      expect(icon).toBeInTheDocument();
    });

    it("should call onIconClick when icon is clicked", async () => {
      const user = userEvent.setup();
      const handleClick = vi.fn();
      renderWithTheme(<Input $iconName="Search" onIconClick={handleClick} />);
      const icon = screen.getByRole("img");

      await user.click(icon);

      expect(handleClick).toHaveBeenCalledTimes(1);
    });
  });
});
