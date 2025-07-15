import CompanyModel from "../Company/CompanyModel.js";
import UserModel from "../User/UserModel.js";
import BusinessPartnersModel from "../BusinessPartner/BusinessPartnerModel.js";
import WarehouseModel from "../Warehouse/WarehouseModel.js";
import ProductModel from "../Product/ProductModel.js";
import OrderModel from "../Order/OrderModel.js";
import OrderItemModel from "../Order/OrderItemModal.js";
import InvoiceModel from "../Invoice/InvoiceModel.js";

// Company -> User (One-to-Many)
CompanyModel.hasMany(UserModel, {
  foreignKey: "companyId",
  as: "users",
});

UserModel.belongsTo(CompanyModel, {
  foreignKey: "companyId",
  as: "company",
});

// Company -> Business Partners (One-to-Many)
CompanyModel.hasMany(BusinessPartnersModel, {
  foreignKey: "companyId",
  as: "businessPartners",
});

BusinessPartnersModel.belongsTo(CompanyModel, {
  foreignKey: "companyId",
  as: "company",
});

// Company -> Warehouse (One-to-Many)
CompanyModel.hasMany(WarehouseModel, {
  foreignKey: "companyId",
  as: "warehouses",
});

WarehouseModel.belongsTo(CompanyModel, {
  foreignKey: "companyId",
  as: "company",
});

// Company -> Product (One-to-Many)
CompanyModel.hasMany(ProductModel, {
  foreignKey: "companyId",
  as: "products",
});

ProductModel.belongsTo(CompanyModel, {
  foreignKey: "companyId",
  as: "company",
});

// Company -> Order (One-to-Many)
CompanyModel.hasMany(OrderModel, {
  foreignKey: "companyId",
  as: "orders",
});

OrderModel.belongsTo(CompanyModel, {
  foreignKey: "companyId",
  as: "company",
});

// Company -> Invoice (One-to-Many)
CompanyModel.hasMany(InvoiceModel, {
  foreignKey: "companyId",
  as: "invoices",
});

InvoiceModel.belongsTo(CompanyModel, {
  foreignKey: "companyId",
  as: "company",
});

// User -> Company (modifiedBy relationships)
UserModel.hasMany(CompanyModel, {
  foreignKey: "modifiedBy",
  as: "modifiedCompanies",
});

CompanyModel.belongsTo(UserModel, {
  foreignKey: "modifiedBy",
  as: "modifier",
});

// User -> Business Partners (modifiedBy)
UserModel.hasMany(BusinessPartnersModel, {
  foreignKey: "modifiedBy",
  as: "modifiedBusinessPartners",
});

BusinessPartnersModel.belongsTo(UserModel, {
  foreignKey: "modifiedBy",
  as: "modifier",
});

// User -> Warehouse (modifiedBy)
UserModel.hasMany(WarehouseModel, {
  foreignKey: "modifiedBy",
  as: "modifiedWarehouses",
});

WarehouseModel.belongsTo(UserModel, {
  foreignKey: "modifiedBy",
  as: "modifier",
});

// User -> Product (modifiedBy)
UserModel.hasMany(ProductModel, {
  foreignKey: "modifiedBy",
  as: "modifiedProducts",
});

ProductModel.belongsTo(UserModel, {
  foreignKey: "modifiedBy",
  as: "modifier",
});

// User -> Order (modifiedBy)
UserModel.hasMany(OrderModel, {
  foreignKey: "modifiedBy",
  as: "modifiedOrders",
});

OrderModel.belongsTo(UserModel, {
  foreignKey: "modifiedBy",
  as: "modifier",
});

// User -> OrderItem (modifiedBy)
UserModel.hasMany(OrderItemModel, {
  foreignKey: "modifiedBy",
  as: "modifiedOrderItems",
});

OrderItemModel.belongsTo(UserModel, {
  foreignKey: "modifiedBy",
  as: "modifier",
});

// User -> Invoice (modifiedBy)
UserModel.hasMany(InvoiceModel, {
  foreignKey: "modifiedBy",
  as: "modifiedInvoices",
});

InvoiceModel.belongsTo(UserModel, {
  foreignKey: "modifiedBy",
  as: "modifier",
});

// Warehouse -> Order (One-to-Many)
WarehouseModel.hasMany(OrderModel, {
  foreignKey: "warehouseId",
  as: "orders",
});

OrderModel.belongsTo(WarehouseModel, {
  foreignKey: "warehouseId",
  as: "warehouse",
});

// Business Partners -> Order (One-to-Many)
BusinessPartnersModel.hasMany(OrderModel, {
  foreignKey: "businessPartnerId",
  as: "orders",
});

OrderModel.belongsTo(BusinessPartnersModel, {
  foreignKey: "businessPartnerId",
  as: "businessPartner",
});

// Order -> OrderItem (One-to-Many)
OrderModel.hasMany(OrderItemModel, {
  foreignKey: "orderId",
  as: "orderItems",
});

OrderItemModel.belongsTo(OrderModel, {
  foreignKey: "orderId",
  as: "order",
});

// Product -> OrderItem (One-to-Many)
ProductModel.hasMany(OrderItemModel, {
  foreignKey: "productId",
  as: "orderItems",
});

OrderItemModel.belongsTo(ProductModel, {
  foreignKey: "productId",
  as: "product",
});

// Order -> Invoice (One-to-One)
OrderModel.hasOne(InvoiceModel, {
  foreignKey: "orderId",
  as: "invoice",
});

InvoiceModel.belongsTo(OrderModel, {
  foreignKey: "orderId",
  as: "order",
});
