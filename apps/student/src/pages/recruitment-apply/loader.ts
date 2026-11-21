import type { LoaderFunctionArgs } from "react-router-dom";
import { redirect } from "react-router-dom";
import { useRecruitmentDetail, useStudentApplications } from "@jobis/api";
import { LoaderData } from "../../utils";

export async function recruitmentApplyLoader({
  params,
  request
}: LoaderFunctionArgs): Promise<LoaderData<number>> {
  const id = Number(params.recruitmentId);

  if (!Number.isInteger(id) || id <= 0) {
    throw redirect("/recruitment");
  }

  // 재지원은 내 지원 목록으로 재지원할 수 있는지 확인하므로 같이 받아 둔다
  const isReapply = new URL(request.url).searchParams.has("application-id");

  await Promise.all([
    useRecruitmentDetail.prefetch(id),
    isReapply ? useStudentApplications.prefetch() : undefined
  ]);

  return { params: id };
}
