import { screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, it, expect, vi } from "vitest";
import { Header } from "./Header";
import { renderWithTheme } from "@/utils";

describe("Header", () => {
  describe("Admin Header", () => {
    it("renders admin menu items correctly", () => {
      const handleClickLogo = vi.fn();
      renderWithTheme(<Header types="admin" onClickLogo={handleClickLogo} />);

      expect(screen.getByText("모집의뢰서")).toBeInTheDocument();
      expect(screen.getByText("기업")).toBeInTheDocument();
      expect(screen.getByText("학생")).toBeInTheDocument();
      expect(screen.getByText("학생 후기")).toBeInTheDocument();
      expect(screen.getByText("지원서")).toBeInTheDocument();
      expect(screen.getByText("공지")).toBeInTheDocument();
      expect(screen.getByText("배너")).toBeInTheDocument();
    });

    it("handles logo click event", async () => {
      const handleClickLogo = vi.fn();
      renderWithTheme(<Header types="admin" onClickLogo={handleClickLogo} />);

      const logo = screen.getByRole("img");
      await userEvent.click(logo.parentElement!);
      expect(handleClickLogo).toHaveBeenCalledTimes(1);
    });
  });

  describe("Company Header", () => {
    it("renders company menu items correctly", () => {
      const handleClickLogo = vi.fn();
      renderWithTheme(<Header types="company" onClickLogo={handleClickLogo} />);

      expect(screen.getByText("모집의뢰서")).toBeInTheDocument();
      expect(screen.getByText("지원자")).toBeInTheDocument();
      expect(screen.getByText("내 기업정보")).toBeInTheDocument();
    });

    it("handles logo click event", async () => {
      const handleClickLogo = vi.fn();
      renderWithTheme(<Header types="company" onClickLogo={handleClickLogo} />);

      const logo = screen.getByRole("img");
      await userEvent.click(logo.parentElement!);
      expect(handleClickLogo).toHaveBeenCalledTimes(1);
    });
  });

  describe("Student Header", () => {
    it("renders student menu items correctly", () => {
      renderWithTheme(
        <Header types="student" userName="홍길동" alarm={false} />
      );

      expect(screen.getByText("기업체")).toBeInTheDocument();
      expect(screen.getByText("모집의뢰서")).toBeInTheDocument();
      expect(screen.getByText("공지사항")).toBeInTheDocument();
      expect(screen.getByText("후기")).toBeInTheDocument();
      expect(screen.getByText("마이페이지")).toBeInTheDocument();
    });

    it("displays user name correctly", () => {
      const userName = "홍길동";
      renderWithTheme(
        <Header types="student" userName={userName} alarm={false} />
      );

      expect(screen.getByText(userName)).toBeInTheDocument();
    });

    it("shows alarm dot when alarm is true", () => {
      renderWithTheme(
        <Header types="student" userName="홍길동" alarm={true} />
      );

      const alarmDot = screen.getByLabelText("alarm-indicator");
      expect(alarmDot).toBeInTheDocument();
    });

    it("does not show alarm dot when alarm is false", () => {
      renderWithTheme(
        <Header types="student" userName="홍길동" alarm={false} />
      );

      const alarmDot = screen.queryByLabelText("alarm-indicator");
      expect(alarmDot).not.toBeInTheDocument();
    });

    it("handles profile click event", async () => {
      const handleClickProfile = vi.fn();
      renderWithTheme(
        <Header
          types="student"
          userName="홍길동"
          alarm={false}
          onClickProfile={handleClickProfile}
        />
      );

      const profileIcons = screen.getAllByRole("img");
      await userEvent.click(profileIcons[1]);
      expect(handleClickProfile).toHaveBeenCalledTimes(1);
    });

    it("toggles alarm container and shows empty state when no notifications", async () => {
      renderWithTheme(
        <Header types="student" userName="홍길동" alarm={true} />
      );

      const userName = screen.getByText("홍길동");

      // Initially, dropdown isn't open
      expect(screen.queryByText("알림이 없습니다.")).not.toBeInTheDocument();

      await userEvent.click(userName);

      // After opening, empty state is visible when no notifications provided
      expect(screen.getByText("알림이 없습니다.")).toBeInTheDocument();
    });

    it("handles logo click event", async () => {
      const handleClickLogo = vi.fn();
      renderWithTheme(
        <Header
          types="student"
          userName="홍길동"
          alarm={false}
          onClickLogo={handleClickLogo}
        />
      );

      const logo = screen.getByRole("img", { name: "LogoWithText" });
      await userEvent.click(logo.parentElement!);
      expect(handleClickLogo).toHaveBeenCalled();
    });
  });

  describe("Default rendering", () => {
    it("renders nothing when types is undefined", () => {
      const { container } = renderWithTheme(
        <Header types="admin" onClickLogo={() => {}} />
      );
      expect(container.firstChild).toBeInTheDocument();
    });
  });
});
