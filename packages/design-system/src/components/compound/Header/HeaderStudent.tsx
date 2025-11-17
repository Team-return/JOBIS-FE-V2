import styled from "@emotion/styled";
import { useTheme } from "@/hooks";
import {
  Component,
  Icon,
  MenuContainer,
  Text,
  TextContainer,
  NotificationItem,
  LogoContainer
} from "@/components";
import { useState } from "react";
import type { Props as HeaderProps } from "./Header.types";
type StudentProps = Extract<HeaderProps, { types: "student" }>;

type Props = Omit<StudentProps, "types">;

const HeaderContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  cursor: pointer;
  position: relative;
`;

const AlarmDot = styled.div`
  position: absolute;
  top: 0px;
  right: -6px;
  width: 6px;
  height: 6px;
  border-radius: 50%;
  background-color: ${({ theme }) => theme.color.subColor.red[20]};
  pointer-events: none;
`;

const HeaderWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
  cursor: pointer;
  position: relative;
`;

const ChevronIcon = styled.div<{ $isOpen: boolean }>`
  display: flex;
  align-items: center;
  transition: transform 0.2s ease-in-out;
  transform: ${({ $isOpen }) => ($isOpen ? "rotate(180deg)" : "rotate(0deg)")};
`;

const AlarmContainer = styled.div`
  position: absolute;
  top: calc(100% + 8px);
  right: -50px;
  background-color: ${({ theme }) => theme.color.grayScale[10]};
  border-radius: 8px;
  padding: 12px 12px 16px 12px;
  display: flex;
  flex-direction: column;
  gap: 16px;
  z-index: 100;
  max-height: 290px;
  min-width: 300px;
  overflow-y: auto;
  box-shadow: 0px 4px 20px rgba(112, 144, 176, 0.12);

  &::-webkit-scrollbar {
    width: 4px;
    height: 60px;
  }
  &::-webkit-scrollbar-track {
    background: ${({ theme }) => theme.color.grayScale[20]};
    border-radius: 10px;
  }
  &::-webkit-scrollbar-thumb {
    background: ${({ theme }) => theme.color.grayScale[40]};
    border-radius: 10px;
  }
  &::-webkit-scrollbar-thumb:hover {
    background: ${({ theme }) => theme.color.grayScale[50]};
  }
`;

export const HeaderStudent = ({
  onClickProfile,
  userName,
  alarm,
  onClickLogo,
  notifications
}: Props) => {
  const { currentTheme } = useTheme();
  const [isAlarm, setIsAlarm] = useState(false);
  const [hasUnread, setHasUnread] = useState(alarm);

  const studentMenu = [
    "기업체",
    "모집의뢰서",
    "공지사항",
    "후기",
    "마이페이지"
  ];

  return (
    <Component>
      <LogoContainer onClick={onClickLogo}>
        <Icon icon="LogoWithText" width={90} height={26} />
      </LogoContainer>
      <MenuContainer types="student">
        {studentMenu.map(item => (
          <TextContainer key={item}>
            <Text $span $size="body2" $color={currentTheme.color.grayScale[80]}>
              {item}
            </Text>
          </TextContainer>
        ))}
      </MenuContainer>
      <HeaderWrapper>
        <Icon icon="HeaderProfile" onClick={onClickProfile} />
        <HeaderContainer
          onClick={() => {
            const next = !isAlarm;
            setIsAlarm(next);
            if (next) setHasUnread(false);
          }}
        >
          <Text $span $size="body2" $color={currentTheme.color.grayScale[80]}>
            {userName}
          </Text>
          <ChevronIcon $isOpen={isAlarm}>
            <Icon icon="ChevronDown" size={18} />
          </ChevronIcon>
          {hasUnread && <AlarmDot aria-label="alarm-indicator" />}
        </HeaderContainer>
        {isAlarm && (
          <AlarmContainer>
            {notifications && notifications.length > 0 ? (
              notifications.map(n => (
                <NotificationItem
                  key={n.notification_id}
                  title={n.title}
                  content={n.content}
                  date={n.created_at}
                />
              ))
            ) : (
              <Text $size="body3" $color={currentTheme.color.grayScale[60]}>
                알림이 없습니다.
              </Text>
            )}
          </AlarmContainer>
        )}
      </HeaderWrapper>
    </Component>
  );
};
