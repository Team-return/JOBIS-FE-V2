import type { LoaderFunctionArgs } from "react-router-dom";
import { redirect } from "react-router-dom";
import { useNoticeDetail } from "@jobis/api";
import { LoaderData } from "apps/admin/src/utils";

export async function noticeEditLoader({
  params
}: LoaderFunctionArgs): Promise<LoaderData<number>> {
  const id = Number(params.noticeId);

  if (!Number.isInteger(id) || id <= 0) {
    throw redirect("/notice");
  }

  await useNoticeDetail.prefetch(id);

  return { params: id };
}
