import type { SVGProps } from "react";
const SvgToastWarning = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    fill="currentColor"
    viewBox="0 0 24 24"
    {...props}
  >
    <path
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={1.5}
      d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.95 3.378c-.866-1.5-3.032-1.5-3.898 0zM12 15.75h.007v.008L12 16z"
    />
  </svg>
);
export default SvgToastWarning;
