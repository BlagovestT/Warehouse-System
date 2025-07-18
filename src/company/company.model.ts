import { DataTypes, Model, Optional, Sequelize } from "sequelize";
import {
  BaseAttributes,
  commonFields,
  commonModelOptions,
} from "../utils/base.types.js";

export interface CompanyAttributes extends BaseAttributes {
  name: string;
}

class CompanyModel
  extends Model<CompanyAttributes, Optional<CompanyAttributes, "id">>
  implements CompanyAttributes
{
  public id!: string;
  public name!: string;
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
  public readonly deletedAt?: Date;
  public modifiedBy!: string;

  public static initModel(sequelize: Sequelize): typeof CompanyModel {
    CompanyModel.init(
      {
        ...commonFields,
        name: {
          type: DataTypes.STRING,
          allowNull: false,
        },
      },
      {
        sequelize,
        tableName: "company",
        ...commonModelOptions,
      }
    );
    return CompanyModel;
  }
}

export default CompanyModel;
