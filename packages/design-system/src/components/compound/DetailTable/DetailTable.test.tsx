import { screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import { DetailTable } from "./DetailTable";
import type { DetailTableProps } from "./DetailTable.types";
import { renderWithTheme } from "@/utils/render";

describe("DetailTable", () => {
  const defaultProps: DetailTableProps = {
    items: [
      { label: "대표", value: "김하온", itemType: "text" },
      { label: "서비스 이름", value: "하이티비", itemType: "text" },
      { label: "회사 소개", value: "하이", itemType: "text" },
      {
        label: "회사 주소(본사)",
        value: "(60202) 서울특별시 강남구 테헤란로 142 12층 (역삼동, 캐",
        itemType: "text"
      },
      { label: "설립일", value: "2006-10-21", itemType: "text" },
      { label: "직원수", value: "10억명", itemType: "text" },
      { label: "연매출", value: "10원", itemType: "text" },
      { label: "사업분야", value: "IT", itemType: "text" },
      {
        label: "첨부파일",
        value: "2023 사업계획서.pdf",
        itemType: "file",
        fileUrl: "https://example.com/사업자등록증.pdf"
      }
    ]
  };

  it("should render all labels and values from the items array", () => {
    renderWithTheme(<DetailTable items={[...defaultProps.items]} />);

    defaultProps.items.forEach(item => {
      expect(screen.getByText(item.label)).toBeInTheDocument();
      expect(screen.getByText(item.value)).toBeInTheDocument();
    });
  });

  it("should render FileDownload component when itemType is 'file'", () => {
    renderWithTheme(<DetailTable items={[...defaultProps.items]} />);

    const fileLabel = screen.getByText("첨부파일");
    expect(fileLabel).toBeInTheDocument();

    const fileName = screen.getByText("2023 사업계획서.pdf");
    expect(fileName).toBeInTheDocument();
  });
});
