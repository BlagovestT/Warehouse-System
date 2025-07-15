import sequelize from "../config/database.js";
import CompanyModel from "../Company/CompanyModel.js";
import UserModel from "../User/UserModel.js";
import BusinessPartnersModel from "../BusinessPartner/BusinessPartnerModel.js";
import WarehouseModel from "../Warehouse/WarehouseModel.js";
import ProductModel from "../Product/ProductModel.js";
import OrderModel from "../Order/OrderModel.js";
import OrderItemModel from "../Order/OrderItemModal.js";
import InvoiceModel from "../Invoice/InvoiceModel.js";

// Initialize models
CompanyModel.initModel(sequelize);
UserModel.initModel(sequelize);
BusinessPartnersModel.initModel(sequelize);
WarehouseModel.initModel(sequelize);
ProductModel.initModel(sequelize);
OrderModel.initModel(sequelize);
OrderItemModel.initModel(sequelize);
InvoiceModel.initModel(sequelize);

// Set up associations
import "./associations";

export {
  sequelize,
  CompanyModel,
  UserModel,
  BusinessPartnersModel,
  WarehouseModel,
  ProductModel,
  OrderModel,
  OrderItemModel,
  InvoiceModel,
};
