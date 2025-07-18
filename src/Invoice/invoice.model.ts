import { DataTypes, Model, Optional, Sequelize } from "sequelize";

export interface InvoiceAttributes {
  id: string;
  companyId: string;
  orderId: string;
  invoiceNumber: string;
  date: Date;
  createdAt?: Date;
  updatedAt?: Date;
  deletedAt?: Date;
  modifiedBy: string;
}

class InvoiceModel
  extends Model<InvoiceAttributes, Optional<InvoiceAttributes, "id">>
  implements InvoiceAttributes
{
  public id!: string;
  public companyId!: string;
  public orderId!: string;
  public invoiceNumber!: string;
  public date!: Date;
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
  public readonly deletedAt?: Date;
  public modifiedBy!: string;

  public static initModel(sequelize: Sequelize): typeof InvoiceModel {
    InvoiceModel.init(
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
        orderId: {
          type: DataTypes.UUID,
          allowNull: false,
          field: "orderId",
        },
        invoiceNumber: {
          type: DataTypes.STRING,
          allowNull: false,
          unique: true,
        },
        date: {
          type: DataTypes.DATEONLY,
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
        tableName: "invoice",
        timestamps: true,
        paranoid: true,
        createdAt: "createdAt",
        updatedAt: "updatedAt",
        deletedAt: "deletedAt",
      }
    );
    return InvoiceModel;
  }
}

export default InvoiceModel;
