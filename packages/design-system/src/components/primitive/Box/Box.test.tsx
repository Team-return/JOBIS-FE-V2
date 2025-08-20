import { render, screen } from "@testing-library/react";
import { expect, describe, it } from "vitest";
import { Box } from "./Box";
import type { Props } from "./Box.types";
import { type SpacingValue, parseValue, parseList } from "@/utils";

describe("Box", () => {
  it("renders with default props and children", () => {
    const testContent = "Test Content";
    render(<Box>{testContent}</Box>);
    const boxElement = screen.getByText(testContent);
    expect(boxElement).toBeInTheDocument();
  });

  it("applies number padding correctly", () => {
    const paddingValue = 16;
    render(<Box $padding={paddingValue}>Content</Box>);
    const boxElement = screen.getByText("Content");
    expect(boxElement).toHaveStyle(`padding: ${parseValue(paddingValue)}`);
  });

  it("applies list margin correctly", () => {
    const marginValue: SpacingValue = ["10px", "20px"];
    render(<Box $margin={marginValue}>Content</Box>);
    const boxElement = screen.getByText("Content");
    expect(boxElement).toHaveStyle(`margin: ${marginValue.join(" ")}`);
  });

  it("applies number width and height correctly", () => {
    const widthValue = 200;
    const heightValue = 150;
    render(
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
    render(<Box $bg={bgColor}>Content</Box>);
    const boxElement = screen.getByText("Content");
    expect(boxElement).toHaveStyle(`background: ${bgColor}`);
  });

  it("applies border and radius correctly", () => {
    const borderValue = "2px solid black";
    const radiusValue = 8;
    render(
      <Box $border={borderValue} $radius={radiusValue}>
        Content
      </Box>
    );
    const boxElement = screen.getByText("Content");
    expect(boxElement).toHaveStyle(`border: ${borderValue}`);
    expect(boxElement).toHaveStyle(`border-radius: ${parseValue(radiusValue)}`);
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
    render(<Box {...props}>Content</Box>);
    const boxElement = screen.getByText("Content");
    expect(boxElement).toHaveStyle(`padding: ${parseList(props.$padding!)}`);
    expect(boxElement).toHaveStyle(`margin: ${parseList(props.$margin!)}`);
    expect(boxElement).toHaveStyle(`width: ${parseValue(props.width!)}`);
    expect(boxElement).toHaveStyle(`height: ${parseValue(props.height!)}`);
    expect(boxElement).toHaveStyle(`background: ${props.$bg}`);
    expect(boxElement).toHaveStyle(`border: ${props.$border}`);
    expect(boxElement).toHaveStyle(`border-radius: ${props.$radius}`);
  });
});
