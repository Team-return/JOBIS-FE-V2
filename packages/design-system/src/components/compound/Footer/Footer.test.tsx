import { screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import { renderWithTheme } from "@/utils/render";
import { Footer } from "./Footer";

describe("Footer", () => {
  it("renders contact information correctly", () => {
    renderWithTheme(<Footer />);

    expect(screen.getByText("연락처) 042-866-8843")).toBeInTheDocument();
    expect(
      screen.getByText("이메일) team-return@dsm.hs.kr")
    ).toBeInTheDocument();
    expect(
      screen.getByText(
        "주소) 대전광역시 유성구 가정북로 76 (창의관 산학협력부)"
      )
    ).toBeInTheDocument();
  });

  it("renders social media icons", () => {
    renderWithTheme(<Footer />);

    const svgElements = screen.getAllByRole("img", { hidden: true });
    expect(svgElements).toHaveLength(2);
  });

  it("renders copyright text with current year", () => {
    renderWithTheme(<Footer />);

    const currentYear = new Date().getFullYear();
    expect(
      screen.getByText(
        `©${currentYear} Copyright team-return  ALL RIGHTS RESERVED.`
      )
    ).toBeInTheDocument();
  });

  it("renders footer as a footer element", () => {
    renderWithTheme(<Footer />);

    const footerElement = screen.getByRole("contentinfo");
    expect(footerElement).toBeInTheDocument();
  });
});
