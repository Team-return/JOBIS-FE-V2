import type { LoaderFunctionArgs } from "react-router-dom";
import {
  parseQueryParams,
  parseOptionalString,
  parseOptionalNumber,
  LoaderData,
  type QueryParamParser
} from "../../utils";
import { useNoticeList } from "@jobis/api";

export interface NoticeQuery {
  title?: string;
  page: number;
}

const noticeQueryParser: QueryParamParser<NoticeQuery> = {
  parse: (params: URLSearchParams) => {
    return {
      title: parseOptionalString(params.get("title")),
      page: parseOptionalNumber(params.get("page")) || 1
    };
  },
  validate: data => {
    return data.page >= 1;
  }
};

export async function noticeLoader({
  request
}: LoaderFunctionArgs): Promise<LoaderData<NoticeQuery>> {
  const queryParams = parseQueryParams(request, noticeQueryParser);

  void useNoticeList.prefetch();

  return {
    params: queryParams
  };
}
