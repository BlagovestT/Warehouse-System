import OrderItemModel, { OrderItemAttributes } from "./order-item.model.js";
import { BaseService } from "../utils/base.service.js";

type CreateOrderItemData = Pick<
  OrderItemAttributes,
  "orderId" | "productId" | "quantity" | "modifiedBy"
>;
type UpdateOrderItemData = Pick<
  OrderItemAttributes,
  "productId" | "quantity" | "modifiedBy"
>;

class OrderItemService extends BaseService<OrderItemModel> {
  constructor(orderItemModel: typeof OrderItemModel = OrderItemModel) {
    super(orderItemModel);
  }

  protected getEntityName(): string {
    return "Order item";
  }

  async getAllOrderItems() {
    return this.getAll();
  }

  async getOrderItemById(id: string) {
    return this.getById(id);
  }

  async deleteOrderItem(id: string) {
    return this.deleteById(id);
  }

  async createOrderItem(orderItemData: CreateOrderItemData) {
    const { orderId, productId } = orderItemData;

    const existingOrderItem = await this.model.findOne({
      where: { orderId, productId },
    });

    if (existingOrderItem) {
      throw new Error("Product already exists in this order");
    }

    return await this.model.create(orderItemData);
  }

  async updateOrderItem(id: string, updateData: UpdateOrderItemData) {
    const { productId } = updateData;

    const orderItem = await this.getById(id);

    if (productId !== orderItem.productId) {
      const existingOrderItem = await this.model.findOne({
        where: { orderId: orderItem.orderId, productId },
      });

      if (existingOrderItem) {
        throw new Error("Product already exists in this order");
      }
    }

    await orderItem.update(updateData);
    return orderItem;
  }
}

export default OrderItemService;
