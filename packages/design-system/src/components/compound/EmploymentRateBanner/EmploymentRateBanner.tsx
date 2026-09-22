import styled from "@emotion/styled";
import type { Props } from "./EmploymentRateBanner.type";
import { Icon } from "../../core/Icon";

const Component = styled.button`
  display: block;
  padding: 0;
  border: none;
  background: transparent;
  cursor: pointer;
`;

export const EmploymentRateBanner = ({ onClick }: Props) => {
  return (
    // 배경 사진이 깨지는 관계로 전체 프레임으로 사진으로 대체
    <Component type="button" onClick={onClick} aria-label="취업률 배너">
      <Icon
        icon="EmploymentRateBanner"
        width={960}
        height={143}
        fillColor="#4f95d5"
      />
    </Component>
  );
};
