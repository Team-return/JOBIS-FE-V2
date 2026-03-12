import { useQuery } from "@tanstack/react-query";
import type {
  CreateRecruitmentRequest,
  StudentRecruitmentListResponse,
  StudentRecruitmentListQueryParams,
  UpdateRecruitmentRequest,
  StudentRecruitmentCountResponse,
  RecruitmentCountQueryParams,
  RecruitmentDetailResponse,
  UpdateRecruitmentAreaRequest,
  CreateRecruitmentAreaRequest,
  TeacherRecruitmentListResponse,
  TeacherRecruitmentListQueryParams,
  TeacherRecruitmentNoPageQueryParams,
  UpdateRecruitmentStatusRequest,
  MyRecruitmentsResponse,
  MyRecentRecruitmentResponse,
  RecruitmentFileResponse,
  RecruitmentCountResponse,
  RecruitmentExistsResponse,
  TeacherManualRecruitmentListResponse,
  TeacherRecruitmentCountQueryParams,
  TeacherRecruitmentCountResponse
} from "./types";
import { createDomainApi } from "@/create-hook";
import { instance } from "@/instance";
import { recruitmentsKeys } from "./keys";

const DOMAIN = "/recruitments";
const { createQueryHook, createMutationHook, createIdMutationHook } =
  createDomainApi(DOMAIN);

export { recruitmentsKeys };

export const useRecruitmentList = createQueryHook<
  StudentRecruitmentListQueryParams,
  StudentRecruitmentListResponse
>({
  path: "/student",
  queryKey: recruitmentsKeys.recruitmentList
});

export const useStudentRecruitmentCount = createQueryHook<
  Omit<StudentRecruitmentListQueryParams, "page">,
  StudentRecruitmentCountResponse
>({
  path: "/student/count",
  queryKey: recruitmentsKeys.studentRecruitmentCount
});

export const useRecruitmentCount = createQueryHook<
  RecruitmentCountQueryParams,
  RecruitmentCountResponse
>({
  path: "/count",
  queryKey: recruitmentsKeys.recruitmentCount
});

export const useRecruitmentDetail = createQueryHook<
  number,
  RecruitmentDetailResponse
>({
  path: recruitmentId => `/${recruitmentId}`,
  queryKey: recruitmentsKeys.recruitmentDetail
});

export const useTeacherRecruitmentList = createQueryHook<
  TeacherRecruitmentListQueryParams,
  TeacherRecruitmentListResponse
>({
  path: "/teacher",
  queryKey: recruitmentsKeys.teacherRecruitmentList
});

export const useTeacherRecruitmentCount = createQueryHook<
  TeacherRecruitmentCountQueryParams,
  TeacherRecruitmentCountResponse
>({
  path: "/teacher/count",
  queryKey: recruitmentsKeys.teacherRecruitmentCount
});

export const useTeacherRecruitmentListNoPage = createQueryHook<
  TeacherRecruitmentNoPageQueryParams,
  TeacherRecruitmentListResponse
>({
  path: "/teacher/no-page",
  queryKey: recruitmentsKeys.teacherRecruitmentListNoPage
});

export const useMyRecruitments = createQueryHook<void, MyRecruitmentsResponse>({
  path: "/my",
  queryKey: recruitmentsKeys.myRecruitments
});

export const useMyRecentRecruitment = createQueryHook<
  void,
  MyRecentRecruitmentResponse
>({
  path: "/my/recent",
  queryKey: recruitmentsKeys.myRecentRecruitment
});

export const useRecruitmentExists = createQueryHook<
  void,
  RecruitmentExistsResponse
>({
  path: "/exists",
  queryKey: recruitmentsKeys.recruitmentExists
});

export const useTeacherManualRecruitmentList = createQueryHook<
  void,
  TeacherManualRecruitmentListResponse
>({
  path: "/teacher/manual",
  queryKey: recruitmentsKeys.teacherManualRecruitmentList
});

export const useRecruitmentFileDownload = (
  options?: Parameters<
    typeof useQuery<void, RecruitmentFileResponse, number, readonly unknown[]>
  >[1]
) => {
  return useQuery({
    queryKey: recruitmentsKeys.recruitmentFileDownload(),
    queryFn: async () => {
      const { data } = await instance.get<RecruitmentFileResponse>(
        `${DOMAIN}/file`,
        {
          responseType: "blob"
        }
      );
      return data;
    },
    ...options
  });
};

export const useCreateRecruitment = createMutationHook<
  CreateRecruitmentRequest,
  void
>({
  path: "/",
  method: "post"
});

export const useUpdateRecruitment = (id: number) =>
  createMutationHook<UpdateRecruitmentRequest, void>({
    path: `/${id}`,
    method: "patch"
  });

export const useDeleteRecruitment = createIdMutationHook<void, void>({
  path: "/",
  method: "delete"
});

export const useUpdateRecruitmentArea = (recruitAreaId: number) =>
  createMutationHook<UpdateRecruitmentAreaRequest, void>({
    path: `/area/${recruitAreaId}`,
    method: "patch"
  });

export const useCreateRecruitmentArea = (recruitmentId: number) =>
  createMutationHook<CreateRecruitmentAreaRequest, void>({
    path: `/${recruitmentId}/area`,
    method: "post"
  });

export const useDeleteRecruitmentArea = createIdMutationHook<void, void>({
  path: "/area",
  method: "delete"
});

export const useUpdateRecruitmentStatus = createMutationHook<
  UpdateRecruitmentStatusRequest,
  void
>({
  path: "/status",
  method: "patch"
});
