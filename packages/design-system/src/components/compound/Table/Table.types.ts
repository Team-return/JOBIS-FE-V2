import type { ReactNode } from "react";
import type { Props as TextProps } from "@/components/core/Text/Text.types";

export type TableHeaderTextProps = Partial<
  Pick<TextProps, "$size" | "$weight" | "$color">
>;

export interface Props {
  headers: ReactNode[];
  rows: ReactNode[][];
  columnWidths?: number[];
  headerBg?: string;
  headerHeight?: number;
  headerTextProps?: TableHeaderTextProps;
  headerBorder?: boolean;
  borderColor?: string;
  rowHeight?: number;
  checkbox?: boolean;
  selectedRows?: number[];
  onRowSelect?: (selectedIndices: number[]) => void;
}

export interface SkeletonProps {
  checkbox?: boolean;
  columnWidths: number[];
  rows: number;
}
