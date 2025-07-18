import OrderModel, { OrderAttributes } from "./order.model.js";
import { BaseService } from "../utils/base.service.js";

type CreateOrderData = Pick<
  OrderAttributes,
  | "companyId"
  | "warehouseId"
  | "businessPartnerId"
  | "orderNumber"
  | "type"
  | "modifiedBy"
>;
type UpdateOrderData = Pick<
  OrderAttributes,
  "warehouseId" | "businessPartnerId" | "orderNumber" | "type" | "modifiedBy"
>;

class OrderService extends BaseService<OrderModel> {
  constructor(orderModel: typeof OrderModel = OrderModel) {
    super(orderModel);
  }

  protected getEntityName(): string {
    return "Order";
  }

  async getAllOrders() {
    return this.getAll();
  }

  async getOrderById(id: string) {
    return this.getById(id);
  }

  async deleteOrder(id: string) {
    return this.deleteById(id);
  }

  async createOrder(orderData: CreateOrderData) {
    const { orderNumber } = orderData;

    const existingOrder = await this.model.findOne({
      where: { orderNumber },
    });

    if (existingOrder) {
      throw new Error("Order already exists");
    }

    return await this.model.create(orderData);
  }

  async updateOrder(id: string, updateData: UpdateOrderData) {
    const { orderNumber } = updateData;

    const order = await this.getById(id);

    if (orderNumber !== order.orderNumber) {
      const existingOrder = await this.model.findOne({
        where: { orderNumber },
      });

      if (existingOrder) {
        throw new Error("Order number already exists");
      }
    }

    await order.update(updateData);
    return order;
  }
}

export default OrderService;
