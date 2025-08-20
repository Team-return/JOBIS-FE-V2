import { render, screen } from "@testing-library/react";
import { expect, describe, it } from "vitest";
import { Visibility } from "./Visibility";

describe("Visibility", () => {
  it("renders children without any visibility modifications", () => {
    const testContent = "Test Content";
    render(<Visibility>{testContent}</Visibility>);
    const element = screen.getByText(testContent);

    expect(element).toBeInTheDocument();
    expect(element).not.toHaveAttribute("hidden");
  });

  it("applies opacity style when opacity is provided", () => {
    const opacityValue = 0.5;
    render(<Visibility $opacity={opacityValue}>Content</Visibility>);
    const element = screen.getByText("Content");

    expect(element).toHaveStyle(`opacity: ${opacityValue}`);
    expect(element).toHaveStyle("visibility: visible");
    expect(element).not.toHaveAttribute("hidden");
  });

  it("applies visibility:hidden when invisible is true", () => {
    render(<Visibility $invisible>Content</Visibility>);
    const element = screen.getByText("Content");

    expect(element).toHaveStyle("visibility: hidden");
    expect(element).not.toHaveAttribute("hidden");
  });

  it("applies hidden attribute when hidden prop is true", () => {
    render(<Visibility hidden>Content</Visibility>);
    const element = screen.getByText("Content");

    expect(element).toHaveAttribute("hidden");
  });

  it("applies both opacity and invisible styles simultaneously", () => {
    const opacityValue = 0.2;
    render(
      <Visibility $opacity={opacityValue} $invisible>
        Content
      </Visibility>
    );
    const element = screen.getByText("Content");

    expect(element).toHaveStyle(`opacity: ${opacityValue}`);
    expect(element).not.toHaveAttribute("hidden");
  });

  it("applies invisible style with opacity when both are provided", () => {
    const opacityValue = 0.7;
    render(
      <Visibility $invisible $opacity={opacityValue}>
        Content
      </Visibility>
    );
    const element = screen.getByText("Content");

    expect(element).toHaveStyle(`opacity: ${opacityValue}`);
    expect(element).toHaveStyle("visibility: hidden");
  });
});
