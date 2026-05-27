import { LoaderFunctionArgs } from "react-router-dom";
import {
  parseQueryParams,
  parseOptionalString,
  parseOptionalNumber,
  parseEnum,
  LoaderData,
  type QueryParamParser
} from "../../utils";
import {
  useBookmarks,
  useCompanyStudentList,
  useCompanyStudentRecentList,
  type ListSortType
} from "@jobis/api";

export interface HomeQuery {
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

const homeQueryParser: QueryParamParser<HomeQuery> = {
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

export async function homeLoader({
  request
}: LoaderFunctionArgs): Promise<LoaderData<HomeQuery>> {
  const queryParams = parseQueryParams(request, homeQueryParser);

  await Promise.all([
    useCompanyStudentList.prefetch({
      page: queryParams.page,
      name: queryParams.name,
      sort_type: queryParams.sortType
    }),
    useCompanyStudentRecentList.prefetch(),
    useBookmarks.prefetch()
  ]);

  return {
    params: queryParams
  };
}
