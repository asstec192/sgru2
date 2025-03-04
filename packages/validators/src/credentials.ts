import { z } from "zod";

export const credentialsSchema = z.object({
  username: z.string().min(6),
  password: z.string().min(8),
});

export type CredentialsSchema = z.infer<typeof credentialsSchema>;
