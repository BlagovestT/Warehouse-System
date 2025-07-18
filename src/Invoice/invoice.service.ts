import InvoiceModel from "./invoice.model.js";
import InvoiceAttributes from "./invoice.model.js";

class InvoiceService {
  private invoiceModel: typeof InvoiceModel;

  constructor(invoiceModel: typeof InvoiceModel = InvoiceModel) {
    this.invoiceModel = invoiceModel;
  }

  // Get all invoices
  async getAllInvoices() {
    const result = await this.invoiceModel.findAll();

    if (!result) {
      throw new Error("No invoices found");
    }
    return result;
  }

  // Get invoice by ID
  async getInvoiceById(id: string) {
    const invoice = await this.invoiceModel.findByPk(id);

    if (!invoice) {
      throw new Error("Invoice not found");
    }

    return invoice;
  }

  // Create a new invoice
  async createInvoice(invoiceData: InvoiceAttributes) {
    const { companyId, orderId, invoiceNumber, date, modifiedBy } = invoiceData;

    const existingInvoice = await this.invoiceModel.findOne({
      where: { invoiceNumber },
    });

    if (existingInvoice) {
      throw new Error("Invoice already exists");
    }

    // Check if order already has an invoice (one-to-one relationship)
    const existingOrderInvoice = await this.invoiceModel.findOne({
      where: { orderId },
    });

    if (existingOrderInvoice) {
      throw new Error("Order already has an invoice");
    }

    return await this.invoiceModel.create({
      companyId,
      orderId,
      invoiceNumber,
      date,
      modifiedBy,
    });
  }

  // Update invoice by ID
  async updateInvoice(
    id: string,
    updateData: {
      orderId: string;
      invoiceNumber: string;
      date: Date;
      modifiedBy: string;
    }
  ) {
    const { orderId, invoiceNumber, date, modifiedBy } = updateData;
    const invoice = await this.invoiceModel.findByPk(id);

    if (!invoice) {
      throw new Error("Invoice not found");
    }

    // Check if invoiceNumber is being changed and if it already exists
    if (invoiceNumber !== invoice.invoiceNumber) {
      const existingInvoice = await this.invoiceModel.findOne({
        where: { invoiceNumber },
      });

      if (existingInvoice) {
        throw new Error("Invoice number already exists");
      }
    }

    // Check if orderId is being changed and if the new order already has an invoice
    if (orderId !== invoice.orderId) {
      const existingOrderInvoice = await this.invoiceModel.findOne({
        where: { orderId },
      });

      if (existingOrderInvoice) {
        throw new Error("Order already has an invoice");
      }
    }

    await invoice.update({ orderId, invoiceNumber, date, modifiedBy });
    return invoice;
  }

  // Delete invoice by ID
  async deleteInvoice(id: string) {
    const invoice = await this.invoiceModel.findByPk(id);

    if (!invoice) {
      throw new Error("Invoice not found");
    }

    await invoice.destroy();
    return { message: "Invoice deleted successfully" };
  }
}

export default InvoiceService;
