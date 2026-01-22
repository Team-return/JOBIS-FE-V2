import type { LoaderFunctionArgs } from "react-router-dom";
import {
  parseQueryParams,
  parseOptionalString,
  parseOptionalNumber,
  parseEnum,
  LoaderData,
  type QueryParamParser
} from "../../utils";
import { recruitmentsKeys, query, type RecruitmentStatus } from "@jobis/api";

export interface RecruitmentQuery {
  company_name?: string;
  year?: number;
  status?: RecruitmentStatus;
  start?: string;
  end?: string;
  page: number;
  winter_intern?: boolean;
}

const RECRUITMENT_STATUSES = [
  "REQUESTED",
  "READY",
  "RECRUITING",
  "DONE",
  "MANUAL_ADD",
  "WIN_INTERN"
] as const;

const recruitmentQueryParser: QueryParamParser<RecruitmentQuery> = {
  parse: (params: URLSearchParams) => {
    const status = parseEnum(params.get("status"), RECRUITMENT_STATUSES);
    const page = parseOptionalNumber(params.get("page")) || 1;

    return {
      company_name: parseOptionalString(params.get("company-name")),
      year: parseOptionalNumber(params.get("year")),
      status,
      start: parseOptionalString(params.get("start")),
      end: parseOptionalString(params.get("end")),
      page,
      winter_intern: status === "WIN_INTERN" || undefined
    };
  },
  validate: data => {
    return data.page >= 1;
  }
};

export async function recruitmentLoader({
  request
}: LoaderFunctionArgs): Promise<LoaderData<RecruitmentQuery>> {
  const queryParams = parseQueryParams(request, recruitmentQueryParser);

  query.prefetch(recruitmentsKeys.teacherRecruitmentList(queryParams));

  return {
    params: queryParams
  };
}
