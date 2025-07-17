import { z } from "zod";

export const createOrderSchema = z.object({
  companyId: z.uuid(),
  warehouseId: z.uuid(),
  businessPartnerId: z.uuid(),
  orderNumber: z.string().min(1).max(50).trim(),
  type: z.enum(["shipment", "delivery"]),
  modifiedBy: z.uuid(),
});

export const updateOrderSchema = z.object({
  warehouseId: z.uuid(),
  businessPartnerId: z.uuid(),
  orderNumber: z.string().min(1).max(50).trim(),
  type: z.enum(["shipment", "delivery"]),
  modifiedBy: z.uuid(),
});
