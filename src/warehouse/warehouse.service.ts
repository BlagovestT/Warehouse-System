import WarehouseModel from "./warehouse.model.js";

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
}

export default WarehouseService;
