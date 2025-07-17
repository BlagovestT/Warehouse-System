import { DataTypes, Model, Optional, Sequelize } from "sequelize";

interface OrderItemAttributes {
  id: string;
  orderId: string;
  productId: string;
  quantity: number;
  createdAt?: Date;
  updatedAt?: Date;
  deletedAt?: Date;
  modifiedBy: string;
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
        id: {
          type: DataTypes.UUID,
          defaultValue: DataTypes.UUIDV4,
          primaryKey: true,
        },
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
        tableName: "order_item",
        timestamps: true,
        paranoid: true,
        createdAt: "createdAt",
        updatedAt: "updatedAt",
        deletedAt: "deletedAt",
      }
    );
    return OrderItemModel;
  }
}

export default OrderItemModel;
