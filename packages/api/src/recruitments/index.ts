import { useMutation, useQuery } from "@tanstack/react-query";
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
import type { QueryOptions, MutationOptions } from "@/QueryProvider";
import { instance } from "@/instance";

const DOMAIN = "/recruitments";

export const useCreateRecruitment = (
  options?: MutationOptions<CreateRecruitmentRequest>
) => {
  return useMutation({
    mutationFn: async request => {
      await instance.post(DOMAIN, request);
    },
    ...options
  });
};

export const useUpdateRecruitment = (
  id: number,
  options?: MutationOptions<UpdateRecruitmentRequest>
) => {
  return useMutation({
    mutationFn: async request => {
      await instance.patch(`${DOMAIN}/${id}`, request);
    },
    ...options
  });
};

export const useDeleteRecruitment = (
  options?: MutationOptions<{ recruitmentId: number }>
) => {
  return useMutation({
    mutationFn: async ({ recruitmentId }) => {
      await instance.delete(`${DOMAIN}/${recruitmentId}`);
    },
    ...options
  });
};

export const useUpdateRecruitmentArea = (
  recruitAreaId: number,
  options?: MutationOptions<UpdateRecruitmentAreaRequest>
) => {
  return useMutation({
    mutationFn: async request => {
      await instance.patch(`${DOMAIN}/area/${recruitAreaId}`, request);
    },
    ...options
  });
};

export const useCreateRecruitmentArea = (
  recruitmentId: number,
  options?: MutationOptions<CreateRecruitmentAreaRequest>
) => {
  return useMutation({
    mutationFn: async request => {
      await instance.post(`${DOMAIN}/${recruitmentId}/area`, request);
    },
    ...options
  });
};

export const useDeleteRecruitmentArea = (
  options?: MutationOptions<{ recruitAreaId: number }>
) => {
  return useMutation({
    mutationFn: async ({ recruitAreaId }) => {
      await instance.delete(`${DOMAIN}/area/${recruitAreaId}`);
    },
    ...options
  });
};

export const useUpdateRecruitmentStatus = (
  options?: MutationOptions<UpdateRecruitmentStatusRequest>
) => {
  return useMutation({
    mutationFn: async request => {
      await instance.patch(`${DOMAIN}/status`, request);
    },
    ...options
  });
};

export const useRecruitmentList = (
  params?: StudentRecruitmentListQueryParams,
  options?: QueryOptions<StudentRecruitmentListResponse>
) => {
  return useQuery({
    queryKey: ["recruitment-list", params],
    queryFn: async () => {
      const { data } = await instance.get<StudentRecruitmentListResponse>(
        `${DOMAIN}/student`,
        { params }
      );
      return data;
    },
    ...options
  });
};

export const useStudentRecruitmentCount = (
  params?: Omit<StudentRecruitmentListQueryParams, "page">,
  options?: QueryOptions<StudentRecruitmentCountResponse>
) => {
  return useQuery({
    queryKey: ["student-recruitment-count", params],
    queryFn: async () => {
      const { data } = await instance.get<StudentRecruitmentCountResponse>(
        `${DOMAIN}/student/count`,
        { params }
      );
      return data;
    },
    ...options
  });
};

export const useRecruitmentCount = (
  params?: RecruitmentCountQueryParams,
  options?: QueryOptions<RecruitmentCountResponse>
) => {
  return useQuery({
    queryKey: ["recruitment-count", params],
    queryFn: async () => {
      const { data } = await instance.get<RecruitmentCountResponse>(
        `${DOMAIN}/count`,
        {
          params
        }
      );
      return data;
    },
    ...options
  });
};

export const useRecruitmentDetail = (
  recruitmentId: number,
  options?: QueryOptions<RecruitmentDetailResponse>
) => {
  return useQuery({
    queryKey: ["recruitment-detail", recruitmentId],
    queryFn: async () => {
      const { data } = await instance.get<RecruitmentDetailResponse>(
        `${DOMAIN}/${recruitmentId}`
      );
      return data;
    },
    ...options
  });
};

export const useTeacherRecruitmentList = (
  params?: TeacherRecruitmentListQueryParams,
  options?: QueryOptions<TeacherRecruitmentListResponse>
) => {
  return useQuery({
    queryKey: ["teacher-recruitment-list", params],
    queryFn: async () => {
      const { data } = await instance.get<TeacherRecruitmentListResponse>(
        `${DOMAIN}/teacher`,
        { params }
      );
      return data;
    },
    ...options
  });
};

export const useTeacherRecruitmentCount = (
  params?: TeacherRecruitmentCountQueryParams,
  options?: QueryOptions<TeacherRecruitmentCountResponse>
) => {
  return useQuery({
    queryKey: ["teacher-recruitment-count", params],
    queryFn: async () => {
      const { data } = await instance.get<TeacherRecruitmentCountResponse>(
        `${DOMAIN}/teacher/count`,
        { params }
      );
      return data;
    },
    ...options
  });
};

export const useTeacherRecruitmentListNoPage = (
  params?: TeacherRecruitmentNoPageQueryParams
) => {
  return useQuery({
    queryKey: ["teacher-recruitment-list-no-page", params],
    queryFn: async () => {
      const { data } = await instance.get<TeacherRecruitmentListResponse>(
        `${DOMAIN}/teacher/no-page`,
        { params }
      );
      return data;
    }
  });
};

export const useMyRecruitments = (
  options?: QueryOptions<MyRecruitmentsResponse>
) => {
  return useQuery({
    queryKey: ["my-recruitments"],
    queryFn: async () => {
      const { data } = await instance.get<MyRecruitmentsResponse>(
        `${DOMAIN}/my`
      );
      return data;
    },
    ...options
  });
};

export const useMyRecentRecruitment = (
  options?: QueryOptions<MyRecentRecruitmentResponse>
) => {
  return useQuery({
    queryKey: ["my-recent-recruitment"],
    queryFn: async () => {
      const { data } = await instance.get<MyRecentRecruitmentResponse>(
        `${DOMAIN}/my/recent`
      );
      return data;
    },
    ...options
  });
};

export const useRecruitmentFileDownload = (
  options?: QueryOptions<RecruitmentFileResponse>
) => {
  return useQuery({
    queryKey: ["recruitment-file"],
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

export const useRecruitmentExists = (
  options?: QueryOptions<RecruitmentExistsResponse>
) => {
  return useQuery({
    queryKey: ["recruitment-exists"],
    queryFn: async () => {
      const { data } = await instance.get<RecruitmentExistsResponse>(
        `${DOMAIN}/exists`
      );
      return data;
    },
    ...options
  });
};

export const useTeacherManualRecruitmentList = (
  options?: QueryOptions<TeacherManualRecruitmentListResponse>
) => {
  return useQuery({
    queryKey: ["teacher-manual-recruitment-list"],
    queryFn: async () => {
      const { data } = await instance.get<TeacherManualRecruitmentListResponse>(
        `${DOMAIN}/teacher/manual`
      );
      return data;
    },
    ...options
  });
};
