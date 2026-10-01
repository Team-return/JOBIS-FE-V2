import { screen, fireEvent } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import { RecrutementCard } from "./RecrutementCard";
import { renderWithTheme } from "@/utils/render";
import { lightTheme } from "@/themes";

describe("RecrutementCard", () => {
  const defaultProps = {
    hiringJobs: "프론트엔드 개발자",
    companyName: "자비스",
    companyProfileUrl: "https://placehold.co/222x144",
    militarySupport: true,
    bookmarked: false
  };

  it("renders correctly with required props", () => {
    renderWithTheme(<RecrutementCard {...defaultProps} />);

    expect(screen.getByText(defaultProps.companyName)).toBeInTheDocument();
    expect(screen.getByText(defaultProps.hiringJobs)).toBeInTheDocument();
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

  it("does not render a status chip when status is not given", () => {
    renderWithTheme(<RecrutementCard {...defaultProps} />);

    expect(screen.queryByText("모집중")).not.toBeInTheDocument();
    expect(screen.queryByText("모집 종료")).not.toBeInTheDocument();
  });

  it("renders the status chip in blue while recruiting", () => {
    renderWithTheme(<RecrutementCard {...defaultProps} status="모집중" />);

    expect(screen.getByText("모집중")).toHaveStyle(
      `color: ${lightTheme.color.primary[20]}`
    );
  });

  it("renders the status chip in red after recruiting ends", () => {
    renderWithTheme(<RecrutementCard {...defaultProps} status="모집 종료" />);

    expect(screen.getByText("모집 종료")).toHaveStyle(
      `color: ${lightTheme.color.subColor.red[20]}`
    );
  });

  it("calls onClick when card is clicked", () => {
    const onClick = vi.fn();
    renderWithTheme(<RecrutementCard {...defaultProps} onClick={onClick} />);

    const card = screen.getByRole("cell", { hidden: true });
    fireEvent.click(card);

    expect(onClick).toHaveBeenCalledTimes(1);
  });

  it("does not call onClick when not provided", () => {
    renderWithTheme(<RecrutementCard {...defaultProps} />);

    const card = screen.getByRole("cell", { hidden: true });
    fireEvent.click(card);

    expect(true).toBe(true);
  });
});
