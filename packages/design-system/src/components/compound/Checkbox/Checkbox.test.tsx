import { fireEvent, screen } from "@testing-library/react";
import { expect, describe, it, vi } from "vitest";
import { Checkbox } from "./Checkbox";
import { renderWithTheme } from "@/utils";

describe("Checkbox", () => {
  it("renders correctly with default props", () => {
    renderWithTheme(<Checkbox />);
    const checkboxElement = screen.getByRole("checkbox");
    expect(checkboxElement).toBeInTheDocument();
    expect(checkboxElement).toHaveAttribute("aria-checked", "false");
  });

  it("renders correctly when checked", () => {
    renderWithTheme(<Checkbox $checked />);
    const checkboxElement = screen.getByRole("checkbox");
    expect(checkboxElement).toHaveAttribute("aria-checked", "true");
  });

  it("renders label when provided", () => {
    const label = "Test Label";
    renderWithTheme(<Checkbox label={label} />);
    expect(screen.getByText(label)).toBeInTheDocument();
  });

  it("calls onChange handler when clicked", () => {
    const handleChange = vi.fn();
    renderWithTheme(<Checkbox $checked={false} onChange={handleChange} />);
    const checkboxElement = screen.getByRole("checkbox");
    fireEvent.click(checkboxElement);
    expect(handleChange).toHaveBeenCalledTimes(1);
    expect(handleChange).toHaveBeenCalledWith(true);
  });
});
