import { z } from "zod";

export const createEquipmentSchema = z.object({
  description: z.string(),
});

export const updateEquipmentSchema = createEquipmentSchema.partial();

export type CreateEquipmentSchema = z.infer<typeof createEquipmentSchema>;
export type UpdateEquipmentSchema = z.infer<typeof updateEquipmentSchema>;
