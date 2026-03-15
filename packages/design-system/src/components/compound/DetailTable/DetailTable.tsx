import styled from "@emotion/styled";
import { Box, Flex, Text, FileDownload } from "@/components";
import { useTheme } from "@/hooks";
import { DetailTableProps } from "./DetailTable.types";

export const DetailTable = ({ items }: DetailTableProps) => {
  const { currentTheme: theme } = useTheme();

  return (
    <>
      <TableContainer theme={theme}>
        {items.map((item, index) => (
          <Row key={index} theme={theme} $align="center">
            <LabelCell theme={theme} $align="center" $justify="center">
              <Text $size="body2" $color="#3182f6">
                {item.label}
              </Text>
            </LabelCell>

            <ValueCell $align="center">
              {item.itemType === "file" && (
                <FileDownload
                  label={item.value as string}
                  fileUrl={item.fileUrl || ""}
                />
              )}
              {item.itemType === "text" && (
                <Text
                  $size="body2"
                  $color={theme.color.grayScale[80] || "#333d4b"}
                >
                  {item.value}
                </Text>
              )}
            </ValueCell>
          </Row>
        ))}
      </TableContainer>
      <Box height={516} />
    </>
  );
};

const TableContainer = styled(Box)`
  width: 100%;
  border: 1px solid ${({ theme }) => theme.color.grayScale[50]};
  border-radius: 8px;
  overflow: hidden;
  display: flex;
  flex-direction: column;
`;

const Row = styled(Flex)`
  width: 100%;
  min-height: 44px;
  border-bottom: 1px solid ${({ theme }) => theme.color.grayScale[50]};
  &:last-of-type {
    border-bottom: none;
  }
`;

const LabelCell = styled(Flex)`
  align-items: center;
  padding: 12px;

  width: 200px;
  height: 100%;

  background: rgba(19, 92, 157, 0.08);
  border-right: 1px solid ${({ theme }) => theme.color.grayScale[50]};
  flex-shrink: 0;
`;

const ValueCell = styled(Flex)`
  width: 760px;
  min-height: 44px;
  padding-left: 40px;
`;
