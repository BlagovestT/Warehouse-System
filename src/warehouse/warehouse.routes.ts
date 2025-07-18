import { Router, Request, Response } from "express";
import WarehouseService from "./warehouse.service.js";
import { validateData } from "../middleware/validation.middleware.js";
import {
  createWarehouseSchema,
  updateWarehouseSchema,
} from "./warehouse.schema.js";
import { handleServiceError } from "../middleware/error-handler.middleware.js";

const router = Router();
const warehouseService = new WarehouseService();

// GET /api/warehouse - Get all warehouses
router.get("/", async (_req: Request, res: Response) => {
  try {
    const warehouses = await warehouseService.getAllWarehouses();
    res.status(200).json(warehouses);
  } catch (error) {
    handleServiceError(error, res, "fetching warehouses");
  }
});

// GET /api/warehouse/highest-stock - Get product with highest stock
router.get("/highest-stock", async (_req: Request, res: Response) => {
  try {
    const highestStock = await warehouseService.getProductWithHighestStock();
    res.status(200).json({
      message: "Product with highest stock retrieved successfully",
      data: highestStock,
    });
  } catch (error) {
    handleServiceError(error, res, "fetching highest stock product");
  }
});

// GET /api/warehouse/:id - Get warehouse by ID
router.get("/:id", async (req: Request, res: Response) => {
  try {
    const warehouse = await warehouseService.getWarehouseById(req.params.id);
    res.status(200).json(warehouse);
  } catch (error) {
    handleServiceError(error, res, "fetching warehouse");
  }
});

// POST /api/warehouse - Create new warehouse
router.post(
  "/",
  validateData(createWarehouseSchema),
  async (req: Request, res: Response) => {
    try {
      const newWarehouse = await warehouseService.createWarehouse(req.body);
      res.status(201).json({
        message: "Warehouse created successfully",
        warehouse: newWarehouse,
      });
    } catch (error) {
      handleServiceError(error, res, "creating warehouse");
    }
  }
);

// PUT /api/warehouse/:id - Update warehouse
router.put(
  "/:id",
  validateData(updateWarehouseSchema),
  async (req: Request, res: Response) => {
    try {
      const updatedWarehouse = await warehouseService.updateWarehouse(
        req.params.id,
        req.body
      );
      res.status(200).json({
        message: "Warehouse updated successfully",
        warehouse: updatedWarehouse,
      });
    } catch (error) {
      handleServiceError(error, res, "updating warehouse");
    }
  }
);

// DELETE /api/warehouse/:id - Delete warehouse
router.delete("/:id", async (req: Request, res: Response) => {
  try {
    const result = await warehouseService.deleteWarehouse(req.params.id);
    res.status(200).json(result);
  } catch (error) {
    handleServiceError(error, res, "deleting warehouse");
  }
});

export default router;
