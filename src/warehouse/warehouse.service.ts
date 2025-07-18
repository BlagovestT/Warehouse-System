import WarehouseModel, { WarehouseAttributes } from "./warehouse.model.js";
import { BaseService } from "../utils/base.service.js";
import { QueryTypes } from "sequelize";

type CreateWarehouseData = Pick<
  WarehouseAttributes,
  "companyId" | "supportType" | "name" | "modifiedBy"
>;
type UpdateWarehouseData = Pick<
  WarehouseAttributes,
  "supportType" | "name" | "modifiedBy"
>;

class WarehouseService extends BaseService<WarehouseModel> {
  constructor(warehouseModel: typeof WarehouseModel = WarehouseModel) {
    super(warehouseModel);
  }

  protected getEntityName(): string {
    return "Warehouse";
  }

  // Alias methods to maintain existing API
  async getAllWarehouses() {
    return this.getAll();
  }

  async getWarehouseById(id: string) {
    return this.getById(id);
  }

  async deleteWarehouse(id: string) {
    return this.deleteById(id);
  }

  async createWarehouse(warehouseData: CreateWarehouseData) {
    const { name, companyId } = warehouseData;

    const existingWarehouse = await this.model.findOne({
      where: { name, companyId },
    });

    if (existingWarehouse) {
      throw new Error("Warehouse already exists");
    }

    return await this.model.create(warehouseData);
  }

  async updateWarehouse(id: string, updateData: UpdateWarehouseData) {
    const warehouse = await this.getById(id); // Reuse base method

    await warehouse.update(updateData);
    return warehouse;
  }

  async getProductWithHighestStock() {
    const sequelize = this.model.sequelize;

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
