import styled from "@emotion/styled";
import { Radio } from "@/components/compound/Radio";
import { type Props } from "./RadioGroup.types";
import { useState } from "react";

const Component = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
`;

const RadioList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

export const RadioGroup = ({ options, onChange }: Props) => {
  const [selectedValue, setSelectedValue] = useState<string | null>(
    options.filter(option => option.checked)[0]?.value || null
  );

  const handleRadioChange = (value: string) => () => {
    const shouldUpdate = onChange?.(value);
    if (shouldUpdate !== false) {
      setSelectedValue(value);
    }
  };

  return (
    <Component role="radiogroup">
      <RadioList>
        {options.map(option => (
          <Radio
            key={option.value}
            label={option.label}
            $checked={selectedValue === option.value}
            onChange={handleRadioChange(option.value)}
          />
        ))}
      </RadioList>
    </Component>
  );
};
