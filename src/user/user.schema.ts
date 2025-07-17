import { z } from "zod";

export const createUserSchema = z.object({
  companyId: z.uuid(),
  username: z.string().min(3).max(50).trim(),
  email: z.email(),
  password: z.string().min(6),
});

export const updateUserSchema = z.object({
  username: z.string().min(3).max(50).trim(),
  email: z.email(),
  password: z.string().min(6),
});
