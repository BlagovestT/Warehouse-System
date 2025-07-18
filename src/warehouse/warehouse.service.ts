import WarehouseModel from "./warehouse.model.js";
import { QueryTypes } from "sequelize";

class WarehouseService {
  private warehouseModel: typeof WarehouseModel;

  constructor(warehouseModel: typeof WarehouseModel = WarehouseModel) {
    this.warehouseModel = warehouseModel;
  }

  // Get all warehouses
  async getAllWarehouses() {
    const result = await this.warehouseModel.findAll();

    if (!result) {
      throw new Error("No warehouses found");
    }
    return result;
  }

  // Get warehouse by ID
  async getWarehouseById(id: string) {
    const warehouse = await this.warehouseModel.findByPk(id);

    if (!warehouse) {
      throw new Error("Warehouse not found");
    }

    return warehouse;
  }

  // Create a new warehouse
  async createWarehouse(warehouseData: {
    companyId: string;
    supportType: "solid" | "liquid" | "mixed";
    name: string;
    modifiedBy: string;
  }) {
    const { companyId, supportType, name, modifiedBy } = warehouseData;

    const existingWarehouse = await this.warehouseModel.findOne({
      where: { name, companyId },
    });

    if (existingWarehouse) {
      throw new Error("Warehouse already exists");
    }

    return await this.warehouseModel.create({
      companyId,
      supportType,
      name,
      modifiedBy,
    });
  }

  // Update warehouse by ID
  async updateWarehouse(
    id: string,
    updateData: {
      supportType: "solid" | "liquid" | "mixed";
      name: string;
      modifiedBy: string;
    }
  ) {
    const { supportType, name, modifiedBy } = updateData;
    const warehouse = await this.warehouseModel.findByPk(id);

    if (!warehouse) {
      throw new Error("Warehouse not found");
    }

    await warehouse.update({ supportType, name, modifiedBy });
    return warehouse;
  }

  // Delete warehouse by ID
  async deleteWarehouse(id: string) {
    const warehouse = await this.warehouseModel.findByPk(id);

    if (!warehouse) {
      throw new Error("Warehouse not found");
    }

    await warehouse.destroy();
    return { message: "Warehouse deleted successfully" };
  }

  // Get product with highest stock
  async getProductWithHighestStock() {
    const sequelize = this.warehouseModel.sequelize;

    if (!sequelize) {
      throw new Error("Database connection not available");
    }

    const result = await sequelize.query(
      `
      WITH stock_level AS (
        SELECT
          warehouse."name" AS warehouse_name,
          product."name" AS product_name,
          SUM(CASE WHEN "order"."type" = 'delivery' THEN order_item."quantity" ELSE 0 END) -
          SUM(CASE WHEN "order"."type" = 'shipment' THEN order_item."quantity" ELSE 0 END) AS current_stock
        FROM "warehouse"
        JOIN "order" ON "order"."warehouseId" = warehouse."id"
        JOIN "order_item" ON order_item."orderId" = "order"."id"
        JOIN "product" ON order_item."productId" = product."id"
        WHERE
          product."deletedAt" IS NULL
          AND warehouse."deletedAt" IS NULL
          AND "order"."deletedAt" IS NULL
          AND order_item."deletedAt" IS NULL
        GROUP BY warehouse."name", product."name"
        HAVING
          SUM(CASE WHEN "order"."type" = 'delivery' THEN order_item."quantity" ELSE 0 END) -
          SUM(CASE WHEN "order"."type" = 'shipment' THEN order_item."quantity" ELSE 0 END) > 0
        ORDER BY warehouse_name, current_stock DESC
      )
      SELECT
        warehouse_name AS "warehouse",
        MIN(product_name) AS "productName",
        MAX(current_stock) AS "currentStock"
      FROM stock_level
      GROUP BY warehouse_name
      ORDER BY "currentStock" DESC
      LIMIT 1
      `,
      {
        type: QueryTypes.SELECT,
      }
    );

    return result;
  }
}

export default WarehouseService;
