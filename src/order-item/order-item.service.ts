import OrderItemModel from "./order-item.model.js";

class OrderItemService {
  private orderItemModel: typeof OrderItemModel;

  constructor(orderItemModel: typeof OrderItemModel = OrderItemModel) {
    this.orderItemModel = orderItemModel;
  }

  // Get all order items
  async getAllOrderItems() {
    const result = await this.orderItemModel.findAll();

    if (!result) {
      throw new Error("No order items found");
    }
    return result;
  }

  // Get order item by ID
  async getOrderItemById(id: string) {
    const orderItem = await this.orderItemModel.findByPk(id);

    if (!orderItem) {
      throw new Error("Order item not found");
    }

    return orderItem;
  }

  // Create a new order item
  async createOrderItem(orderItemData: {
    orderId: string;
    productId: string;
    quantity: number;
    modifiedBy: string;
  }) {
    const { orderId, productId, quantity, modifiedBy } = orderItemData;

    // Check if this product already exists in the order
    const existingOrderItem = await this.orderItemModel.findOne({
      where: { orderId, productId },
    });

    if (existingOrderItem) {
      throw new Error("Product already exists in this order");
    }

    return await this.orderItemModel.create({
      orderId,
      productId,
      quantity,
      modifiedBy,
    });
  }

  // Update order item by ID
  async updateOrderItem(
    id: string,
    updateData: {
      productId: string;
      quantity: number;
      modifiedBy: string;
    }
  ) {
    const { productId, quantity, modifiedBy } = updateData;
    const orderItem = await this.orderItemModel.findByPk(id);

    if (!orderItem) {
      throw new Error("Order item not found");
    }

    await orderItem.update({ productId, quantity, modifiedBy });
    return orderItem;
  }

  // Delete order item by ID
  async deleteOrderItem(id: string) {
    const orderItem = await this.orderItemModel.findByPk(id);

    if (!orderItem) {
      throw new Error("Order item not found");
    }

    await orderItem.destroy();
    return { message: "Order item deleted successfully" };
  }
}

export default OrderItemService;
