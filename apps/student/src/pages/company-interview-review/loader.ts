import type { LoaderFunctionArgs } from "react-router-dom";
import { redirect } from "react-router-dom";
import { useReviewList } from "@jobis/api";
import type { LoaderData } from "../../utils";

export async function companyInterviewReviewLoader({
  params
}: LoaderFunctionArgs): Promise<LoaderData<number>> {
  const id = Number(params.companyId);

  if (!params.companyId || Number.isNaN(id)) {
    throw redirect("/company");
  }

  await useReviewList.prefetch({ company_id: id });

  return { params: id };
}
