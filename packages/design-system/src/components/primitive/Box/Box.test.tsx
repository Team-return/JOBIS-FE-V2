import { screen } from "@testing-library/react";
import { renderWithTheme } from "@/utils";
import { expect, describe, it } from "vitest";
import { Box } from "./Box";
import type { Props } from "./Box.types";
import { type SpacingValue, parseValue } from "@/utils";

describe("Box", () => {
  it("renders with default props and children", () => {
    const testContent = "Test Content";
    renderWithTheme(<Box>{testContent}</Box>);
    const boxElement = screen.getByText(testContent);
    expect(boxElement).toBeInTheDocument();
  });

  it("applies number padding correctly", () => {
    const paddingValue = 16;
    renderWithTheme(<Box $padding={paddingValue}>Content</Box>);
    const boxElement = screen.getByText("Content");
    expect(boxElement).toHaveStyle(`padding: ${parseValue(paddingValue)}`);
  });

  it("applies list margin correctly", () => {
    const marginValue: SpacingValue = ["10px", "20px"];
    renderWithTheme(<Box $margin={marginValue}>Content</Box>);
    const boxElement = screen.getByText("Content");
    expect(boxElement).toHaveStyle(`margin: ${marginValue.join(" ")}`);
  });

  it("applies number width and height correctly", () => {
    const widthValue = 200;
    const heightValue = 150;
    renderWithTheme(
      <Box width={widthValue} height={heightValue}>
        Content
      </Box>
    );
    const boxElement = screen.getByText("Content");
    expect(boxElement).toHaveStyle(`width: ${parseValue(widthValue)}`);
    expect(boxElement).toHaveStyle(`height: ${parseValue(heightValue)}`);
  });

  it("applies background color correctly", () => {
    const bgColor = "#ff0000";
    renderWithTheme(<Box $bg={bgColor}>Content</Box>);
    const boxElement = screen.getByText("Content");
    expect(boxElement).toHaveStyle(`background: ${bgColor}`);
  });

  it("applies border and radius correctly", () => {
    const borderValue = "2px solid black";
    const radiusValue = 8;
    renderWithTheme(
      <Box $border={borderValue} $radius={radiusValue}>
        Content
      </Box>
    );
    const boxElement = screen.getByText("Content");
    const styles = window.getComputedStyle(boxElement);
    expect(styles.borderWidth).toBe("2px");
    expect(styles.borderStyle).toBe("solid");
    expect(styles.borderTopColor).toBe("rgb(0, 0, 0)");
    expect(styles.borderRightColor).toBe("rgb(0, 0, 0)");
    expect(styles.borderBottomColor).toBe("rgb(0, 0, 0)");
    expect(styles.borderLeftColor).toBe("rgb(0, 0, 0)");
    expect(styles.borderRadius).toBe(`${radiusValue}px`);
  });

  it("applies multiple props correctly", () => {
    const props: Props = {
      $padding: 10,
      $margin: 20,
      width: 100,
      height: 50,
      $bg: "blue",
      $border: "1px solid red",
      $radius: "5px"
    };
    renderWithTheme(<Box {...props}>Content</Box>);
    const boxElement = screen.getByText("Content");
    const styles = window.getComputedStyle(boxElement);
    expect(styles.padding).toBe("10px");
    expect(styles.margin).toBe("20px");
    expect(styles.width).toBe("100px");
    expect(styles.height).toBe("50px");
    expect(styles.backgroundColor).toBe("rgb(0, 0, 255)");
    expect(styles.borderWidth).toBe("1px");
    expect(styles.borderStyle).toBe("solid");
    expect(styles.borderTopColor).toBe("rgb(255, 0, 0)");
    expect(styles.borderRightColor).toBe("rgb(255, 0, 0)");
    expect(styles.borderBottomColor).toBe("rgb(255, 0, 0)");
    expect(styles.borderLeftColor).toBe("rgb(255, 0, 0)");
    expect(styles.borderRadius).toBe("5px");
  });
});
