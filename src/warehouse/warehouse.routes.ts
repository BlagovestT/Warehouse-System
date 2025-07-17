import { Router, Request, Response } from "express";
import WarehouseService from "./warehouse.service.js";
import { validateData } from "../middleware/validation.middleware.js";
import {
  createWarehouseSchema,
  updateWarehouseSchema,
} from "./warehouse.schema.js";

const router = Router();
const warehouseService = new WarehouseService();

// GET /api/warehouse - Get all warehouses
router.get("/", async (_req: Request, res: Response) => {
  try {
    const warehouses = await warehouseService.getAllWarehouses();
    res.status(200).json(warehouses);
  } catch (error) {
    console.error("Error fetching warehouses:", error);
    res.status(500).json({ message: "Error fetching warehouses" });
  }
});

// GET /api/warehouse/:id - Get warehouse by ID
router.get("/:id", async (req: Request, res: Response) => {
  try {
    const warehouse = await warehouseService.getWarehouseById(req.params.id);
    res.status(200).json(warehouse);
  } catch (error) {
    console.error("Error fetching warehouse:", error);

    if (error instanceof Error && error.message === "Warehouse not found") {
      return res.status(404).json({ message: "Warehouse not found" });
    }

    res.status(500).json({ message: "Error fetching warehouse" });
  }
});

// POST /api/warehouse - Create new warehouse
router.post(
  "/",
  validateData(createWarehouseSchema),
  async (req: Request, res: Response) => {
    try {
      const { companyId, supportType, name, modifiedBy } = req.body;

      const newWarehouse = await warehouseService.createWarehouse({
        companyId,
        supportType,
        name,
        modifiedBy,
      });
      res.status(201).json({
        message: "Warehouse created successfully",
        warehouse: newWarehouse,
      });
    } catch (error) {
      console.error("Error creating warehouse:", error);

      if (
        error instanceof Error &&
        error.message === "Warehouse already exists"
      ) {
        return res.status(400).json({ message: "Warehouse already exists" });
      }

      res.status(500).json({ message: "Error creating warehouse" });
    }
  }
);

// PUT /api/warehouse/:id - Update warehouse
router.put(
  "/:id",
  validateData(updateWarehouseSchema),
  async (req: Request, res: Response) => {
    try {
      const { supportType, name, modifiedBy } = req.body;

      const updatedWarehouse = await warehouseService.updateWarehouse(
        req.params.id,
        {
          supportType,
          name,
          modifiedBy,
        }
      );
      res.status(200).json({
        message: "Warehouse updated successfully",
        warehouse: updatedWarehouse,
      });
    } catch (error) {
      console.error("Error updating warehouse:", error);

      if (error instanceof Error && error.message === "Warehouse not found") {
        return res.status(404).json({ message: "Warehouse not found" });
      }

      res.status(500).json({ message: "Error updating warehouse" });
    }
  }
);

// DELETE /api/warehouse/:id - Delete warehouse
router.delete("/:id", async (req: Request, res: Response) => {
  try {
    const result = await warehouseService.deleteWarehouse(req.params.id);
    res.status(200).json(result);
  } catch (error) {
    console.error("Error deleting warehouse:", error);

    if (error instanceof Error && error.message === "Warehouse not found") {
      return res.status(404).json({ message: "Warehouse not found" });
    }

    res.status(500).json({ message: "Error deleting warehouse" });
  }
});

export default router;
