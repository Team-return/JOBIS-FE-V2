import type { LoaderFunctionArgs } from "react-router-dom";
import {
  parseQueryParams,
  parseOptionalString,
  parseOptionalNumber,
  parseOptionalBoolean,
  parseEnum,
  LoaderData,
  type QueryParamParser
} from "../../utils";
import { useTeacherApplications, type ApplicationStatus } from "@jobis/api";

export interface ApplicationQuery {
  student_name?: string;
  application_status?: ApplicationStatus;
  recruitment_id?: number;
  winter_intern?: boolean;
  page: number;
  year?: string;
}

const APPLICATION_STATUSES = [
  "REQUESTED",
  "APPROVED",
  "SEND",
  "FAILED",
  "PASS",
  "REJECTED",
  "FIELD_TRAIN",
  "ACCEPTANCE",
  "DOC_FAILED",
  "PROCESSING"
] as const;

const applicationQueryParser: QueryParamParser<ApplicationQuery> = {
  parse: (params: URLSearchParams) => {
    return {
      student_name: parseOptionalString(params.get("student-name")),
      application_status: parseEnum(
        params.get("application-status"),
        APPLICATION_STATUSES
      ),
      recruitment_id: parseOptionalNumber(params.get("recruitment-id")),
      winter_intern: parseOptionalBoolean(params.get("winter-intern")),
      page: parseOptionalNumber(params.get("page")) || 1,
      year: parseOptionalString(params.get("year"))
    };
  },
  validate: data => {
    return data.page >= 1;
  }
};

// 서버가 지원서 목록을 페이지로 나누지 않고 조건에 맞는 전부를 돌려주므로 page는 보내지 않는다
export const getApplicationFilter = (query: ApplicationQuery) => ({
  application_status: query.application_status,
  student_name: query.student_name,
  recruitment_id: query.recruitment_id,
  winter_intern: query.winter_intern,
  year: query.year
});

export async function applicationLoader({
  request
}: LoaderFunctionArgs): Promise<LoaderData<ApplicationQuery>> {
  const queryParams = parseQueryParams(request, applicationQueryParser);

  void useTeacherApplications.prefetch(getApplicationFilter(queryParams));

  return {
    params: queryParams
  };
}
