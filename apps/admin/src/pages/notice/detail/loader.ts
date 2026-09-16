import type { LoaderFunctionArgs } from "react-router-dom";
import { redirect } from "react-router-dom";
import { useNoticeDetail } from "@jobis/api";
import { LoaderData } from "apps/admin/src/utils";

export async function noticeDetailLoader({
  params
}: LoaderFunctionArgs): Promise<LoaderData<number>> {
  const id = Number(params.noticeId);

  if (!Number.isInteger(id) || id <= 0) {
    throw redirect("/notice");
  }

  // await 하면 응답이 올 때까지 이전 화면에 머물러 스켈레톤이 보이지 않는다
  void useNoticeDetail.prefetch(id);

  return { params: id };
}
