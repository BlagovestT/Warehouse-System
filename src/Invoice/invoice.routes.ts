import { Router, Request, Response } from "express";
import { validateData } from "../middleware/validation.middleware.js";
import { createInvoiceSchema, updateInvoiceSchema } from "./invoice.schema.js";
import InvoiceService from "./invoice.service.js";

const router = Router();
const invoiceService = new InvoiceService();

// GET /api/invoice - Get all invoices
router.get("/", async (_req: Request, res: Response) => {
  try {
    const invoices = await invoiceService.getAllInvoices();
    res.status(200).json(invoices);
  } catch (error) {
    console.error("Error fetching invoices:", error);
    res.status(500).json({ message: "Error fetching invoices" });
  }
});

// GET /api/invoice/:id - Get invoice by ID
router.get("/:id", async (req: Request, res: Response) => {
  try {
    const invoice = await invoiceService.getInvoiceById(req.params.id);
    res.status(200).json(invoice);
  } catch (error) {
    console.error("Error fetching invoice:", error);

    if (error instanceof Error && error.message === "Invoice not found") {
      return res.status(404).json({ message: "Invoice not found" });
    }

    res.status(500).json({ message: "Error fetching invoice" });
  }
});

// POST /api/invoice - Create new invoice
router.post(
  "/",
  validateData(createInvoiceSchema),
  async (req: Request, res: Response) => {
    try {
      const { companyId, orderId, invoiceNumber, date, modifiedBy } = req.body;

      // Convert date string to Date object
      const invoiceDate = new Date(date);

      const newInvoice = await invoiceService.createInvoice({
        companyId,
        orderId,
        invoiceNumber,
        date: invoiceDate,
        modifiedBy,
      });
      res
        .status(201)
        .json({ message: "Invoice created successfully", invoice: newInvoice });
    } catch (error) {
      console.error("Error creating invoice:", error);

      if (
        error instanceof Error &&
        error.message === "Invoice already exists"
      ) {
        return res.status(400).json({ message: "Invoice already exists" });
      }

      if (
        error instanceof Error &&
        error.message === "Order already has an invoice"
      ) {
        return res
          .status(400)
          .json({ message: "Order already has an invoice" });
      }

      res.status(500).json({ message: "Error creating invoice" });
    }
  }
);

// PUT /api/invoice/:id - Update invoice
router.put(
  "/:id",
  validateData(updateInvoiceSchema),
  async (req: Request, res: Response) => {
    try {
      const { orderId, invoiceNumber, date, modifiedBy } = req.body;

      // Convert date string to Date object
      const invoiceDate = new Date(date);

      const updatedInvoice = await invoiceService.updateInvoice(req.params.id, {
        orderId,
        invoiceNumber,
        date: invoiceDate,
        modifiedBy,
      });
      res
        .status(200)
        .json({
          message: "Invoice updated successfully",
          invoice: updatedInvoice,
        });
    } catch (error) {
      console.error("Error updating invoice:", error);

      if (error instanceof Error && error.message === "Invoice not found") {
        return res.status(404).json({ message: "Invoice not found" });
      }

      if (
        error instanceof Error &&
        error.message === "Invoice number already exists"
      ) {
        return res
          .status(400)
          .json({ message: "Invoice number already exists" });
      }

      if (
        error instanceof Error &&
        error.message === "Order already has an invoice"
      ) {
        return res
          .status(400)
          .json({ message: "Order already has an invoice" });
      }

      res.status(500).json({ message: "Error updating invoice" });
    }
  }
);

// DELETE /api/invoice/:id - Delete invoice
router.delete("/:id", async (req: Request, res: Response) => {
  try {
    const result = await invoiceService.deleteInvoice(req.params.id);
    res.status(200).json(result);
  } catch (error) {
    console.error("Error deleting invoice:", error);

    if (error instanceof Error && error.message === "Invoice not found") {
      return res.status(404).json({ message: "Invoice not found" });
    }

    res.status(500).json({ message: "Error deleting invoice" });
  }
});

export default router;
