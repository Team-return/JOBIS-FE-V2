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

    const container = screen.getByRole("contentinfo");
    const svgElements = container.querySelectorAll("svg");
    expect(svgElements).toHaveLength(2);
  });

  it("links the GitHub icon to the Team-return organization in a new tab", () => {
    renderWithTheme(<Footer />);

    const githubLink = screen.getByRole("link", { name: "Team-return GitHub" });
    expect(githubLink).toHaveAttribute(
      "href",
      "https://github.com/Team-return"
    );
    expect(githubLink).toHaveAttribute("target", "_blank");
    expect(githubLink).toHaveAttribute("rel", "noopener noreferrer");
  });

  it("renders copyright text with current year", () => {
    renderWithTheme(<Footer />);

    const currentYear = new Date().getFullYear();
    expect(
      screen.getByText(
        new RegExp(
          `©${currentYear} Copyright team-return\\s+ALL RIGHTS RESERVED\\.`
        )
      )
    ).toBeInTheDocument();
  });

  it("renders footer as a footer element", () => {
    renderWithTheme(<Footer />);

    const footerElement = screen.getByRole("contentinfo");
    expect(footerElement).toBeInTheDocument();
  });
});
