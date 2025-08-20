import { render, screen } from "@testing-library/react";
import { expect, describe, it } from "vitest";
import { Stack } from "./Stack";
import { parseValue } from "@/utils";

describe("Stack", () => {
  it("renders children correctly", () => {
    render(
      <Stack>
        <div data-testid="child">Child</div>
      </Stack>
    );
    const childElement = screen.getByTestId("child");
    expect(childElement).toBeInTheDocument();
  });

  it("applies display: flex and default direction: column", () => {
    render(
      <Stack>
        <div data-testid="child">Child</div>
      </Stack>
    );
    const stackElement = screen.getByTestId("child").parentElement;
    expect(stackElement).toHaveStyle("display: flex");
    expect(stackElement).toHaveStyle("flex-direction: column");
  });

  it("applies number gap correctly", () => {
    const gapValue = 16;
    render(
      <Stack $gap={gapValue}>
        <div>Child</div>
      </Stack>
    );
    const stackElement = screen.getByText("Child").parentElement;
    expect(stackElement).toHaveStyle(`gap: ${parseValue(gapValue)}`);
  });

  it("applies string gap correctly", () => {
    const gapValue = "20px";
    render(
      <Stack $gap={gapValue}>
        <div>Child</div>
      </Stack>
    );
    const stackElement = screen.getByText("Child").parentElement;
    expect(stackElement).toHaveStyle(`gap: ${gapValue}`);
  });

  it("applies direction: row correctly", () => {
    render(
      <Stack $direction="row">
        <div>Child</div>
      </Stack>
    );
    const stackElement = screen.getByText("Child").parentElement;
    expect(stackElement).toHaveStyle("flex-direction: row");
  });
});
