import { StrictMode } from "react";
import { BrowserRouter } from "react-router-dom";
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
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </JOBISDesignSystem>
    </QueryProvider>
  </StrictMode>
);
