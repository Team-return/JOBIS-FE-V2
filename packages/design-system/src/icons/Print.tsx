import type { SVGProps } from "react";
const SvgPrint = (props: SVGProps<SVGSVGElement>) => (
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
      d="M5.6 11.524q-.3.038-.6.08m.6-.08a35.3 35.3 0 0 1 8.8 0m-8.8 0L5.283 15m9.117-3.476q.3.038.6.08m-.6-.08L14.717 15l.19 2.102a.936.936 0 0 1-.933 1.023H6.026a.937.937 0 0 1-.933-1.023L5.283 15m0 0h-.908A1.875 1.875 0 0 1 2.5 13.125V7.88c0-.9.64-1.68 1.53-1.812q.795-.12 1.595-.206M14.715 15h.91a1.875 1.875 0 0 0 1.875-1.875V7.88c0-.9-.64-1.68-1.53-1.812q-.795-.12-1.595-.206m0 0a40.5 40.5 0 0 0-8.75 0m8.75 0v-3.05a.94.94 0 0 0-.937-.937H6.562a.94.94 0 0 0-.937.938v3.049M15 8.75h.007v.007H15zm-2.5 0h.007v.007H12.5z"
    />
  </svg>
);
export default SvgPrint;
