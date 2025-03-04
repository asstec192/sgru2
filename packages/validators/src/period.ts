import { z } from "zod";

export const periodSchema = z.object({
  from: z.coerce.date(),
  to: z.coerce.date(),
});

export type Period = z.infer<typeof periodSchema>;
