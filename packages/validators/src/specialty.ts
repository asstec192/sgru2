import { z } from "zod";

export const createSpecialtySchema = z.object({
  description: z.string(),
});

export const updateSpecialtySchema = createSpecialtySchema.partial();

export type CreateSpecialtySchema = z.infer<typeof createSpecialtySchema>;
export type UpdateSpecialtySchema = z.infer<typeof updateSpecialtySchema>;
