import styled from "@emotion/styled";
import { Text } from "@/components";
import { type Props } from "./Radio.types";

const Component = styled.button`
  display: inline-flex;
  align-items: center;
  gap: 10px;
  cursor: pointer;
  position: relative;
  background: none;
  border: none;
  padding: 0;
  text-align: left;

  &:hover div::before {
    transform: translate(-50%, -50%) scale(1);
  }
`;

const StyledRadio = styled.div<Pick<Props, "$checked">>`
  position: relative;
  width: 16px;
  height: 16px;
  border-radius: 50%;
  border: 2px solid
    ${({ theme, $checked }) =>
      $checked ? theme.color.primary[20] : theme.color.grayScale[40]};
  transition:
    border-color 0.2s ease-in-out,
    background-color 0.2s ease-in-out;

  &::before {
    content: "";
    position: absolute;
    top: 50%;
    left: 50%;
    width: 32px;
    height: 32px;
    border-radius: 50%;
    background-color: ${({ theme }) => theme.color.subColor.blue[10]};
    transform: translate(-50%, -50%) scale(0);
    transition: transform 0.3s ease;
    z-index: -1;
  }

  &::after {
    content: "";
    position: absolute;
    top: 50%;
    left: 50%;
    width: 12px;
    height: 12px;
    border-radius: 6px;
    background-color: ${({ theme }) => theme.color.primary[20]};
    transform: ${({ $checked }) =>
      $checked
        ? "translate(-50%, -50%) scale(1)"
        : "translate(-50%, -50%) scale(0)"};
    transition: transform 0.2s ease-in-out;
  }
`;

export const Radio = ({ label, $checked = false, onChange }: Props) => {
  const handleToggle = () => onChange?.(!$checked);

  return (
    <Component
      type="button"
      role="radio"
      aria-checked={$checked}
      onClick={handleToggle}
    >
      <StyledRadio $checked={$checked} />
      {label && (
        <Text $span $size="body1" $weight="regular">
          {label}
        </Text>
      )}
    </Component>
  );
};
