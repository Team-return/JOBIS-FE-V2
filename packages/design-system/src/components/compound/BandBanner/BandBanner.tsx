import { default as BandBannerIcon } from "../../../../assets/icons/BandBanner.svg";
import { Image } from "../../primitive/Image";

export const BandBanner = () => {
  return (
    <>
      {/* 배경 사진이 깨지는 관계로 전체 프레임으로 사진으로 대체 */}
      <Image src={BandBannerIcon} alt="배너 배경 이미지" />
    </>
  );
};

export default BandBanner;
