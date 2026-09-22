import type { LoaderFunctionArgs } from "react-router-dom";
import { redirect } from "react-router-dom";
import { useNoticeDetail } from "@jobis/api";
import { LoaderData } from "../../utils";

export async function noticeDetailLoader({
  params
}: LoaderFunctionArgs): Promise<LoaderData<number>> {
  const rawId = params.noticeId;
  if (!rawId || !/^[1-9]\d*$/.test(rawId)) {
    throw redirect("/notice");
  }
  const id = Number(rawId);

  await useNoticeDetail.prefetch(id);

  return { params: id };
}
