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
import {
  createQueryHook,
  createMutationHook,
  createIdMutationHook
} from "@/create-hook";
import { instance } from "@/instance";
import { recruitmentsKeys } from "./keys";

const DOMAIN = "/recruitments";

export { recruitmentsKeys };

export const useRecruitmentList = createQueryHook<
  StudentRecruitmentListQueryParams,
  StudentRecruitmentListResponse
>({
  domain: `${DOMAIN}/student`,
  queryKey: recruitmentsKeys.recruitmentList
});

export const useStudentRecruitmentCount = createQueryHook<
  Omit<StudentRecruitmentListQueryParams, "page">,
  StudentRecruitmentCountResponse
>({
  domain: `${DOMAIN}/student/count`,
  queryKey: recruitmentsKeys.studentRecruitmentCount
});

export const useRecruitmentCount = createQueryHook<
  RecruitmentCountQueryParams,
  RecruitmentCountResponse
>({
  domain: `${DOMAIN}/count`,
  queryKey: recruitmentsKeys.recruitmentCount
});

export const useRecruitmentDetail = createQueryHook<
  number,
  RecruitmentDetailResponse
>({
  domain: recruitmentId => `${DOMAIN}/${recruitmentId}`,
  queryKey: recruitmentsKeys.recruitmentDetail
});

export const useTeacherRecruitmentList = createQueryHook<
  TeacherRecruitmentListQueryParams,
  TeacherRecruitmentListResponse
>({
  domain: `${DOMAIN}/teacher`,
  queryKey: recruitmentsKeys.teacherRecruitmentList
});

export const useTeacherRecruitmentCount = createQueryHook<
  TeacherRecruitmentCountQueryParams,
  TeacherRecruitmentCountResponse
>({
  domain: `${DOMAIN}/teacher/count`,
  queryKey: recruitmentsKeys.teacherRecruitmentCount
});

export const useTeacherRecruitmentListNoPage = createQueryHook<
  TeacherRecruitmentNoPageQueryParams,
  TeacherRecruitmentListResponse
>({
  domain: `${DOMAIN}/teacher/no-page`,
  queryKey: recruitmentsKeys.teacherRecruitmentListNoPage
});

export const useMyRecruitments = createQueryHook<void, MyRecruitmentsResponse>({
  domain: `${DOMAIN}/my`,
  queryKey: recruitmentsKeys.myRecruitments
});

export const useMyRecentRecruitment = createQueryHook<
  void,
  MyRecentRecruitmentResponse
>({
  domain: `${DOMAIN}/my/recent`,
  queryKey: recruitmentsKeys.myRecentRecruitment
});

export const useRecruitmentExists = createQueryHook<
  void,
  RecruitmentExistsResponse
>({
  domain: `${DOMAIN}/exists`,
  queryKey: recruitmentsKeys.recruitmentExists
});

export const useTeacherManualRecruitmentList = createQueryHook<
  void,
  TeacherManualRecruitmentListResponse
>({
  domain: `${DOMAIN}/teacher/manual`,
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
  domain: DOMAIN,
  method: "post"
});

export const useUpdateRecruitment = (id: number) =>
  createMutationHook<UpdateRecruitmentRequest, void>({
    domain: `${DOMAIN}/${id}`,
    method: "patch"
  });

export const useDeleteRecruitment = createIdMutationHook<void, void>({
  domain: DOMAIN,
  method: "delete"
});

export const useUpdateRecruitmentArea = (recruitAreaId: number) =>
  createMutationHook<UpdateRecruitmentAreaRequest, void>({
    domain: `${DOMAIN}/area/${recruitAreaId}`,
    method: "patch"
  });

export const useCreateRecruitmentArea = (recruitmentId: number) =>
  createMutationHook<CreateRecruitmentAreaRequest, void>({
    domain: `${DOMAIN}/${recruitmentId}/area`,
    method: "post"
  });

export const useDeleteRecruitmentArea = createIdMutationHook<void, void>({
  domain: `${DOMAIN}/area`,
  method: "delete"
});

export const useUpdateRecruitmentStatus = createMutationHook<
  UpdateRecruitmentStatusRequest,
  void
>({
  domain: `${DOMAIN}/status`,
  method: "patch"
});
