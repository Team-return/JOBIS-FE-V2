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

type RecruitmentDetailData = ReturnType<typeof useRecruitmentDetail>["data"];
type RecruitmentArea = NonNullable<RecruitmentDetailData>["areas"][number];

const joinNames = (items?: { name: string }[]) =>
  items?.map(item => item.name).join(", ") || "-";

const getAreaLabel = (index: number, total: number) =>
  total > 1 ? `모집분야 ${index + 1}` : "모집분야";

const createAreaItem = (
  area: RecruitmentArea,
  index: number,
  total: number
) => ({
  label: getAreaLabel(index, total),
  value: "펼쳐서 확인하기",
  itemType: "text" as const,
  expandableContent: [
    {
      label: "직무",
      value: joinNames(area.job),
      itemType: "text" as const
    },
    {
      label: "필요 기술스택",
      value: joinNames(area.tech),
      itemType: "text" as const
    },
    {
      label: "채용인원",
      value: area.hiring === undefined ? "-" : `${area.hiring} 명`,
      itemType: "text" as const
    },
    {
      label: "수행업무",
      value: area.major_task || "-",
      itemType: "text" as const
    },
    {
      label: "우대사항",
      value: area.preferential_treatment || "-",
      itemType: "text" as const
    }
  ]
});

export const RecruitmentDetail = () => {
  const { params: recruitmentId } = useLoaderData() as LoaderData<number>;

  const { data, isLoading, isError } = useRecruitmentDetail(recruitmentId);

  if (isError) {
    return <Container $maxWidth={960}>정보를 불러오지 못했습니다.</Container>;
  }

  const areas = data?.areas ?? [];
  const areaItems = areas.length
    ? areas.map((area, index) => createAreaItem(area, index, areas.length))
    : [
        {
          label: "모집분야",
          value: "-",
          itemType: "text" as const
        }
      ];

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
            ...areaItems,
            {
              label: "최소성적",
              value: data?.additional_qualifications || "-",
              itemType: "text"
            },
            {
              label: "근무시간",
              value: data?.working_hours || "-",
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
              value: data?.etc || "-",
              itemType: "text"
            }
          ]}
        />
        <Box height={516} />
      </Flex>
    </Container>
  );
};
