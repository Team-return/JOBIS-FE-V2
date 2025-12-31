import type { SVGProps } from "react";
const SvgPlus = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    fill="currentColor"
    viewBox="0 0 28 28"
    {...props}
  >
    <path d="M13.417 14.583H7.583a.56.56 0 0 1-.415-.168A.57.57 0 0 1 7 14q0-.248.168-.415a.56.56 0 0 1 .415-.167h5.834V7.583q0-.247.168-.415A.57.57 0 0 1 14 7q.248 0 .415.168.168.168.167.415v5.834h5.834q.247 0 .415.168T21 14a.56.56 0 0 1-.168.415.57.57 0 0 1-.415.167h-5.834v5.834a.56.56 0 0 1-.168.415A.57.57 0 0 1 14 21a.56.56 0 0 1-.415-.168.57.57 0 0 1-.167-.415z" />
  </svg>
);
export default SvgPlus;
