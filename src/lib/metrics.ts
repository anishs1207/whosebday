import client from "prom-client"

/**
 * Prometheus Registry
 * We use a singleton pattern to ensure metrics are only registered once.
 */
const register = new client.Registry()

register.setDefaultLabels({
  app: "whosebday-api",
})

// Enable the collection of default metrics (CPU, memory, etc.)
client.collectDefaultMetrics({ register })

// --- Infrastructure Metrics ---

export const httpRequestCounter = new client.Counter({
  name: "http_requests_total",
  help: "Total number of HTTP requests",
  labelNames: ["method", "route", "status_code"],
})

export const httpRequestDurationHistogram = new client.Histogram({
  name: "http_request_duration_seconds",
  help: "Duration of HTTP requests in seconds",
  labelNames: ["method", "route", "status_code"],
  buckets: [0.01, 0.05, 0.1, 0.5, 1, 2, 5, 10],
})

// --- Database & Cache Metrics ---

export const dbQueryDurationHistogram = new client.Histogram({
  name: "db_query_duration_seconds",
  help: "Duration of database queries in seconds",
  labelNames: ["operation", "model", "status"],
  buckets: [0.001, 0.005, 0.01, 0.05, 0.1, 0.5, 1],
})

export const cacheHitsCounter = new client.Counter({
  name: "cache_hits_total",
  help: "Total number of cache hits",
  labelNames: ["cache_type"],
})

export const cacheMissesCounter = new client.Counter({
  name: "cache_misses_total",
  help: "Total number of cache misses",
  labelNames: ["cache_type"],
})

// --- Business / Domain Metrics ---

export const birthdaysTotalGauge = new client.Gauge({
  name: "birthdays_total",
  help: "Total number of birthdays tracked in the system",
})

export const emailSentCounter = new client.Counter({
  name: "email_sent_total",
  help: "Total number of birthday notification emails sent",
  labelNames: ["status"],
})

export const stripeEventsCounter = new client.Counter({
  name: "stripe_webhooks_total",
  help: "Total number of Stripe webhooks received",
  labelNames: ["event_type", "status"],
})

export const authEventsCounter = new client.Counter({
  name: "auth_events_total",
  help: "Total number of authentication events",
  labelNames: ["event", "provider"],
})

// --- System State Metrics ---

export const activeSessionsGauge = new client.Gauge({
  name: "active_sessions",
  help: "Number of currently active user sessions",
})

export const dbConnectionGauge = new client.Gauge({
  name: "db_connections_active",
  help: "Number of active database connections",
})

// Register all metrics with the registry
const metrics = [
  httpRequestCounter,
  httpRequestDurationHistogram,
  dbQueryDurationHistogram,
  cacheHitsCounter,
  cacheMissesCounter,
  birthdaysTotalGauge,
  emailSentCounter,
  stripeEventsCounter,
  authEventsCounter,
  activeSessionsGauge,
  dbConnectionGauge,
]

metrics.forEach(m => {
  try {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    register.registerMetric(m as any)
  } catch {
    // During hot-reloading, metrics might already be registered
    // We catch the error to prevent the app from crashing
  }
})

export { register }
