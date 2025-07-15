import { DataTypes, Model, Optional, Sequelize } from "sequelize";

interface ProductAttributes {
  id: string;
  companyId: string;
  name: string;
  price: number;
  type: "solid" | "liquid";
  createdAt?: Date;
  updatedAt?: Date;
  deletedAt?: Date;
  modifiedBy: string;
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
  public readonly deletedAt!: Date;
  public modifiedBy!: string;

  public static initModel(sequelize: Sequelize): typeof ProductModel {
    ProductModel.init(
      {
        id: {
          type: DataTypes.UUID,
          defaultValue: DataTypes.UUIDV4,
          primaryKey: true,
        },
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
        createdAt: {
          type: DataTypes.DATE,
          defaultValue: DataTypes.NOW,
        },
        updatedAt: {
          type: DataTypes.DATE,
          defaultValue: DataTypes.NOW,
        },
        deletedAt: {
          type: DataTypes.DATE,
          allowNull: true,
        },
        modifiedBy: {
          type: DataTypes.UUID,
          allowNull: false,
        },
      },
      {
        sequelize,
        tableName: "product",
        timestamps: true,
        paranoid: true,
        underscored: true,
        createdAt: "createdAt",
        updatedAt: "updatedAt",
        deletedAt: "deletedAt",
      }
    );
    return ProductModel;
  }
}

export default ProductModel;
