import styled from "@emotion/styled";
import { Checkbox } from "@/components/compound/Checkbox";
import { type Props } from "./CheckboxGroup.types";
import { useState } from "react";

const Component = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
`;

const CheckboxList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

export const CheckboxGroup = ({ options, onChange }: Props) => {
  const [checkedValues, setCheckedValues] = useState<string[]>(
    options.filter(option => option.checked).map(option => option.value)
  );

  const handleCheckboxChange = (value: string) => (isChecked: boolean) => {
    const newCheckedValues = isChecked
      ? [...checkedValues, value]
      : checkedValues.filter(v => v !== value);

    const shouldUpdate = onChange?.(newCheckedValues);
    if (shouldUpdate !== false) {
      setCheckedValues(newCheckedValues);
    }
  };

  return (
    <Component role="group">
      <CheckboxList>
        {options.map(option => (
          <Checkbox
            key={option.value}
            label={option.label}
            $checked={checkedValues.includes(option.value)}
            onChange={handleCheckboxChange(option.value)}
          />
        ))}
      </CheckboxList>
    </Component>
  );
};
