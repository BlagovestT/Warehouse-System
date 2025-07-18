import { DataTypes, Model, Optional, Sequelize } from "sequelize";
import {
  BaseAttributes,
  commonFields,
  commonModelOptions,
} from "../utils/base.types.js";

export interface OrderAttributes extends BaseAttributes {
  companyId: string;
  warehouseId: string;
  businessPartnerId: string;
  orderNumber: string;
  type: "shipment" | "delivery";
}

class OrderModel
  extends Model<OrderAttributes, Optional<OrderAttributes, "id">>
  implements OrderAttributes
{
  public id!: string;
  public companyId!: string;
  public warehouseId!: string;
  public businessPartnerId!: string;
  public orderNumber!: string;
  public type!: "shipment" | "delivery";
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
  public readonly deletedAt?: Date;
  public modifiedBy!: string;

  public static initModel(sequelize: Sequelize): typeof OrderModel {
    OrderModel.init(
      {
        ...commonFields,
        companyId: {
          type: DataTypes.UUID,
          allowNull: false,
          field: "companyId",
        },
        warehouseId: {
          type: DataTypes.UUID,
          allowNull: false,
          field: "warehouseId",
        },
        businessPartnerId: {
          type: DataTypes.UUID,
          allowNull: true,
          field: "businessPartnerId",
        },
        orderNumber: {
          type: DataTypes.STRING,
          allowNull: false,
          unique: true,
        },
        type: {
          type: DataTypes.ENUM("shipment", "delivery"),
          allowNull: false,
        },
        modifiedBy: {
          type: DataTypes.UUID,
          allowNull: false, // Override base to make it required
        },
      },
      {
        sequelize,
        tableName: "order",
        ...commonModelOptions,
      }
    );
    return OrderModel;
  }
}

export default OrderModel;
