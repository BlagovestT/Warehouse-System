import { DataTypes, Model, Optional, Sequelize } from "sequelize";

interface WarehouseAttributes {
  id: string;
  companyId: string;
  supportType: "solid" | "liquid" | "mixed";
  name: string;
  createdAt?: Date;
  updatedAt?: Date;
  deletedAt?: Date;
  modifiedBy: string;
}

class WarehouseModel
  extends Model<WarehouseAttributes, Optional<WarehouseAttributes, "id">>
  implements WarehouseAttributes
{
  public id!: string;
  public companyId!: string;
  public supportType!: "solid" | "liquid" | "mixed";
  public name!: string;
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
  public readonly deletedAt!: Date;
  public modifiedBy!: string;

  public static initModel(sequelize: Sequelize): typeof WarehouseModel {
    WarehouseModel.init(
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
        supportType: {
          type: DataTypes.ENUM("solid", "liquid", "mixed"),
          allowNull: false,
        },
        name: {
          type: DataTypes.STRING,
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
        tableName: "warehouse",
        timestamps: true,
        paranoid: true,
        underscored: true,
        createdAt: "createdAt",
        updatedAt: "updatedAt",
        deletedAt: "deletedAt",
      }
    );
    return WarehouseModel;
  }
}

export default WarehouseModel;
