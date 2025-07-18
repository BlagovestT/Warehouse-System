import { Router, Request, Response } from "express";
import OrderItemService from "./order-item.service.js";
import { validateData } from "../middleware/validation.middleware.js";
import {
  createOrderItemSchema,
  updateOrderItemSchema,
} from "./order-item.schema.js";
import { handleServiceError } from "../middleware/error-handler.middleware.js";

const router = Router();
const orderItemService = new OrderItemService();

// GET /api/order-item - Get all order items
router.get("/", async (_req: Request, res: Response) => {
  try {
    const orderItems = await orderItemService.getAllOrderItems();
    res.status(200).json(orderItems);
  } catch (error) {
    handleServiceError(error, res, "fetching order items");
  }
});

// GET /api/order-item/:id - Get order item by ID
router.get("/:id", async (req: Request, res: Response) => {
  try {
    const orderItem = await orderItemService.getOrderItemById(req.params.id);
    res.status(200).json(orderItem);
  } catch (error) {
    handleServiceError(error, res, "fetching order item");
  }
});

// POST /api/order-item - Create new order item
router.post(
  "/",
  validateData(createOrderItemSchema),
  async (req: Request, res: Response) => {
    try {
      const newOrderItem = await orderItemService.createOrderItem(req.body);
      res.status(201).json({
        message: "Order item created successfully",
        orderItem: newOrderItem,
      });
    } catch (error) {
      handleServiceError(error, res, "creating order item");
    }
  }
);

// PUT /api/order-item/:id - Update order item
router.put(
  "/:id",
  validateData(updateOrderItemSchema),
  async (req: Request, res: Response) => {
    try {
      const updatedOrderItem = await orderItemService.updateOrderItem(
        req.params.id,
        req.body
      );
      res.status(200).json({
        message: "Order item updated successfully",
        orderItem: updatedOrderItem,
      });
    } catch (error) {
      handleServiceError(error, res, "updating order item");
    }
  }
);

// DELETE /api/order-item/:id - Delete order item
router.delete("/:id", async (req: Request, res: Response) => {
  try {
    const result = await orderItemService.deleteOrderItem(req.params.id);
    res.status(200).json(result);
  } catch (error) {
    handleServiceError(error, res, "deleting order item");
  }
});

export default router;
