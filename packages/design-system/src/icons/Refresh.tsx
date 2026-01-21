import type { SVGProps } from "react";
const SvgRefresh = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 20 20"
    {...props}
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={1.5}
      d="M13.353 7.79h4.16l-2.651-2.653A6.875 6.875 0 0 0 3.359 8.221m-.871 8.149v-4.16m0 0h4.16m-4.16 0 2.65 2.652A6.874 6.874 0 0 0 16.64 11.78m.872-8.149v4.158"
    />
  </svg>
);
export default SvgRefresh;
