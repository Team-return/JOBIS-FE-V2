import type { LoaderFunctionArgs } from "react-router-dom";
import { redirect } from "react-router-dom";
import { useNoticeDetail } from "@jobis/api";
import { LoaderData } from "../../utils";

export async function noticeDetailLoader({
  params
}: LoaderFunctionArgs): Promise<LoaderData<number>> {
  const id = Number(params.noticeId);

  if (!params.noticeId || !Number.isInteger(id) || id <= 0) {
    throw redirect("/notice");
  }

  await useNoticeDetail.prefetch(id);

  return { params: id };
}
