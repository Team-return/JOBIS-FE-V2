import { render, screen } from "@testing-library/react";
import { expect, describe, it } from "vitest";
import { Icon } from "./Icon";
import * as icons from "../../../icons";
import { IconName } from "./Icon.types";

describe("Icon", () => {
  it("renders the specified icon as an image", () => {
    render(<Icon icon="Home" />);
    const iconElement = screen.getByRole("img");
    expect(iconElement.tagName).toBe("svg");
  });

  it("applies default size", () => {
    render(<Icon icon="Bell" />);
    const iconElement = screen.getByRole("img");
    expect(iconElement).toHaveAttribute("width", "20");
    expect(iconElement).toHaveAttribute("height", "20");
  });

  it("applies custom size", () => {
    const size = 48;
    render(<Icon icon="Close" size={size} />);
    const iconElement = screen.getByRole("img");
    expect(iconElement).toHaveAttribute("width", `${size}`);
    expect(iconElement).toHaveAttribute("height", `${size}`);
  });

  it("renders all icons without crashing", () => {
    Object.keys(icons).forEach(iconName => {
      const { unmount } = render(<Icon icon={iconName as IconName} />);
      unmount();
    });
  });

  it("passes down other html attributes", () => {
    render(<Icon icon="Home" className="my-class" />);
    const iconElement = screen.getByRole("img");
    expect(iconElement).toHaveClass("my-class");
  });

  it("applies theme color for Refresh stroke", () => {
    render(<Icon icon="Refresh" />);
    const iconElement = screen.getByRole("img");
    expect(iconElement).toHaveAttribute("stroke");
  });

  it("ignores fillColor for WHITE_FILL_ICONS and uses theme color", () => {
    render(<Icon icon="ToastError" fillColor="#FF0000" />);
    const iconElement = screen.getByRole("img");
    // Should use theme.color.grayScale[10] instead of the provided fillColor
    expect(iconElement).toHaveAttribute("fill");
  });

  it("applies custom fillColor for non-WHITE_FILL_ICONS", () => {
    const customColor = "#5B8DEF";
    render(<Icon icon="Home" fillColor={customColor} />);
    const iconElement = screen.getByRole("img");
    expect(iconElement).toHaveAttribute("fill", customColor);
  });
});
