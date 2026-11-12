// src/components/compound/Header/Header.test.tsx
import { screen, render } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, it, expect, vi, beforeEach } from "vitest";
import { Header } from "./Header";
import { ThemeProvider } from "@emotion/react";
import { darkTheme } from "@/themes";
import type { ReactElement } from "react";

const mockNavigate = vi.fn();

vi.mock("react-router-dom", async () => {
  const actual =
    await vi.importActual<typeof import("react-router-dom")>(
      "react-router-dom"
    );

  return {
    ...actual,
    useNavigate: () => mockNavigate,
    useLocation: () => ({ pathname: "/" }),
    Outlet: () => null
  };
});

const renderWithRouter = (element: ReactElement) => {
  return render(<ThemeProvider theme={darkTheme}>{element}</ThemeProvider>);
};

describe("Header", () => {
  beforeEach(() => {
    mockNavigate.mockClear();
  });

  describe("Admin Header", () => {
    it("renders admin menu items correctly", () => {
      renderWithRouter(<Header type="admin" />);

      expect(screen.getByText("모집의뢰서")).toBeInTheDocument();
      expect(screen.getByText("기업")).toBeInTheDocument();
      expect(screen.getByText("학생")).toBeInTheDocument();
      expect(screen.getByText("학생 후기")).toBeInTheDocument();
      expect(screen.getByText("지원서")).toBeInTheDocument();
      expect(screen.getByText("공지")).toBeInTheDocument();
      expect(screen.getByText("배너")).toBeInTheDocument();
    });

    it("navigates to home when logo is clicked", async () => {
      renderWithRouter(<Header type="admin" />);

      const logo = screen.getByRole("img", { name: "LogoWithText" });
      await userEvent.click(logo.parentElement!);
      expect(mockNavigate).toHaveBeenCalledWith("/");
    });

    it("navigates to correct path when menu item is clicked", async () => {
      renderWithRouter(<Header type="admin" />);

      await userEvent.click(screen.getByText("모집의뢰서"));
      expect(mockNavigate).toHaveBeenCalledWith("/");

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
      renderWithRouter(<Header type="company" />);

      expect(screen.getByText("모집의뢰서")).toBeInTheDocument();
      expect(screen.getByText("지원자")).toBeInTheDocument();
      expect(screen.getByText("내 기업정보")).toBeInTheDocument();
    });

    it("navigates to home when logo is clicked", async () => {
      renderWithRouter(<Header type="company" />);

      const logo = screen.getByRole("img", { name: "LogoWithText" });
      await userEvent.click(logo.parentElement!);
      expect(mockNavigate).toHaveBeenCalledWith("/");
    });

    it("navigates to correct path when menu item is clicked", async () => {
      renderWithRouter(<Header type="company" />);

      await userEvent.click(screen.getByText("모집의뢰서"));
      expect(mockNavigate).toHaveBeenCalledWith("/");

      await userEvent.click(screen.getByText("지원자"));
      expect(mockNavigate).toHaveBeenCalledWith("/application");

      await userEvent.click(screen.getByText("내 기업정보"));
      expect(mockNavigate).toHaveBeenCalledWith("/company/detail");
    });
  });

  describe("Student Header", () => {
    it("renders student menu items correctly", () => {
      renderWithRouter(<Header type="student" userName="홍길동" />);

      expect(screen.getByText("기업체")).toBeInTheDocument();
      expect(screen.getByText("모집의뢰서")).toBeInTheDocument();
      expect(screen.getByText("공지사항")).toBeInTheDocument();
      expect(screen.getByText("후기")).toBeInTheDocument();
      expect(screen.getByText("마이페이지")).toBeInTheDocument();
    });

    it("displays user name correctly", () => {
      renderWithRouter(<Header type="student" userName="홍길동" />);
      expect(screen.getByText("홍길동")).toBeInTheDocument();
    });

    it("shows alarm dot when notifications have new property set to true", () => {
      const notifications = [
        {
          notification_id: 1,
          title: "새로운 공지",
          content: "새 공지가 있습니다",
          topic: "notice",
          detail_id: 1,
          created_at: "2025-12-24T10:00:00Z",
          new: true
        }
      ];

      renderWithRouter(
        <Header
          type="student"
          userName="홍길동"
          notifications={notifications}
        />
      );
      expect(screen.getByLabelText("alarm-indicator")).toBeInTheDocument();
    });

    it("shows alarm dot when notifications arrive after mount", () => {
      const { rerender } = renderWithRouter(
        <Header type="student" userName="홍길동" />
      );
      expect(
        screen.queryByLabelText("alarm-indicator")
      ).not.toBeInTheDocument();

      rerender(
        <ThemeProvider theme={darkTheme}>
          <Header
            type="student"
            userName="홍길동"
            notifications={[
              {
                notification_id: 1,
                title: "새로운 공지",
                content: "새 공지가 있습니다",
                topic: "notice",
                detail_id: 1,
                created_at: "2025-12-24T10:00:00Z",
                new: true
              }
            ]}
          />
        </ThemeProvider>
      );
      expect(screen.getByLabelText("alarm-indicator")).toBeInTheDocument();
    });

    it("does not show alarm dot when no notifications have new property", () => {
      const notifications = [
        {
          notification_id: 1,
          title: "기존 공지",
          content: "이미 읽은 공지",
          topic: "notice",
          detail_id: 1,
          created_at: "2025-12-24T10:00:00Z",
          new: false
        }
      ];

      renderWithRouter(
        <Header
          type="student"
          userName="홍길동"
          notifications={notifications}
        />
      );
      expect(
        screen.queryByLabelText("alarm-indicator")
      ).not.toBeInTheDocument();
    });

    it("does not show alarm dot when notifications array is empty", () => {
      renderWithRouter(
        <Header type="student" userName="홍길동" notifications={[]} />
      );
      expect(
        screen.queryByLabelText("alarm-indicator")
      ).not.toBeInTheDocument();
    });

    it("navigates to home when logo is clicked", async () => {
      renderWithRouter(<Header type="student" userName="홍길동" />);

      const logo = screen.getByRole("img", { name: "LogoWithText" });
      await userEvent.click(logo.parentElement!);
      expect(mockNavigate).toHaveBeenCalledWith("/");
    });

    it("navigates to mypage when profile icon is clicked", async () => {
      renderWithRouter(<Header type="student" userName="홍길동" />);

      const profileIcon = screen.getByRole("img", { name: "HeaderProfile" });
      await userEvent.click(profileIcon);
      expect(mockNavigate).toHaveBeenCalledWith("/mypage");
    });

    it("toggles alarm dropdown when user name is clicked", async () => {
      renderWithRouter(
        <Header type="student" userName="홍길동" notifications={[]} />
      );

      expect(screen.queryByText("알림이 없습니다.")).not.toBeInTheDocument();

      await userEvent.click(screen.getByText("홍길동"));
      expect(screen.getByText("알림이 없습니다.")).toBeInTheDocument();

      await userEvent.click(screen.getByText("홍길동"));
      expect(screen.queryByText("알림이 없습니다.")).not.toBeInTheDocument();
    });

    it("displays notifications in alarm dropdown", async () => {
      const notifications = [
        {
          notification_id: 1,
          title: "채용공고 마감",
          content: "마감 12시간 전입니다",
          topic: "recruitment",
          detail_id: 1,
          created_at: "2025-12-24T10:00:00Z",
          new: true
        },
        {
          notification_id: 2,
          title: "새로운 소식",
          content: "새로운 소식이 있습니다",
          topic: "notice",
          detail_id: 2,
          created_at: "2025-12-24T09:00:00Z",
          new: false
        }
      ];

      renderWithRouter(
        <Header
          type="student"
          userName="홍길동"
          notifications={notifications}
        />
      );

      await userEvent.click(screen.getByText("홍길동"));
      expect(screen.getByText("채용공고 마감")).toBeInTheDocument();
      expect(screen.getByText("새로운 소식")).toBeInTheDocument();
    });

    it("calls onNotificationClick and closes dropdown when notification is clicked", async () => {
      const notification = {
        notification_id: 7,
        title: "새로운 공지",
        content: "새 공지가 있습니다",
        topic: "NOTICE",
        detail_id: 3,
        created_at: "2025-12-24T10:00:00Z",
        new: true
      };
      const onNotificationClick = vi.fn();

      renderWithRouter(
        <Header
          type="student"
          userName="홍길동"
          notifications={[notification]}
          onNotificationClick={onNotificationClick}
        />
      );

      await userEvent.click(screen.getByText("홍길동"));
      await userEvent.click(screen.getByText("새 공지가 있습니다"));

      expect(onNotificationClick).toHaveBeenCalledWith(notification);
      expect(screen.queryByText("새로운 공지")).not.toBeInTheDocument();
    });

    it("shows alarm dot again only when an unseen unread notification arrives", async () => {
      const createNotification = (id: number, isNew: boolean) => ({
        notification_id: id,
        title: `알림 ${id}`,
        content: `내용 ${id}`,
        topic: "NOTICE",
        detail_id: id,
        created_at: "2025-12-24T10:00:00Z",
        new: isNew
      });
      const renderHeader = (
        notifications: ReturnType<typeof createNotification>[]
      ) => (
        <ThemeProvider theme={darkTheme}>
          <Header
            type="student"
            userName="홍길동"
            notifications={notifications}
          />
        </ThemeProvider>
      );

      const { rerender } = render(
        renderHeader([createNotification(1, true), createNotification(2, true)])
      );
      await userEvent.click(screen.getByText("홍길동"));
      expect(
        screen.queryByLabelText("alarm-indicator")
      ).not.toBeInTheDocument();

      // 하나를 읽어 목록이 다시 와도 이미 본 안읽음 알림만 남았으므로 점은 꺼져 있다
      rerender(
        renderHeader([
          createNotification(1, false),
          createNotification(2, true)
        ])
      );
      expect(
        screen.queryByLabelText("alarm-indicator")
      ).not.toBeInTheDocument();

      rerender(
        renderHeader([
          createNotification(3, true),
          createNotification(1, false),
          createNotification(2, true)
        ])
      );
      expect(screen.getByLabelText("alarm-indicator")).toBeInTheDocument();
    });

    it("navigates to correct path when menu item is clicked", async () => {
      renderWithRouter(<Header type="student" userName="홍길동" />);

      await userEvent.click(screen.getByText("기업체"));
      expect(mockNavigate).toHaveBeenCalledWith("/company");

      mockNavigate.mockClear();

      await userEvent.click(screen.getByText("모집의뢰서"));
      expect(mockNavigate).toHaveBeenCalledWith("/recruitment");

      mockNavigate.mockClear();

      await userEvent.click(screen.getByText("공지사항"));
      expect(mockNavigate).toHaveBeenCalledWith("/notice");

      mockNavigate.mockClear();

      await userEvent.click(screen.getByText("후기"));
      expect(mockNavigate).toHaveBeenCalledWith("/review");

      mockNavigate.mockClear();

      await userEvent.click(screen.getByText("마이페이지"));
      expect(mockNavigate).toHaveBeenCalledWith("/mypage");
    });
  });
});
