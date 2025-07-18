import { DataTypes, Model, Optional, Sequelize } from "sequelize";
import {
  BaseAttributes,
  commonFields,
  commonModelOptions,
} from "../utils/base.types.js";

export interface BusinessPartnersAttributes extends BaseAttributes {
  companyId: string;
  name: string;
  email: string;
  type: "customer" | "supplier";
}

class BusinessPartnersModel
  extends Model<
    BusinessPartnersAttributes,
    Optional<BusinessPartnersAttributes, "id">
  >
  implements BusinessPartnersAttributes
{
  public id!: string;
  public companyId!: string;
  public name!: string;
  public email!: string;
  public type!: "customer" | "supplier";
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
  public readonly deletedAt?: Date;
  public modifiedBy!: string;

  public static initModel(sequelize: Sequelize): typeof BusinessPartnersModel {
    BusinessPartnersModel.init(
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
        email: {
          type: DataTypes.STRING,
          allowNull: false,
          validate: {
            isEmail: true,
          },
        },
        type: {
          type: DataTypes.ENUM("customer", "supplier"),
          allowNull: false,
        },
        modifiedBy: {
          type: DataTypes.UUID,
          allowNull: false, // Override base to make it required
        },
      },
      {
        sequelize,
        tableName: "business_partners",
        ...commonModelOptions,
      }
    );
    return BusinessPartnersModel;
  }
}

export default BusinessPartnersModel;
