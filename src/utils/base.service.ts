import { Model, ModelStatic } from "sequelize";

export abstract class BaseService<T extends Model> {
  protected model: ModelStatic<T>;

  constructor(model: ModelStatic<T>) {
    this.model = model;
  }

  // Common CRUD operations
  async getAll(): Promise<T[]> {
    const result = await this.model.findAll();
    if (!result) {
      throw new Error(`No ${this.getEntityName()} found`);
    }
    console.log(result.map((item) => item.toJSON()));
    return result;
  }

  async getById(id: string): Promise<T> {
    const entity = await this.model.findByPk(id);
    if (!entity) {
      throw new Error(`${this.getEntityName()} not found`);
    }
    return entity;
  }

  async deleteById(id: string): Promise<{ message: string }> {
    const entity = await this.model.findByPk(id);
    if (!entity) {
      throw new Error(`${this.getEntityName()} not found`);
    }
    await entity.destroy();
    return { message: `${this.getEntityName()} deleted successfully` };
  }

  // Abstract method to get entity name for error msg
  protected abstract getEntityName(): string;
}
