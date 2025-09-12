import { screen, fireEvent } from "@testing-library/react";
import { expect, describe, it, vi } from "vitest";
import { NotificationItem } from "./NotificationItem";
import { renderWithTheme } from "@/utils";

describe("NotificationItem", () => {
  it("renders correctly with default props", () => {
    const title = "지원서 제출";
    const content = "지원서 상태가 {REQUESTED}로 변경되었습니다.";
    const date = "2023-05-15";

    renderWithTheme(
      <NotificationItem title={title} content={content} date={date} />
    );

    expect(screen.getByText(title)).toBeInTheDocument();
    expect(screen.getByText("승인요청")).toBeInTheDocument();
    expect(screen.getByText("2023.5.15")).toBeInTheDocument();
  });

  it("renders content without status correctly", () => {
    const title = "지원서 제출";
    const content = "홍길동님이 지원서를 제출하셨습니다.";
    const date = "2023-05-15";

    renderWithTheme(
      <NotificationItem title={title} content={content} date={date} />
    );

    expect(screen.getByText(content)).toBeInTheDocument();
  });

  it("renders multiple status texts correctly", () => {
    const title = "채용 결과 안내";
    const content = "{PASS}되어 {ACCEPTANCE} 단계로 넘어갔습니다.";
    const date = "2023-05-20";

    renderWithTheme(
      <NotificationItem title={title} content={content} date={date} />
    );

    expect(screen.getByText("합격")).toBeInTheDocument();
    expect(screen.getByText("근로계약")).toBeInTheDocument();
  });

  it("calls onClick handler when clicked", () => {
    const handleClick = vi.fn();
    const title = "지원서 제출";
    const content = "지원서 상태가 {REQUESTED}로 변경되었습니다.";
    const date = "2023-05-15";

    renderWithTheme(
      <NotificationItem
        title={title}
        content={content}
        date={date}
        onClick={handleClick}
      />
    );

    const component = screen.getByText(title).closest("div")!;
    fireEvent.click(component);
    expect(handleClick).toHaveBeenCalledTimes(1);
  });
});
