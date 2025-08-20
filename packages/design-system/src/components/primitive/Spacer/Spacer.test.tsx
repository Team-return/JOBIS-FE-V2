import { render } from "@testing-library/react";
import { expect, describe, it } from "vitest";
import { Spacer } from "./Spacer";
import { Flex } from "@/components";

describe("Spacer", () => {
  it("renders with default flex value", () => {
    const { container } = render(
      <Flex>
        <Spacer />
      </Flex>
    );
    const spacerElement = container.firstChild!.firstChild;
    expect(spacerElement).toHaveStyle("flex: 1 1 0px");
  });

  it("applies custom flex value", () => {
    const flexValue = 2;
    const { container } = render(
      <Flex>
        <Spacer $flex={flexValue} />
      </Flex>
    );
    const spacerElement = container.firstChild!.firstChild;
    expect(spacerElement).toHaveStyle(`flex: ${flexValue} 1 0px`);
  });

  it("distributes space correctly within a Flex container", () => {
    const { container } = render(
      <Flex data-testid="container">
        <div style={{ width: "50px" }} />
        <Spacer $flex={2} />
        <div style={{ width: "50px" }} />
        <Spacer $flex={1} />
        <div style={{ width: "50px" }} />
      </Flex>
    );
    const parentElement = container.firstElementChild!;
    const spacer1 = parentElement.children[1];
    const spacer2 = parentElement.children[3];

    expect(spacer1).toHaveStyle("flex: 2 1 0px");
    expect(spacer2).toHaveStyle("flex: 1 1 0px");
  });
});
