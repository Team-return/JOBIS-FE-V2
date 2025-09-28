import { Flex, Text, Bookmark } from "@/components";
import type { Props } from "./CompanyCard.types";
import styled from "@emotion/styled";
import { useState, useEffect } from "react";

const Img = styled.img`
  width: 304px;
  height: 168px;
  border-radius: 12px;
  background-color: ${({ theme }) => theme.color.grayScale[40]};
  object-fit: fill;
`;

export const CompanyCard = ({
  $imgUrl,
  companyName,
  annualSales,
  $bookmark
}: Props) => {
  const [isBookmarked, setIsBookmarked] = useState($bookmark);

  useEffect(() => {
    setIsBookmarked($bookmark);
  }, [$bookmark]);

  return (
    <Flex $direction="column" $gap={16}>
      <Img src={$imgUrl} alt={companyName} />
      <Flex $direction="row" $justify="space-between">
        <Flex $direction="column" $gap={4}>
          <Text $size="h6" $weight="regular">
            {companyName}
          </Text>
          <Text $size="body3" $weight="regular" $color="#7F7F7F">
            {annualSales}
          </Text>
        </Flex>
        <Bookmark
          $checked={isBookmarked}
          onClick={() => setIsBookmarked(prev => !prev)}
        />
      </Flex>
    </Flex>
  );
};
