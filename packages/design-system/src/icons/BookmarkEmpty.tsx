import type { SVGProps } from "react";
const SvgBookmarkEmpty = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={28}
    height={28}
    fill="none"
    {...props}
  >
    <path d="m14 19.744-4.362 1.875q-.942.407-1.79-.156Q7 20.902 7 19.894V6.552q0-.806.54-1.346t1.345-.54h10.23q.806 0 1.345.54.54.54.54 1.345v13.343q0 1.008-.848 1.57-.848.561-1.79.155zm0-1.31 4.824 2.081q.358.158.684-.067a.7.7 0 0 0 .325-.605V6.552a.69.69 0 0 0-.224-.494.69.69 0 0 0-.494-.225H8.885a.69.69 0 0 0-.494.225.69.69 0 0 0-.224.494v13.29a.7.7 0 0 0 .325.606q.325.225.684.067zm0-12.6H8.167h11.666z" />
  </svg>
);
export default SvgBookmarkEmpty;
