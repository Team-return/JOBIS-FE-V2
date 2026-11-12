import type { LoaderFunctionArgs } from "react-router-dom";
import { useNoticeCount, useNoticePage, useNoticeTotalCount } from "@jobis/api";
import type { LoaderData } from "../../utils";

export async function noticesListLoader({
  request
}: LoaderFunctionArgs): Promise<LoaderData<undefined>> {
  // 화면(getPageParam)과 같이 1 이상의 정수가 아니면 첫 페이지로 본다
  const page = Number(new URL(request.url).searchParams.get("page"));

  // 번호 계산용 전체 개수는 요청 두 번을 이어 하므로 기다리지 않고 함께 시작만 한다
  void useNoticeTotalCount.prefetch();
  await Promise.all([
    useNoticePage.prefetch({
      page: Number.isInteger(page) && page >= 1 ? page : 1
    }),
    useNoticeCount.prefetch()
  ]);

  return { params: undefined };
}
