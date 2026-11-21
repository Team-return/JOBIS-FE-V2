import type { LoaderFunctionArgs } from "react-router-dom";
import { redirect } from "react-router-dom";
import { useCompanyDetail } from "@jobis/api";
import { LoaderData } from "apps/student/src/utils";

export async function companyDetailLoader({
  params
}: LoaderFunctionArgs): Promise<LoaderData<number>> {
  const id = Number(params.companyId);

  if (!Number.isInteger(id) || id <= 0) {
    throw redirect("/company");
  }

  // 서버는 상세 조회 요청을 받을 때 '최근 본 기업'에 기록하므로, 캐시가 남아 있어도 들어올 때마다 새로 요청한다
  await useCompanyDetail.prefetch(id, { staleTime: 0 });

  return { params: id };
}
