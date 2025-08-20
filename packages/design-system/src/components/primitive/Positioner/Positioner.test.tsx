import { render } from "@testing-library/react";
import { expect, describe, it } from "vitest";
import { Positioner } from "./Positioner";

describe("Positioner", () => {
  it("should render successfully", () => {
    const { baseElement } = render(<Positioner />);
    expect(baseElement).toBeInTheDocument();
  });
});
