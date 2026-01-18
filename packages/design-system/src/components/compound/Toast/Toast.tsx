import styled from "@emotion/styled";
import { Icon, Text } from "@/components";
import type { Props, ToastType } from "./Toast.types";
import type { IconName } from "../../core/Icon/Icon.types";
import { keyframes } from "@emotion/react";
import { useTheme } from "@/hooks";

const TOAST_TYPE_ICON: Record<ToastType, IconName> = {
  success: "ToastSuccess",
  error: "ToastError",
  warning: "ToastWarning",
  info: "ToastInfo"
};

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
  const iconName = TOAST_TYPE_ICON[$type];
  const { currentTheme: theme } = useTheme();

  const getIconColor = (type: ToastType) => {
    const iconColors = {
      success: theme.color.subColor.green[20],
      error: theme.color.subColor.red[20],
      warning: theme.color.subColor.yellow[20],
      info: theme.color.subColor.blue[30]
    };
    return iconColors[type];
  };

  const iconColor = getIconColor($type);

  return (
    <Component role="alert" $type={$type} $isClosing={$isClosing}>
      <Icon icon={iconName} size={24} color={iconColor} aria-label={iconName} />
      <TextWrapper>
        <Text $size="body1" $weight="regular">
          {$label}
        </Text>
      </TextWrapper>
    </Component>
  );
};
