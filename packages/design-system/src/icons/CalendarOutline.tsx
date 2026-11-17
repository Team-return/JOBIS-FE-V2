import type { SVGProps } from "react";
const SvgCalendarOutline = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
    {...props}
  >
    <g>
      <path
        fill="none"
        stroke="#444"
        strokeLinecap="round"
        strokeWidth={1.5}
        d="M4.8 11.2h14.4m-9.6 4h4.8M8.8 4.8V8m6.4-3.2V8M8 19.2h8c1.509 0 2.263 0 2.731-.469.469-.468.469-1.223.469-2.731v-5.6c0-1.508 0-2.263-.469-2.731C18.263 7.2 17.508 7.2 16 7.2H8c-1.508 0-2.263 0-2.731.469C4.8 8.137 4.8 8.892 4.8 10.4V16c0 1.509 0 2.263.469 2.731.468.469 1.223.469 2.731.469Z"
      />
    </g>
  </svg>
);
export default SvgCalendarOutline;
