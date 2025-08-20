import "@emotion/react";
import { JOBISTheme } from "./themes";

declare module "@emotion/react" {
  // eslint-disable-next-line @typescript-eslint/no-empty-object-type
  export interface Theme extends JOBISTheme {}
}
