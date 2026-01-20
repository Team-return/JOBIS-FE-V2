import type { SVGProps } from "react";
const SvgCompany = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    fill="currentColor"
    viewBox="0 0 20 20"
    {...props}
  >
    <path
      stroke="#2F53FF"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={1.5}
      d="M3.125 17.5h13.75M3.75 2.5h12.5m-11.875 0v15m11.25-15v15M7.5 5.625h1.25m-1.25 2.5h1.25m-1.25 2.5h1.25m2.5-5h1.25m-1.25 2.5h1.25m-1.25 2.5h1.25m-5 6.875v-2.812c0-.518.42-.938.938-.938h3.124c.518 0 .938.42.938.938V17.5"
    />
  </svg>
);
export default SvgCompany;
