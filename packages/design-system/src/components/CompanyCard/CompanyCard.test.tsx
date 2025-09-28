import { fireEvent, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import { CompanyCard } from "./CompanyCard";
import { renderWithTheme } from "@/utils";

describe("CompanyCard", () => {
  const defaultProps = {
    $imgUrl:
      "https://jobis-store.s3.ap-northeast-2.amazonaws.com/company_logo/vivar.png",
    companyName: "주식회사 비바리퍼블리카",
    annualSales: "연매출 1,000억",
    $bookmark: false
  };

  it("renders company name and annual sales correctly", () => {
    renderWithTheme(<CompanyCard {...defaultProps} />);
    expect(screen.getByText(defaultProps.companyName)).toBeInTheDocument();
    expect(screen.getByText(defaultProps.annualSales)).toBeInTheDocument();
  });

  it("renders company image with correct src and alt", () => {
    renderWithTheme(<CompanyCard {...defaultProps} />);
    const img = screen.getByRole("img", { name: defaultProps.companyName });
    expect(img).toHaveAttribute("src", defaultProps.$imgUrl);
  });

  it("renders bookmark button with initial state (false)", () => {
    renderWithTheme(<CompanyCard {...defaultProps} $bookmark={false} />);
    const bookmarkButton = screen.getByRole("button", { name: "bookmark" });
    expect(bookmarkButton).toHaveAttribute("aria-pressed", "false");
  });

  it("renders bookmark button with initial state (true)", () => {
    renderWithTheme(<CompanyCard {...defaultProps} $bookmark={true} />);
    const bookmarkButton = screen.getByRole("button", { name: "bookmark" });
    expect(bookmarkButton).toHaveAttribute("aria-pressed", "true");
  });

  it("toggles bookmark state when clicked", () => {
    renderWithTheme(<CompanyCard {...defaultProps} />);
    const bookmarkButton = screen.getByRole("button", { name: "bookmark" });

    expect(bookmarkButton).toHaveAttribute("aria-pressed", "false");

    fireEvent.click(bookmarkButton);
    expect(bookmarkButton).toHaveAttribute("aria-pressed", "true");

    fireEvent.click(bookmarkButton);
    expect(bookmarkButton).toHaveAttribute("aria-pressed", "false");
  });
});
