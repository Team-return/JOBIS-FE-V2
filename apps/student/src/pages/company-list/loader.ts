import { LoaderFunctionArgs } from "react-router-dom";
import {
  parseQueryParams,
  parseOptionalString,
  parseOptionalNumber,
  LoaderData,
  type QueryParamParser
} from "../../utils";
import { companiesKeys, query, ListSortType } from "@jobis/api";

export interface CompanyQuery {
  name?: string;
  page: number;
  sort_type?: ListSortType;
}

const companyQueryParser: QueryParamParser<CompanyQuery> = {
  parse: (params: URLSearchParams) => {
    return {
      name: parseOptionalString(params.get("name")),
      page: parseOptionalNumber(params.get("page")) || 1,
      sort_type: parseOptionalString(params.get("sort_type")) as ListSortType
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

  await query.prefetch(
    companiesKeys.companyStudentList({
      page: queryParams.page,
      name: queryParams.name,
      sort_type: queryParams.sort_type
    })
  );

  return {
    params: queryParams
  };
}
