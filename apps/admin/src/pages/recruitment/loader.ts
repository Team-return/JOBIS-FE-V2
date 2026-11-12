import type { LoaderFunctionArgs } from "react-router-dom";
import {
  parseQueryParams,
  parseOptionalString,
  parseOptionalNumber,
  parseEnum,
  parseLocalDate,
  LoaderData,
  type QueryParamParser
} from "../../utils";
import {
  useRecruitmentCount,
  useTeacherRecruitmentCount,
  useTeacherRecruitmentList,
  type RecruitmentStatus
} from "@jobis/api";

export interface RecruitmentQuery {
  company_name?: string;
  year?: number;
  status?: RecruitmentStatus;
  start?: string;
  end?: string;
  page: number;
}

const RECRUITMENT_STATUSES = [
  "REQUESTED",
  "READY",
  "RECRUITING",
  "DONE",
  "MANUAL_ADD",
  "WIN_INTERN"
] as const;

// 없는 날짜를 보내면 서버가 400을 돌려 목록이 비므로 기간을 설정하지 않은 것으로 본다
const parseDateParam = (value: string | null) =>
  value && parseLocalDate(value) ? value : undefined;

const recruitmentQueryParser: QueryParamParser<RecruitmentQuery> = {
  parse: (params: URLSearchParams) => {
    return {
      company_name: parseOptionalString(params.get("company-name")),
      year: parseOptionalNumber(params.get("year")),
      status: parseEnum(params.get("status"), RECRUITMENT_STATUSES),
      start: parseDateParam(params.get("start")),
      end: parseDateParam(params.get("end")),
      page: parseOptionalNumber(params.get("page")) || 1
    };
  },
  validate: data => {
    return data.page >= 1;
  }
};

/**
 * 겨울인턴은 모집 상태가 아니라 winter_intern 여부라서
 * 상태 필터에서 겨울인턴을 고르면 status 대신 winter_intern=true로 조회한다
 */
export const getRecruitmentFilter = (query: RecruitmentQuery) => ({
  company_name: query.company_name,
  year: query.year,
  status: query.status === "WIN_INTERN" ? undefined : query.status,
  start: query.start,
  end: query.end,
  winter_intern: query.status === "WIN_INTERN" || undefined
});

export async function recruitmentLoader({
  request
}: LoaderFunctionArgs): Promise<LoaderData<RecruitmentQuery>> {
  const queryParams = parseQueryParams(request, recruitmentQueryParser);
  const filter = getRecruitmentFilter(queryParams);

  void useTeacherRecruitmentList.prefetch({
    ...filter,
    page: queryParams.page
  });
  void useTeacherRecruitmentCount.prefetch(filter);
  void useRecruitmentCount.prefetch(filter);

  return {
    params: queryParams
  };
}
