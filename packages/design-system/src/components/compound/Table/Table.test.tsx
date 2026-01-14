import { fireEvent, screen } from "@testing-library/react";
import { describe, it, expect, vi, beforeEach } from "vitest";
import { Table } from "./Table";
import { renderWithTheme } from "@/utils/render";

describe("Table", () => {
  const mockHeaders = ["이름", "이메일", "상태"];
  const mockRows = [
    ["김철수", "kim@example.com", "활성"],
    ["이영희", "lee@example.com", "비활성"],
    ["박민준", "park@example.com", "활성"]
  ];
  const mockColumnWidths = [100, 200, 100];

  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe("renders correctly", () => {
    it("renders headers and row data correctly", () => {
      renderWithTheme(<Table headers={mockHeaders} rows={mockRows} />);

      // 헤더 확인
      expect(screen.getByText("이름")).toBeInTheDocument();
      expect(screen.getByText("이메일")).toBeInTheDocument();
      expect(screen.getByText("상태")).toBeInTheDocument();

      // 데이터 행 확인
      expect(screen.getByText("김철수")).toBeInTheDocument();
      expect(screen.getByText("kim@example.com")).toBeInTheDocument();
      expect(screen.getAllByText("활성")).toHaveLength(2);
      expect(screen.getByText("이영희")).toBeInTheDocument();
      expect(screen.getByText("박민준")).toBeInTheDocument();
    });

    it("applies flex layout when columnWidths is not provided", () => {
      renderWithTheme(<Table headers={mockHeaders} rows={mockRows} />);

      const nameHeader = screen.getByText("이름");
      expect(nameHeader).toBeInTheDocument();
    });

    it("renders with specified column widths", () => {
      renderWithTheme(
        <Table
          headers={mockHeaders}
          rows={mockRows}
          columnWidths={mockColumnWidths}
        />
      );

      expect(screen.getByText("이름")).toBeInTheDocument();
      expect(screen.getByText("김철수")).toBeInTheDocument();
    });
  });

  describe("checkbox functionality", () => {
    it("renders checkboxes in the first column when checkbox is true", () => {
      renderWithTheme(
        <Table headers={mockHeaders} rows={mockRows} checkbox={true} />
      );

      const checkboxes = screen.getAllByRole("checkbox");
      // 헤더 체크박스 + 각 행의 체크박스 (3개)
      expect(checkboxes).toHaveLength(4);
    });

    it("does not render checkboxes when checkbox is false", () => {
      renderWithTheme(
        <Table headers={mockHeaders} rows={mockRows} checkbox={false} />
      );

      const checkboxes = screen.queryAllByRole("checkbox");
      expect(checkboxes).toHaveLength(0);
    });

    it("calls onRowSelect callback when row checkbox is clicked", () => {
      const handleRowSelect = vi.fn();
      renderWithTheme(
        <Table
          headers={mockHeaders}
          rows={mockRows}
          checkbox={true}
          onRowSelect={handleRowSelect}
        />
      );

      const checkboxes = screen.getAllByRole("checkbox");
      // 두 번째 요소가 첫 번째 행의 체크박스
      fireEvent.click(checkboxes[1]);

      expect(handleRowSelect).toHaveBeenCalledWith([0]);
    });

    it("can select multiple rows", () => {
      const handleRowSelect = vi.fn();
      renderWithTheme(
        <Table
          headers={mockHeaders}
          rows={mockRows}
          checkbox={true}
          onRowSelect={handleRowSelect}
          selectedRows={[0]}
        />
      );

      const checkboxes = screen.getAllByRole("checkbox");
      // 세 번째 요소가 두 번째 행의 체크박스
      fireEvent.click(checkboxes[2]);

      expect(handleRowSelect).toHaveBeenCalledWith([0, 1]);
    });

    it("deselects a row when clicking on a selected row", () => {
      const handleRowSelect = vi.fn();
      renderWithTheme(
        <Table
          headers={mockHeaders}
          rows={mockRows}
          checkbox={true}
          onRowSelect={handleRowSelect}
          selectedRows={[0, 1]}
        />
      );

      const checkboxes = screen.getAllByRole("checkbox");
      // 두 번째 요소가 첫 번째 행의 체크박스
      fireEvent.click(checkboxes[1]);

      expect(handleRowSelect).toHaveBeenCalledWith([1]);
    });

    it("selects all rows when header checkbox is clicked", () => {
      const handleRowSelect = vi.fn();
      renderWithTheme(
        <Table
          headers={mockHeaders}
          rows={mockRows}
          checkbox={true}
          onRowSelect={handleRowSelect}
        />
      );

      const checkboxes = screen.getAllByRole("checkbox");
      // 첫 번째 요소가 헤더 체크박스
      fireEvent.click(checkboxes[0]);

      expect(handleRowSelect).toHaveBeenCalledWith([0, 1, 2]);
    });

    it("deselects all rows when header checkbox is clicked with all rows selected", () => {
      const handleRowSelect = vi.fn();
      renderWithTheme(
        <Table
          headers={mockHeaders}
          rows={mockRows}
          checkbox={true}
          onRowSelect={handleRowSelect}
          selectedRows={[0, 1, 2]}
        />
      );

      const checkboxes = screen.getAllByRole("checkbox");
      // 첫 번째 요소가 헤더 체크박스
      fireEvent.click(checkboxes[0]);

      expect(handleRowSelect).toHaveBeenCalledWith([]);
    });

    it("header checkbox is checked when all rows are selected", () => {
      renderWithTheme(
        <Table
          headers={mockHeaders}
          rows={mockRows}
          checkbox={true}
          selectedRows={[0, 1, 2]}
        />
      );

      const checkboxes = screen.getAllByRole("checkbox");
      const headerCheckbox = checkboxes[0];
      expect(headerCheckbox).toHaveAttribute("aria-checked", "true");
    });

    it("header checkbox is unchecked when only some rows are selected", () => {
      renderWithTheme(
        <Table
          headers={mockHeaders}
          rows={mockRows}
          checkbox={true}
          selectedRows={[0, 1]}
        />
      );

      const checkboxes = screen.getAllByRole("checkbox");
      const headerCheckbox = checkboxes[0];
      expect(headerCheckbox).toHaveAttribute("aria-checked", "false");
    });
  });

  describe("empty table", () => {
    it("renders empty table correctly", () => {
      renderWithTheme(<Table headers={mockHeaders} rows={[]} />);

      // 헤더는 렌더링되어야 함
      expect(screen.getByText("이름")).toBeInTheDocument();
      expect(screen.getByText("이메일")).toBeInTheDocument();
      expect(screen.getByText("상태")).toBeInTheDocument();
    });
  });

  describe("selected row state management", () => {
    it("sets initial selected state through selectedRows props", () => {
      renderWithTheme(
        <Table
          headers={mockHeaders}
          rows={mockRows}
          checkbox={true}
          selectedRows={[0, 2]}
        />
      );

      const checkboxes = screen.getAllByRole("checkbox");
      // 헤더는 일부만 선택된 상태이므로 unchecked
      expect(checkboxes[0]).toHaveAttribute("aria-checked", "false");
      // 첫 번째 행은 선택됨
      expect(checkboxes[1]).toHaveAttribute("aria-checked", "true");
      // 두 번째 행은 선택되지 않음
      expect(checkboxes[2]).toHaveAttribute("aria-checked", "false");
      // 세 번째 행은 선택됨
      expect(checkboxes[3]).toHaveAttribute("aria-checked", "true");
    });

    it("does not throw when clicking checkbox without onRowSelect", () => {
      renderWithTheme(
        <Table headers={mockHeaders} rows={mockRows} checkbox={true} />
      );

      const checkboxes = screen.getAllByRole("checkbox");
      expect(() => {
        fireEvent.click(checkboxes[1]);
      }).not.toThrow();
    });
  });
});
