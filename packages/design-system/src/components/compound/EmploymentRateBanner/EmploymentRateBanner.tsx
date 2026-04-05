import type { Props } from "./EmploymentRateBanner.type";
import { Icon } from "../../core/Icon";

export const EmploymentRateBanner = ({ onClick }: Props) => {
  return (
    <>
      {/* 배경 사진이 깨지는 관계로 전체 프레임으로 사진으로 대체 */}
      <Icon
        icon="EmploymentRateBanner"
        onClick={onClick}
        width={960}
        height={143}
        fillColor="#4f95d5"
        style={{ cursor: "pointer" }}
      />
    </>
  );
};
