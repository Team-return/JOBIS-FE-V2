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
import { instance } from "@/instance";

const DOMAIN = "/recruitments";

export const useCreateRecruitment = (request: CreateRecruitmentRequest) => {
  return useMutation({
    mutationFn: async () => {
      await instance.post(DOMAIN, request);
    }
  });
};

export const useUpdateRecruitment = (
  id: number,
  request: UpdateRecruitmentRequest
) => {
  return useMutation({
    mutationFn: async () => {
      await instance.patch(`${DOMAIN}/${id}`, request);
    }
  });
};

export const useDeleteRecruitment = (recruitmentId: number) => {
  return useMutation({
    mutationFn: async () => {
      await instance.delete(`${DOMAIN}/${recruitmentId}`);
    }
  });
};

export const useUpdateRecruitmentArea = (
  recruitAreaId: number,
  request: UpdateRecruitmentAreaRequest
) => {
  return useMutation({
    mutationFn: async () => {
      await instance.patch(`${DOMAIN}/area/${recruitAreaId}`, request);
    }
  });
};

export const useCreateRecruitmentArea = (
  recruitmentId: number,
  request: CreateRecruitmentAreaRequest
) => {
  return useMutation({
    mutationFn: async () => {
      await instance.post(`${DOMAIN}/${recruitmentId}/area`, request);
    }
  });
};

export const useDeleteRecruitmentArea = (recruitAreaId: number) => {
  return useMutation({
    mutationFn: async () => {
      await instance.delete(`${DOMAIN}/area/${recruitAreaId}`);
    }
  });
};

export const useUpdateRecruitmentStatus = (
  request: UpdateRecruitmentStatusRequest
) => {
  return useMutation({
    mutationFn: async () => {
      await instance.patch(`${DOMAIN}/status`, request);
    }
  });
};

export const useRecruitmentList = (
  params?: StudentRecruitmentListQueryParams
) => {
  return useQuery({
    queryKey: ["recruitment-list", params],
    queryFn: async () => {
      const { data } = await instance.get<StudentRecruitmentListResponse>(
        `${DOMAIN}/student`,
        { params }
      );
      return data;
    }
  });
};

export const useStudentRecruitmentCount = (
  params?: Omit<StudentRecruitmentListQueryParams, "page">
) => {
  return useQuery({
    queryKey: ["student-recruitment-count", params],
    queryFn: async () => {
      const { data } = await instance.get<StudentRecruitmentCountResponse>(
        `${DOMAIN}/student/count`,
        { params }
      );
      return data;
    }
  });
};

export const useRecruitmentCount = (params?: RecruitmentCountQueryParams) => {
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
    }
  });
};

export const useRecruitmentDetail = (recruitmentId: number) => {
  return useQuery({
    queryKey: ["recruitment-detail", recruitmentId],
    queryFn: async () => {
      const { data } = await instance.get<RecruitmentDetailResponse>(
        `${DOMAIN}/${recruitmentId}`
      );
      return data;
    }
  });
};

export const useTeacherRecruitmentList = (
  params?: TeacherRecruitmentListQueryParams
) => {
  return useQuery({
    queryKey: ["teacher-recruitment-list", params],
    queryFn: async () => {
      const { data } = await instance.get<TeacherRecruitmentListResponse>(
        `${DOMAIN}/teacher`,
        { params }
      );
      return data;
    }
  });
};

export const useTeacherRecruitmentCount = (
  params?: TeacherRecruitmentCountQueryParams
) => {
  return useQuery({
    queryKey: ["teacher-recruitment-count", params],
    queryFn: async () => {
      const { data } = await instance.get<TeacherRecruitmentCountResponse>(
        `${DOMAIN}/teacher/count`,
        { params }
      );
      return data;
    }
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

export const useMyRecruitments = () => {
  return useQuery({
    queryKey: ["my-recruitments"],
    queryFn: async () => {
      const { data } = await instance.get<MyRecruitmentsResponse>(
        `${DOMAIN}/my`
      );
      return data;
    }
  });
};

export const useMyRecentRecruitment = () => {
  return useQuery({
    queryKey: ["my-recent-recruitment"],
    queryFn: async () => {
      const { data } = await instance.get<MyRecentRecruitmentResponse>(
        `${DOMAIN}/my/recent`
      );
      return data;
    }
  });
};

export const useRecruitmentFileDownload = () => {
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
    }
  });
};

export const useRecruitmentExists = () => {
  return useQuery({
    queryKey: ["recruitment-exists"],
    queryFn: async () => {
      const { data } = await instance.get<RecruitmentExistsResponse>(
        `${DOMAIN}/exists`
      );
      return data;
    }
  });
};

export const useTeacherManualRecruitmentList = () => {
  return useQuery({
    queryKey: ["teacher-manual-recruitment-list"],
    queryFn: async () => {
      const { data } = await instance.get<TeacherManualRecruitmentListResponse>(
        `${DOMAIN}/teacher/manual`
      );
      return data;
    }
  });
};
