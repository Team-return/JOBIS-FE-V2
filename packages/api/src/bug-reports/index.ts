import type { CreateBugReportRequest } from "./types";
import { createDomainApi } from "@/create-hook";

const DOMAIN = "/bugs";
const { createMutationHook } = createDomainApi(DOMAIN);

export const useCreateBugReport = createMutationHook<
  CreateBugReportRequest,
  void
>({
  path: "/",
  method: "post"
});
