import { useMutation, useQuery } from "@tanstack/react-query";
import type {
  AcceptanceDetailResponse,
  UpdateFieldTrainRequest,
  UpdateContractDateRequest,
  CreateEmploymentRequest,
  DeleteAcceptanceRequest
} from "./types";
import type { QueryOptions, MutationOptions } from "@/QueryProvider";
import { instance } from "@/instance";

const DOMAIN = "/acceptances";

export const useAcceptanceDetail = (
  companyId: number,
  options: QueryOptions<AcceptanceDetailResponse>
) => {
  return useQuery({
    queryKey: ["acceptance-detail", companyId],
    queryFn: async () => {
      const { data } = await instance.get<AcceptanceDetailResponse>(
        `${DOMAIN}/${companyId}`
      );
      return data;
    },
    ...options
  });
};

export const useUpdateFieldTrain = (
  options: MutationOptions<UpdateFieldTrainRequest>
) => {
  return useMutation({
    mutationFn: async (request: UpdateFieldTrainRequest) => {
      await instance.patch(`${DOMAIN}/field-train`, request);
    },
    ...options
  });
};

export const useUpdateContractDate = (
  options: MutationOptions<UpdateContractDateRequest>
) => {
  return useMutation({
    mutationFn: async (request: UpdateContractDateRequest) => {
      await instance.patch(`${DOMAIN}/contract-date`, request);
    },
    ...options
  });
};

export const useCreateEmployment = (
  options: MutationOptions<CreateEmploymentRequest>
) => {
  return useMutation({
    mutationFn: async (request: CreateEmploymentRequest) => {
      await instance.post(`${DOMAIN}/employment`, request);
    },
    ...options
  });
};

export const useDeleteAcceptance = (
  options: MutationOptions<DeleteAcceptanceRequest>
) => {
  return useMutation({
    mutationFn: async (request: DeleteAcceptanceRequest) => {
      await instance.delete(DOMAIN, { data: request });
    },
    ...options
  });
};
