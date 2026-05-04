import styled from "@emotion/styled";
import { Flex, Spacer, Image } from "@/components/primitive";
import { Text, Icon } from "@/components/core";
import { DetailHeaderProps } from "./DetailHeader.types";
import { useState } from "react";

export const DetailHeader = ({
  type,
  title,
  logoUrl,
  businessNumber,
  isParticipation
}: DetailHeaderProps & { isParticipation?: boolean }) => {
  const [showMenu, setShowMenu] = useState(false);

  if (type === "recruitment") {
    return (
      <Flex $direction="row" $align="center">
        <Flex $gap={28} $fit>
          <ImgShadow>
            <Image
              src={logoUrl}
              alt={title}
              width={72}
              height={72}
              $radius={8}
            />
          </ImgShadow>
          <Flex $direction="column" $gap={8} $fit>
            <Flex $direction="row" $align="center" $gap={12}>
              <Text $size="h4" $weight="bold" $color="#000000">
                {title}
              </Text>
              {isParticipation && (
                <ParticipationBadge>참여기업</ParticipationBadge>
              )}
            </Flex>
            <Flex $direction="row" $align="center" $gap={8}>
              <Text $size="body2" $weight="medium" $color="#7f7f7f">
                상세보기
              </Text>
              <Line />
              <Text $size="body2" $weight="medium" $color="#7f7f7f">
                지원하기
              </Text>
            </Flex>
          </Flex>
        </Flex>
      </Flex>
    );
  }
  return (
    <Flex $direction="row" $align="center">
      <Flex $gap={28} $fit>
        <ImgShadow>
          <Image src={logoUrl} alt={title} width={72} height={72} $radius={8} />
        </ImgShadow>
        <Flex $direction="column" $gap={8} $fit>
          <Text $size="h4" $weight="bold" $color="#000000">
            {title}
          </Text>
          <Text $size="body2" $weight="medium" $color="#7f7f7f">
            {`사업자 번호 : ${businessNumber}`}
          </Text>
        </Flex>
      </Flex>
      <Spacer $flex={1} />
      <MenuWrapper>
        <KebabButton
          onClick={() => setShowMenu(prev => !prev)}
          aria-label="more"
        >
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
                면접 후기 조회
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

const ParticipationBadge = styled.div`
  width: 61px;
  height: 24px;
  left: 228px;
  top: 8px;

  background: rgba(46, 204, 113, 0.1);
  border: 1px solid #2ecc71;
  border-radius: 100px;

  font-family: "Noto Sans KR";
  font-style: normal;
  font-weight: 400;
  font-size: 12px;
  line-height: 22px;

  color: #2ecc71;

  text-align: center;
`;

const Line = styled.div`
  width: 14px;
  height: 1px;

  border: 0.9px solid #cccccc;
  transform: rotate(90deg);
`;

const ImgShadow = styled.div`
  box-shadow: 0px 4px 20px rgba(112, 144, 176, 0.15);
  border-radius: 8px;
`;

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
