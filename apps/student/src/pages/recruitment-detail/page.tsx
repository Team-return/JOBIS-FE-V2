import { useRecruitmentDetail } from "@jobis/api";
import {
  Container,
  DetailHeader,
  Flex,
  DetailTable,
  Box
} from "@jobis/design-system";
import { useLoaderData } from "react-router-dom";
import { LoaderData } from "apps/student/src/utils";

export const RecruitmentDetail = () => {
  const { params: recruitmentId } = useLoaderData() as LoaderData<number>;

  const { data, isLoading, isError } = useRecruitmentDetail(recruitmentId);

  if (isError) {
    return <Container $maxWidth={960}>정보를 불러오지 못했습니다.</Container>;
  }

  return (
    <Container $maxWidth={960}>
      <Box height={56} />
      <Flex $direction="column" $gap={56}>
        <Flex $direction="row" $justify="space-between" $align="center">
          <DetailHeader
            type="recruitment"
            title={isLoading ? "불러오는 중..." : data?.company_name || "-"}
            logoUrl={data?.company_profile_url || "/logo.svg"}
            isParticipation={data?.integration_plan || false}
          />
        </Flex>
        <DetailTable
          items={[
            {
              label: "모집분야",
              value: "펼쳐서 확인하기",
              itemType: "text",
              expandableContent: [
                {
                  label: "직무",
                  value: data?.areas?.[0]?.job?.[0]?.name || "-",
                  itemType: "text"
                },
                {
                  label: "필요 기술스택",
                  value: data?.areas?.[0]?.tech?.[0]?.name || "-",
                  itemType: "text"
                },
                {
                  label: "채용인원",
                  value: `${data?.areas?.[0]?.hiring} 명`,
                  itemType: "text"
                },
                {
                  label: "수행업무",
                  value: data?.areas?.[0]?.major_task || "-",
                  itemType: "text"
                }
              ]
            },
            {
              label: "우대사항",
              value: data?.additional_qualifications || "없음",
              itemType: "text"
            },
            {
              label: "최소성적",
              value: data?.areas?.[0]?.preferential_treatment || "없음",
              itemType: "text"
            },
            {
              label: "근무시간",
              value: data?.flexible_working
                ? "유연근무제"
                : data?.working_hours || "-",
              itemType: "text"
            },
            {
              label: "면접과정",
              value: data?.hiring_progress?.join(" → ") || "-",
              itemType: "text"
            },
            {
              label: "실습 수당 월급",
              value: `${data?.train_pay}만원`,
              itemType: "text"
            },
            {
              label: "정규직 전환 시 연봉",
              value: data?.pay ? `${data?.pay}만원` : "면접 후 결정",
              itemType: "text"
            },
            {
              label: "복지",
              value: data?.benefits || "-",
              itemType: "text"
            },
            {
              label: "병역특례 여부",
              value: data?.military_support ? "있음" : "없음",
              itemType: "text"
            },
            {
              label: "제출 서류",
              value: data?.submit_document || "-",
              itemType: "text"
            },
            {
              label: "모집 시작일",
              value: data?.start_date || "-",
              itemType: "text"
            },
            {
              label: "모집 종료일",
              value: data?.end_date || "-",
              itemType: "text"
            },
            {
              label: "기타",
              value: data?.etc || "없음",
              itemType: "text"
            }
          ]}
        />
        <Box height={516} />
      </Flex>
    </Container>
  );
};
