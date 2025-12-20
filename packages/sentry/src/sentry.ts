import type { Extras } from "@sentry/core";
import * as Sentry from "@sentry/react";

const IS_PRODUCTION = import.meta.env.MODE === "production";
const IS_STAGING = import.meta.env.MODE === "staging";
const BASE_URL = import.meta.env.BASE_URL;

const PERFORMANCE_THRESHOLDS = {
  SLOW_API: 2000,
  SLOW_RENDER: 100
};

const SENTRY_SAMPLING = {
  TRACES: IS_PRODUCTION ? 0.1 : 1.0,
  REPLAYS_SESSION: IS_PRODUCTION ? 0.1 : 1.0,
  REPLAYS_ERROR: 1.0,
  PROFILES: IS_PRODUCTION ? 0.1 : 1.0
};

const SENTRY_TARGETS = ["localhost", new RegExp(`^${BASE_URL}`)];

const ERROR_IGNORE_PATTERNS = [
  /NetworkError/i,
  /Failed to fetch/i,
  /Non-Error promise rejection captured/i,
  /Loading chunk \d+ failed/i,
  /ChunkLoadError/i,
  /Script error\./i,
  /ResizeObserver loop limit exceeded/i,
  /Cancelled/i,
  /Network request failed/i,
  /Load failed/i,
  /The operation was aborted/i,
  /AbortError/i
];

const ERROR_IGNORE_URLS = [
  /extensions\//i,
  /^chrome:\/\//i,
  /^moz-extension:\/\//i,
  /^safari-extension:\/\//i
];

interface CustomContext extends Extras {
  feature?: string;
  userAction?: string;
  apiEndpoint?: string;
  componentName?: string;
  businessContext?: Record<string, unknown>;
}

const shouldIgnoreError = (error: Error, event?: Sentry.Event): boolean => {
  const message = error.message || "";
  const stack = error.stack || "";
  const filename =
    event?.exception?.values?.[0]?.stacktrace?.frames?.[0]?.filename || "";

  if (
    ERROR_IGNORE_PATTERNS.some(
      pattern => pattern.test(message) || pattern.test(stack)
    )
  ) {
    return true;
  }

  if (ERROR_IGNORE_URLS.some(pattern => pattern.test(filename))) {
    return true;
  }

  if (
    error.name === "SecurityError" ||
    error.name === "NotAllowedError" ||
    error.name === "NotSupportedError"
  ) {
    return true;
  }

  return false;
};

export const init = ({
  dsn,
  release,
  environment,
  userId
}: {
  dsn: string;
  release: string;
  environment: string;
  userId?: string;
}) => {
  Sentry.init({
    dsn,
    release,
    environment,
    enabled: IS_PRODUCTION || IS_STAGING,
    dist: import.meta.env.APP_DIST,

    integrations: [
      Sentry.browserTracingIntegration({
        enableLongTask: true,
        enableInp: true
      }),
      Sentry.replayIntegration({
        maskAllText: false,
        maskAllInputs: false,
        blockAllMedia: false,
        networkDetailAllowUrls: SENTRY_TARGETS
      }),
      Sentry.httpClientIntegration({
        failedRequestStatusCodes: [[400, 599]],
        failedRequestTargets: SENTRY_TARGETS
      }),
      Sentry.contextLinesIntegration()
    ],

    tracesSampleRate: SENTRY_SAMPLING.TRACES,
    tracePropagationTargets: SENTRY_TARGETS,

    replaysSessionSampleRate: SENTRY_SAMPLING.REPLAYS_SESSION,
    replaysOnErrorSampleRate: SENTRY_SAMPLING.REPLAYS_ERROR,

    profilesSampleRate: SENTRY_SAMPLING.PROFILES,

    debug: IS_STAGING,

    beforeSend(event, hint) {
      if (IS_STAGING) return event;

      const error = hint.originalException;
      if (error instanceof Error) {
        if (shouldIgnoreError(error, event)) {
          return null;
        }
      }

      if (
        event.request?.url &&
        ERROR_IGNORE_URLS.some(pattern => pattern.test(event.request!.url!))
      ) {
        return null;
      }

      if (event.logger === "console" && event.level === "warning") {
        return null;
      }

      return event;
    },

    beforeSendTransaction(event) {
      if (IS_STAGING) return event;

      if (event.timestamp && event.start_timestamp) {
        const duration = event.timestamp - event.start_timestamp;
        if (duration < 0.01) return null;
      }

      const transactionName = event.transaction;
      if (
        transactionName &&
        (transactionName.includes("/assets/") ||
          transactionName.includes("/static/") ||
          transactionName.includes("favicon.ico"))
      ) {
        return null;
      }

      return event;
    }
  });

  if (userId) {
    setUser({ id: userId });
  }
};

export const setUser = (user: {
  id?: string;
  email?: string;
  username?: string;
  role?: string;
  subscription?: string;
}) => {
  if (!(IS_PRODUCTION || IS_STAGING)) {
    console.log("[SENTRY] User set:", user);
    return;
  }

  Sentry.setUser(user);
  Sentry.setContext("user_details", {
    role: user.role,
    subscription: user.subscription,
    hasEmail: !!user.email
  });
};

