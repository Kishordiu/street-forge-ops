export function reportAppError(error: unknown, context: Record<string, unknown> = {}) {
  if (typeof window === "undefined") {
    console.error("[app-error]", error, context);
    return;
  }

  console.error("[app-error]", {
    error,
    route: window.location.pathname,
    ...context,
  });
}
