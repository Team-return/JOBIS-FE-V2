export const bannersKeys = {
  bannerList: () => ["banner-list"],
  teacherBannerList: (isOpened?: boolean) => ["teacher-banner-list", isOpened]
} as const;
