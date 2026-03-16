import type {
  AcceptanceDetailResponse,
  UpdateFieldTrainRequest,
  UpdateContractDateRequest,
  CreateEmploymentRequest,
  DeleteAcceptanceRequest
} from "./types";
import { createDomainApi } from "@/create-hook";
import { acceptancesKeys } from "./keys";

const DOMAIN = "/acceptances";
const { createQueryHook, createMutationHook } = createDomainApi(DOMAIN);

export { acceptancesKeys };

export const useAcceptanceDetail = createQueryHook<
  number,
  AcceptanceDetailResponse
>({
  path: companyId => `/${companyId}`,
  queryKey: acceptancesKeys.acceptanceDetail
});

export const useUpdateFieldTrain = createMutationHook<
  UpdateFieldTrainRequest,
  void
>({
  path: "/field-train",
  method: "patch"
});

export const useUpdateContractDate = createMutationHook<
  UpdateContractDateRequest,
  void
>({
  path: "/contract-date",
  method: "patch"
});

export const useCreateEmployment = createMutationHook<
  CreateEmploymentRequest,
  void
>({
  path: "/employment",
  method: "post"
});

export const useDeleteAcceptance = createMutationHook<
  DeleteAcceptanceRequest,
  void
>({
  path: "/",
  method: "delete"
});
