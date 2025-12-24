import { css } from "@emotion/react";
import styled from "@emotion/styled";
import { useTheme } from "@/hooks";
import { Props } from "./Header.types";
import { Icon, Text } from "@/components";
import { HeaderStudent } from "./HeaderStudent";
import { Outlet, useNavigate, useLocation } from "react-router-dom";

export const Component = styled.div`
  padding: 21px 0;
  display: flex;
  align-items: center;
  justify-content: space-around;
`;

export const MenuContainer = styled.div<Pick<Props, "type">>`
  display: flex;
  gap: ${({ type }) =>
    type === "admin" ? "34px" : type === "student" ? "40px" : "48px"};
`;

export const TextContainer = styled.div<{ $active?: boolean }>`
  > span {
    cursor: pointer;
    ${({ $active, theme }) =>
      $active &&
      css`
        color: ${theme.color.grayScale[90]};
        font-weight: ${theme.fontWeight.bold};
        font-size: ${theme.font.body2.fontSize};
      `}
    &:hover {
      color: ${({ theme }) => theme.color.grayScale[90]};
      font-weight: ${({ theme }) => theme.fontWeight.bold};
      font-size: ${({ theme }) => theme.font.body2.fontSize};
    }
  }
`;

export const LogoContainer = styled.div`
  cursor: pointer;
`;

export const Header = (props: Props) => {
  const { type } = props;
  const { currentTheme } = useTheme();
  const navigate = useNavigate();
  const location = useLocation();

  const companyMenu = [
    { label: "모집의뢰서", path: "/" },
    { label: "지원자", path: "/application" },
    { label: "내 기업정보", path: "/company/detail" }
  ];

  const adminMenu = [
    { label: "모집의뢰서", path: "/" },
    { label: "기업", path: "/company" },
    { label: "학생", path: "/student" },
    { label: "학생 후기", path: "/review" },
    { label: "지원서", path: "/application" },
    { label: "공지", path: "/notice" },
    { label: "배너", path: "/banner" }
  ];

  return type === "admin" ? (
    <>
      <Component>
        <LogoContainer onClick={() => navigate("/")}>
          <Icon icon="LogoWithText" width={90} height={26} />
        </LogoContainer>
        <MenuContainer type={type}>
          {adminMenu.map(item => {
            const isActive = location.pathname.startsWith(item.path);
            const textColor = isActive
              ? currentTheme.color.grayScale[90]
              : currentTheme.color.grayScale[80];

            return (
              <TextContainer
                key={item.label}
                $active={isActive}
                onClick={() => navigate(item.path)}
              >
                <Text $span $size="body2" $color={textColor}>
                  {item.label}
                </Text>
              </TextContainer>
            );
          })}
        </MenuContainer>
      </Component>
      <Outlet />
    </>
  ) : type === "student" ? (
    <>
      <HeaderStudent
        userName={props.userName}
        notifications={props.notifications}
      />
      <Outlet />
    </>
  ) : type === "company" ? (
    <>
      <Component>
        <LogoContainer onClick={() => navigate("/")}>
          <Icon icon="LogoWithText" width={90} height={26} />
        </LogoContainer>
        <MenuContainer type={type}>
          {companyMenu.map(item => {
            const isActive = location.pathname.startsWith(item.path);
            const textColor = isActive
              ? currentTheme.color.grayScale[90]
              : currentTheme.color.grayScale[80];

            return (
              <TextContainer
                key={item.label}
                $active={isActive}
                onClick={() => navigate(item.path)}
              >
                <Text $span $size="body2" $color={textColor}>
                  {item.label}
                </Text>
              </TextContainer>
            );
          })}
        </MenuContainer>
      </Component>
      <Outlet />
    </>
  ) : null;
};
