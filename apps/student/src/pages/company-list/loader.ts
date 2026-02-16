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
  sortType?: ListSortType;
}

const companyQueryParser: QueryParamParser<CompanyQuery> = {
  parse: (params: URLSearchParams) => {
    return {
      name: parseOptionalString(params.get("name")),
      page: parseOptionalNumber(params.get("page")) || 1,
      sortType: parseOptionalString(params.get("sort_type")) as ListSortType
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
      sortType: queryParams.sortType
    })
  );

  return {
    params: queryParams
  };
}
