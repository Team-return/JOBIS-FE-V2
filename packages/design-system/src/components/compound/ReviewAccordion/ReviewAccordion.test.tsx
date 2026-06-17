import { screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, it, expect } from "vitest";
import { ReviewAccordion } from "./ReviewAccordion";
import { renderWithTheme } from "@/utils/render";

describe("ReviewAccordion", () => {
  const defaultProps = {
    question: "면접 분위기는 어땠나요?",
    answer: "편안하고 기술적인 질문 위주였습니다.",
    time: "2026-06-16",
    major: "Front-end",
    writer: "김하온온"
  };

  it("should render question with the Q. label", () => {
    renderWithTheme(<ReviewAccordion {...defaultProps} />);
    expect(screen.getByText("Q.")).toBeInTheDocument();
    expect(screen.getByText(defaultProps.question)).toBeInTheDocument();
  });

  it("should not render answer before the card is expanded", () => {
    renderWithTheme(<ReviewAccordion {...defaultProps} />);
    expect(screen.queryByText(defaultProps.answer)).not.toBeInTheDocument();
  });

  it("should render answer and writer info when the card is clicked", async () => {
    renderWithTheme(<ReviewAccordion {...defaultProps} />);

    await userEvent.click(screen.getByText(defaultProps.question));

    expect(screen.getByText(defaultProps.answer)).toBeInTheDocument();
    expect(
      screen.getByText(defaultProps.time.split("-").join("."))
    ).toBeInTheDocument();
    expect(screen.getByText(defaultProps.major)).toBeInTheDocument();
    expect(screen.getByText(defaultProps.writer)).toBeInTheDocument();
  });

  it("should collapse the answer when the card is clicked again", async () => {
    renderWithTheme(<ReviewAccordion {...defaultProps} />);

    await userEvent.click(screen.getByText(defaultProps.question));
    await userEvent.click(screen.getByText(defaultProps.question));

    expect(screen.queryByText(defaultProps.answer)).not.toBeInTheDocument();
  });
});
