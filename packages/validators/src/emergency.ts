import { z } from "zod";
import { periodSchema } from "./period.js";

export const emergencyFilterSchema = z.object({
  period: periodSchema,
  callIds: z.array(z.number()),
  riskIds: z.array(z.number()),
});
