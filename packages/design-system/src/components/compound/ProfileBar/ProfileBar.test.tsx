import { screen, fireEvent } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import { ProfileBar } from "./ProfileBar";
import { renderWithTheme } from "@/utils/render";

describe("ProfileBar", () => {
  const defaultProps = {
    name: "마시마로",
    studentNumber: "2101",
    department: "소프트웨어 개발과"
  };

  it("should render name, studentNumber, department correctly", () => {
    renderWithTheme(<ProfileBar {...defaultProps} />);

    expect(screen.getByText(defaultProps.name)).toBeInTheDocument();
    expect(screen.getByText(defaultProps.studentNumber)).toBeInTheDocument();
    expect(screen.getByText(defaultProps.department)).toBeInTheDocument();
  });

  it("should render profile image when profileImageUrl is provided", () => {
    const profileImageUrl = "https://placehold.co/84x84";
    renderWithTheme(
      <ProfileBar {...defaultProps} profileImageUrl={profileImageUrl} />
    );

    const img = screen.getByRole("img");
    expect(img).toHaveAttribute("src", profileImageUrl);
    expect(img).toHaveAttribute("alt", defaultProps.name);
  });

  it("should not render KebapMenu icon when menuItems is not provided", () => {
    renderWithTheme(<ProfileBar {...defaultProps} />);

    expect(screen.queryByLabelText("KebapMenu")).not.toBeInTheDocument();
  });

  it("should render KebapMenu icon when menuItems is provided", () => {
    renderWithTheme(
      <ProfileBar
        {...defaultProps}
        menuItems={[{ label: "로그아웃", onClick: vi.fn() }]}
      />
    );

    expect(screen.getByLabelText("KebapMenu")).toBeInTheDocument();
  });

  it("should open menu when KebapMenu icon is clicked", () => {
    renderWithTheme(
      <ProfileBar
        {...defaultProps}
        menuItems={[
          { label: "비밀번호 변경", onClick: vi.fn() },
          { label: "로그아웃", onClick: vi.fn() }
        ]}
      />
    );

    fireEvent.click(screen.getByLabelText("KebapMenu"));

    expect(screen.getByRole("menu")).toBeInTheDocument();
    expect(screen.getByText("비밀번호 변경")).toBeInTheDocument();
    expect(screen.getByText("로그아웃")).toBeInTheDocument();
  });

  it("should call onClick and close menu when menu item is clicked", () => {
    const handleClick = vi.fn();
    renderWithTheme(
      <ProfileBar
        {...defaultProps}
        menuItems={[{ label: "로그아웃", onClick: handleClick }]}
      />
    );

    fireEvent.click(screen.getByLabelText("KebapMenu"));
    fireEvent.click(screen.getByText("로그아웃"));

    expect(handleClick).toHaveBeenCalledTimes(1);
    expect(screen.queryByRole("menu")).not.toBeInTheDocument();
  });

  it("should toggle menu closed when KebapMenu is clicked again", () => {
    renderWithTheme(
      <ProfileBar
        {...defaultProps}
        menuItems={[{ label: "로그아웃", onClick: vi.fn() }]}
      />
    );

    const icon = screen.getByLabelText("KebapMenu");
    fireEvent.click(icon);
    expect(screen.getByRole("menu")).toBeInTheDocument();

    fireEvent.click(icon);
    expect(screen.queryByRole("menu")).not.toBeInTheDocument();
  });
});
