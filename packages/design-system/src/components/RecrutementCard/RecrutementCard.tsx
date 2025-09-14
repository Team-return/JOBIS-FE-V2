import styled from "@emotion/styled";
import type { Props } from "./RecrutementCard.types";
import { Box, Flex, Stack, Text, Bookmark, Surface } from "@/components";
import { useTheme } from "@/hooks";

const Component = styled.div`
  display: flex;
  align-items: stretch;
  justify-content: flex-start;
  flex-direction: column;
  border-radius: 12px;
  width: 222px;
  height: 264px;
  overflow: hidden;
  cursor: pointer;

  & > div,
  & > div > div {
    height: 100%;
  }
`;

const Clip = styled.div`
  padding: 4px 8px;
  height: 18px;
  border: 1px solid ${({ theme }) => theme.color.primary[20]};
  border-radius: 18px;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const RecrutementCard = ({
  companyName,
  companyProfileUrl,
  hiringJobs,
  trainPay,
  militarySupport,
  bookmarked,
  onClick
}: Props) => {
  const { currentTheme: theme } = useTheme();

  return (
    <Surface $shadow>
      <Component onClick={onClick} role="cell">
        <img
          width={222}
          height={144}
          src={companyProfileUrl}
          alt={companyName}
        />
        <Box $padding={[12, 12, 12, 11]}>
          <Flex $direction="column" $justify="space-between">
            <Flex $direction="row" $justify="space-between">
              <Stack $gap={0}>
                <Text $size="body2">{hiringJobs}</Text>
                <Text $size="body3" $color={theme.color.grayScale[80]}>
                  {companyName}
                </Text>
              </Stack>
              <Bookmark $checked={bookmarked} />
            </Flex>
            <Stack $direction="row" $gap={12}>
              <Clip>
                <Text $span $size="caption" $color={theme.color.primary[20]}>
                  {`실습수당 ${trainPay}만원`}
                </Text>
              </Clip>
              <Clip>
                <Text $span $size="caption" $color={theme.color.primary[20]}>
                  {`병역특례 ${militarySupport ? "O" : "X"}`}
                </Text>
              </Clip>
            </Stack>
          </Flex>
        </Box>
      </Component>
    </Surface>
  );
};
