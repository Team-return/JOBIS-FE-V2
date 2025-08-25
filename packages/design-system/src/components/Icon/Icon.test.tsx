import { render, screen } from "@testing-library/react";
import { expect, describe, it } from "vitest";
import { Icon } from "./Icon";
import * as icons from "../../../assets/icons";
import { IconName } from "./Icon.types";

describe("Icon", () => {
  it("renders the specified icon as an image", () => {
    render(<Icon icon="Home" data-testid="icon" />);
    const iconElement = screen.getByTestId("icon");
    expect(iconElement.tagName).toBe("IMG");
    expect(iconElement).toHaveAttribute("src");
  });

  it("applies default size", () => {
    render(<Icon icon="Bell" data-testid="icon" />);
    const iconElement = screen.getByTestId("icon");
    expect(iconElement).toHaveAttribute("width", "28");
    expect(iconElement).toHaveAttribute("height", "28");
  });

  it("applies custom size", () => {
    const size = 48;
    render(<Icon icon="Close" size={size} data-testid="icon" />);
    const iconElement = screen.getByTestId("icon");
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
    render(<Icon icon="Home" className="my-class" data-testid="icon" />);
    const iconElement = screen.getByTestId("icon");
    expect(iconElement).toHaveClass("my-class");
  });
});
