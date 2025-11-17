import styled from "@emotion/styled";
import type { Props } from "./CompanyTypeClip.types";

const Component = styled.div<Props>`
  width: 69px;
  height: 24px;
  line-height: 24px;
  border-radius: 12px;
  text-align: center;

  font-weight: ${({ theme }) => theme.fontWeight.regular};
  font-size: ${({ theme }) => theme.font.caption.fontSize};

  ${({ theme, $type }) => {
    const isLeader = $type === "leader";
    const color =
      theme.color.subColor[isLeader ? "blue" : "green"][isLeader ? 30 : 20];
    const backgroundColor =
      theme.color.subColor[isLeader ? "blue" : "green"][isLeader ? 20 : 10];

    return `
      color: ${color};
      background-color: ${backgroundColor};
      border: 1px solid ${color};
    `;
  }}
`;

export const CompanyTypeClip = ({ $type }: Props) => {
  return (
    <Component $type={$type}>
      {$type === "participation" ? "참여기업" : "선도기업"}
    </Component>
  );
};
