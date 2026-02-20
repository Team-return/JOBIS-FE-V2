import { StrictMode } from "react";
import * as ReactDOM from "react-dom/client";
import App from "./App";
import { JOBISDesignSystem } from "@jobis/design-system";
import { QueryProvider, setConfig } from "@jobis/api";
import { init } from "@jobis/sentry";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);

const SENTRY_DSN = import.meta.env.SENTRY_DSN;
if (SENTRY_DSN) {
  init({
    dsn: SENTRY_DSN,
    release: `jobis-company@${import.meta.env.VERSION}`,
    environment: import.meta.env.MODE
  });
}

setConfig({
  onTokenExpired: () => {
    window.location.href = "/login";
  }
});

root.render(
  <StrictMode>
    <QueryProvider>
      <JOBISDesignSystem>
        <App />
      </JOBISDesignSystem>
    </QueryProvider>
  </StrictMode>
);
