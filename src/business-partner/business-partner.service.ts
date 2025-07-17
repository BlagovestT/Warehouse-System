import BusinessPartnersModel from "./business-partner.model.js";
import { QueryTypes } from "sequelize";

class BusinessPartnersService {
  private businessPartnersModel: typeof BusinessPartnersModel;

  constructor(
    businessPartnersModel: typeof BusinessPartnersModel = BusinessPartnersModel
  ) {
    this.businessPartnersModel = businessPartnersModel;
  }

  // Get all business partners
  async getAllBusinessPartners() {
    const result = await this.businessPartnersModel.findAll();

    if (!result) {
      throw new Error("No business partners found");
    }
    return result;
  }

  // Get business partner by ID
  async getBusinessPartnerById(id: string) {
    const businessPartner = await this.businessPartnersModel.findByPk(id);

    if (!businessPartner) {
      throw new Error("Business partner not found");
    }

    return businessPartner;
  }

  // Create a new business partner
  async createBusinessPartner(businessPartnerData: {
    companyId: string;
    name: string;
    email: string;
    type: "customer" | "supplier";
    modifiedBy: string;
  }) {
    const { companyId, name, email, type, modifiedBy } = businessPartnerData;

    const existingBusinessPartner = await this.businessPartnersModel.findOne({
      where: { email },
    });

    if (existingBusinessPartner) {
      throw new Error("Business partner already exists");
    }

    return await this.businessPartnersModel.create({
      companyId,
      name,
      email,
      type,
      modifiedBy,
    });
  }

  // Update business partner by ID
  async updateBusinessPartner(
    id: string,
    updateData: {
      name: string;
      email: string;
      type: "customer" | "supplier";
      modifiedBy: string;
    }
  ) {
    const { name, email, type, modifiedBy } = updateData;
    const businessPartner = await this.businessPartnersModel.findByPk(id);

    if (!businessPartner) {
      throw new Error("Business partner not found");
    }

    // Check if email is being changed and if it already exists
    if (email !== businessPartner.email) {
      const existingBusinessPartner = await this.businessPartnersModel.findOne({
        where: { email },
      });

      if (existingBusinessPartner) {
        throw new Error("Email already exists");
      }
    }

    await businessPartner.update({ name, email, type, modifiedBy });
    return businessPartner;
  }

  // Delete business partner by ID
  async deleteBusinessPartner(id: string) {
    const businessPartner = await this.businessPartnersModel.findByPk(id);

    if (!businessPartner) {
      throw new Error("Business partner not found");
    }

    await businessPartner.destroy();
    return { message: "Business partner deleted successfully" };
  }
  // Get customer with most orders
  async getCustomerWithMostOrders() {
    const sequelize = this.businessPartnersModel.sequelize;

    if (!sequelize) {
      throw new Error("Database connection not available");
    }

    const result = await sequelize.query(
      `
      SELECT
        business_partners."name" AS "customerName",
        company."name" AS "companyName",
        COUNT("order"."id") AS "totalOrders",
        SUM(order_item."quantity") AS "totalItemsBought"
      FROM "business_partners"
      JOIN "order"
        ON "order"."businessPartnerId" = business_partners."id"
      JOIN "order_item"
        ON order_item."orderId" = "order"."id"
      JOIN "company"
        ON business_partners."companyId" = company."id"
      WHERE
        business_partners."type" = 'customer'
        AND "order"."type" = 'shipment'
        AND business_partners."deletedAt" IS NULL
        AND "order"."deletedAt" IS NULL
        AND order_item."deletedAt" IS NULL
        AND company."deletedAt" IS NULL
      GROUP BY
        business_partners."name",
        company."name"
      ORDER BY
        "totalOrders" DESC
      LIMIT 1
      `,
      {
        type: QueryTypes.SELECT,
      }
    );

    return result;
  }
}

export default BusinessPartnersService;
