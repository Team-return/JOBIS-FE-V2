import { screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { expect, describe, it, vi } from "vitest";
import { MyComponent } from "./MyComponent";
import { renderWithTheme } from "@/utils";

const defaultArgs = {
  text: "Default Component",
  onClick: () => {}
};

const primaryArgs = {
  text: "Primary Component",
  onClick: () => {},
  variant: "primary"
} as const;

const secondaryArgs = {
  text: "Secondary Component",
  onClick: () => {},
  variant: "secondary"
} as const;

describe("MyComponent", () => {
  it("renderWithThemes with default variant and calls onClick", async () => {
    const onClickSpy = vi.fn();
    renderWithTheme(<MyComponent {...defaultArgs} onClick={onClickSpy} />);
    const component = screen.getByText(defaultArgs.text);
    expect(component).toBeInTheDocument();
    await userEvent.click(component);
    expect(onClickSpy).toHaveBeenCalledTimes(1);
  });

  it("renderWithThemes with primary variant and calls onClick", async () => {
    const onClickSpy = vi.fn();
    renderWithTheme(<MyComponent {...primaryArgs} onClick={onClickSpy} />);
    const component = screen.getByText(primaryArgs.text);
    expect(component).toBeInTheDocument();
    await userEvent.click(component);
    expect(onClickSpy).toHaveBeenCalledTimes(1);
  });

  it("renderWithThemes with secondary variant and calls onClick", async () => {
    const onClickSpy = vi.fn();
    renderWithTheme(<MyComponent {...secondaryArgs} onClick={onClickSpy} />);
    const component = screen.getByText(secondaryArgs.text);
    expect(component).toBeInTheDocument();
    await userEvent.click(component);
    expect(onClickSpy).toHaveBeenCalledTimes(1);
  });
});
