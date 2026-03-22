import { Flex, Text } from "@/components";
import type { Props } from "./CompanyCard.types";
import styled from "@emotion/styled";
import { useTheme } from "@/hooks";

const Img = styled.img`
  width: 304px;
  height: 168px;
  border-radius: 12px;
  background-color: ${({ theme }) => theme.color.grayScale[40]};
  object-fit: fill;
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
    <Flex $direction="column" $gap={16} onClick={onClick}>
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
                {`연매출 ${annualSales.toString()}억`}
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
