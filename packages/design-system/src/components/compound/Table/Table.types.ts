import type { ReactNode } from "react";

export interface Props {
  headers: string[];
  rows: ReactNode[][];
  columnWidths?: number[];
  checkbox?: boolean;
  selectedRows?: number[];
  onRowSelect?: (selectedIndices: number[]) => void;
}

export interface SkeletonProps {
  checkbox?: boolean;
  columnWidths: number[];
  rows: number;
}
