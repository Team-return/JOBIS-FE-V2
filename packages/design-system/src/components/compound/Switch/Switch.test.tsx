import { fireEvent, screen } from "@testing-library/react";
import { expect, describe, it, vi } from "vitest";
import { Switch } from "./Switch";
import { renderWithTheme } from "@/utils";
import { ThemeProvider } from "@emotion/react";
import { darkTheme } from "@/themes";

describe("Switch", () => {
  it("renders correctly with default props", () => {
    renderWithTheme(<Switch />);
    const switchElement = screen.getByRole("switch");
    expect(switchElement).toBeInTheDocument();
    expect(switchElement).toHaveAttribute("aria-checked", "false");
  });

  it("renders correctly when checked", () => {
    renderWithTheme(<Switch $checked />);
    const switchElement = screen.getByRole("switch");
    expect(switchElement).toHaveAttribute("aria-checked", "true");
  });

  it("calls onChange handler when clicked", () => {
    const handleChange = vi.fn();
    renderWithTheme(<Switch $checked={false} onChange={handleChange} />);
    const switchElement = screen.getByRole("switch");
    fireEvent.click(switchElement);
    expect(handleChange).toHaveBeenCalledTimes(1);
    expect(handleChange).toHaveBeenCalledWith(true);
  });

  it("toggles state when clicked", () => {
    const handleChange = vi.fn();
    const { rerender } = renderWithTheme(
      <Switch $checked={false} onChange={handleChange} />
    );

    const switchElement = screen.getByRole("switch");
    fireEvent.click(switchElement);

    expect(handleChange).toHaveBeenCalledWith(true);

    rerender(
      <ThemeProvider theme={darkTheme}>
        <Switch $checked onChange={handleChange} />
      </ThemeProvider>
    );
    expect(switchElement).toHaveAttribute("aria-checked", "true");

    fireEvent.click(switchElement);
    expect(handleChange).toHaveBeenCalledWith(false);
  });
});
