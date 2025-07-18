import { DataTypes, Model, Optional, Sequelize } from "sequelize";
import {
  BaseAttributes,
  commonFields,
  commonModelOptions,
} from "../utils/base.types.js";

export interface WarehouseAttributes extends BaseAttributes {
  companyId: string;
  supportType: "solid" | "liquid" | "mixed";
  name: string;
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
  public readonly deletedAt?: Date;
  public modifiedBy!: string;

  public static initModel(sequelize: Sequelize): typeof WarehouseModel {
    WarehouseModel.init(
      {
        ...commonFields,
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
        modifiedBy: {
          type: DataTypes.UUID,
          allowNull: false,
        },
      },
      {
        sequelize,
        tableName: "warehouse",
        ...commonModelOptions,
      }
    );
    return WarehouseModel;
  }
}

export default WarehouseModel;
