import type { LoaderFunctionArgs } from "react-router-dom";
import { redirect } from "react-router-dom";
import { useRecruitmentDetail } from "@jobis/api";
import { LoaderData } from "../../utils";

export async function recruitmentDetailLoader({
  params
}: LoaderFunctionArgs): Promise<LoaderData<number>> {
  const id = Number(params.recruitmentId);

  if (!params.recruitmentId || Number.isNaN(id)) {
    throw redirect("/recruitment");
  }

  await useRecruitmentDetail.prefetch(id);

  return { params: id };
}
