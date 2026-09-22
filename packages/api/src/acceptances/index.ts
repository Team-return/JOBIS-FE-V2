import type {
  AcceptanceDetailResponse,
  UpdateFieldTrainRequest,
  UpdateContractDateRequest,
  CreateEmploymentRequest,
  CancelAcceptanceRequest
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

// DELETE지만 취업 데이터를 지우는 게 아니라 취업을 취소하는 API다
export const useCancelAcceptance = createMutationHook<
  CancelAcceptanceRequest,
  void
>({
  path: "/",
  method: "delete"
});
