import OrderModel from "./order.model.js";

class OrderService {
  private orderModel: typeof OrderModel;

  constructor(orderModel: typeof OrderModel = OrderModel) {
    this.orderModel = orderModel;
  }

  // Get all orders
  async getAllOrders() {
    const result = await this.orderModel.findAll();

    if (!result) {
      throw new Error("No orders found");
    }
    return result;
  }

  // Get order by ID
  async getOrderById(id: string) {
    const order = await this.orderModel.findByPk(id);

    if (!order) {
      throw new Error("Order not found");
    }

    return order;
  }

  // Create a new order
  async createOrder(orderData: {
    companyId: string;
    warehouseId: string;
    businessPartnerId: string;
    orderNumber: string;
    type: "shipment" | "delivery";
    modifiedBy: string;
  }) {
    const {
      companyId,
      warehouseId,
      businessPartnerId,
      orderNumber,
      type,
      modifiedBy,
    } = orderData;

    const existingOrder = await this.orderModel.findOne({
      where: { orderNumber },
    });

    if (existingOrder) {
      throw new Error("Order already exists");
    }

    return await this.orderModel.create({
      companyId,
      warehouseId,
      businessPartnerId,
      orderNumber,
      type,
      modifiedBy,
    });
  }

  // Update order by ID
  async updateOrder(
    id: string,
    updateData: {
      warehouseId: string;
      businessPartnerId: string;
      orderNumber: string;
      type: "shipment" | "delivery";
      modifiedBy: string;
    }
  ) {
    const { warehouseId, businessPartnerId, orderNumber, type, modifiedBy } =
      updateData;

    const order = await this.orderModel.findByPk(id);

    if (!order) {
      throw new Error("Order not found");
    }

    await order.update({
      warehouseId,
      businessPartnerId,
      orderNumber,
      type,
      modifiedBy,
    });
    return order;
  }

  // Delete order by ID
  async deleteOrder(id: string) {
    const order = await this.orderModel.findByPk(id);

    if (!order) {
      throw new Error("Order not found");
    }

    await order.destroy();
    return { message: "Order deleted successfully" };
  }
}

export default OrderService;
