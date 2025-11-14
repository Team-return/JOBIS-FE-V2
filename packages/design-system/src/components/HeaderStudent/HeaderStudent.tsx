import styled from "@emotion/styled";
import { useTheme } from "@/hooks";
import {
  Component,
  Icon,
  MenuContainer,
  Text,
  TextContainer,
  NotificationItem
} from "@/components";
import { useState } from "react";
import type { Props as HeaderProps } from "../Header/Header.types";
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
  overflow-y: auto;

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

export const HeaderStudent = ({ onClickProfile, userName, alarm }: Props) => {
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

  // 임시 알림 데이터 (추후 API 연동 가능)
  const notifications = [
    {
      title: "지원 현황",
      content: "{REQUESTED} 상태로 변경되었습니다.",
      date: new Date().toISOString()
    },
    {
      title: "모집 공고",
      content: "새로운 {APPROVED} 공고가 올라왔습니다.",
      date: new Date(Date.now() - 86400000).toISOString()
    },
    {
      title: "지원 현황",
      content: "{REQUESTED} 상태로 변경되었습니다.",
      date: new Date().toISOString()
    },
    {
      title: "모집 공고",
      content: "새로운 {APPROVED} 공고가 올라왔습니다.",
      date: new Date(Date.now() - 86400000).toISOString()
    }
  ];

  return (
    <Component>
      <Icon icon="LogoWithText" width={90} height={26} />
      <MenuContainer types="student">
        {studentMenu.map((item, idx) => (
          <TextContainer key={item + idx}>
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
            // 열리는 순간 알림을 사용자에게 보여주므로 빨간 점 제거
            if (next) setHasUnread(false);
          }}
        >
          <Text $span $size="body2" $color={currentTheme.color.grayScale[80]}>
            {userName}
          </Text>
          <Icon icon="ChevronDown" size={18} />
          {hasUnread && <AlarmDot aria-label="alarm-indicator" />}
        </HeaderContainer>
        {isAlarm && (
          <AlarmContainer>
            {notifications.map(n => (
              <NotificationItem
                key={n.title + n.date}
                title={n.title}
                content={n.content}
                date={n.date}
              />
            ))}
            {notifications.length === 0 && (
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
