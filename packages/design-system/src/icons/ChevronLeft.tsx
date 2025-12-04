import type { SVGProps } from "react";
const SvgChevronLeft = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={28}
    height={28}
    fill="none"
    {...props}
  >
    <path d="m11.701 13.993 6.65 6.649a.8.8 0 0 1 .234.539.73.73 0 0 1-.235.569.77.77 0 0 1-.554.25.77.77 0 0 1-.554-.25l-6.872-6.872a1.2 1.2 0 0 1-.287-.419 1.3 1.3 0 0 1-.083-.466q0-.253.083-.467.082-.213.287-.419l6.872-6.871a.8.8 0 0 1 .54-.235.73.73 0 0 1 .568.235q.25.248.25.554a.77.77 0 0 1-.25.554z" />
  </svg>
);
export default SvgChevronLeft;
