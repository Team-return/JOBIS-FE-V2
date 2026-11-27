import type { LoaderFunctionArgs } from "react-router-dom";
import {
  parseQueryParams,
  parseOptionalString,
  parseOptionalNumber,
  LoaderData,
  type QueryParamParser
} from "../../utils";
import { useNoticeCount, useNoticeList, useNoticePage } from "@jobis/api";

export interface NoticeQuery {
  title?: string;
  page: number;
}

const noticeQueryParser: QueryParamParser<NoticeQuery> = {
  parse: (params: URLSearchParams) => {
    const page = parseOptionalNumber(params.get("page"));

    return {
      title: parseOptionalString(params.get("title")),
      // 화면(getPageParam)과 같이 1 이상의 정수가 아니면 첫 페이지로 본다
      page: page !== undefined && Number.isInteger(page) && page >= 1 ? page : 1
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

  // 화면과 같은 기준으로 미리 받는다: 검색 중이면 전체 목록, 아니면 보고 있는 페이지와 전체 페이지 수
  if (queryParams.title) {
    void useNoticeList.prefetch();
  } else {
    void useNoticePage.prefetch({ page: queryParams.page });
    void useNoticeCount.prefetch();
  }

  return {
    params: queryParams
  };
}
