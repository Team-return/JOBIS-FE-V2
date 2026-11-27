import type { LoaderFunctionArgs } from "react-router-dom";
import {
  parseQueryParams,
  parseOptionalString,
  parseOptionalNumber,
  parseEnum,
  LoaderData,
  type QueryParamParser,
  parseOptionalBoolean,
  RECRUITMENT_SORT_TYPES
} from "../../utils";
import {
  type RecruitmentStatus,
  useRecruitmentList,
  type RecruitmentSortType
} from "@jobis/api";

export interface RecruitmentQuery {
  name?: string;
  year?: number;
  status?: RecruitmentStatus;
  page: number;
  winter_intern?: boolean;
  job_code?: number;
  tech_code?: string;
  military_support?: boolean;
  sort_type?: RecruitmentSortType;
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
      name: parseOptionalString(params.get("name")),
      year: parseOptionalNumber(params.get("year")),
      status,
      page,
      // false를 보내면 서버가 겨울인턴이 아닌 공고만 걸러서, 겨울인턴만 볼 때가 아니면 보내지 않는다
      winter_intern:
        status === "WIN_INTERN" ||
        params.get("winter_intern") === "true" ||
        undefined,
      job_code: parseOptionalNumber(params.get("field") || ""),
      tech_code: parseOptionalString(
        params.get("tech-stack") || params.get("techStack") || ""
      ),
      military_support: parseOptionalBoolean(params.get("military_support")),
      sort_type: parseEnum(params.get("sort-type"), RECRUITMENT_SORT_TYPES)
    };
  },
  validate: data => data.page >= 1
};

export const parseRecruitmentQuery = recruitmentQueryParser.parse;

/**
 * 목록·개수 요청에 공통으로 들어가는 검색 조건.
 * 겨울인턴은 모집 상태가 아니라 winter_intern으로 거른다.
 * status=WIN_INTERN을 그대로 보내면 상태가 WIN_INTERN으로 덮어써진 공고만 나온다
 */
export const toRecruitmentListFilter = (query: RecruitmentQuery) => ({
  name: query.name,
  years: query.year,
  status: query.status === "WIN_INTERN" ? undefined : query.status,
  winter_intern: query.winter_intern,
  job_code: query.job_code,
  tech_code: query.tech_code
});

export async function recruitmentLoader({
  request
}: LoaderFunctionArgs): Promise<LoaderData<RecruitmentQuery>> {
  const queryParams = parseQueryParams(request, recruitmentQueryParser);

  // 페이지 쿼리와 키가 어긋나면 프리페치가 버려지고 목록을 두 번 부른다.
  // 화면과 같은 함수로 파라미터를 만든다
  await useRecruitmentList.prefetch({
    ...toRecruitmentListFilter(queryParams),
    page: queryParams.page,
    sort_type: queryParams.sort_type
  });

  return {
    params: queryParams
  };
}
