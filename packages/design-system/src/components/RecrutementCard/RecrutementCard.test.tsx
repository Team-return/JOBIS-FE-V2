import { screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import { RecrutementCard } from "./RecrutementCard";
import { renderWithTheme } from "@/utils";

describe("RecrutementCard", () => {
  const defaultProps = {
    hiringJobs: "프론트엔드 개발자",
    companyName: "자비스",
    companyProfileUrl: "https://placehold.co/222x144",
    trainPay: 200,
    militarySupport: true,
    bookmarked: false
  };

  it("renders correctly with required props", () => {
    renderWithTheme(<RecrutementCard {...defaultProps} />);

    expect(screen.getByText(defaultProps.companyName)).toBeInTheDocument();
    expect(screen.getByText(defaultProps.hiringJobs)).toBeInTheDocument();
    expect(
      screen.getByText(`실습수당 ${defaultProps.trainPay}만원`)
    ).toBeInTheDocument();
    expect(screen.getByText("병역특례 O")).toBeInTheDocument();
  });

  it("displays military support as X when false", () => {
    renderWithTheme(
      <RecrutementCard {...defaultProps} militarySupport={false} />
    );

    expect(screen.getByText("병역특례 X")).toBeInTheDocument();
  });

  it("displays bookmark when bookmarked is true", () => {
    renderWithTheme(<RecrutementCard {...defaultProps} bookmarked={true} />);

    const bookmarkIcon = screen.getByRole("button");
    expect(bookmarkIcon).toBeInTheDocument();
  });

  it("renders company profile image with correct src and alt", () => {
    renderWithTheme(<RecrutementCard {...defaultProps} />);

    const image = screen.getByRole("img");
    expect(image).toHaveAttribute("src", defaultProps.companyProfileUrl);
    expect(image).toHaveAttribute("alt", defaultProps.companyName);
  });
});
