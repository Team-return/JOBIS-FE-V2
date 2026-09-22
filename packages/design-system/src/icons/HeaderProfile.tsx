import type { SVGProps } from "react";
const SvgHeaderProfile = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 28 28"
    {...props}
  >
    <circle cx={14} cy={14} r={14} fill="#D9D9D9" />
    <path
      fill="#fff"
      d="M17.125 9a3.125 3.125 0 1 1-6.25 0 3.125 3.125 0 0 1 6.25 0M7.751 20.765a6.25 6.25 0 0 1 12.498 0A14.95 14.95 0 0 1 14 22.125c-2.23 0-4.347-.487-6.25-1.36"
    />
  </svg>
);
export default SvgHeaderProfile;
