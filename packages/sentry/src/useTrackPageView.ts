import { useEffect } from "react";
import { analytics } from "./sentry";

export const useTrackPageView = (pageName: string) => {
  useEffect(() => {
    const cleanup = analytics.trackPageView(pageName);

    return cleanup;
  }, [pageName]);
};
