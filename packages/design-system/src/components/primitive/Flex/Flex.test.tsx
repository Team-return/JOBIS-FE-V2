import { render, screen } from "@testing-library/react";
import { expect, describe, it } from "vitest";
import { Flex } from "./Flex";
import { parseValue } from "@/utils";
import { Props } from "./Flex.types";

describe("Flex", () => {
  it("renders with children", () => {
    render(
      <Flex>
        <div data-testid="child">Child</div>
      </Flex>
    );
    const childElement = screen.getByTestId("child");
    expect(childElement).toBeInTheDocument();
  });

  it("applies display: flex by default", () => {
    render(
      <Flex>
        <div>Child</div>
      </Flex>
    );
    const flexElement = screen.getByText("Child").parentElement;
    expect(flexElement).toHaveStyle("display: flex");
  });

  it("applies gap correctly with number", () => {
    const gapValue = 16;
    render(
      <Flex $gap={gapValue}>
        <div>Child</div>
      </Flex>
    );
    const flexElement = screen.getByText("Child").parentElement;
    expect(flexElement).toHaveStyle(`gap: ${parseValue(gapValue)}`);
  });

  it("applies direction correctly", () => {
    const directionValue = "column";
    render(
      <Flex $direction={directionValue}>
        <div>Child</div>
      </Flex>
    );
    const flexElement = screen.getByText("Child").parentElement;
    expect(flexElement).toHaveStyle(`flex-direction: ${directionValue}`);
  });

  it("applies align correctly", () => {
    const alignValue = "center";
    render(
      <Flex $align={alignValue}>
        <div>Child</div>
      </Flex>
    );
    const flexElement = screen.getByText("Child").parentElement;
    expect(flexElement).toHaveStyle(`align-items: ${alignValue}`);
  });

  it("applies justify correctly", () => {
    const justifyValue = "space-between";
    render(
      <Flex $justify={justifyValue}>
        <div>Child</div>
      </Flex>
    );
    const flexElement = screen.getByText("Child").parentElement;
    expect(flexElement).toHaveStyle(`justify-content: ${justifyValue}`);
  });

  it("applies wrap correctly", () => {
    render(
      <Flex $wrap>
        <div>Child</div>
      </Flex>
    );
    const flexElement = screen.getByText("Child").parentElement;
    expect(flexElement).toHaveStyle("flex-wrap: wrap");
  });

  it("applies all props correctly", () => {
    const props: Props = {
      $gap: 8,
      $direction: "row",
      $align: "center",
      $justify: "flex-end",
      $wrap: true
    };
    render(
      <Flex {...props}>
        <div>Child</div>
      </Flex>
    );
    const flexElement = screen.getByText("Child").parentElement;
    expect(flexElement).toHaveStyle(`gap: ${parseValue(props.$gap!)}`);
    expect(flexElement).toHaveStyle(`flex-direction: ${props.$direction}`);
    expect(flexElement).toHaveStyle(`align-items: ${props.$align}`);
    expect(flexElement).toHaveStyle(`justify-content: ${props.$justify}`);
    expect(flexElement).toHaveStyle("flex-wrap: wrap");
  });
});
