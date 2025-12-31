import type { SVGProps } from "react";
const SvgEdit = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    fill="currentColor"
    viewBox="0 0 28 28"
    {...props}
  >
    <path d="M5.865 23.237a.89.89 0 0 1-.852-.25.89.89 0 0 1-.25-.852l.752-3.657 4.007 4.007zm4.543-1.508-4.137-4.137L18.36 5.524q.537-.536 1.327-.536t1.326.536l1.463 1.463q.536.535.536 1.326 0 .79-.537 1.325z" />
  </svg>
);
export default SvgEdit;
