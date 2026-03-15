import styled from "@emotion/styled";
import { Flex, Image, Spacer } from "@/components/primitive";
import { Text, Icon } from "@/components/core";
import { DetailHeaderProps } from "./DetailHeader.types";
import { useState } from "react";

export const DetailHeader = ({
  type,
  title,
  logoUrl,
  businessNumber
}: DetailHeaderProps) => {
  const [showMenu, setShowMenu] = useState(false);

  if (type === "recruitment") {
    return <div>모집의뢰서 상세 헤더</div>;
  }
  return (
    <Flex $direction="row" $align="center">
      <Flex $gap={28} $fit>
        <Image src={logoUrl} alt={title} width={72} height={72} $radius={8} />
        <Flex $direction="column" $gap={8} $fit>
          <Text $size="h4" $weight="bold" $color="#000000">
            {title}
          </Text>
          <Text $size="body2" $weight="medium" $color="#7f7f7f">
            {businessNumber}
          </Text>
        </Flex>
      </Flex>
      <Spacer $flex={1} />
      <MenuWrapper>
        <KebabButton onClick={() => setShowMenu(prev => !prev)}>
          <Icon icon="KebapMenu" size={24} />
        </KebabButton>
        {showMenu && (
          <Menu role="menu" $direction="column" $gap={20} $align="center">
            <MenuItem>
              <Text $size="body3" $weight="regular" $color="#7F7F7F">
                모집의뢰서 조회
              </Text>
            </MenuItem>
            <MenuItem>
              <Text $size="body3" $weight="regular" $color="#7F7F7F">
                면접후기 조회
              </Text>
            </MenuItem>
            <MenuItem>
              <Text $size="body3" $weight="regular" $color="#7F7F7F">
                면접 후기 작성
              </Text>
            </MenuItem>
          </Menu>
        )}
      </MenuWrapper>
    </Flex>
  );
};

const MenuWrapper = styled.div`
  position: relative;
`;

const KebabButton = styled.button`
  border: none;
  background: transparent;
  padding: 0;
  cursor: pointer;
`;

const Menu = styled(Flex)`
  padding: 20px;

  position: absolute;
  top: calc(100% + 24px);
  right: 0;
  width: 137px;

  background: #ffffff;
  box-shadow: 0px 4px 20px rgba(112, 144, 176, 0.15);
  border-radius: 8px;
`;

const MenuItem = styled.button`
  border: none;
  background: transparent;
  padding: 0;
  text-align: left;
  cursor: pointer;
`;
