import styled from "@emotion/styled";
import { Box, Checkbox, Flex, Text } from "@/components";
import type { ReactNode } from "react";
import type { Props } from "./Table.types";
import { useTheme } from "@/hooks";

const Header = styled(Flex)<{
  $headerBg?: string;
  $headerHeight?: number;
  $headerBorder?: boolean;
  $borderColor?: string;
}>`
  border-bottom: ${({ $headerBorder, $borderColor, theme }) =>
    $headerBorder
      ? `1px solid ${$borderColor ?? theme.color.grayScale[50]}`
      : "none"};
  box-sizing: border-box;
  ${({ $headerHeight }) =>
    $headerHeight != null
      ? `
    height: ${$headerHeight}px;
    padding: 0;
  `
      : `
    padding: 12px 0px;
  `}
  ${({ $headerBg }) => $headerBg && `background-color: ${$headerBg};`}
`;
const Body = styled(Flex)<{ $rowHeight: number; $borderColor?: string }>`
  border-bottom: ${({ $borderColor, theme }) =>
    `1px solid ${$borderColor ?? theme.color.grayScale[50]}`};
  height: ${({ $rowHeight }) => `${$rowHeight}px`};
`;

const Cell = styled.div<{
  $width?: number;
  $flex?: boolean;
  $align?: "start" | "center";
}>`
  display: flex;
  align-items: center;

  ${({ $width, $flex }) =>
    $flex
      ? "flex: 1;"
      : $width
        ? `width: ${$width}px; flex-shrink: 0;`
        : "flex-shrink: 0;"}

  justify-content: ${({ $align }) =>
    $align === "center" ? "center" : "flex-start"};
`;

export const Table = ({
  headers,
  rows,
  columnWidths,
  headerBg,
  headerHeight,
  headerTextProps,
  headerBorder = true,
  borderColor,
  rowHeight = 88,
  checkbox,
  selectedRows = [],
  onRowSelect
}: Props) => {
  const { currentTheme: theme } = useTheme();

  const size = headerTextProps?.$size ?? "body2";
  let headerColor: string | undefined;
  if (headerTextProps == null) {
    headerColor = theme.color.grayScale[60];
  } else if ("$color" in headerTextProps) {
    headerColor = headerTextProps.$color;
  } else if (size === "body2") {
    headerColor = theme.color.grayScale[60];
  }

  const headerLabelTextProps = {
    $size: size,
    ...(headerColor !== undefined ? { $color: headerColor } : {}),
    ...(headerTextProps && "$weight" in headerTextProps
      ? { $weight: headerTextProps.$weight }
      : {})
  };

  const renderHeaderLabel = (header: ReactNode) =>
    typeof header === "string" ? (
      <Text {...headerLabelTextProps}>{header}</Text>
    ) : (
      header
    );

  const allSelected = rows.length > 0 && selectedRows.length === rows.length;

  const handleHeaderCheckboxChange = () => {
    if (onRowSelect) {
      if (allSelected) {
        onRowSelect([]);
      } else {
        onRowSelect(rows.map((_, index) => index));
      }
    }
  };

  const handleRowCheckboxChange = (rowIndex: number) => {
    if (onRowSelect) {
      if (selectedRows.includes(rowIndex)) {
        onRowSelect(selectedRows.filter(index => index !== rowIndex));
      } else {
        onRowSelect([...selectedRows, rowIndex]);
      }
    }
  };

  return (
    <Box>
      <Header
        $justify="space-evenly"
        $align={headerHeight != null ? "center" : "stretch"}
        $headerBg={headerBg}
        $headerHeight={headerHeight}
        $headerBorder={headerBorder}
        $borderColor={borderColor}
      >
        {headers.map((header, index) => (
          <Cell
            key={index}
            $width={columnWidths ? columnWidths[index] : undefined}
            $flex={!columnWidths}
            $align="center"
          >
            {index === 0 && checkbox ? (
              <Flex $justify="flex-start" $gap={30}>
                <Checkbox
                  $checked={allSelected}
                  onChange={handleHeaderCheckboxChange}
                />
                {renderHeaderLabel(header)}
              </Flex>
            ) : (
              renderHeaderLabel(header)
            )}
          </Cell>
        ))}
      </Header>

      {rows.map((row, rowIndex) => (
        <Body
          key={rowIndex}
          $justify="space-evenly"
          $rowHeight={rowHeight}
          $borderColor={borderColor}
        >
          {row.map((cell, cellIndex) => (
            <Cell
              key={cellIndex}
              $width={columnWidths ? columnWidths[cellIndex] : undefined}
              $flex={!columnWidths}
              $align="center"
              style={{ position: "relative" }}
            >
              {cellIndex === 0 && checkbox ? (
                <Flex $justify="flex-start" $gap={30}>
                  <Checkbox
                    $checked={selectedRows.includes(rowIndex)}
                    onChange={() => handleRowCheckboxChange(rowIndex)}
                  />
                  {typeof cell === "string" ? (
                    <Text $size="body2" $color={theme.color.grayScale[60]}>
                      {cell}
                    </Text>
                  ) : (
                    cell
                  )}
                </Flex>
              ) : typeof cell === "string" ? (
                <Text $size="body2" $color={theme.color.grayScale[60]}>
                  {cell}
                </Text>
              ) : (
                cell
              )}
            </Cell>
          ))}
        </Body>
      ))}
    </Box>
  );
};
