import styled from "@emotion/styled";
import { useTheme } from "@/hooks";
import { Props } from "./Header.types";
import { Icon, Text } from "@/components";
import { HeaderStudent } from "./HeaderStudent";
import { Outlet, useNavigate } from "react-router-dom";

export const Component = styled.div`
  padding: 21px 0;
  display: flex;
  align-items: center;
  justify-content: space-around;
`;

export const MenuContainer = styled.div<Pick<Props, "types">>`
  display: flex;
  gap: ${({ types }) =>
    types === "admin" ? "34px" : types === "student" ? "40px" : "48px"};
`;

export const TextContainer = styled.div`
  > span {
    cursor: pointer;
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
  const { types, onClickLogo } = props;
  const { currentTheme } = useTheme();
  const navigate = useNavigate();

  const companyMenu = [
    { label: "모집의뢰서", path: "/recruitment" },
    { label: "지원자", path: "/application" },
    { label: "내 기업정보", path: "/company/detail" }
  ];

  const adminMenu = [
    { label: "모집의뢰서", path: "/recruitment" },
    { label: "기업", path: "/company" },
    { label: "학생", path: "/student" },
    { label: "학생 후기", path: "/review" },
    { label: "지원서", path: "/application" },
    { label: "공지", path: "/notice" },
    { label: "배너", path: "/banner" }
  ];

  const handleMenuClick = (path: string) => {
    navigate(path);
  };

  return types === "admin" ? (
    <>
      <Component>
        <LogoContainer onClick={onClickLogo}>
          <Icon icon="LogoWithText" width={90} height={26} />
        </LogoContainer>
        <MenuContainer types={types}>
          {adminMenu.map(item => (
            <TextContainer
              key={item.label}
              onClick={() => handleMenuClick(item.path)}
            >
              <Text
                $span
                $size="body2"
                $color={currentTheme.color.grayScale[80]}
              >
                {item.label}
              </Text>
            </TextContainer>
          ))}
        </MenuContainer>
      </Component>
      <Outlet />
    </>
  ) : types === "student" ? (
    <>
      <HeaderStudent
        userName={props.userName}
        onClickProfile={props.onClickProfile}
        alarm={props.alarm}
        notifications={props.notifications}
        onClickLogo={onClickLogo}
      />
      <Outlet />
    </>
  ) : types === "company" ? (
    <>
      <Component>
        <LogoContainer onClick={onClickLogo}>
          <Icon icon="LogoWithText" width={90} height={26} />
        </LogoContainer>
        <MenuContainer types={types}>
          {companyMenu.map(item => (
            <TextContainer
              key={item.label}
              onClick={() => handleMenuClick(item.path)}
            >
              <Text
                $span
                $size="body2"
                $color={currentTheme.color.grayScale[80]}
              >
                {item.label}
              </Text>
            </TextContainer>
          ))}
        </MenuContainer>
      </Component>
      <Outlet />
    </>
  ) : null;
};
