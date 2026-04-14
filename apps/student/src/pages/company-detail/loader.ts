import type { LoaderFunctionArgs } from "react-router-dom";
import { redirect } from "react-router-dom";
import { useCompanyDetail } from "@jobis/api";
import { LoaderData } from "apps/student/src/utils";

export async function companyDetailLoader({
  params
}: LoaderFunctionArgs): Promise<LoaderData<number>> {
  const id = Number(params.companyId);

  if (!params.companyId || Number.isNaN(id)) {
    throw redirect("/company");
  }

  await useCompanyDetail.prefetch(id);

  return { params: id };
}
