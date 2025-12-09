import { StrictMode } from "react";
import * as ReactDOM from "react-dom/client";
import App from "./App";
import { JOBISDesignSystem } from "@jobis/design-system";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);

root.render(
  <StrictMode>
    <JOBISDesignSystem>
      <App />
    </JOBISDesignSystem>
  </StrictMode>
);
