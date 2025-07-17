import { Router, Request, Response } from "express";
import OrderItemService from "./order-item.service.js";
import { validateData } from "../middleware/validation.middleware.js";
import {
  createOrderItemSchema,
  updateOrderItemSchema,
} from "./order-item.schema.js";

const router = Router();
const orderItemService = new OrderItemService();

// GET /api/order-item - Get all order items
router.get("/", async (_req: Request, res: Response) => {
  try {
    const orderItems = await orderItemService.getAllOrderItems();
    res.status(200).json(orderItems);
  } catch (error) {
    console.error("Error fetching order items:", error);
    res.status(500).json({ message: "Error fetching order items" });
  }
});

// GET /api/order-item/:id - Get order item by ID
router.get("/:id", async (req: Request, res: Response) => {
  try {
    const orderItem = await orderItemService.getOrderItemById(req.params.id);
    res.status(200).json(orderItem);
  } catch (error) {
    console.error("Error fetching order item:", error);

    if (error instanceof Error && error.message === "Order item not found") {
      return res.status(404).json({ message: "Order item not found" });
    }

    res.status(500).json({ message: "Error fetching order item" });
  }
});

// POST /api/order-item - Create new order item
router.post(
  "/",
  validateData(createOrderItemSchema),
  async (req: Request, res: Response) => {
    try {
      const { orderId, productId, quantity, modifiedBy } = req.body;

      const newOrderItem = await orderItemService.createOrderItem({
        orderId,
        productId,
        quantity,
        modifiedBy,
      });
      res.status(201).json({
        message: "Order item created successfully",
        orderItem: newOrderItem,
      });
    } catch (error) {
      console.error("Error creating order item:", error);

      if (
        error instanceof Error &&
        error.message === "Product already exists in this order"
      ) {
        return res
          .status(400)
          .json({ message: "Product already exists in this order" });
      }

      res.status(500).json({ message: "Error creating order item" });
    }
  }
);

// PUT /api/order-item/:id - Update order item
router.put(
  "/:id",
  validateData(updateOrderItemSchema),
  async (req: Request, res: Response) => {
    try {
      const { productId, quantity, modifiedBy } = req.body;

      const updatedOrderItem = await orderItemService.updateOrderItem(
        req.params.id,
        {
          productId,
          quantity,
          modifiedBy,
        }
      );
      res.status(200).json({
        message: "Order item updated successfully",
        orderItem: updatedOrderItem,
      });
    } catch (error) {
      console.error("Error updating order item:", error);

      if (error instanceof Error && error.message === "Order item not found") {
        return res.status(404).json({ message: "Order item not found" });
      }

      if (
        error instanceof Error &&
        error.message === "Product already exists in this order"
      ) {
        return res
          .status(400)
          .json({ message: "Product already exists in this order" });
      }

      res.status(500).json({ message: "Error updating order item" });
    }
  }
);

// DELETE /api/order-item/:id - Delete order item
router.delete("/:id", async (req: Request, res: Response) => {
  try {
    const result = await orderItemService.deleteOrderItem(req.params.id);
    res.status(200).json(result);
  } catch (error) {
    console.error("Error deleting order item:", error);

    if (error instanceof Error && error.message === "Order item not found") {
      return res.status(404).json({ message: "Order item not found" });
    }

    res.status(500).json({ message: "Error deleting order item" });
  }
});

export default router;
