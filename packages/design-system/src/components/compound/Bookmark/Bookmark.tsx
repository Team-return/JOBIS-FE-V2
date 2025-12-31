import styled from "@emotion/styled";
import type { Props } from "./Bookmark.types";

const Component = styled.svg<Pick<Props, "$checked">>`
  width: 24px;
  height: 24px;
  cursor: pointer;
  transition: all 0.2s ease;
  color: ${({ $checked, theme }) =>
    $checked ? theme.color.primary[20] : theme.color.grayScale[60]};

  &:hover {
    color: ${({ $checked, theme }) =>
      $checked ? theme.color.primary[20] : "rgba(35, 123, 201, 0.5)"};
  }

  &:active {
    color: ${({ theme }) => theme.color.primary[20]};
  }
`;

export const Bookmark = ({ $checked, onClick }: Props) => {
  return (
    <Component
      aria-label="bookmark"
      role="button"
      viewBox="0 0 24 24"
      $checked={$checked}
      onClick={onClick}
      aria-pressed={$checked}
      xmlns="http://www.w3.org/2000/svg"
    >
      {$checked ? (
        <path
          d="M8 3.5H16C17.3807 3.5 18.5 4.61929 18.5 6V20.1387L12.248 16.5654C12.1137 16.4887 11.9526 16.4797 11.8115 16.5371L11.752 16.5654L5.5 20.1387V6C5.5 4.61929 6.61929 3.5 8 3.5Z"
          fill="currentColor"
        />
      ) : (
        <path
          d="M8 3.5H16C17.3807 3.5 18.5 4.61929 18.5 6V20.1387L12.248 16.5654C12.1137 16.4887 11.9526 16.4797 11.8115 16.5371L11.752 16.5654L5.5 20.1387V6C5.5 4.61929 6.61929 3.5 8 3.5Z"
          stroke="currentColor"
          strokeWidth="1.5"
          fill="none"
          strokeLinejoin="round"
        />
      )}
    </Component>
  );
};
