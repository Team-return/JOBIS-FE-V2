import { Props } from "./MyComponent.types";
import styled from "@emotion/styled";

const Component = styled.div<Pick<Props, "$variant">>`
  padding: 12px 24px;
  border-radius: 8px;
  font-size: 16px;
  font-weight: 500;
  cursor: pointer;
  transition: background-color 0.3s ease;

  ${({ $variant = "default", theme }) => {
    switch ($variant) {
      case "primary":
        return `
          background-color: ${theme.color.primary[20]};
          color: #fff;
          border: none;
          &:hover {
            background-color: #0056b3;
          }
        `;
      case "secondary":
        return `
          background-color: ${theme.color.subColor.blue[30]};
          color: #fff;
          border: none;
          &:hover {
            background-color: #545b62;
          }
        `;
      case "default":
      default:
        return `
          background-color: #f0f0f0;
          color: #333;
          border: 1px solid #ccc;
          &:hover {
            background-color: #e0e0e0;
          }
        `;
    }
  }}
`;

export const MyComponent = ({ text, $variant, onClick }: Props) => {
  return (
    <Component $variant={$variant} onClick={onClick}>
      {text}
    </Component>
  );
};
