import { render, screen } from "@testing-library/react";
import { expect, describe, it } from "vitest";
import { Image } from "./Image";
import type { Props } from "./Image.types";

const defaultProps: Props = {
  src: "https://via.placeholder.com/150",
  alt: "Test Image"
};

describe("Image", () => {
  it("renders with src and alt attributes", () => {
    render(<Image {...defaultProps} />);
    const imageElement = screen.getByRole("img");
    expect(imageElement).toBeInTheDocument();
    expect(imageElement).toHaveAttribute("src", defaultProps.src);
    expect(imageElement).toHaveAttribute("alt", defaultProps.alt);
  });

  it("applies number width and height correctly", () => {
    const customProps: Props = { ...defaultProps, width: 200, height: 100 };
    render(<Image {...customProps} />);
    const imageElement = screen.getByRole("img");
    expect(imageElement).toHaveStyle("width: 200px");
    expect(imageElement).toHaveStyle("height: 100px");
  });

  it("applies string width and height correctly", () => {
    const customProps: Props = {
      ...defaultProps,
      width: "50%",
      height: "200px"
    };
    render(<Image {...customProps} />);
    const imageElement = screen.getByRole("img");
    expect(imageElement).toHaveStyle("width: 50%");
    expect(imageElement).toHaveStyle("height: 200px");
  });

  it("applies number radius correctly", () => {
    const customProps: Props = { ...defaultProps, $radius: 10 };
    render(<Image {...customProps} />);
    const imageElement = screen.getByRole("img");
    expect(imageElement).toHaveStyle("border-radius: 10px");
  });

  it("applies string radius correctly", () => {
    const customProps: Props = { ...defaultProps, $radius: "50%" };
    render(<Image {...customProps} />);
    const imageElement = screen.getByRole("img");
    expect(imageElement).toHaveStyle("border-radius: 50%");
  });

  it("applies array radius correctly", () => {
    const customProps: Props = { ...defaultProps, $radius: [5, 10, 15, 20] };
    render(<Image {...customProps} />);
    const imageElement = screen.getByRole("img");
    expect(imageElement).toHaveStyle("border-radius: 5px 10px 15px 20px");
  });
});
