import ProductModel from "./product.model.js";
import { QueryTypes } from "sequelize";

class ProductService {
  private productModel: typeof ProductModel;

  constructor(productModel: typeof ProductModel = ProductModel) {
    this.productModel = productModel;
  }

  // Get all products
  async getAllProducts() {
    const result = await this.productModel.findAll();

    if (!result) {
      throw new Error("No products found");
    }
    return result;
  }

  // Get product by ID
  async getProductById(id: string) {
    const product = await this.productModel.findByPk(id);

    if (!product) {
      throw new Error("Product not found");
    }

    return product;
  }

  // Create a new product
  async createProduct(productData: {
    companyId: string;
    name: string;
    price: number;
    type: "solid" | "liquid";
    modifiedBy: string;
  }) {
    const { companyId, name, price, type, modifiedBy } = productData;

    const existingProduct = await this.productModel.findOne({
      where: { name, companyId },
    });

    if (existingProduct) {
      throw new Error("Product already exists");
    }

    return await this.productModel.create({
      companyId,
      name,
      price,
      type,
      modifiedBy,
    });
  }

  // Update product by ID
  async updateProduct(
    id: string,
    updateData: {
      name: string;
      price: number;
      type: "solid" | "liquid";
      modifiedBy: string;
    }
  ) {
    const { name, price, type, modifiedBy } = updateData;
    const product = await this.productModel.findByPk(id);

    if (!product) {
      throw new Error("Product not found");
    }

    await product.update({ name, price, type, modifiedBy });
    return product;
  }

  // Delete product by ID
  async deleteProduct(id: string) {
    const product = await this.productModel.findByPk(id);

    if (!product) {
      throw new Error("Product not found");
    }

    await product.destroy();
    return { message: "Product deleted successfully" };
  }

  // Best-selling product
  async getBestSellingProducts() {
    const sequelize = this.productModel.sequelize;

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

    return result;
  }
}

export default ProductService;
