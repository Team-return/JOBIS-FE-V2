import { screen } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import userEvent from "@testing-library/user-event";
import { renderWithTheme } from "@/utils/render";
import { IconButton } from "./IconButton";

describe("IconButton", () => {
  it("renders icon and label", () => {
    renderWithTheme(<IconButton icon="Bell">alarm</IconButton>);

    expect(screen.getByText("alarm")).toBeInTheDocument();
    expect(screen.getByLabelText("Bell")).toBeInTheDocument();
  });

  it("calls onClick when clicked", async () => {
    const handleClick = vi.fn();
    renderWithTheme(
      <IconButton icon="Bell" onClick={handleClick}>
        click
      </IconButton>
    );

    await userEvent.click(screen.getByText("click"));
    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  it("applies custom width and color", () => {
    const color = "#5B8DEF";
    renderWithTheme(
      <IconButton icon="Bell" $width="200px" $color={color}>
        style
      </IconButton>
    );

    const textElement = screen.getByText("style");
    const componentElement = textElement.closest("div[class*='css']")
      ?.parentElement as HTMLElement;
    expect(componentElement).toHaveStyle("width: 200px");
    expect(componentElement).toHaveStyle(`border: 1px solid ${color}`);
    expect(screen.getByLabelText("Bell")).toHaveAttribute("fill");
    expect(textElement).toHaveStyle(`color: ${color}`);
  });
});
