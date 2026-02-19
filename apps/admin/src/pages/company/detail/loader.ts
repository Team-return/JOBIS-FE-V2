import type { LoaderFunctionArgs } from "react-router-dom";
import { redirect } from "react-router-dom";
import { companiesKeys, query } from "@jobis/api";
import { LoaderData } from "apps/admin/src/utils";

export async function companyDetailLoader({
  params
}: LoaderFunctionArgs): Promise<LoaderData<number>> {
  const id = Number(params.companyId);

  if (!params.companyId || Number.isNaN(id)) {
    throw redirect("/company");
  }

  query.prefetch(companiesKeys.companyDetail(id));

  return { params: id };
}
