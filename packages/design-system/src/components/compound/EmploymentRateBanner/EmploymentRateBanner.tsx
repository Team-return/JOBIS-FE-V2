import EmploymentRateBannerIcon from "../../../../assets/icons/employmentBanner.svg";
import { Image } from "../../primitive/Image";
import type { Props } from "./EmploymentRateBanner.type";

export const EmploymentRateBanner = ({ onClick }: Props) => {
  return (
    <div onClick={onClick}>
      {/* 배경 사진이 깨지는 관계로 전체 프레임으로 사진으로 대체 */}
      <Image src={EmploymentRateBannerIcon} alt="배너 배경 이미지" />
    </div>
  );
};

export default EmploymentRateBanner;
