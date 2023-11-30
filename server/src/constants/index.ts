import { getEnvs } from "@/utils/getEnv";
import rateLimit from "express-rate-limit";

export const PORT = parseInt(getEnvs("PORT"));
export const SYSTEM_NAME = "System";

export const LIMITER = rateLimit({
  windowMs: 1 * 60 * 1000,
  limit: 10,
  keyGenerator: function (req) {
    return (req.clientIp || req.ip) as string;
  },
});
