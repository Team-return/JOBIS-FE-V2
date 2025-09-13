import styled from "@emotion/styled";
import { Flex, Icon, Stack, Text } from "@/components";
import { useTheme } from "@/hooks";
import type { Props } from "./NotificationItem.types";

const Component = styled.div`
  border-radius: 8px;
  padding: 8px;
  cursor: pointer;
  white-space: pre;

  &:hover {
    background-color: rgba(0, 0, 0, 0.04);
  }
`;

const applicationStatus: Record<string, string> = {
  REQUESTED: "승인요청",
  APPROVED: "승인됨",
  SEND: "지원 중",
  FAILED: "불합격",
  PASS: "합격",
  REJECTED: "반려",
  FIELD_TRAIN: "현장실습",
  ACCEPTANCE: "근로계약"
};

export const NotificationItem = ({ title, content, date, onClick }: Props) => {
  const { currentTheme: theme } = useTheme();
  const parsedDate = new Date(date);
  const parsedTexts = content.split(/{([A-Z_]+)}/).map((segment, index) => {
    if (index % 2 === 0) return { color: undefined, text: segment };
    const statusValue = applicationStatus[segment];
    return { color: theme.color.primary[20], text: statusValue };
  });

  return (
    <Component onClick={onClick}>
      <Flex $direction="row" $justify="space-between" $align="center" $gap={31}>
        <Stack $gap={2}>
          <Text $size="caption" $color={theme.color.subColor.blue[30]}>
            {title}
          </Text>
          <Stack $direction="row">
            {parsedTexts.map(({ text, color }, index) => (
              <Text $span $size="body3" $color={color} key={index}>
                {text}
              </Text>
            ))}
          </Stack>
          <Text $size="caption" $color={theme.color.grayScale[60]}>
            {parsedDate.getFullYear() +
              "." +
              (parsedDate.getMonth() + 1) +
              "." +
              parsedDate.getDate()}
          </Text>
        </Stack>
        <Icon icon="ChevronRight" size={16} />
      </Flex>
    </Component>
  );
};
