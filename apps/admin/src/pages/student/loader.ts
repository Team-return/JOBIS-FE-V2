import type { LoaderFunctionArgs } from "react-router-dom";
import {
  parseQueryParams,
  parseOptionalString,
  parseOptionalNumber,
  parseEnum,
  LoaderData,
  type QueryParamParser
} from "../../utils";
import { useEmploymentCompanyList } from "@jobis/api";

export const STUDENT_TABS = ["company", "field-train", "contract"] as const;

export type StudentTab = (typeof STUDENT_TABS)[number];

export interface StudentQuery {
  tab: StudentTab;
  page: number;
  companyName?: string;
  companyType?: string;
  year?: number;
  selectedCompanyId?: number;
  selectedCompanyName?: string;
}

const studentQueryParser: QueryParamParser<StudentQuery> = {
  parse: (params: URLSearchParams) => {
    return {
      tab: parseEnum(params.get("tab"), STUDENT_TABS) ?? "company",
      page: parseOptionalNumber(params.get("page")) || 1,
      companyName: parseOptionalString(params.get("company-name")),
      companyType: parseOptionalString(params.get("type")),
      year: parseOptionalNumber(params.get("year")),
      selectedCompanyId: parseOptionalNumber(params.get("company-id")),
      selectedCompanyName: parseOptionalString(params.get("selected-company"))
    };
  },
  validate: data => data.page >= 1
};

export async function studentLoader({
  request
}: LoaderFunctionArgs): Promise<LoaderData<StudentQuery>> {
  const queryParams = parseQueryParams(request, studentQueryParser);

  await useEmploymentCompanyList.prefetch({
    page: queryParams.page,
    company_name: queryParams.companyName,
    company_type: queryParams.companyType,
    year: queryParams.year
  });

  return {
    params: queryParams
  };
}
