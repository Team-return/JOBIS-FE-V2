import styled from "@emotion/styled";
import { Flex, Icon, Text } from "@/components";
import type { Props, StatusType } from "./ApplicationState.types";
import { useTheme } from "@/hooks";
import type { JOBISTheme } from "@/themes";
import { useState } from "react";

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

const Container = styled.div`
  border-radius: 8px;
  border: 1px solid ${({ theme }) => theme.color.grayScale[40]};
  padding: 16px;
  width: 668px;
`;

const Component = styled.div`
  position: relative;
`;

const Status = styled.div<{
  backgroundColor: string;
}>`
  border-radius: 8px;
  background-color: ${({ backgroundColor }) => backgroundColor};
  padding: 6px 12px;
`;

const Menu = styled.div`
  position: absolute;
  top: 98px;
  right: 0px;
  padding: 16px 0;
  width: 120px;
  box-shadow: 0px 4px 20px 0px rgba(112, 144, 176, 0.12);
  border: 1px solid ${({ theme }) => theme.color.grayScale[30]};
  background-color: ${({ theme }) => theme.color.grayScale[10]};
  display: flex;
  flex-direction: column;
  gap: 16px;
  align-items: center;
`;

const ClickAria = styled.span`
  cursor: pointer;
`;

export const ApplicationState = ({
  types,
  imgUrl,
  companyName,
  date,
  onRetry,
  onCancle
}: Props) => {
  const statusText = STATUS_MAP[types] || "";
  const { currentTheme: theme } = useTheme();
  const [showMenu, setShowMenu] = useState<boolean>(false);
  const currentStatusStyle = getStatusStyle(theme, types);

  return (
    <Component>
      <Container>
        <Flex $justify="space-between" $align="center">
          <Flex $gap={16} $align="center">
            <CompanyLogo src={imgUrl} />
            <Flex $direction="column">
              <Text $size="body2" $weight="regular">
                {companyName}
              </Text>
              <Text
                $size="caption"
                $weight="regular"
                $color={theme.color.grayScale[60]}
              >
                {date}
              </Text>
            </Flex>
          </Flex>
          <Flex $gap={12}>
            <Status backgroundColor={currentStatusStyle.backgroundColor || ""}>
              <Text
                $size="caption"
                $weight="regular"
                $color={currentStatusStyle.color}
              >
                {statusText}
              </Text>
            </Status>
            {types === "pending" && (
              <Icon
                icon="KebapMenu"
                size={24}
                onClick={() => setShowMenu(!showMenu)}
              />
            )}
          </Flex>
        </Flex>
      </Container>
      {showMenu && (
        <Menu role="menu">
          <ClickAria
            onClick={() => {
              setShowMenu(false);
              onRetry?.();
            }}
          >
            <Text $size="caption" $color={theme.color.grayScale[80]}>
              재지원
            </Text>
          </ClickAria>
          <ClickAria
            onClick={() => {
              setShowMenu(false);
              onCancle?.();
            }}
          >
            <Text $size="caption" $color={theme.color.grayScale[80]}>
              지원 취소
            </Text>
          </ClickAria>
        </Menu>
      )}
    </Component>
  );
};
