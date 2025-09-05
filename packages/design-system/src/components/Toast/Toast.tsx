import styled from "@emotion/styled";
import { Icon, Text } from "@/components";
import type { Props, ToastType } from "./Toast.types";
import type { IconName } from "../Icon/Icon.types";

const ToastTypeIcon: Record<ToastType, IconName> = {
  success: "ToastSuccess",
  error: "ToastError",
  warning: "ToastWarning",
  info: "ToastInfo"
};
const Component = styled.div<Omit<Props, "$label">>`
  display: inline-flex;
  align-items: center;
  gap: 40px;
  padding: 1px 88px 1px 24px;
  box-shadow: 0px 4px 20px rgba(112, 144, 176, 0.12);
  border-radius: 16px;
`;

export const Toast = ({ $label, $type }: Props) => {
  const iconName = ToastTypeIcon[$type];

  return (
    <Component role="alert" $type={$type}>
      <Icon icon={iconName} size={24} />
      <Text $size="body1" $weight="regular">
        {$label}
      </Text>
    </Component>
  );
};
