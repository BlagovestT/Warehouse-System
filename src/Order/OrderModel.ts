import { DataTypes, Model, Optional, Sequelize } from "sequelize";

interface OrderAttributes {
  id: string;
  companyId: string;
  warehouseId: string;
  businessPartnerId: string;
  orderNumber: string;
  type: "shipment" | "delivery";
  createdAt?: Date;
  updatedAt?: Date;
  deletedAt?: Date;
  modifiedBy: string;
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
  public readonly deletedAt!: Date;
  public modifiedBy!: string;

  public static initModel(sequelize: Sequelize): typeof OrderModel {
    OrderModel.init(
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
        warehouseId: {
          type: DataTypes.UUID,
          allowNull: false,
          field: "warehouseId",
        },
        businessPartnerId: {
          type: DataTypes.UUID,
          allowNull: false,
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
        tableName: "order",
        timestamps: true,
        paranoid: true,
        underscored: true,
        createdAt: "createdAt",
        updatedAt: "updatedAt",
        deletedAt: "deletedAt",
      }
    );
    return OrderModel;
  }
}

export default OrderModel;
