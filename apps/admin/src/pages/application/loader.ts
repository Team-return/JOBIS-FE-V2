import type { LoaderFunctionArgs } from "react-router-dom";
import {
  parseQueryParams,
  parseOptionalString,
  parseOptionalNumber,
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
      winter_intern: params.get("winter-intern") === "true" || undefined,
      page: parseOptionalNumber(params.get("page")) || 1,
      year: parseOptionalString(params.get("year"))
    };
  },
  validate: data => {
    return data.page >= 1;
  }
};

export async function applicationLoader({
  request
}: LoaderFunctionArgs): Promise<LoaderData<ApplicationQuery>> {
  const queryParams = parseQueryParams(request, applicationQueryParser);

  void useTeacherApplications.prefetch({
    application_status: queryParams.application_status,
    student_name: queryParams.student_name,
    recruitment_id: queryParams.recruitment_id,
    winter_intern: queryParams.winter_intern,
    year: queryParams.year
  });

  return {
    params: queryParams
  };
}
