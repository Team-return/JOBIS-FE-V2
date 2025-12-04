import { StrictMode } from "react";
import { BrowserRouter } from "react-router-dom";
import * as ReactDOM from "react-dom/client";
import App from "./App";
import { JOBISDesignSystem } from "@jobis/design-system";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);

root.render(
  <StrictMode>
    <JOBISDesignSystem>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </JOBISDesignSystem>
  </StrictMode>
);
