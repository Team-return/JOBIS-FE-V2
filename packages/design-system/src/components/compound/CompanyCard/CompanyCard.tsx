import { Flex, Text } from "@/components";
import type { Props } from "./CompanyCard.types";
import styled from "@emotion/styled";
import { useTheme } from "@/hooks";

// 로고는 대부분 정사각형이라 칸에 맞춰 늘리면 찌그러진다. 비율을 지키고 남는 곳은 흰색으로 채우고,
// 흰 배경에서도 카드 영역이 보이도록 테두리를 둔다
const Img = styled.img`
  width: 304px;
  height: 168px;
  border-radius: 12px;
  border: 1px solid ${({ theme }) => theme.color.grayScale[40]};
  background-color: ${({ theme }) => theme.color.grayScale[10]};
  object-fit: contain;
  cursor: pointer;
`;

const Clip = styled.div<{ $boolean: boolean }>`
  padding: 4px 8px;
  height: 18px;
  border: 1px solid
    ${({ theme, $boolean }) =>
      $boolean ? theme.color.primary[20] : theme.color.grayScale[60]};
  border-radius: 18px;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const CompanyCard = ({
  imgUrl,
  companyName,
  annualSales,
  hasRecruitment,
  onClick
}: Props) => {
  const { currentTheme: theme } = useTheme();
  return (
    <Flex $direction="column" $gap={16} $fit onClick={onClick}>
      <Img src={imgUrl} alt={companyName} />
      <Flex $direction="row" $justify="space-between">
        <Flex $direction="column" $gap={4}>
          {annualSales ? (
            <>
              <Flex $direction="row" $justify="space-between">
                <Text $size="h6" $weight="regular">
                  {companyName}
                </Text>
                <Clip $boolean={hasRecruitment}>
                  <Text
                    $span
                    $size="caption"
                    $color={
                      hasRecruitment
                        ? theme.color.primary[20]
                        : theme.color.grayScale[80]
                    }
                  >
                    {hasRecruitment ? "모집중" : "모집 종료"}
                  </Text>
                </Clip>
              </Flex>
              <Text
                $size="body3"
                $weight="regular"
                $color={theme.color.grayScale[60]}
              >
                {annualSales}
              </Text>
            </>
          ) : (
            <>
              <Flex $direction="row">
                <Clip $boolean={hasRecruitment}>
                  <Text
                    $span
                    $size="caption"
                    $color={
                      hasRecruitment
                        ? theme.color.primary[20]
                        : theme.color.grayScale[80]
                    }
                  >
                    {hasRecruitment ? "모집중" : "모집 종료"}
                  </Text>
                </Clip>
              </Flex>
              <Text $span={true} $size="h6" $weight="regular">
                {companyName}
              </Text>
            </>
          )}
        </Flex>
      </Flex>
    </Flex>
  );
};
