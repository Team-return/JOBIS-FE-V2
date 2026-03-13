import { LoaderFunctionArgs } from "react-router-dom";
import {
  parseQueryParams,
  parseOptionalString,
  parseOptionalNumber,
  parseEnum,
  LoaderData,
  type QueryParamParser
} from "../../utils";
import { useCompanyStudentList, type ListSortType } from "@jobis/api";

export interface CompanyQuery {
  name?: string;
  page: number;
  sortType?: ListSortType;
}

const SORT_TYPES = [
  "WORKERS_COUNT_ASC",
  "WORKERS_COUNT_DESC",
  "FOUNDED_AT_ASC",
  "FOUNDED_AT_DESC",
  "TAKE"
] as const;

const companyQueryParser: QueryParamParser<CompanyQuery> = {
  parse: (params: URLSearchParams) => {
    return {
      name: parseOptionalString(params.get("name")),
      page: parseOptionalNumber(params.get("page")) || 1,
      sortType: parseEnum(params.get("sort-type"), SORT_TYPES)
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

  await useCompanyStudentList.prefetch({
    page: queryParams.page,
    name: queryParams.name,
    sort_type: queryParams.sortType
  });

  return {
    params: queryParams
  };
}
