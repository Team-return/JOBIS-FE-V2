import styled from "@emotion/styled";
import { useTheme } from "@/hooks";
import { Props } from "./Header.types";
import { Icon, Text } from "@/components";
import { HeaderStudent } from "../HeaderStudent";

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
  const companyMenu = ["모집의뢰서", "지원자", "내 기업정보"];
  const adminMenu = [
    "모집의뢰서",
    "기업",
    "학생",
    "학생 후기",
    "지원서",
    "공지",
    "배너"
  ];
  return (
    <>
      {types === "admin" ? (
        <Component>
          <LogoContainer onClick={onClickLogo}>
            <Icon icon="LogoWithText" width={90} height={26} />
          </LogoContainer>
          <MenuContainer types={types}>
            {adminMenu.map((item, idx) => (
              <TextContainer key={item + idx}>
                <Text
                  $span
                  $size="body2"
                  $color={currentTheme.color.grayScale[80]}
                >
                  {item}
                </Text>
              </TextContainer>
            ))}
          </MenuContainer>
        </Component>
      ) : types === "student" ? (
        <HeaderStudent
          userName={props.userName}
          onClickProfile={props.onClickProfile}
          alarm={props.alarm}
        />
      ) : types === "company" ? (
        <Component>
          <LogoContainer onClick={onClickLogo}>
            <Icon icon="LogoWithText" width={90} height={26} />
          </LogoContainer>
          <MenuContainer types={types}>
            {companyMenu.map((item, idx) => (
              <TextContainer key={item + idx}>
                <Text
                  $span
                  $size="body2"
                  $color={currentTheme.color.grayScale[80]}
                >
                  {item}
                </Text>
              </TextContainer>
            ))}
          </MenuContainer>
        </Component>
      ) : null}
    </>
  );
};
