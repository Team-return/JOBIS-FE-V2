import { render } from "@testing-library/react";
import { expect, describe, it } from "vitest";
import { Layer } from "./Layer";

describe("Layer", () => {
  it("should render successfully", () => {
    const { baseElement } = render(<Layer />);
    expect(baseElement).toBeInTheDocument();
  });
});
