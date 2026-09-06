import styled from "@emotion/styled";
import { Icon, Text } from "@/components";
import { useTheme } from "@/hooks";
import { parseValue } from "@/utils";
import type { Props } from "./FileUpload.types";

const Component = styled.button<Pick<Props, "$width">>`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 8px;
  width: ${({ $width }) => parseValue($width || "100%")};
  padding: 12px 16px 12px 12px;
  border: 1px solid ${({ theme }) => theme.color.primary[20]};
  border-radius: 8px;
  background-color: ${({ theme }) => theme.color.grayScale[10]};
  cursor: pointer;
  font-family: inherit;

  &:hover {
    background-color: ${({ theme }) => theme.color.primary[10]};
  }

  &:disabled {
    border-color: ${({ theme }) => theme.color.grayScale[50]};
    background-color: ${({ theme }) => theme.color.grayScale[30]};
    cursor: not-allowed;

    & > * {
      color: ${({ theme }) => theme.color.grayScale[50]};
    }
  }
`;

export const FileUpload = ({
  label,
  onClick,
  $width,
  $iconName = "Plus",
  disabled = false
}: Props) => {
  const { currentTheme: theme } = useTheme();
  const color = disabled ? theme.color.grayScale[50] : theme.color.primary[20];

  return (
    <Component
      type="button"
      onClick={onClick}
      $width={$width}
      disabled={disabled}
    >
      <Text $span $size="body2" $weight="regular" $color={color}>
        {label}
      </Text>
      <Icon icon={$iconName} size={24} color={color} />
    </Component>
  );
};
