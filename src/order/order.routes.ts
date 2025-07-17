import { Router, Request, Response } from "express";
import OrderService from "./order.service.js";
import { createOrderSchema, updateOrderSchema } from "./order.schema.js";
import { validateData } from "../middleware/validation.middleware.js";

const router = Router();
const orderService = new OrderService();

// GET /api/order - Get all orders
router.get("/", async (_req: Request, res: Response) => {
  try {
    const orders = await orderService.getAllOrders();
    res.status(200).json(orders);
  } catch (error) {
    console.error("Error fetching orders:", error);
    res.status(500).json({ message: "Error fetching orders" });
  }
});

// GET /api/order/:id - Get order by ID
router.get("/:id", async (req: Request, res: Response) => {
  try {
    const order = await orderService.getOrderById(req.params.id);
    res.status(200).json(order);
  } catch (error) {
    console.error("Error fetching order:", error);

    if (error instanceof Error && error.message === "Order not found") {
      return res.status(404).json({ message: "Order not found" });
    }

    res.status(500).json({ message: "Error fetching order" });
  }
});

// POST /api/order - Create new order
router.post(
  "/",
  validateData(createOrderSchema),
  async (req: Request, res: Response) => {
    try {
      const {
        companyId,
        warehouseId,
        businessPartnerId,
        orderNumber,
        type,
        modifiedBy,
      } = req.body;

      const newOrder = await orderService.createOrder({
        companyId,
        warehouseId,
        businessPartnerId,
        orderNumber,
        type,
        modifiedBy,
      });
      res
        .status(201)
        .json({ message: "Order created successfully", order: newOrder });
    } catch (error) {
      console.error("Error creating order:", error);

      if (error instanceof Error && error.message === "Order already exists") {
        return res.status(400).json({ message: "Order already exists" });
      }

      res.status(500).json({ message: "Error creating order" });
    }
  }
);

// PUT /api/order/:id - Update order
router.put(
  "/:id",
  validateData(updateOrderSchema),
  async (req: Request, res: Response) => {
    try {
      const { warehouseId, businessPartnerId, orderNumber, type, modifiedBy } =
        req.body;

      const updatedOrder = await orderService.updateOrder(req.params.id, {
        warehouseId,
        businessPartnerId,
        orderNumber,
        type,
        modifiedBy,
      });
      res
        .status(200)
        .json({ message: "Order updated successfully", order: updatedOrder });
    } catch (error) {
      console.error("Error updating order:", error);

      if (error instanceof Error && error.message === "Order not found") {
        return res.status(404).json({ message: "Order not found" });
      }

      if (
        error instanceof Error &&
        error.message === "Order number already exists"
      ) {
        return res.status(400).json({ message: "Order number already exists" });
      }

      res.status(500).json({ message: "Error updating order" });
    }
  }
);

// DELETE /api/order/:id - Delete order
router.delete("/:id", async (req: Request, res: Response) => {
  try {
    const result = await orderService.deleteOrder(req.params.id);
    res.status(200).json(result);
  } catch (error) {
    console.error("Error deleting order:", error);

    if (error instanceof Error && error.message === "Order not found") {
      return res.status(404).json({ message: "Order not found" });
    }

    res.status(500).json({ message: "Error deleting order" });
  }
});

export default router;
