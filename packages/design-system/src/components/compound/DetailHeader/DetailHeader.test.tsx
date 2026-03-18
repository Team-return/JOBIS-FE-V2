import { screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, it, expect, vi } from "vitest";
import { DetailHeader } from "./DetailHeader";
import type { DetailHeaderProps } from "./DetailHeader.types";
import { renderWithTheme } from "@/utils/render";

describe("DetailHeader", () => {
  const defaultProps = {
    type: "company",
    title: "(주)비바리퍼블리카",
    logoUrl:
      "https://cdn.digitalasset.works/news/photo/202507/28288_36187_4536.jpg",
    businessNumber: "123456789",
    onMoreClick: vi.fn()
  } satisfies DetailHeaderProps;

  it("should render company name, business number and logo correctly", () => {
    renderWithTheme(<DetailHeader {...defaultProps} />);
    expect(screen.getByText(defaultProps.title)).toBeInTheDocument();
    expect(
      screen.getByText(`사업자 번호 : ${defaultProps.businessNumber}`)
    ).toBeInTheDocument();
    const img = screen.getByRole("img", { name: defaultProps.title });
    expect(img).toHaveAttribute("src", defaultProps.logoUrl);
  });

  it("should call onMoreClick when the kebab menu button is clicked", async () => {
    renderWithTheme(<DetailHeader {...defaultProps} />);
    const kebabButton = screen.getByRole("button", { name: "more" });
    await userEvent.click(kebabButton);
    expect(screen.getByText("모집의뢰서 조회")).toBeInTheDocument();
    expect(screen.getByText("면접 후기 조회")).toBeInTheDocument();
    expect(screen.getByText("면접 후기 작성")).toBeInTheDocument();
  });
});
