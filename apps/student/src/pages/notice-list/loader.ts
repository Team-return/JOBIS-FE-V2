import type { LoaderFunctionArgs } from "react-router-dom";
import { useNoticeCount, useNoticePage } from "@jobis/api";
import type { LoaderData } from "../../utils";

export async function noticesListLoader({
  request
}: LoaderFunctionArgs): Promise<LoaderData<undefined>> {
  // 화면(getPageParam)과 같이 1 이상의 정수가 아니면 첫 페이지로 본다
  const page = Number(new URL(request.url).searchParams.get("page"));

  await Promise.all([
    useNoticePage.prefetch({
      page: Number.isInteger(page) && page >= 1 ? page : 1
    }),
    useNoticeCount.prefetch()
  ]);

  return { params: undefined };
}
