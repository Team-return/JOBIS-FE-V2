import styled from "@emotion/styled";
import { Box, Checkbox, Flex, Text } from "@/components";
import { Props } from "./Table.types";
import { useTheme } from "@/hooks";

const Header = styled(Flex)`
  border-bottom: ${({ theme }) => `1px solid ${theme.color.grayScale[50]}`};
  padding: 12px 0px;
`;
const Body = styled(Flex)`
  border-bottom: ${({ theme }) => `1px solid ${theme.color.grayScale[50]}`};
  height: 88px;
`;

const Cell = styled.div<{
  $width?: number;
  $flex?: boolean;
  $align?: "start" | "center";
  $clamp?: number;
}>`
  ${({ $width, $flex }) =>
    $flex
      ? "flex: 1;"
      : $width
        ? `width: ${$width}px; flex-shrink: 0;`
        : "flex-shrink: 0;"}
  ${({ $clamp, $align }) =>
    $clamp
      ? `
        display: -webkit-box;
        -webkit-line-clamp: ${$clamp};
        -webkit-box-orient: vertical;
        overflow: hidden;
        text-overflow: ellipsis;
        word-break: break-word;
        text-align: ${$align === "center" ? "center" : "left"};
      `
      : `
        display: flex;
        align-items: center;
        justify-content: ${$align === "center" ? "center" : "flex-start"};
      `}
`;

export const Table = ({
  headers,
  rows,
  columnWidths,
  checkbox,
  selectedRows = [],
  onRowSelect
}: Props) => {
  const { currentTheme: theme } = useTheme();

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
      <Header $justify="space-evenly">
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
                <Text $size="body2" $color={theme.color.grayScale[60]}>
                  {header}
                </Text>
              </Flex>
            ) : (
              <Text $size="body2" $color={theme.color.grayScale[60]}>
                {header}
              </Text>
            )}
          </Cell>
        ))}
      </Header>

      {rows.map((row, rowIndex) => (
        <Body key={rowIndex} $justify="space-evenly">
          {row.map((cell, cellIndex) => (
            <Cell
              key={cellIndex}
              $width={columnWidths ? columnWidths[cellIndex] : undefined}
              $flex={!columnWidths}
              $align="center"
            >
              {cellIndex === 0 && checkbox ? (
                <Flex $justify="flex-start" $gap={30}>
                  <Checkbox
                    $checked={selectedRows.includes(rowIndex)}
                    onChange={() => handleRowCheckboxChange(rowIndex)}
                  />
                  <Text $size="body2" $color={theme.color.grayScale[60]}>
                    {cell}
                  </Text>
                </Flex>
              ) : (
                <Text $size="body2" $color={theme.color.grayScale[60]}>
                  {cell}
                </Text>
              )}
            </Cell>
          ))}
        </Body>
      ))}
    </Box>
  );
};
