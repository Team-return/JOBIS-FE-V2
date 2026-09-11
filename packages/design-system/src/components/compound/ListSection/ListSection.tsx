import styled from "@emotion/styled";
import { Flex, Icon, Text } from "@/components";
import { useTheme } from "@/hooks";
import type { Props } from "./ListSection.types";

const Component = styled.div`
  width: auto;
`;

const ViewAllButton = styled.button`
  display: inline-flex;
  align-items: center;
  gap: 4px;
  padding: 0;
  border: 0;
  background: transparent;
  cursor: pointer;
`;

export const ListSection = ({ onClickViewAll }: Props) => {
  const { currentTheme: theme } = useTheme();
  const viewAllColor = theme.color.grayScale[60];

  return (
    <Component>
      <ViewAllButton onClick={onClickViewAll}>
        <Flex $align="center" $gap="2px">
          <Text $size="body3" $weight="regular" $color={viewAllColor}>
            전체보기
          </Text>
          {/* 장식용 아이콘이라 버튼 접근성 이름에 섞이지 않게 숨긴다 */}
          <Icon
            icon="ChevronRight"
            size={12}
            fillColor={viewAllColor}
            aria-hidden
          />
        </Flex>
      </ViewAllButton>
    </Component>
  );
};
