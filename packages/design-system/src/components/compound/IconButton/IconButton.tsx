import styled from "@emotion/styled";
import { Props } from "./IconButton.types";
import { Icon, Text } from "@/components/core";
import { Flex } from "@/components/primitive";
import { useTheme } from "@/hooks";

const Component = styled.div<Pick<Props, "$width" | "$color">>`
  cursor: pointer;
  padding: 8px 0;
  border-radius: 8px;
  width: ${({ $width }) => ($width ? $width : "123px")};
  border: 1px solid ${({ $color, theme }) => $color || theme.color.primary[20]};
`;

export const IconButton = ({
  $width,
  $color,
  icon,
  onClick,
  children
}: Props) => {
  const { currentTheme: theme } = useTheme();
  const defaultColor = $color || theme.color.primary[20];

  return (
    <Component $width={$width} $color={$color} onClick={onClick}>
      <Flex $gap="8px" $align="center" $justify="center">
        <Icon strokeColor={defaultColor} fillColor={defaultColor} icon={icon} />
        <Text $size="body3" $color={defaultColor}>
          {children}
        </Text>
      </Flex>
    </Component>
  );
};
