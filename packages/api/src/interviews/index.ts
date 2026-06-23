import type { StudentInterviewsResponse } from "./types";
import { createDomainApi } from "@/create-hook";
import { interviewsKeys } from "./keys";

const DOMAIN = "/interviews";
const { createQueryHook } = createDomainApi(DOMAIN);

export { interviewsKeys };
export type { StudentInterview, StudentInterviewsResponse } from "./types";

export const useStudentInterviews = createQueryHook<
  void,
  StudentInterviewsResponse
>({
  path: "/students",
  queryKey: interviewsKeys.studentInterviews
});
