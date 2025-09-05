import { describe, it, expect } from "vitest";
import { screen } from "@testing-library/react";
import { renderWithTheme } from "@/utils";
import { Toast } from "./Toast";

describe("Toast", () => {
  it("should render the label", () => {
    renderWithTheme(<Toast label="Hello!" />);
    expect(screen.getByText("Hello!")).toBeInTheDocument();
  });

  it("should render the success icon by default", () => {
    renderWithTheme(<Toast label="Success!" />);
    expect(screen.getByAltText("ToastSuccess")).toBeInTheDocument();
  });

  it("should render the error icon when $type is error", () => {
    renderWithTheme(<Toast label="Error!" $type="error" />);
    expect(screen.getByAltText("ToastError")).toBeInTheDocument();
  });

  it("should pass down other html attributes", () => {
    const { container } = renderWithTheme(
      <Toast label="With Class" className="my-toast" />
    );
    expect(container.firstChild).toHaveClass("my-toast");
  });
});
