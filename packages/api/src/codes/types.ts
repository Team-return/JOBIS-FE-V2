import type { JobType } from "@/enum";

type CodeType = "JOB" | "TECH" | "BUSINESS_AREA";

export interface Code {
  code: number;
  keyword: string;
}

export interface CodeListResponse {
  codes: Code[];
}

export interface CreateCodeRequest {
  code_type: CodeType;
  job_type?: JobType;
  keyword: string;
}

export interface CreateCodeResponse {
  codeId: number;
}
