import { z } from "zod";

export const createInvoiceSchema = z.object({
  companyId: z.uuid(),
  orderId: z.uuid(),
  invoiceNumber: z.string().min(1).max(50).trim(),
  date: z.date(),
  modifiedBy: z.uuid(),
});

export const updateInvoiceSchema = z.object({
  orderId: z.uuid(),
  invoiceNumber: z.string().min(1).max(50).trim(),
  date: z.date(),
  modifiedBy: z.uuid(),
});
