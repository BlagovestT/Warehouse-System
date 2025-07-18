import { Router, Request, Response } from "express";
import OrderService from "./order.service.js";
import { createOrderSchema, updateOrderSchema } from "./order.schema.js";
import { validateData } from "../middleware/validation.middleware.js";
import { handleServiceError } from "../middleware/error-handler.middleware.js";

const router = Router();
const orderService = new OrderService();

// GET /api/order - Get all orders
router.get("/", async (_req: Request, res: Response) => {
  try {
    const orders = await orderService.getAllOrders();
    res.status(200).json(orders);
  } catch (error) {
    handleServiceError(error, res, "fetching orders");
  }
});

// GET /api/order/:id - Get order by ID
router.get("/:id", async (req: Request, res: Response) => {
  try {
    const order = await orderService.getOrderById(req.params.id);
    res.status(200).json(order);
  } catch (error) {
    handleServiceError(error, res, "fetching order");
  }
});

// POST /api/order - Create new order
router.post(
  "/",
  validateData(createOrderSchema),
  async (req: Request, res: Response) => {
    try {
      const newOrder = await orderService.createOrder(req.body);
      res
        .status(201)
        .json({ message: "Order created successfully", order: newOrder });
    } catch (error) {
      handleServiceError(error, res, "creating order");
    }
  }
);

// PUT /api/order/:id - Update order
router.put(
  "/:id",
  validateData(updateOrderSchema),
  async (req: Request, res: Response) => {
    try {
      const updatedOrder = await orderService.updateOrder(
        req.params.id,
        req.body
      );
      res
        .status(200)
        .json({ message: "Order updated successfully", order: updatedOrder });
    } catch (error) {
      handleServiceError(error, res, "updating order");
    }
  }
);

// DELETE /api/order/:id - Delete order
router.delete("/:id", async (req: Request, res: Response) => {
  try {
    const result = await orderService.deleteOrder(req.params.id);
    res.status(200).json(result);
  } catch (error) {
    handleServiceError(error, res, "deleting order");
  }
});

export default router;
