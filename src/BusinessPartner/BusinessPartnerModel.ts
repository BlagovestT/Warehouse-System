import { DataTypes, Model, Optional, Sequelize } from "sequelize";

interface BusinessPartnersAttributes {
  id: string;
  companyId: string;
  name: string;
  email: string;
  type: "customer" | "supplier";
  createdAt?: Date;
  updatedAt?: Date;
  deletedAt?: Date;
  modifiedBy: string;
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
        tableName: "business_partners",
        timestamps: true,
        paranoid: true,
        createdAt: "createdAt",
        updatedAt: "updatedAt",
        deletedAt: "deletedAt",
      }
    );
    return BusinessPartnersModel;
  }
}

export default BusinessPartnersModel;
