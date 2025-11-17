import styled from "@emotion/styled";
import { Icon, Text } from "@/components";
import type { Props, ToastType } from "./Toast.types";
import type { IconName } from "../../core/Icon/Icon.types";
import { keyframes } from "@emotion/react";

const slideIn = keyframes`
  from {
    transform: translateX(100%);
    opacity: 0;
  }
  to {
    transform: translateX(0);
    opacity: 1;
  }
`;

const slideOut = keyframes`
  from {
    transform: translateX(0);
    opacity: 1;
  }
  to {
    transform: translateX(100%);
    opacity: 0;
  }
`;

const ToastTypeIcon: Record<ToastType, IconName> = {
  success: "ToastSuccess",
  error: "ToastError",
  warning: "ToastWarning",
  info: "ToastInfo"
};

const Component = styled.div<Omit<Props, "$label"> & { $isClosing?: boolean }>`
  display: inline-flex;
  align-items: center;
  gap: 40px;
  padding: 19px 88px 19px 24px;
  box-shadow: 0px 4px 20px rgba(112, 144, 176, 0.12);
  border-radius: 16px;
  min-width: 341px;
  max-width: 500px;
  background-color: ${({ theme }) => theme.color.grayScale[10]};
  animation: ${({ $isClosing }) => ($isClosing ? slideOut : slideIn)} 0.3s
    ease-in-out forwards;
`;

const TextWrapper = styled.div`
  flex: 1;
  word-break: break-word;
  overflow-wrap: break-word;
  white-space: normal;
`;

export const Toast = ({ $label, $type, $isClosing }: Props) => {
  const iconName = ToastTypeIcon[$type];

  return (
    <Component role="alert" $type={$type} $isClosing={$isClosing}>
      <Icon icon={iconName} size={24} fillColor="white" aria-label={iconName} />
      <TextWrapper>
        <Text $size="body1" $weight="regular">
          {$label}
        </Text>
      </TextWrapper>
    </Component>
  );
};
