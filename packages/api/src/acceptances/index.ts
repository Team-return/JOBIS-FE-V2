import { useMutation, useQuery } from "@tanstack/react-query";
import type {
  AcceptanceDetailResponse,
  UpdateFieldTrainRequest,
  UpdateContractDateRequest,
  CreateEmploymentRequest,
  DeleteAcceptanceRequest
} from "./types";
import { instance } from "@/instance";

const DOMAIN = "/acceptances";

export const useAcceptanceDetail = (companyId: number) => {
  return useQuery({
    queryKey: ["acceptance-detail", companyId],
    queryFn: async () => {
      const { data } = await instance.get<AcceptanceDetailResponse>(
        `${DOMAIN}/${companyId}`
      );
      return data;
    }
  });
};

export const useUpdateFieldTrain = () => {
  return useMutation({
    mutationFn: async (request: UpdateFieldTrainRequest) => {
      await instance.patch(`${DOMAIN}/field-train`, request);
    }
  });
};

export const useUpdateContractDate = () => {
  return useMutation({
    mutationFn: async (request: UpdateContractDateRequest) => {
      await instance.patch(`${DOMAIN}/contract-date`, request);
    }
  });
};

export const useCreateEmployment = () => {
  return useMutation({
    mutationFn: async (request: CreateEmploymentRequest) => {
      await instance.post(`${DOMAIN}/employment`, request);
    }
  });
};

export const useDeleteAcceptance = () => {
  return useMutation({
    mutationFn: async (request: DeleteAcceptanceRequest) => {
      await instance.delete(DOMAIN, { data: request });
    }
  });
};
