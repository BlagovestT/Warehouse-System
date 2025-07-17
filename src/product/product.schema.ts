import { z } from "zod";

export const createProductSchema = z.object({
  companyId: z.uuid(),
  name: z.string().min(1).max(100).trim(),
  price: z.number().positive().multipleOf(0.01),
  type: z.enum(["solid", "liquid"]),
  modifiedBy: z.uuid(),
});

export const updateProductSchema = z.object({
  name: z.string().min(1).max(100).trim(),
  price: z.number().positive().multipleOf(0.01),
  type: z.enum(["solid", "liquid"]),
  modifiedBy: z.uuid(),
});
