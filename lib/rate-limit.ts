import { Ratelimit } from "@upstash/ratelimit";
import { Redis } from "@upstash/redis";
import type { NextRequest } from "next/server";

type RateLimitType = "analyze-brief" | "generate-site";

const redis = Redis.fromEnv();

const analyzeBriefLimiter = new Ratelimit({
  redis,
  limiter: Ratelimit.slidingWindow(5, "10 m"),
  analytics: true,
  prefix: "tokokumaju:analyze-brief",
});

const generateSiteLimiter = new Ratelimit({
  redis,
  limiter: Ratelimit.slidingWindow(3, "10 m"),
  analytics: true,
  prefix: "tokokumaju:generate-site",
});

function getClientIp(request: NextRequest) {
  const forwardedFor = request.headers.get("x-forwarded-for");
  const realIp = request.headers.get("x-real-ip");

  if (forwardedFor) {
    return forwardedFor.split(",")[0]?.trim() || "unknown";
  }

  if (realIp) {
    return realIp;
  }

  return "unknown";
}

export async function checkRateLimit(
  request: NextRequest,
  type: RateLimitType
) {
  const ip = getClientIp(request);
  const identifier = `${type}:${ip}`;

  const limiter =
    type === "analyze-brief" ? analyzeBriefLimiter : generateSiteLimiter;

  return limiter.limit(identifier);
}