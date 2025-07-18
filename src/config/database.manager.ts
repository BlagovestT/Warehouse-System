import sequelize from "./database.js";
import CompanyModel from "../company/company.model.js";
import UserModel from "../user/user.model.js";
import BusinessPartnersModel from "../business-partner/business-partner.model.js";
import WarehouseModel from "../warehouse/warehouse.model.js";
import ProductModel from "../product/product.model.js";
import OrderModel from "../order/order.model.js";
import OrderItemModel from "../order-item/order-item.model.js";
import InvoiceModel from "../Invoice/invoice.model.js";

class DatabaseManager {
  private static instance: DatabaseManager;
  private isInitialized = false;

  private constructor() {}

  public static getInstance(): DatabaseManager {
    if (!DatabaseManager.instance) {
      DatabaseManager.instance = new DatabaseManager();
    }
    return DatabaseManager.instance;
  }

  //Initialize models

  private initializeModels(): void {
    console.log("Initializing models");

    CompanyModel.initModel(sequelize);
    UserModel.initModel(sequelize);
    BusinessPartnersModel.initModel(sequelize);
    WarehouseModel.initModel(sequelize);
    ProductModel.initModel(sequelize);
    OrderModel.initModel(sequelize);
    OrderItemModel.initModel(sequelize);
    InvoiceModel.initModel(sequelize);

    console.log("Models initialized");
  }

  // Set up all model associations

  private defineAssociations(): void {
    console.log("Setting up associations");

    // Company -> User
    CompanyModel.hasMany(UserModel, {
      foreignKey: "companyId",
      as: "users",
    });

    UserModel.belongsTo(CompanyModel, {
      foreignKey: "companyId",
      as: "company",
    });

    // Company -> Business Partners
    CompanyModel.hasMany(BusinessPartnersModel, {
      foreignKey: "companyId",
      as: "businessPartners",
    });

    BusinessPartnersModel.belongsTo(CompanyModel, {
      foreignKey: "companyId",
      as: "company",
    });

    // Company -> Warehouse
    CompanyModel.hasMany(WarehouseModel, {
      foreignKey: "companyId",
      as: "warehouses",
    });

    WarehouseModel.belongsTo(CompanyModel, {
      foreignKey: "companyId",
      as: "company",
    });

    // Company -> Product
    CompanyModel.hasMany(ProductModel, {
      foreignKey: "companyId",
      as: "products",
    });

    ProductModel.belongsTo(CompanyModel, {
      foreignKey: "companyId",
      as: "company",
    });

    // Company -> Order
    CompanyModel.hasMany(OrderModel, {
      foreignKey: "companyId",
      as: "orders",
    });

    OrderModel.belongsTo(CompanyModel, {
      foreignKey: "companyId",
      as: "company",
    });

    // Company -> Invoice
    CompanyModel.hasMany(InvoiceModel, {
      foreignKey: "companyId",
      as: "invoices",
    });

    InvoiceModel.belongsTo(CompanyModel, {
      foreignKey: "companyId",
      as: "company",
    });

    // User -> Company
    UserModel.hasMany(CompanyModel, {
      foreignKey: "modifiedBy",
      as: "modifiedCompanies",
    });

    CompanyModel.belongsTo(UserModel, {
      foreignKey: "modifiedBy",
      as: "modifier",
    });

    // User -> Business Partners
    UserModel.hasMany(BusinessPartnersModel, {
      foreignKey: "modifiedBy",
      as: "modifiedBusinessPartners",
    });

    BusinessPartnersModel.belongsTo(UserModel, {
      foreignKey: "modifiedBy",
      as: "modifier",
    });

    // User -> Warehouse
    UserModel.hasMany(WarehouseModel, {
      foreignKey: "modifiedBy",
      as: "modifiedWarehouses",
    });

    WarehouseModel.belongsTo(UserModel, {
      foreignKey: "modifiedBy",
      as: "modifier",
    });

    // User -> Product
    UserModel.hasMany(ProductModel, {
      foreignKey: "modifiedBy",
      as: "modifiedProducts",
    });

    ProductModel.belongsTo(UserModel, {
      foreignKey: "modifiedBy",
      as: "modifier",
    });

    // User -> Order
    UserModel.hasMany(OrderModel, {
      foreignKey: "modifiedBy",
      as: "modifiedOrders",
    });

    OrderModel.belongsTo(UserModel, {
      foreignKey: "modifiedBy",
      as: "modifier",
    });

    // User -> OrderItem
    UserModel.hasMany(OrderItemModel, {
      foreignKey: "modifiedBy",
      as: "modifiedOrderItems",
    });

    OrderItemModel.belongsTo(UserModel, {
      foreignKey: "modifiedBy",
      as: "modifier",
    });

    // User -> Invoice
    UserModel.hasMany(InvoiceModel, {
      foreignKey: "modifiedBy",
      as: "modifiedInvoices",
    });

    InvoiceModel.belongsTo(UserModel, {
      foreignKey: "modifiedBy",
      as: "modifier",
    });

    // Warehouse -> Order
    WarehouseModel.hasMany(OrderModel, {
      foreignKey: "warehouseId",
      as: "orders",
    });

    OrderModel.belongsTo(WarehouseModel, {
      foreignKey: "warehouseId",
      as: "warehouse",
    });

    // Business Partners -> Order
    BusinessPartnersModel.hasMany(OrderModel, {
      foreignKey: "businessPartnerId",
      as: "orders",
    });

    OrderModel.belongsTo(BusinessPartnersModel, {
      foreignKey: "businessPartnerId",
      as: "businessPartner",
    });

    // Order -> OrderItem
    OrderModel.hasMany(OrderItemModel, {
      foreignKey: "orderId",
      as: "orderItems",
    });

    OrderItemModel.belongsTo(OrderModel, {
      foreignKey: "orderId",
      as: "order",
    });

    // Product -> OrderItem
    ProductModel.hasMany(OrderItemModel, {
      foreignKey: "productId",
      as: "orderItems",
    });

    OrderItemModel.belongsTo(ProductModel, {
      foreignKey: "productId",
      as: "product",
    });

    // Order -> Invoice
    OrderModel.hasOne(InvoiceModel, {
      foreignKey: "orderId",
      as: "invoice",
    });

    InvoiceModel.belongsTo(OrderModel, {
      foreignKey: "orderId",
      as: "order",
    });

    console.log("Associations set up");
  }

  //Initialize database connection and models

  public async initialize(): Promise<void> {
    if (this.isInitialized) {
      console.log("Database already initialized");
      return;
    }

    try {
      console.log("Initializing database");

      await sequelize.authenticate();
      console.log("Database connection established");

      this.initializeModels();

      this.defineAssociations();

      this.isInitialized = true;
      console.log("Database initialization complete");
    } catch (error) {
      console.error("Database initialization failed:", error);
      throw error;
    }
  }
}

export default DatabaseManager;
