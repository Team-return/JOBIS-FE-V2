import styled from "@emotion/styled";
import { SkeletonProps } from "./Table.types";
import { Box, Flex } from "@/components/primitive";
import { Skeleton } from "@/components/core";

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
  ${({ $align }) =>
    `
        display: flex;
        align-items: center;
        justify-content: ${$align === "center" ? "center" : "flex-start"};
      `}
`;

export const TableSkeleton = ({
  checkbox,
  columnWidths,
  rows = 5
}: SkeletonProps) => {
  const skeletonRows = Array.from({ length: rows });

  return (
    <Box>
      <Header $justify="space-evenly">
        {columnWidths?.map((width, index) => (
          <Cell
            key={index}
            $width={columnWidths ? width : undefined}
            $flex={!columnWidths}
            $align="center"
          >
            {index === 0 && checkbox ? (
              <Flex $justify="flex-start" $gap={30}>
                <Skeleton width={24} height={24} $radius={4} />
                <Skeleton width={50} height={24} />
              </Flex>
            ) : (
              <Skeleton width={50} height={24} />
            )}
          </Cell>
        ))}
      </Header>

      {skeletonRows.map((_, rowIndex) => (
        <Body key={rowIndex} $justify="space-evenly">
          {columnWidths?.map((width, index) => (
            <Cell
              key={index}
              $width={columnWidths ? width : undefined}
              $flex={!columnWidths}
              $align="center"
            >
              {index === 0 && checkbox ? (
                <Flex $justify="flex-start" $gap={30}>
                  <Skeleton width={24} height={24} $radius={4} />
                  <Skeleton width={50} height={24} />
                </Flex>
              ) : (
                <Skeleton width={50} height={24} />
              )}
            </Cell>
          ))}
        </Body>
      ))}
    </Box>
  );
};
