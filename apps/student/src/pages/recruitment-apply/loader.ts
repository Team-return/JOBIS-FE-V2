import type { LoaderFunctionArgs } from "react-router-dom";
import { redirect } from "react-router-dom";
import { useRecruitmentDetail } from "@jobis/api";
import { LoaderData } from "../../utils";

export async function recruitmentApplyLoader({
  params
}: LoaderFunctionArgs): Promise<LoaderData<number>> {
  const id = Number(params.recruitmentId);

  if (!Number.isInteger(id) || id <= 0) {
    throw redirect("/recruitment");
  }

  await useRecruitmentDetail.prefetch(id);

  return { params: id };
}
