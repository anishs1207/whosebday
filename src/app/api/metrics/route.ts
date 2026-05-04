import { register, httpRequestCounter } from "@/lib/metrics"

/**
 * GET handler for /api/metrics
 * Exposes Prometheus metrics for scraping by importing the centralized registry.
 */
export async function GET() {
  // Update internal hits for the metrics endpoint itself
  httpRequestCounter.inc({ method: "GET", route: "/api/metrics", status_code: "200" })
  
  return new Response(await register.metrics(), {
    headers: {
      "Content-Type": register.contentType,
      "Cache-Control": "no-store, no-cache, must-revalidate",
    },
  })
}