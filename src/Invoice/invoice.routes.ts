import { Router, Request, Response } from "express";
import { validateData } from "../middleware/validation.middleware.js";
import { createInvoiceSchema, updateInvoiceSchema } from "./invoice.schema.js";
import InvoiceService from "./invoice.service.js";
import { handleServiceError } from "../middleware/error-handler.middleware.js";

const router = Router();
const invoiceService = new InvoiceService();

// GET /api/invoice - Get all invoices
router.get("/", async (_req: Request, res: Response) => {
  try {
    const invoices = await invoiceService.getAllInvoices();
    res.status(200).json(invoices);
  } catch (error) {
    handleServiceError(error, res, "fetching invoices");
  }
});

// GET /api/invoice/:id - Get invoice by ID
router.get("/:id", async (req: Request, res: Response) => {
  try {
    const invoice = await invoiceService.getInvoiceById(req.params.id);
    res.status(200).json(invoice);
  } catch (error) {
    handleServiceError(error, res, "fetching invoice");
  }
});

// POST /api/invoice - Create new invoice
router.post(
  "/",
  validateData(createInvoiceSchema),
  async (req: Request, res: Response) => {
    try {
      // Convert date string to Date object
      const invoiceData = {
        ...req.body,
        date: new Date(req.body.date),
      };

      const newInvoice = await invoiceService.createInvoice(invoiceData);
      res
        .status(201)
        .json({ message: "Invoice created successfully", invoice: newInvoice });
    } catch (error) {
      handleServiceError(error, res, "creating invoice");
    }
  }
);

// PUT /api/invoice/:id - Update invoice
router.put(
  "/:id",
  validateData(updateInvoiceSchema),
  async (req: Request, res: Response) => {
    try {
      // Convert date string to Date object
      const updateData = {
        ...req.body,
        date: new Date(req.body.date),
      };

      const updatedInvoice = await invoiceService.updateInvoice(
        req.params.id,
        updateData
      );
      res.status(200).json({
        message: "Invoice updated successfully",
        invoice: updatedInvoice,
      });
    } catch (error) {
      handleServiceError(error, res, "updating invoice");
    }
  }
);

// DELETE /api/invoice/:id - Delete invoice
router.delete("/:id", async (req: Request, res: Response) => {
  try {
    const result = await invoiceService.deleteInvoice(req.params.id);
    res.status(200).json(result);
  } catch (error) {
    handleServiceError(error, res, "deleting invoice");
  }
});

export default router;
