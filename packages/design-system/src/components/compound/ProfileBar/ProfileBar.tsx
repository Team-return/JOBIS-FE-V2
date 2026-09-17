import styled from "@emotion/styled";
import { Flex, Stack, Text, Icon, Image } from "@/components";
import type { Props } from "./ProfileBar.types";
import { useTheme } from "@/hooks";
import { useState } from "react";

const Component = styled.div`
  position: relative;
  width: 668px;
  height: 84px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  box-sizing: border-box;
`;

const Menu = styled.div`
  position: absolute;
  top: 70px;
  right: 0;
  padding: 16px 0;
  width: 120px;
  box-shadow: 0px 4px 20px 0px rgba(112, 144, 176, 0.12);
  border: 1px solid ${({ theme }) => theme.color.grayScale[30]};
  border-radius: 8px;
  background-color: ${({ theme }) => theme.color.grayScale[10]};
  display: flex;
  flex-direction: column;
  gap: 16px;
  align-items: center;
  z-index: 10;
`;

const ClickArea = styled.span`
  cursor: pointer;

  &:hover p {
    color: ${({ theme }) => theme.color.grayScale[80]};
  }
`;

const Avatar = styled.div`
  width: 84px;
  height: 84px;
  border-radius: 50%;
  overflow: hidden;
  flex-shrink: 0;
  background-color: ${({ theme }) => theme.color.grayScale[10]};
  box-shadow: 0px 4.8px 24px 0px rgba(112, 144, 176, 0.15);
`;

const StudentBadge = styled.div`
  display: inline-flex;
  align-items: center;
  padding: 2px 10px;
  border-radius: 12px;
  border: 1px solid ${({ theme }) => theme.color.subColor.green[20]};
`;

export const ProfileBar = ({
  name,
  studentNumber,
  department,
  profileImageUrl,
  menuItems
}: Props) => {
  const { currentTheme: theme } = useTheme();
  const [showMenu, setShowMenu] = useState(false);

  return (
    <Component>
      <Flex $direction="row" $align="center" $gap={15}>
        <Avatar>
          {profileImageUrl ? (
            <Image src={profileImageUrl} alt={name} width={84} height={84} />
          ) : (
            <Icon icon="HeaderProfile" size={84} />
          )}
        </Avatar>
        <Stack $gap={4}>
          <Flex $direction="row" $align="center" $gap={8}>
            <Text
              $size="h5"
              $color={theme.color.grayScale[90]}
              $weight="regular"
            >
              {name}
            </Text>
            <StudentBadge>
              <Text $size="caption" $color={theme.color.subColor.green[20]}>
                {studentNumber}
              </Text>
            </StudentBadge>
          </Flex>
          <Text $size="body3" $color={theme.color.grayScale[60]}>
            {department}
          </Text>
        </Stack>
      </Flex>
      {menuItems && menuItems.length > 0 && (
        <Icon
          icon="KebapMenu"
          size={24}
          onClick={() => setShowMenu(prev => !prev)}
          style={{ cursor: "pointer" }}
        />
      )}
      {showMenu && menuItems && (
        <Menu role="menu">
          {menuItems.map(({ label, onClick }) => (
            <ClickArea
              key={label}
              onClick={() => {
                setShowMenu(false);
                onClick();
              }}
            >
              <Text $size="caption" $color={theme.color.grayScale[60]}>
                {label}
              </Text>
            </ClickArea>
          ))}
        </Menu>
      )}
    </Component>
  );
};
