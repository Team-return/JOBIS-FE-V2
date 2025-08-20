import { render, screen } from "@testing-library/react";
import { expect, describe, it } from "vitest";
import { Surface } from "./Surface";
import { parseList } from "@/utils";

describe("Surface", () => {
  it("renders with children", () => {
    const testContent = "Test Content";
    render(<Surface>{testContent}</Surface>);
    const surfaceElement = screen.getByText(testContent);
    expect(surfaceElement).toBeInTheDocument();
  });

  it("applies shadow correctly", () => {
    render(<Surface $shadow>Content</Surface>);
    const surfaceElement = screen.getByText("Content");
    expect(surfaceElement).toHaveStyle(
      "box-shadow: 0px 4px 20px 0px rgba(112, 144, 176, 0.12)"
    );
  });

  it("applies number radius correctly", () => {
    const radiusValue = 10;
    render(<Surface $radius={radiusValue}>Content</Surface>);
    const surfaceElement = screen.getByText("Content");
    expect(surfaceElement).toHaveStyle(
      `border-radius: ${parseList(radiusValue)}`
    );
  });

  it("applies string radius correctly", () => {
    const radiusValue = "10px";
    render(<Surface $radius={radiusValue}>Content</Surface>);
    const surfaceElement = screen.getByText("Content");
    expect(surfaceElement).toHaveStyle(`border-radius: ${radiusValue}`);
  });

  it("applies bg color correctly", () => {
    const bgColor = "#f8f9fa";
    render(<Surface $bg={bgColor}>Content</Surface>);
    const surfaceElement = screen.getByText("Content");
    expect(surfaceElement).toHaveStyle(`background: ${bgColor}`);
  });

  it("applies border correctly", () => {
    const borderValue = "1px solid #eee";
    render(<Surface $border={borderValue}>Content</Surface>);
    const surfaceElement = screen.getByText("Content");
    expect(surfaceElement).toHaveStyle(`border: ${borderValue}`);
  });

  it("applies padding correctly", () => {
    const paddingValue = 20;
    render(<Surface $padding={paddingValue}>Content</Surface>);
    const surfaceElement = screen.getByText("Content");
    expect(surfaceElement).toHaveStyle(`padding: ${parseList(paddingValue)}`);
  });
});
