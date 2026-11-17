import type { SVGProps } from "react";
const SvgTilde = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 48"
    {...props}
  >
    <g>
      <path
        fill="none"
        stroke="#7F7F7F"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M5.998 24c.984-1.968 3.607-2.393 5.163-.838l.661.662a3.898 3.898 0 0 0 5.873-.416l.307-.408"
      />
    </g>
  </svg>
);
export default SvgTilde;
