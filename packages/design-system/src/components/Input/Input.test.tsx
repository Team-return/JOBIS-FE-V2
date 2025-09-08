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

  it("should call onChange handler when user types", async () => {
    const user = userEvent.setup();
    const handleChange = vi.fn();
    renderWithTheme(<Input onChange={handleChange} placeholder="test" />);
    const input = screen.getByPlaceholderText("test");

    await user.type(input, "hello");

    expect(handleChange).toHaveBeenCalledTimes(5);
    expect(handleChange).toHaveBeenLastCalledWith("hello");
  });

  it("should display the value", () => {
    renderWithTheme(<Input value="Test value" />);
    expect(screen.getByDisplayValue("Test value")).toBeInTheDocument();
  });

  it("should render with a label", () => {
    const labelText = "Username";
    renderWithTheme(<Input $label={labelText} />);
    expect(screen.getByText(labelText)).toBeInTheDocument();
  });

  it("should display an error message when in error state", () => {
    const errorMessage = "This field is required";
    renderWithTheme(<Input $errorMessage={errorMessage} />);
    expect(screen.getByText(errorMessage)).toBeInTheDocument();
  });

  it("should have aria-invalid attribute when in error state", () => {
    renderWithTheme(
      <Input
        $label="Test"
        placeholder="error-input"
        $errorMessage="error message"
      />
    );
    expect(screen.getByText("Test")).toBeInTheDocument();
    const input = screen.getByPlaceholderText("error-input");
    expect(input).toHaveAttribute("aria-invalid", "true");
  });
});
