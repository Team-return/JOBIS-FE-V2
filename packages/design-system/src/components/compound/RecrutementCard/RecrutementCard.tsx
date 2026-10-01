import styled from "@emotion/styled";
import type { JOBISTheme } from "@/themes";
import type { Props, RecruitmentCardStatus } from "./RecrutementCard.types";
import { Box, Flex, Stack, Text, Bookmark } from "@/components";
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
  box-shadow: 0px 4px 10px rgba(112, 144, 176, 0.12);

  & > div,
  & > div > div {
    height: 100%;
  }
`;

const ProfileImage = styled.img`
  flex-shrink: 0;
  background-color: ${({ theme }) => theme.color.grayScale[40]};
  border: 1px solid ${({ theme }) => theme.color.grayScale[40]};
  border-radius: 12px 12px 0 0;
`;

// 피그마: 모집중은 파란색, 모집 종료는 빨간색. 모집전은 시안에 없어 회색으로 둔다
const getStatusColor = (status: RecruitmentCardStatus, theme: JOBISTheme) => {
  if (status === "모집중") return theme.color.primary[20];
  if (status === "모집 종료") return theme.color.subColor.red[20];
  return theme.color.grayScale[60];
};

// 카드 높이가 고정이라 직무가 길면 아래 기업명·병역특례가 잘린다. 두 줄까지만 보여 준다
const HiringJobs = styled.p`
  margin: 0;
  color: ${({ theme }) => theme.color.grayScale[90]};
  font-weight: ${({ theme }) => theme.fontWeight.medium};
  font-size: ${({ theme }) => theme.font.body2.fontSize};
  line-height: ${({ theme }) => theme.font.body2.lineHeight};
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 2;
  overflow: hidden;
`;

const Clip = styled.div<{ $color?: string }>`
  padding: 4px 8px;
  height: 18px;
  border: 1px solid ${({ theme, $color }) => $color ?? theme.color.primary[20]};
  border-radius: 18px;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const RecrutementCard = ({
  companyName,
  companyProfileUrl,
  hiringJobs,
  militarySupport,
  bookmarked,
  status,
  onClick
}: Props) => {
  const { currentTheme: theme } = useTheme();
  const statusColor = status && getStatusColor(status, theme);

  return (
    <Component onClick={onClick} role="cell">
      <ProfileImage
        width={222}
        height={144}
        src={companyProfileUrl}
        alt={companyName}
      />
      <Box $padding={[12, 12, 12, 11]} $bg={theme.color.grayScale[20]}>
        <Flex $direction="column" $justify="space-between">
          <Flex $direction="row" $justify="space-between">
            <Stack $gap={0}>
              <HiringJobs title={hiringJobs}>{hiringJobs}</HiringJobs>
              <Text $size="body3" $color={theme.color.grayScale[80]}>
                {companyName}
              </Text>
            </Stack>
            <Bookmark $checked={bookmarked} />
          </Flex>
          <Stack $direction="row" $gap={12}>
            {status && statusColor && (
              <Clip $color={statusColor}>
                <Text $span $size="caption" $color={statusColor}>
                  {status}
                </Text>
              </Clip>
            )}
            <Clip $color={theme.color.primary[20]}>
              <Text $span $size="caption" $color={theme.color.primary[20]}>
                {`병역특례 ${militarySupport ? "O" : "X"}`}
              </Text>
            </Clip>
          </Stack>
        </Flex>
      </Box>
    </Component>
  );
};
