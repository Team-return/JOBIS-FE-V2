import type { LoaderFunctionArgs } from "react-router-dom";
import {
  parseQueryParams,
  parseOptionalString,
  parseOptionalNumber,
  parseEnum,
  LoaderData,
  type QueryParamParser,
  parseOptionalBoolean
} from "../../utils";
import { recruitmentsKeys, query, type RecruitmentStatus, useRecruitmentList, ListSortType } from "@jobis/api";

export interface RecruitmentQuery {
  name?: string;
  year?: number;
  status?: RecruitmentStatus;
  page: number;
  winter_intern?: boolean;
  job_code?: number;
  tech_code?: string;
  military_support?: boolean;
  sort_type?: ListSortType;
}

const RECRUITMENT_STATUSES = [
  "REQUESTED",
  "READY",
  "RECRUITING",
  "DONE",
  "MANUAL_ADD",
  "WIN_INTERN"
] as const;

const SORT_TYPES = [
  "WORKERS_COUNT_ASC",
  "WORKERS_COUNT_DESC",
  "FOUNDED_AT_ASC",
  "FOUNDED_AT_DESC",
  "TAKE"
] as const;

const recruitmentQueryParser: QueryParamParser<RecruitmentQuery> = {
  parse: (params: URLSearchParams) => {
    const status = parseEnum(params.get("status"), RECRUITMENT_STATUSES);
    const page = parseOptionalNumber(params.get("page")) || 1;

    return {
      name: parseOptionalString(params.get("name")),
      year: parseOptionalNumber(params.get("year")),
      status,
      page,
      winter_intern: status === "WIN_INTERN" || params.get("winter_intern") === "true",
      job_code: parseOptionalNumber(params.get("field") || ""),
      tech_code: parseOptionalString(params.get("techStack") || ""),
      military_support: parseOptionalBoolean(params.get("military_support")),
      sort_type: parseEnum(params.get("sort-type"), SORT_TYPES)
    };
  },
  validate: data => data.page >= 1
};

export async function recruitmentLoader({
  request
}: LoaderFunctionArgs): Promise<LoaderData<RecruitmentQuery>> {
  const queryParams = parseQueryParams(request, recruitmentQueryParser);

  await useRecruitmentList.prefetch({
    page: queryParams.page,
    name: queryParams.name,
    job_code: queryParams.job_code,
    tech_code: queryParams.tech_code,
    winter_intern: queryParams.winter_intern,
    military_support: queryParams.military_support,
    years: queryParams.year,
    status: queryParams.status,
    sort_type: queryParams.sort_type,
  });

  return {
    params: queryParams
  };
}