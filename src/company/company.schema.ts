import { z } from "zod";

export const createCompanySchema = z.object({
  name: z
    .string()
    .min(1, "required")
    .max(100, "must be less than 100 characters")
    .trim(),
  modifiedBy: z.uuid("must be a valid UUID"),
});

export const updateCompanySchema = z.object({
  name: z
    .string()
    .min(1, "required")
    .max(100, "must be less than 100 characters")
    .trim(),
});
