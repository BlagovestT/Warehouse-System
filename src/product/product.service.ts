import ProductModel, { ProductAttributes } from "./product.model.js";
import { BaseService } from "../utils/base.service.js";
import { QueryTypes } from "sequelize";

type CreateProductData = Pick<
  ProductAttributes,
  "companyId" | "name" | "price" | "type" | "modifiedBy"
>;
type UpdateProductData = Pick<
  ProductAttributes,
  "name" | "price" | "type" | "modifiedBy"
>;

class ProductService extends BaseService<ProductModel> {
  constructor(productModel: typeof ProductModel = ProductModel) {
    super(productModel);
  }

  protected getEntityName(): string {
    return "Product";
  }

  async getAllProducts() {
    return this.getAll();
  }

  async getProductById(id: string) {
    return this.getById(id);
  }

  async deleteProduct(id: string) {
    return this.deleteById(id);
  }

  async createProduct(productData: CreateProductData) {
    const { name, companyId } = productData;

    const existingProduct = await this.model.findOne({
      where: { name, companyId },
    });

    if (existingProduct) {
      throw new Error("Product already exists");
    }

    return await this.model.create(productData);
  }

  async updateProduct(id: string, updateData: UpdateProductData) {
    const { name } = updateData;

    const product = await this.getById(id);

    if (name !== product.name) {
      const existingProduct = await this.model.findOne({
        where: { name, companyId: product.companyId },
      });

      if (existingProduct) {
        throw new Error("Product name already exists");
      }
    }

    await product.update(updateData);
    return product;
  }

  async getBestSellingProducts() {
    const sequelize = this.model.sequelize;

    if (!sequelize) {
      throw new Error("Database connection not available");
    }

    const result = await sequelize.query(
      `
      SELECT
        product."name" AS "productName",
        product."price",
        company."name" AS "companyName",
        SUM(order_item."quantity") AS "totalSold"
      FROM "product"
      JOIN "order_item" ON order_item."productId" = product."id"
      JOIN "order" ON order_item."orderId" = "order"."id"
      JOIN "company" ON product."companyId" = company."id"
      WHERE
        "order"."type" = 'shipment'
        AND product."deletedAt" IS NULL
        AND order_item."deletedAt" IS NULL
        AND "order"."deletedAt" IS NULL
        AND company."deletedAt" IS NULL
      GROUP BY product."name", product."price", company."name"
      ORDER BY "totalSold" DESC
      LIMIT 1
      `,
      {
        type: QueryTypes.SELECT,
      }
    );

    return result[0];
  }
}

export default ProductService;
