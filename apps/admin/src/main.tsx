import { StrictMode } from "react";
import * as ReactDOM from "react-dom/client";
import App from "./App";
import { JOBISDesignSystem } from "@jobis/design-system";
import { QueryProvider } from "@jobis/api";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);

root.render(
  <StrictMode>
    <QueryProvider>
      <JOBISDesignSystem>
        <App />
      </JOBISDesignSystem>
    </QueryProvider>
  </StrictMode>
);
