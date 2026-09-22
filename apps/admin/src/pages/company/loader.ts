import type { LoaderFunctionArgs } from "react-router-dom";
import {
  parseQueryParams,
  parseOptionalString,
  parseOptionalNumber,
  parseEnum,
  LoaderData,
  type QueryParamParser
} from "../../utils";
import { type CompanyType, useTeacherCompanyList } from "@jobis/api";

export interface CompanyQuery {
  name?: string;
  type?: CompanyType;
  region?: string;
  businessArea?: number;
  page: number;
}

const COMPANY_TYPES = ["LEAD", "PARTICIPATING", "MANUAL_ADD"] as const;

const companyQueryParser: QueryParamParser<CompanyQuery> = {
  parse: (params: URLSearchParams) => {
    return {
      name: parseOptionalString(params.get("name")),
      type: parseEnum(params.get("type"), COMPANY_TYPES),
      region: parseOptionalString(params.get("region")),
      businessArea: parseOptionalNumber(params.get("business-area")),
      page: parseOptionalNumber(params.get("page")) || 1
    };
  },
  validate: data => {
    return data.page >= 1;
  }
};

export async function companyLoader({
  request
}: LoaderFunctionArgs): Promise<LoaderData<CompanyQuery>> {
  const queryParams = parseQueryParams(request, companyQueryParser);

  await useTeacherCompanyList.prefetch({
    page: queryParams.page,
    type: queryParams.type,
    name: queryParams.name,
    region: queryParams.region,
    business_area: queryParams.businessArea
  });

  return {
    params: queryParams
  };
}
