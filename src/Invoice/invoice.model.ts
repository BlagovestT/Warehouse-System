import { DataTypes, Model, Optional, Sequelize } from "sequelize";
import {
  BaseAttributes,
  commonFields,
  commonModelOptions,
} from "../utils/base.types.js";

export interface InvoiceAttributes extends BaseAttributes {
  companyId: string;
  orderId: string;
  invoiceNumber: string;
  date: Date;
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
        ...commonFields,
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
        modifiedBy: {
          type: DataTypes.UUID,
          allowNull: false,
        },
      },
      {
        sequelize,
        tableName: "invoice",
        ...commonModelOptions,
      }
    );
    return InvoiceModel;
  }
}

export default InvoiceModel;
