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

const Clip = styled.div<Pick<Props, "recruitmentStatus">>`
  padding: 4px 8px;
  height: 18px;
  border: 1px solid
    ${({ theme, recruitmentStatus }) =>
      recruitmentStatus === "모집중"
        ? theme.color.primary[20]
        : recruitmentStatus === "모집 종료"
          ? theme.color.subColor.red[20]
          : theme.color.grayScale[60]};
  border-radius: 18px;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const CompanyCard = ({
  imgUrl,
  companyName,
  annualSales,
  recruitmentStatus,
  onClick
}: Props) => {
  const { currentTheme: theme } = useTheme();
  return (
    <Flex $direction="column" $gap={16} onClick={onClick}>
      <Img src={imgUrl} alt={companyName} />
      <Flex $direction="row" $justify="space-between">
        <Flex $direction="column" $gap={4}>
          <Text $size="h6" $weight="regular">
            {companyName}
          </Text>
          {recruitmentStatus && <Clip recruitmentStatus={recruitmentStatus} />}
          {annualSales && (
            <Text
              $size="body3"
              $weight="regular"
              $color={theme.color.grayScale[60]}
            >
              {annualSales}
            </Text>
          )}
        </Flex>
      </Flex>
    </Flex>
  );
};
