import { DataTypes, Model, Optional, Sequelize } from "sequelize";
import {
  BaseAttributes,
  commonFields,
  commonModelOptions,
} from "../utils/base.types.js";

export interface OrderItemAttributes extends BaseAttributes {
  orderId: string;
  productId: string;
  quantity: number;
}

class OrderItemModel
  extends Model<OrderItemAttributes, Optional<OrderItemAttributes, "id">>
  implements OrderItemAttributes
{
  public id!: string;
  public orderId!: string;
  public productId!: string;
  public quantity!: number;
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
  public readonly deletedAt?: Date;
  public modifiedBy!: string;

  public static initModel(sequelize: Sequelize): typeof OrderItemModel {
    OrderItemModel.init(
      {
        ...commonFields,
        orderId: {
          type: DataTypes.UUID,
          allowNull: false,
          field: "orderId",
        },
        productId: {
          type: DataTypes.UUID,
          allowNull: false,
          field: "productId",
        },
        quantity: {
          type: DataTypes.INTEGER,
          allowNull: false,
        },
        modifiedBy: {
          type: DataTypes.UUID,
          allowNull: false, // Override base to make it required
        },
      },
      {
        sequelize,
        tableName: "order_item",
        ...commonModelOptions,
      }
    );
    return OrderItemModel;
  }
}

export default OrderItemModel;
