import type { SVGProps } from "react";
const SvgRegister = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 20 20"
    {...props}
  >
    <path
      fill="none"
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={1.5}
      d="m7.5 10.625 2.5 2.5m0 0 2.5-2.5m-2.5 2.5v-6.25M17.5 10a7.5 7.5 0 1 1-15 0 7.5 7.5 0 0 1 15 0"
    />
  </svg>
);
export default SvgRegister;
