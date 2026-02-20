import type {
  AcceptanceDetailResponse,
  UpdateFieldTrainRequest,
  UpdateContractDateRequest,
  CreateEmploymentRequest,
  DeleteAcceptanceRequest
} from "./types";
import { createQueryHook, createMutationHook } from "@/create-hook";
import { acceptancesKeys } from "./keys";

const DOMAIN = "/acceptances";

export { acceptancesKeys };

export const useAcceptanceDetail = createQueryHook<
  number,
  AcceptanceDetailResponse
>({
  domain: companyId => `${DOMAIN}/${companyId}`,
  queryKey: acceptancesKeys.acceptanceDetail
});

export const useUpdateFieldTrain = createMutationHook<
  UpdateFieldTrainRequest,
  void
>({
  domain: `${DOMAIN}/field-train`,
  method: "patch"
});

export const useUpdateContractDate = createMutationHook<
  UpdateContractDateRequest,
  void
>({
  domain: `${DOMAIN}/contract-date`,
  method: "patch"
});

export const useCreateEmployment = createMutationHook<
  CreateEmploymentRequest,
  void
>({
  domain: `${DOMAIN}/employment`,
  method: "post"
});

export const useDeleteAcceptance = createMutationHook<
  DeleteAcceptanceRequest,
  void
>({
  domain: DOMAIN,
  method: "delete"
});
