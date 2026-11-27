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

// 로고는 대부분 정사각형이라 칸에 맞춰 늘리면 찌그러진다. 비율을 지키고 남는 곳은 흰색으로 채운다.
// 이미지를 못 불러와도 대체 글자만큼 늘거나 줄어 아래 내용을 밀지 않도록 크기를 고정한다
const ProfileImage = styled.img`
  display: block;
  width: 222px;
  height: 144px;
  overflow: hidden;
  flex-shrink: 0;
  object-fit: contain;
  background-color: ${({ theme }) => theme.color.grayScale[10]};
  border: 1px solid ${({ theme }) => theme.color.grayScale[40]};
  border-radius: 12px 12px 0 0;
`;

// 피그마: 모집중은 파란색, 모집 종료는 빨간색. 모집전은 시안에 없어 회색으로 둔다
const getStatusColor = (status: RecruitmentCardStatus, theme: JOBISTheme) => {
  if (status === "모집중") return theme.color.primary[20];
  if (status === "모집 종료") return theme.color.subColor.red[20];
  return theme.color.grayScale[60];
};

// 직무·기업명이 줄어들 수 있도록 북마크 옆 영역의 최소 너비를 0으로 둔다
const Info = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1;
  min-width: 0;
`;

// 두 줄로 접히면 북마크 옆이 비좁아지고 아래 칩까지 밀린다. 피그마처럼 한 줄로 두고 넘치면 말줄임
const HiringJobs = styled.p`
  margin: 0;
  color: ${({ theme }) => theme.color.grayScale[90]};
  font-weight: ${({ theme }) => theme.fontWeight.medium};
  font-size: ${({ theme }) => theme.font.body2.fontSize};
  line-height: ${({ theme }) => theme.font.body2.lineHeight};
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

// 기업명은 피그마처럼 한 줄로 두고 넘치면 말줄임
const CompanyName = styled.p`
  margin: 0;
  color: ${({ theme }) => theme.color.grayScale[80]};
  font-weight: ${({ theme }) => theme.fontWeight.regular};
  font-size: ${({ theme }) => theme.font.body3.fontSize};
  line-height: ${({ theme }) => theme.font.body3.lineHeight};
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

// 피그마 칩은 테두리 포함 높이 26px, 좌우 여백 8px (전역 box-sizing: border-box 기준)
// 칩 영역이 좁아도 칩이 줄어 글자가 두 줄로 접히지 않게 한다
const Clip = styled.div<{ $color?: string }>`
  padding: 0 7px;
  height: 26px;
  border: 1px solid ${({ theme, $color }) => $color ?? theme.color.primary[20]};
  border-radius: 100px;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-shrink: 0;
  white-space: nowrap;
`;

// 피그마 칩 간격은 12px. 칩이 3개면 "모집 종료"처럼 긴 상태에서 칩 영역(199px)을 넘으므로 4px로 줄인다
const getChipGap = (chipCount: number) => (chipCount >= 3 ? 4 : 12);

export const RecrutementCard = ({
  companyName,
  companyProfileUrl,
  hiringJobs,
  militarySupport,
  bookmarked,
  status,
  winterIntern,
  onClick,
  onBookmarkClick
}: Props) => {
  const { currentTheme: theme } = useTheme();
  const statusColor = status && getStatusColor(status, theme);
  const chipCount =
    (status && statusColor ? 1 : 0) + 1 + (winterIntern ? 1 : 0);

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
          <Flex $direction="row" $justify="space-between" $gap={8}>
            <Info>
              <HiringJobs title={hiringJobs}>{hiringJobs}</HiringJobs>
              <CompanyName title={companyName}>{companyName}</CompanyName>
            </Info>
            <Bookmark
              $checked={bookmarked}
              onClick={
                onBookmarkClick &&
                (event => {
                  // 카드 전체가 상세 이동이라 북마크 클릭이 카드로 올라가지 않게 막는다
                  event.stopPropagation();
                  onBookmarkClick();
                })
              }
            />
          </Flex>
          <Stack $direction="row" $gap={getChipGap(chipCount)}>
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
            {winterIntern && (
              <Clip $color={theme.color.primary[20]}>
                <Text $span $size="caption" $color={theme.color.primary[20]}>
                  겨울인턴
                </Text>
              </Clip>
            )}
          </Stack>
        </Flex>
      </Box>
    </Component>
  );
};
