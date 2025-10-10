import styled from "@emotion/styled";
import { Flex, Text } from "@/components";
import type { Props, StatusType } from "./ApplicationState.types";
import { useTheme } from "@/hooks";
import type { JOBISTheme } from "@/themes";

const STATUS_MAP: Record<StatusType, string> = {
  rejected: "반려",
  failed: "탈락",
  approved: "승인됨",
  pending: "승인요청됨",
  passed: "합격",
  internship: "현장실습",
  contract: "근로계약",
  applying: "지원 중"
};

const getStatusStyle = (theme: JOBISTheme, status: StatusType) => {
  switch (status) {
    case "rejected":
    case "failed":
      return {
        backgroundColor: theme.color.subColor.red[10],
        color: theme.color.subColor.red[20]
      };
    case "passed":
      return {
        backgroundColor: theme.color.subColor.green[10],
        color: theme.color.subColor.green[20]
      };
    case "internship":
    case "contract":
      return {
        backgroundColor: theme.color.subColor.green[10],
        color: theme.color.subColor.green[20]
      };
    case "approved":
    case "pending":
      return {
        backgroundColor: theme.color.subColor.yellow[10],
        color: theme.color.subColor.yellow[20]
      };
    case "applying":
    default:
      return {
        backgroundColor: theme.color.primary[10],
        color: theme.color.primary[30]
      };
  }
};

const CompanyLogo = styled.img`
  width: 60px;
  height: 60px;
  border-radius: 8px;
  background-color: ${({ theme }) => theme.color.grayScale[40]};
  object-fit: cover;
`;

const Component = styled.div`
  border-radius: 8px;
  border: 1px solid ${({ theme }) => theme.color.grayScale[40]};
  padding: 16px;
  width: 668px;
`;

const Status = styled.div<{
  backgroundColor: string;
}>`
  border-radius: 8px;
  background-color: ${({ backgroundColor }) => backgroundColor};
  padding: 6px 12px;
`;

export const ApplicationState = ({
  types,
  imgUrl,
  companyName,
  date
}: Props) => {
  const statusText = STATUS_MAP[types] || "";
  const { currentTheme } = useTheme();
  const currentStatusStyle = getStatusStyle(currentTheme, types);

  return (
    <Component>
      <Flex $justify="space-between" $align="center">
        <Flex $gap={16} $align="center">
          <CompanyLogo src={imgUrl} />
          <Flex $direction="column">
            <Text $size="body2" $weight="regular">
              {companyName}
            </Text>
            <Text $size="caption" $weight="regular" $color="#7F7F7F">
              {date}
            </Text>
          </Flex>
        </Flex>
        <Status backgroundColor={currentStatusStyle.backgroundColor || ""}>
          <Text
            $size="caption"
            $weight="regular"
            $color={currentStatusStyle.color}
          >
            {statusText}
          </Text>
        </Status>
      </Flex>
    </Component>
  );
};
