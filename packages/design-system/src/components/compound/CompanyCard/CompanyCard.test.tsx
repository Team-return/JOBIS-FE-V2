import { screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, it, expect, vi } from "vitest";
import { CompanyCard } from "./CompanyCard";
import { renderWithTheme } from "@/utils/render";

describe("CompanyCard", () => {
  const defaultProps = {
    imgUrl:
      "https://jobis-store.s3.ap-northeast-2.amazonaws.com/company_logo/vivar.png",
    companyName: "주식회사 비바리퍼블리카",
    annualSales: "연매출 1,000억",
    recruitmentStatus: "모집중" as const,
    onClick: vi.fn()
  };

  it("should render company name and annual sales correctly", () => {
    renderWithTheme(<CompanyCard {...defaultProps} />);
    expect(screen.getByText(defaultProps.companyName)).toBeInTheDocument();
    expect(screen.getByText(defaultProps.annualSales)).toBeInTheDocument();
  });

  it("should render company image with correct src and alt", () => {
    renderWithTheme(<CompanyCard {...defaultProps} />);
    const img = screen.getByRole("img", {
      name: defaultProps.companyName
    });
    expect(img).toHaveAttribute("src", defaultProps.imgUrl);
  });

  it("should render bookmark as unchecked when bookmark prop is false", () => {
    renderWithTheme(<CompanyCard {...defaultProps} />);
    const bookmarkButton = screen.getByRole("button", { name: "bookmark" });
    expect(bookmarkButton).toHaveAttribute("aria-pressed", "false");
  });

  it("should render bookmark as checked when bookmark prop is true", () => {
    renderWithTheme(<CompanyCard {...defaultProps} />);
    const bookmarkButton = screen.getByRole("button", { name: "bookmark" });
    expect(bookmarkButton).toHaveAttribute("aria-pressed", "true");
  });

  it("should call onBookmarkClick when the bookmark button is clicked", async () => {
    const handleClick = vi.fn();
    renderWithTheme(<CompanyCard {...defaultProps} />);
    const bookmarkButton = screen.getByRole("button", {
      name: "bookmark"
    });

    await userEvent.click(bookmarkButton);

    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  it("should call onClick when the whole card is clicked", async () => {
    const handleClick = vi.fn();
    renderWithTheme(<CompanyCard {...defaultProps} onClick={handleClick} />);
    const card = screen.getByText(defaultProps.companyName).closest("div");

    if (card) {
      await userEvent.click(card);
    }

    expect(handleClick).toHaveBeenCalledTimes(1);
  });
});
