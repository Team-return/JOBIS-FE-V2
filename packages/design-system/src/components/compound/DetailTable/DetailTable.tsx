import styled from "@emotion/styled";
import { Fragment } from "react";
import { Box, Flex, Text, FileDownload, Image } from "@/components";
import { useTheme } from "@/hooks";
import { useState } from "react";
import { DetailTableProps } from "./DetailTable.types";
import arrow from "../../../../assets/icons/arrow.svg";

export const DetailTable = ({ items }: DetailTableProps) => {
  const [expandedIndex, setExpandedIndex] = useState<number[]>([]);
  const { currentTheme: theme } = useTheme();

  const toggleExpand = (index: number) => {
    setExpandedIndex(prev =>
      prev.includes(index) ? prev.filter(i => i !== index) : [...prev, index]
    );
  };

  return (
    <>
      <TableContainer theme={theme}>
        {items.map((item, index) => {
          const isExpanded = expandedIndex.includes(index);
          const hasExpandableContent =
            item.expandableContent && item.expandableContent.length > 0;
          return (
            <Fragment key={index}>
              <Row
                theme={theme}
                $align="center"
                onClick={() => hasExpandableContent && toggleExpand(index)}
                $isClickable={hasExpandableContent}
              >
                <LabelCell theme={theme} $align="center" $justify="center">
                  <Flex $gap={6} $justify="center">
                    <Text $size="body2" $color="#3182f6">
                      {item.label}
                    </Text>
                    {hasExpandableContent && (
                      <IconButton
                        onClick={() => toggleExpand(index)}
                        $isOpen={isExpanded}
                      >
                        <Image src={arrow} alt="Expand" />
                      </IconButton>
                    )}
                  </Flex>
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

              {isExpanded && hasExpandableContent && (
                <ExpandedRowContainer theme={theme}>
                  {item.expandableContent!.map((nestedItem, nestedIndex) => (
                    <NestedRow
                      key={nestedIndex}
                      $align="center"
                      theme={theme}
                      $isLastItem={
                        nestedIndex === item.expandableContent!.length - 1
                      }
                    >
                      <NestedLabelCell
                        theme={theme}
                        $align="center"
                        $justify="center"
                      >
                        <Text
                          $size="body2"
                          $color={isExpanded ? "#000000" : "#3182f6"}
                        >
                          {nestedItem.label}
                        </Text>
                      </NestedLabelCell>

                      <NestedValueCell $align="center">
                        {nestedItem.itemType === "file" && (
                          <FileDownload
                            label={nestedItem.value as string}
                            fileUrl={nestedItem.fileUrl || ""}
                          />
                        )}
                        {nestedItem.itemType === "text" && (
                          <Text
                            $size="body2"
                            $color={theme.color.grayScale[80] || "#333d4b"}
                          >
                            {nestedItem.value}
                          </Text>
                        )}
                      </NestedValueCell>
                    </NestedRow>
                  ))}
                </ExpandedRowContainer>
              )}
            </Fragment>
          );
        })}
      </TableContainer>
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

const Row = styled(Flex)<{ $isClickable?: boolean }>`
  width: 100%;
  min-height: 44px;
  height: auto;
  border-bottom: 1px solid ${({ theme }) => theme.color.grayScale[50]};
  cursor: ${({ $isClickable }) => ($isClickable ? "pointer" : "default")};
  transition: background-color 0.2s;

  &:last-of-type {
    border-bottom: none;
  }
`;

const LabelCell = styled(Flex)`
  align-self: stretch;
  justify-content: center;
  align-items: center;
  padding: 12px;

  width: 200px;
  min-height: 44px;

  background: rgba(19, 92, 157, 0.08);
  border-right: 1px solid ${({ theme }) => theme.color.grayScale[50]};
  flex-shrink: 0;
`;

const ValueCell = styled(Flex)`
  width: 760px;
  min-height: 44px;
  padding: 12px 0;
  padding-left: 40px;
  padding-right: 40px;
`;

const ExpandedRowContainer = styled.div`
  display: flex;
  flex-direction: column;
  border-bottom: 1px solid ${({ theme }) => theme.color.grayScale[50]};
`;

const NestedLabelCell = styled(Flex)`
  align-self: stretch;
  justify-content: center;
  align-items: center;
  padding: 12px;

  width: 200px;
  min-height: 40px;

  background: #fafafa;
  border-right: 1px solid ${({ theme }) => theme.color.grayScale[50]};
`;

const NestedValueCell = styled(Flex)`
  width: 760px;
  min-height: 40px;
  padding: 12px 0;
  padding-left: 40px;
  padding-right: 40px;
`;

const NestedRow = styled(Flex)<{ $isLastItem: boolean }>`
  width: 100%;
  min-height: 40px;
  border-bottom: ${({ $isLastItem, theme }) =>
    $isLastItem ? "none" : `1px solid ${theme.color.grayScale[50]}`};
`;

const IconButton = styled.button<{ $isOpen: boolean }>`
  background: none;
  border: none;
  padding: 0;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: transform 0.3s ease;
  transform: rotate(${({ $isOpen }) => ($isOpen ? "180deg" : "0deg")});
`;
