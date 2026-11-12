import type {
  StudentRecruitmentListQueryParams,
  RecruitmentCountQueryParams,
  TeacherRecruitmentListQueryParams,
  TeacherRecruitmentNoPageQueryParams,
  TeacherRecruitmentCountQueryParams
} from "./types";

export const recruitmentsKeys = {
  recruitmentList: (params?: StudentRecruitmentListQueryParams) => [
    "recruitment-list",
    params
  ],
  studentRecruitmentCount: (
    params?: Omit<StudentRecruitmentListQueryParams, "page">
  ) => ["student-recruitment-count", params],
  recruitmentCount: (params?: RecruitmentCountQueryParams) => [
    "recruitment-count",
    params
  ],
  recruitmentDetail: (recruitmentId: number) => [
    "recruitment-detail",
    recruitmentId
  ],
  // 지원 여부는 모든 공고의 지원 가능 여부에 영향을 줘서 상세 전체를 무효화할 때 쓴다
  recruitmentDetails: () => ["recruitment-detail"],
  teacherRecruitmentList: (params?: TeacherRecruitmentListQueryParams) => [
    "teacher-recruitment-list",
    params
  ],
  teacherRecruitmentCount: (params?: TeacherRecruitmentCountQueryParams) => [
    "teacher-recruitment-count",
    params
  ],
  teacherRecruitmentListNoPage: (
    params?: TeacherRecruitmentNoPageQueryParams
  ) => ["teacher-recruitment-list-no-page", params],
  myRecruitments: () => ["my-recruitments"],
  myRecentRecruitment: () => ["my-recent-recruitment"],
  recruitmentFileDownload: () => ["recruitment-file"],
  recruitmentExists: () => ["recruitment-exists"],
  teacherManualRecruitmentList: () => ["teacher-manual-recruitment-list"]
} as const;
