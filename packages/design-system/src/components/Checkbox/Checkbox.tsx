import styled from "@emotion/styled";
import { Text } from "@/components";
import { type Props } from "./Checkbox.types";

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

const StyledCheckbox = styled.div<Pick<Props, "$checked">>`
  position: relative;
  width: 18px;
  height: 18px;
  border-radius: 6px;
  border: 2px solid
    ${({ theme, $checked }) =>
      $checked ? theme.color.primary[20] : theme.color.grayScale[40]};
  background-color: ${({ theme, $checked }) =>
    $checked ? theme.color.primary[20] : "transparent"};
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
`;

const CheckIcon = styled.svg`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  pointer-events: none;
`;

export const Checkbox = ({ label, $checked = false, onChange }: Props) => {
  const handleToggle = () => onChange?.(!$checked);

  return (
    <Component
      type="button"
      role="checkbox"
      aria-checked={$checked}
      onClick={handleToggle}
    >
      <StyledCheckbox $checked={$checked}>
        {$checked && (
          <CheckIcon
            width="10"
            height="10"
            viewBox="0 0 10 10"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M1.25 5.375L4.25 8.375L8.75 1.625"
              stroke="white"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </CheckIcon>
        )}
      </StyledCheckbox>
      {label && (
        <Text $span $size="body1" $weight="regular">
          {label}
        </Text>
      )}
    </Component>
  );
};
