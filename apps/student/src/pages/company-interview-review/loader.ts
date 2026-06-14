import type { LoaderFunctionArgs } from "react-router-dom";
import { redirect } from "react-router-dom";
import { useReviewList } from "@jobis/api";
import type { LoaderData } from "../../utils";

export async function companyInterviewReviewLoader({
  params,
  request
}: LoaderFunctionArgs): Promise<LoaderData<number>> {
  const id = Number(params.companyId);

  if (!params.companyId || Number.isNaN(id)) {
    throw redirect("/company");
  }

  const page = Number(new URL(request.url).searchParams.get("page")) || 1;

  await useReviewList.prefetch({ page, company_id: id });

  return { params: id };
}
