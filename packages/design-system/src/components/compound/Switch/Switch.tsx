import { Props } from "./Switch.types";
import styled from "@emotion/styled";

const Component = styled.button<Pick<Props, "$checked">>`
  position: relative;
  display: inline-block;
  width: 60px;
  height: 34px;
  border: none;
  cursor: pointer;
  padding: 0;
  background-color: ${({ theme, $checked }) =>
    $checked ? theme.color.primary[20] : theme.color.grayScale[40]};
  transition: background-color 0.4s;
  border-radius: 34px;

  &:before {
    position: absolute;
    content: "";
    height: 26px;
    width: 26px;
    left: ${({ $checked }) => ($checked ? "30px" : "4px")};
    top: 4px;
    background-color: white;
    transition: left 0.2s ease;
    border-radius: 50%;
  }

  &:disabled {
    cursor: not-allowed;
    opacity: 0.6;
  }
`;

export const Switch = ({
  $checked = false,
  onChange,
  disabled = false,
  "aria-label": ariaLabel = "Switch"
}: Props) => {
  const handleToggle = () => onChange?.(!$checked);

  return (
    <Component
      type="button"
      role="switch"
      aria-checked={$checked}
      aria-label={ariaLabel}
      $checked={$checked}
      disabled={disabled}
      onClick={handleToggle}
    />
  );
};
