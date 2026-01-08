import styled from "@emotion/styled";
import { Box, Checkbox, Flex, Text } from "@/components";
import { Props } from "./Table.types";
import { useTheme } from "@/hooks";

// props로 table type을 받지 말고, header에 들어갈 값[]과 row에 들어갈 값[][]을 받고 셀의 너비를 순서대로 받아[]서 적용시켜야 한다.
// header, row, 셀 너비의 길이가 같은지 정도는 컴포넌트 단계에서 체크해야될듯

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

  // Header checkbox 상태: 모든 행이 선택되었으면 true
  const allSelected = rows.length > 0 && selectedRows.length === rows.length;

  // Header checkbox 핸들러
  const handleHeaderCheckboxChange = () => {
    if (onRowSelect) {
      if (allSelected) {
        // 모두 선택 해제
        onRowSelect([]);
      } else {
        // 모두 선택
        onRowSelect(rows.map((_, index) => index));
      }
    }
  };

  // Body checkbox 핸들러
  const handleRowCheckboxChange = (rowIndex: number) => {
    if (onRowSelect) {
      if (selectedRows.includes(rowIndex)) {
        // 선택 해제
        onRowSelect(selectedRows.filter(index => index !== rowIndex));
      } else {
        // 선택
        onRowSelect([...selectedRows, rowIndex]);
      }
    }
  };

  return (
    <Box height={486}>
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
