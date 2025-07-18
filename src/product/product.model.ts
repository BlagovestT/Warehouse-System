import { DataTypes, Model, Optional, Sequelize } from "sequelize";
import {
  BaseAttributes,
  commonFields,
  commonModelOptions,
} from "../utils/base.types.js";

export interface ProductAttributes extends BaseAttributes {
  companyId: string;
  name: string;
  price: number;
  type: "solid" | "liquid";
}

class ProductModel
  extends Model<ProductAttributes, Optional<ProductAttributes, "id">>
  implements ProductAttributes
{
  public id!: string;
  public companyId!: string;
  public name!: string;
  public price!: number;
  public type!: "solid" | "liquid";
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
  public readonly deletedAt?: Date;
  public modifiedBy!: string;

  public static initModel(sequelize: Sequelize): typeof ProductModel {
    ProductModel.init(
      {
        ...commonFields,
        companyId: {
          type: DataTypes.UUID,
          allowNull: false,
          field: "companyId",
        },
        name: {
          type: DataTypes.STRING,
          allowNull: false,
        },
        price: {
          type: DataTypes.DECIMAL(10, 2),
          allowNull: false,
        },
        type: {
          type: DataTypes.ENUM("solid", "liquid"),
          allowNull: false,
        },
        modifiedBy: {
          type: DataTypes.UUID,
          allowNull: false, // Override base to make it required
        },
      },
      {
        sequelize,
        tableName: "product",
        ...commonModelOptions,
      }
    );
    return ProductModel;
  }
}

export default ProductModel;
