// src/components/compound/Header/Header.test.tsx
import { screen, render } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, it, expect, vi, beforeEach } from "vitest";
import { Header } from "./Header";
import { ThemeProvider } from "@emotion/react";
import { darkTheme } from "@/themes";
import type { ReactElement, ReactNode } from "react";
import { MemoryRouter } from "react-router-dom";

const mockNavigate = vi.fn();

vi.mock("react-router-dom", async () => {
  const actual =
    await vi.importActual<typeof import("react-router-dom")>(
      "react-router-dom"
    );

  return {
    ...actual,
    MemoryRouter: ({ children }: { children: ReactNode }) => <>{children}</>,
    Outlet: () => null,
    useNavigate: () => mockNavigate
  };
});

const renderWithRouter = (element: ReactElement) => {
  return render(
    <MemoryRouter>
      <ThemeProvider theme={darkTheme}>{element}</ThemeProvider>
    </MemoryRouter>
  );
};

describe("Header", () => {
  beforeEach(() => {
    mockNavigate.mockClear();
  });

  describe("Admin Header", () => {
    it("renders admin menu items correctly", () => {
      const handleClickLogo = vi.fn();
      renderWithRouter(<Header types="admin" onClickLogo={handleClickLogo} />);

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
      renderWithRouter(<Header types="admin" onClickLogo={handleClickLogo} />);

      const logo = screen.getByRole("img");
      await userEvent.click(logo.parentElement!);
      expect(handleClickLogo).toHaveBeenCalledTimes(1);
    });

    it("navigates to correct path when menu item is clicked", async () => {
      renderWithRouter(<Header types="admin" onClickLogo={() => {}} />);

      await userEvent.click(screen.getByText("모집의뢰서"));
      expect(mockNavigate).toHaveBeenCalledWith("/recruitment");

      await userEvent.click(screen.getByText("기업"));
      expect(mockNavigate).toHaveBeenCalledWith("/company");

      await userEvent.click(screen.getByText("학생"));
      expect(mockNavigate).toHaveBeenCalledWith("/student");

      await userEvent.click(screen.getByText("학생 후기"));
      expect(mockNavigate).toHaveBeenCalledWith("/review");

      await userEvent.click(screen.getByText("지원서"));
      expect(mockNavigate).toHaveBeenCalledWith("/application");

      await userEvent.click(screen.getByText("공지"));
      expect(mockNavigate).toHaveBeenCalledWith("/notice");

      await userEvent.click(screen.getByText("배너"));
      expect(mockNavigate).toHaveBeenCalledWith("/banner");
    });
  });

  describe("Company Header", () => {
    it("renders company menu items correctly", () => {
      const handleClickLogo = vi.fn();
      renderWithRouter(
        <Header types="company" onClickLogo={handleClickLogo} />
      );

      expect(screen.getByText("모집의뢰서")).toBeInTheDocument();
      expect(screen.getByText("지원자")).toBeInTheDocument();
      expect(screen.getByText("내 기업정보")).toBeInTheDocument();
    });

    it("handles logo click event", async () => {
      const handleClickLogo = vi.fn();
      renderWithRouter(
        <Header types="company" onClickLogo={handleClickLogo} />
      );

      const logo = screen.getByRole("img");
      await userEvent.click(logo.parentElement!);
      expect(handleClickLogo).toHaveBeenCalledTimes(1);
    });

    it("navigates to correct path when menu item is clicked", async () => {
      renderWithRouter(<Header types="company" onClickLogo={() => {}} />);

      await userEvent.click(screen.getByText("모집의뢰서"));
      expect(mockNavigate).toHaveBeenCalledWith("/recruitment");

      await userEvent.click(screen.getByText("지원자"));
      expect(mockNavigate).toHaveBeenCalledWith("/application");

      await userEvent.click(screen.getByText("내 기업정보"));
      expect(mockNavigate).toHaveBeenCalledWith("/company/detail");
    });
  });

  describe("Student Header", () => {
    it("renders student menu items correctly", () => {
      renderWithRouter(
        <Header types="student" userName="홍길동" alarm={false} />
      );

      expect(screen.getByText("기업체")).toBeInTheDocument();
      expect(screen.getByText("모집의뢰서")).toBeInTheDocument();
      expect(screen.getByText("공지사항")).toBeInTheDocument();
      expect(screen.getByText("후기")).toBeInTheDocument();
      expect(screen.getByText("마이페이지")).toBeInTheDocument();
    });

    it("displays user name correctly", () => {
      renderWithRouter(
        <Header types="student" userName="홍길동" alarm={false} />
      );
      expect(screen.getByText("홍길동")).toBeInTheDocument();
    });

    it("shows alarm dot when alarm is true", () => {
      renderWithRouter(
        <Header types="student" userName="홍길동" alarm={true} />
      );
      expect(screen.getByLabelText("alarm-indicator")).toBeInTheDocument();
    });

    it("does not show alarm dot when alarm is false", () => {
      renderWithRouter(
        <Header types="student" userName="홍길동" alarm={false} />
      );
      expect(
        screen.queryByLabelText("alarm-indicator")
      ).not.toBeInTheDocument();
    });

    it("handles profile click event", async () => {
      const handleClickProfile = vi.fn();
      renderWithRouter(
        <Header types="student" userName="홍길동" alarm={false} />
      );

      const profileIcons = screen.getAllByRole("img");
      await userEvent.click(profileIcons[1]);
      expect(handleClickProfile).toHaveBeenCalledTimes(1);
    });

    it("toggles alarm container and shows empty state when no notifications", async () => {
      renderWithRouter(
        <Header types="student" userName="홍길동" alarm={true} />
      );

      expect(screen.queryByText("알림이 없습니다.")).not.toBeInTheDocument();
      await userEvent.click(screen.getByText("홍길동"));
      expect(screen.getByText("알림이 없습니다.")).toBeInTheDocument();
    });

    it("handles logo click event", async () => {
      const handleClickLogo = vi.fn();
      renderWithRouter(
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

    it("navigates to correct path when menu item is clicked", async () => {
      renderWithRouter(
        <Header types="student" userName="홍길동" alarm={false} />
      );

      await userEvent.click(screen.getByText("기업체"));
      expect(mockNavigate).toHaveBeenCalledWith("/company");

      await userEvent.click(screen.getByText("모집의뢰서"));
      expect(mockNavigate).toHaveBeenCalledWith("/recruitment");

      await userEvent.click(screen.getByText("공지사항"));
      expect(mockNavigate).toHaveBeenCalledWith("/notice");

      await userEvent.click(screen.getByText("후기"));
      expect(mockNavigate).toHaveBeenCalledWith("/review");

      await userEvent.click(screen.getByText("마이페이지"));
      expect(mockNavigate).toHaveBeenCalledWith("/mypage");
    });
  });
});
