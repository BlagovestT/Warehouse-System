import { z } from "zod";

export const createBusinessPartnerSchema = z.object({
  companyId: z.uuid(),
  name: z.string().min(1).max(100).trim(),
  email: z.email(),
  type: z.enum(["customer", "supplier"]),
  modifiedBy: z.uuid(),
});

export const updateBusinessPartnerSchema = z.object({
  name: z.string().min(1).max(100).trim(),
  email: z.email(),
  type: z.enum(["customer", "supplier"]),
  modifiedBy: z.uuid(),
});
