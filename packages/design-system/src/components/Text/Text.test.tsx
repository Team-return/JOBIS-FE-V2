import { screen } from "@testing-library/react";
import { expect, describe, it } from "vitest";
import { Text } from "./Text";
import { renderWithTheme } from "@/utils";

describe("Text", () => {
  it("renders children correctly", () => {
    const testContent = "Test Content";
    renderWithTheme(<Text $size="body1">{testContent}</Text>);
    const textElement = screen.getByText(testContent);
    expect(textElement).toBeInTheDocument();
  });

  it("renders as p element by default", () => {
    renderWithTheme(<Text $size="body1">Content</Text>);
    const textElement = screen.getByText("Content");
    expect(textElement.tagName).toBe("P");
  });

  it("renders as heading element when size starts with h", () => {
    renderWithTheme(<Text $size="h1">Content</Text>);
    const textElement = screen.getByText("Content");
    expect(textElement.tagName).toBe("H1");
  });

  it("renders as span when $span prop is true", () => {
    renderWithTheme(
      <Text $size="h1" $span>
        Content
      </Text>
    );
    const textElement = screen.getByText("Content");
    expect(textElement.tagName).toBe("SPAN");
  });

  it("applies color correctly", () => {
    const colorValue = "#ff0000";
    renderWithTheme(
      <Text $size="body1" $color={colorValue}>
        Content
      </Text>
    );
    const textElement = screen.getByText("Content");
    expect(textElement).toHaveStyle(`color: ${colorValue}`);
  });

  it("applies text alignment correctly", () => {
    renderWithTheme(
      <Text $size="body1" $align="center">
        Content
      </Text>
    );
    const textElement = screen.getByText("Content");
    expect(textElement).toHaveStyle("text-align: center");
  });

  it("applies font weight correctly", () => {
    renderWithTheme(
      <Text $size="body1" $weight="bold">
        Content
      </Text>
    );
    const textElement = screen.getByText("Content");
    expect(textElement).toHaveStyle("font-weight: 700");
  });

  it("applies all props correctly", () => {
    renderWithTheme(
      <Text $size="h2" $color="#333333" $align="right" $weight="medium">
        Content
      </Text>
    );

    const textElement = screen.getByText("Content");
    expect(textElement.tagName).toBe("H2");
    expect(textElement).toHaveStyle("color: #333333");
    expect(textElement).toHaveStyle("text-align: right");
  });
});
