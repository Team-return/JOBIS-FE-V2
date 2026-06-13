import { Flex, Icon, Text } from "@/components";
import type { Props } from "./ReviewAccordion.types";
import styled from "@emotion/styled";
import { useTheme } from "@/hooks";
import { useState } from "react";

const Component = styled.div<{ $isOpen: boolean }>`
  display: flex;
  width: 534px;
  flex-direction: column;
  gap: 12px;
  background: #f3f7fb;
  border-radius: 8px;
  padding: ${({ $isOpen }) => ($isOpen ? "16px 24px 20px" : "14px 24px")};
  cursor: pointer;
`;

const Chevron = styled.div<{ $isOpen: boolean }>`
  display: flex;
  align-items: center;
  flex-shrink: 0;
  transition: transform 0.2s ease;
  transform: rotate(${({ $isOpen }) => ($isOpen ? "180deg" : "0deg")});
`;

const Divider = styled.div`
  width: 100%;
  height: 1px;
  background: rgba(19, 92, 157, 0.3);
`;

const Dot = styled.div`
  width: 3px;
  height: 3px;
  border-radius: 50%;
  background: ${({ theme }) => theme.color.primary[20]};
  flex-shrink: 0;
`;

export const ReviewAccordion = ({
  question,
  answer,
  year,
  major,
  writer
}: Props) => {
  const { currentTheme: theme } = useTheme();
  const [isOpen, setIsOpen] = useState(false);

  return (
    <Component $isOpen={isOpen} onClick={() => setIsOpen(prev => !prev)}>
      <Flex $justify="space-between" $align="center">
        <Flex $align="center" $gap={12} $fit>
          <Text
            $size="h6"
            $weight="bold"
            $color={theme.color.subColor.blue[30]}
          >
            Q.
          </Text>
          <Text
            $size="body2"
            $weight="regular"
            $color={theme.color.grayScale[90]}
          >
            {question}
          </Text>
        </Flex>
        <Chevron $isOpen={isOpen}>
          <Icon
            icon="ChevronDown"
            size={16}
            fillColor={theme.color.primary[20]}
          />
        </Chevron>
      </Flex>

      {isOpen && (
        <>
          <Divider />
          <Flex $direction="column" $gap={53}>
            <Text
              $size="body3"
              $weight="regular"
              $color={theme.color.grayScale[70]}
            >
              {answer}
            </Text>
            <Flex $justify="space-between" $align="center">
              <Text
                $size="caption"
                $weight="regular"
                $color={theme.color.primary[20]}
              >
                {year.toString()}
              </Text>
              <Flex $align="center" $gap={8} $fit>
                <Text
                  $size="caption"
                  $weight="regular"
                  $color={theme.color.primary[20]}
                >
                  {major}
                </Text>
                <Dot />
                <Text
                  $size="caption"
                  $weight="regular"
                  $color={theme.color.primary[20]}
                >
                  {writer}
                </Text>
              </Flex>
            </Flex>
          </Flex>
        </>
      )}
    </Component>
  );
};
