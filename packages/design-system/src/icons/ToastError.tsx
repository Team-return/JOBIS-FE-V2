import type { SVGProps } from "react";
const SvgToastError = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    fill="currentColor"
    viewBox="0 0 24 24"
    {...props}
  >
    <circle cx={12} cy={12} r={9} stroke="#E74C3C" strokeWidth={2} />
    <path
      stroke="#E74C3C"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M12 12.5v-5M12 16.5V16"
    />
  </svg>
);
export default SvgToastError;
