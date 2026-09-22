import { useCompanyDetail } from "@jobis/api";
import {
  Container,
  DetailHeader,
  Flex,
  DetailTable,
  Box
} from "@jobis/design-system";
import { useLoaderData, useNavigate } from "react-router-dom";
import { LoaderData } from "apps/student/src/utils";

const formatBusinessNumber = (businessNumber?: string) => {
  if (!businessNumber) return "-";

  return `${businessNumber.slice(0, 3)}-${businessNumber.slice(3, 5)}-${businessNumber.slice(5)}`;
};

const formatDate = (date?: string) => {
  if (!date) return "-";
  return date.replace(/-/g, ".");
};

const getAttachmentName = (fileUrl?: string) => {
  if (!fileUrl) return "-";

  const path = fileUrl.split("?")[0] ?? "";

  let fileName = path.split("/").pop() ?? "";

  const lastDotIndex = fileName.lastIndexOf(".");

  if (lastDotIndex > 0) {
    fileName = fileName.substring(0, lastDotIndex);
  }

  return decodeURIComponent(fileName || "-");
};

export const CompanyDetail = () => {
  const { params: companyId } = useLoaderData() as LoaderData<number>;
  const navigate = useNavigate();

  const { data, isLoading, isError } = useCompanyDetail(companyId);
  const handleViewReview = () => {
    navigate(`/company/detail/${companyId}/review`);
  };

  const firstAttachment = data?.attachments?.[0];

  if (isError) {
    return (
      <Container $maxWidth={960}>기업 정보를 불러오지 못했습니다.</Container>
    );
  }

  return (
    <Container $maxWidth={960}>
      <Box height={56} />
      <Flex $direction="column" $gap={56}>
        <Flex $direction="row" $justify="space-between" $align="center">
          <DetailHeader
            type="company"
            title={isLoading ? "불러오는 중..." : data?.company_name || "-"}
            logoUrl={data?.company_profile_url || "/logo.svg"}
            businessNumber={formatBusinessNumber(data?.business_number)}
            onViewReview={handleViewReview}
          />
        </Flex>
        <DetailTable
          items={[
            {
              label: "대표",
              value: data?.representative_name || "-",
              itemType: "text"
            },
            {
              label: "회사 소개",
              value: data?.company_introduce || "-",
              itemType: "text"
            },
            {
              label: "회사 우편번호",
              value: data?.main_zip_code || "-",
              itemType: "text"
            },
            {
              label: "회사 주소",
              value: data
                ? `${data.main_address} ${data.main_address_detail}`
                : "-",
              itemType: "text"
            },
            {
              label: "이메일",
              value: data?.email || "-",
              itemType: "text"
            },
            {
              label: "설립일",
              value: formatDate(data?.founded_at),
              itemType: "text"
            },
            {
              label: "직원수",
              value:
                data?.worker_number === undefined
                  ? "-"
                  : `${data.worker_number}명`,
              itemType: "text"
            },
            {
              label: "연매출",
              value: data?.take === undefined ? "-" : `${data.take}억`,
              itemType: "text"
            },
            {
              label: "사업분야",
              value: data?.business_area || "-",
              itemType: "text"
            },
            {
              label: "첨부파일",
              value: firstAttachment ? getAttachmentName(firstAttachment) : "-",
              itemType: firstAttachment ? "file" : "text",
              fileUrl: firstAttachment
            }
          ]}
        />
        <Box height={516} />
      </Flex>
    </Container>
  );
};
