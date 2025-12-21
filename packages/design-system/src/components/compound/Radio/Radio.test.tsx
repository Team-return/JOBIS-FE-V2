import { fireEvent, screen } from "@testing-library/react";
import { expect, describe, it, vi } from "vitest";
import { Radio } from "./Radio";
import { renderWithTheme } from "@/utils/render";

describe("Radio", () => {
  it("renders correctly with default props", () => {
    renderWithTheme(<Radio />);
    const radioElement = screen.getByRole("radio");
    expect(radioElement).toBeInTheDocument();
    expect(radioElement).toHaveAttribute("aria-checked", "false");
  });

  it("renders correctly when checked", () => {
    renderWithTheme(<Radio $checked />);
    const radioElement = screen.getByRole("radio");
    expect(radioElement).toHaveAttribute("aria-checked", "true");
  });

  it("renders label when provided", () => {
    const label = "Test Label";
    renderWithTheme(<Radio label={label} />);
    expect(screen.getByText(label)).toBeInTheDocument();
  });

  it("calls onChange handler when clicked", () => {
    const handleChange = vi.fn();
    renderWithTheme(<Radio $checked={false} onChange={handleChange} />);
    const radioElement = screen.getByRole("radio");
    fireEvent.click(radioElement);
    expect(handleChange).toHaveBeenCalledTimes(1);
    expect(handleChange).toHaveBeenCalledWith(true);
  });
});
