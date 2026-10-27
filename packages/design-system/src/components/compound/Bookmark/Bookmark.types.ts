import type { MouseEvent } from "react";

export interface Props {
  $checked: boolean;
  onClick?: (event: MouseEvent<SVGSVGElement>) => void;
}
