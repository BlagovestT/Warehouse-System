import InvoiceModel, { InvoiceAttributes } from "./invoice.model.js";
import { BaseService } from "../utils/base.service.js";

type CreateInvoiceData = Pick<
  InvoiceAttributes,
  "companyId" | "orderId" | "invoiceNumber" | "date" | "modifiedBy"
>;
type UpdateInvoiceData = Pick<
  InvoiceAttributes,
  "orderId" | "invoiceNumber" | "date" | "modifiedBy"
>;

class InvoiceService extends BaseService<InvoiceModel> {
  constructor(invoiceModel: typeof InvoiceModel = InvoiceModel) {
    super(invoiceModel);
  }

  protected getEntityName(): string {
    return "Invoice";
  }

  async getAllInvoices() {
    return this.getAll();
  }

  async getInvoiceById(id: string) {
    return this.getById(id);
  }

  async deleteInvoice(id: string) {
    return this.deleteById(id);
  }

  async createInvoice(invoiceData: CreateInvoiceData) {
    const { orderId, invoiceNumber } = invoiceData;

    const existingInvoice = await this.model.findOne({
      where: { invoiceNumber },
    });

    if (existingInvoice) {
      throw new Error("Invoice already exists");
    }

    const existingOrderInvoice = await this.model.findOne({
      where: { orderId },
    });

    if (existingOrderInvoice) {
      throw new Error("Order already has an invoice");
    }

    return await this.model.create(invoiceData);
  }

  async updateInvoice(id: string, updateData: UpdateInvoiceData) {
    const { orderId, invoiceNumber, date, modifiedBy } = updateData;

    const invoice = await this.getById(id);

    if (invoiceNumber !== invoice.invoiceNumber) {
      const existingInvoice = await this.model.findOne({
        where: { invoiceNumber },
      });

      if (existingInvoice) {
        throw new Error("Invoice number already exists");
      }
    }

    if (orderId !== invoice.orderId) {
      const existingOrderInvoice = await this.model.findOne({
        where: { orderId },
      });

      if (existingOrderInvoice) {
        throw new Error("Order already has an invoice");
      }
    }

    await invoice.update({ orderId, invoiceNumber, date, modifiedBy });
    return invoice;
  }
}

export default InvoiceService;
