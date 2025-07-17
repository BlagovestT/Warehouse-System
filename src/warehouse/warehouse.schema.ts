import { z } from "zod";

export const createWarehouseSchema = z.object({
  companyId: z.uuid(),
  supportType: z.enum(["solid", "liquid", "mixed"]),
  name: z.string().min(1).max(100).trim(),
  modifiedBy: z.uuid(),
});

export const updateWarehouseSchema = z.object({
  supportType: z.enum(["solid", "liquid", "mixed"]),
  name: z.string().min(1).max(100).trim(),
  modifiedBy: z.uuid(),
});
