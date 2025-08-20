import { render, screen } from "@testing-library/react";
import { expect, describe, it } from "vitest";
import { Container } from "./Container";
import { type SpacingValue, parseValue, parseList } from "@/utils";

describe("Container", () => {
  it("renders with children", () => {
    const testContent = "Test Content";
    render(<Container>{testContent}</Container>);
    const containerElement = screen.getByText(testContent);
    expect(containerElement).toBeInTheDocument();
  });

  it("applies maxWidth correctly with number value", () => {
    const maxWidthValue = 1200;
    render(<Container $maxWidth={maxWidthValue}>Content</Container>);
    const containerElement = screen.getByText("Content");
    expect(containerElement).toHaveStyle(
      `max-width: ${parseValue(maxWidthValue)}`
    );
  });

  it("applies maxWidth correctly with string value", () => {
    const maxWidthValue = "1000px";
    render(<Container $maxWidth={maxWidthValue}>Content</Container>);
    const containerElement = screen.getByText("Content");
    expect(containerElement).toHaveStyle(`max-width: ${maxWidthValue}`);
  });

  it("applies padding correctly with number value", () => {
    const paddingValue = 24;
    render(<Container $padding={paddingValue}>Content</Container>);
    const containerElement = screen.getByText("Content");
    expect(containerElement).toHaveStyle(`padding: ${parseList(paddingValue)}`);
  });

  it("applies padding correctly with array value", () => {
    const paddingValue: SpacingValue = [16, 32];
    render(<Container $padding={paddingValue}>Content</Container>);
    const containerElement = screen.getByText("Content");
    expect(containerElement).toHaveStyle(`padding: ${parseList(paddingValue)}`);
  });

  it("applies both maxWidth and padding correctly", () => {
    const maxWidthValue = 960;
    const paddingValue = 40;
    render(
      <Container $maxWidth={maxWidthValue} $padding={paddingValue}>
        Content
      </Container>
    );
    const containerElement = screen.getByText("Content");
    expect(containerElement).toHaveStyle(
      `max-width: ${parseValue(maxWidthValue)}`
    );
    expect(containerElement).toHaveStyle(`padding: ${parseList(paddingValue)}`);
  });
});