export const logger = {
  info: (message: string, context?: CustomContext) => {
    if (!IS_PRODUCTION) {
      console.log(`[INFO] ${message}`, context);
      return;
    }

    Sentry.addBreadcrumb({
      message,
      level: "info",
      data: context,
      timestamp: Date.now() / 1000
    });

    Sentry.captureMessage(message, {
      level: "info",
      extra: context,
      tags: {
        feature: context?.feature,
        userAction: context?.userAction
      }
    });
  },

  warn: (message: string, context?: CustomContext) => {
    if (!IS_PRODUCTION) {
      console.warn(`[WARN] ${message}`, context);
      return;
    }

    Sentry.captureMessage(message, {
      level: "warning",
      extra: context,
      tags: {
        feature: context?.feature,
        userAction: context?.userAction
      }
    });
  },

  error: (error: Error | string, context?: CustomContext) => {
    if (!IS_PRODUCTION) {
      console.error(`[ERROR]`, error, context);
      return;
    }

    if (typeof error === "string") {
      Sentry.captureMessage(error, {
        level: "error",
        extra: context,
        tags: {
          feature: context?.feature,
          userAction: context?.userAction
        }
      });
    } else {
      Sentry.captureException(error, {
        extra: context,
        tags: {
          feature: context?.feature,
          userAction: context?.userAction
        }
      });
    }
  },

  debug: (message: string, context?: CustomContext) => {
    if (IS_STAGING) {
      console.debug(`[DEBUG] ${message}`, context);
    }

    Sentry.addBreadcrumb({
      message,
      level: "debug",
      data: context,
      timestamp: Date.now() / 1000
    });
  }
};

export const perf = {
  trackApiCall: async <T>(
    endpoint: string,
    apiCall: () => Promise<T>,
    context?: CustomContext
  ): Promise<T> => {
    const result = await Sentry.startSpanManual<Promise<T>>(
      {
        name: `API: ${endpoint}`,
        op: "http.client",
        attributes: {
          endpoint,
          feature: context?.feature
        }
      },
      async () => {
        const startTime = performance.now();

        return await Sentry.startSpan(
          {
            name: endpoint,
            op: "http.client"
          },
          async span => {
            try {
              const result = await apiCall();
              const duration = performance.now() - startTime;

              span.setStatus({ code: 1, message: "ok" });
              span.setAttribute("duration", duration);

              if (duration > PERFORMANCE_THRESHOLDS.SLOW_API) {
                logger.warn("Slow API call detected", {
                  ...context,
                  apiEndpoint: endpoint,
                  duration
                });
              }
              return result;
            } catch (error) {
              span.setStatus({ code: 2, message: "internal_error" });
              logger.error(error as Error, {
                ...context,
                apiEndpoint: endpoint
              });
              throw error;
            } finally {
              span.end();
            }
          }
        );
      }
    );
    return result;
  },

  trackRender: (componentName: string, renderFn: () => void) => {
    const startTime = performance.now();

    Sentry.startSpan(
      {
        name: `Render: ${componentName}`,
        op: "react.render"
      },
      span => {
        try {
          renderFn();
          const duration = performance.now() - startTime;

          if (duration > PERFORMANCE_THRESHOLDS.SLOW_RENDER) {
            logger.warn("Slow render detected", {
              componentName,
              duration
            });
          }
        } catch (error) {
          span.setStatus({ code: 2, message: "internal_error" });
          throw error;
        }
      }
    );
  }
};

export const analytics = {
  trackUserAction: (action: string, context?: CustomContext) => {
    Sentry.addBreadcrumb({
      message: `User Action: ${action}`,
      level: "info",
      category: "user.action",
      data: context,
      timestamp: Date.now() / 1000
    });

    if (IS_PRODUCTION) {
      Sentry.setTag("lastUserAction", action);
      if (context?.feature) {
        Sentry.setTag("activeFeature", context.feature);
      }
    }
  },

  trackPageView: (pageName: string, context?: CustomContext) => {
    const pageSpan = Sentry.startInactiveSpan({
      name: `Page: ${pageName}`,
      op: "navigation",
      attributes: {
        page: pageName,
        feature: context?.feature
      }
    });

    Sentry.addBreadcrumb({
      message: `Page View: ${pageName}`,
      level: "info",
      category: "navigation",
      data: context
    });

    Sentry.setContext("page", {
      name: pageName,
      timestamp: new Date().toISOString(),
      ...context
    });

    return () => {
      pageSpan.end();
      Sentry.setContext("page", null);
    };
  },

  trackBusinessEvent: (eventName: string, data: Record<string, unknown>) => {
    logger.info(`Business Event: ${eventName}`, {
      businessContext: data
    });

    Sentry.addBreadcrumb({
      message: eventName,
      level: "info",
      category: "business.event",
      data
    });
  }
};

window.addEventListener("unhandledrejection", event => {
  logger.error(new Error(`Unhandled Promise Rejection: ${event.reason}`), {
    userAction: "unhandled_promise_rejection"
  });
});
