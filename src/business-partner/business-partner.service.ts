import BusinessPartnersModel, {
  BusinessPartnersAttributes,
} from "./business-partner.model.js";
import { BaseService } from "../utils/base.service.js";
import { QueryTypes } from "sequelize";

type CreateBusinessPartnerData = Pick<
  BusinessPartnersAttributes,
  "companyId" | "name" | "email" | "type" | "modifiedBy"
>;
type UpdateBusinessPartnerData = Pick<
  BusinessPartnersAttributes,
  "name" | "email" | "type" | "modifiedBy"
>;

class BusinessPartnersService extends BaseService<BusinessPartnersModel> {
  constructor(
    businessPartnersModel: typeof BusinessPartnersModel = BusinessPartnersModel
  ) {
    super(businessPartnersModel);
  }

  protected getEntityName(): string {
    return "Business partner";
  }

  async getAllBusinessPartners() {
    return this.getAll();
  }

  async getBusinessPartnerById(id: string) {
    return this.getById(id);
  }

  async deleteBusinessPartner(id: string) {
    return this.deleteById(id);
  }

  async createBusinessPartner(businessPartnerData: CreateBusinessPartnerData) {
    const { email } = businessPartnerData;

    const existingBusinessPartner = await this.model.findOne({
      where: { email },
    });

    if (existingBusinessPartner) {
      throw new Error("Business partner already exists");
    }

    return await this.model.create(businessPartnerData);
  }

  async updateBusinessPartner(
    id: string,
    updateData: UpdateBusinessPartnerData
  ) {
    const { name, email, type, modifiedBy } = updateData;

    const businessPartner = await this.getById(id);

    if (email !== businessPartner.email) {
      const existingBusinessPartner = await this.model.findOne({
        where: { email },
      });

      if (existingBusinessPartner) {
        throw new Error("Email already exists");
      }
    }

    await businessPartner.update({ name, email, type, modifiedBy });
    return businessPartner;
  }

  async getCustomerWithMostOrders() {
    const sequelize = this.model.sequelize;

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
