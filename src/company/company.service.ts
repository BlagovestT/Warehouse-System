import CompanyModel, { CompanyAttributes } from "./company.model.js";
import { BaseService } from "../utils/base.service.js";

type CreateCompanyData = Pick<CompanyAttributes, "name" | "modifiedBy">;
type UpdateCompanyData = Pick<CompanyAttributes, "name">;

class CompanyService extends BaseService<CompanyModel> {
  constructor(companyModel: typeof CompanyModel = CompanyModel) {
    super(companyModel);
  }

  protected getEntityName(): string {
    return "Company";
  }

  async getAllCompanies() {
    return this.getAll();
  }

  async getCompanyById(id: string) {
    return this.getById(id);
  }

  async deleteCompany(id: string) {
    return this.deleteById(id);
  }

  async createCompany(companyData: CreateCompanyData) {
    const { name, modifiedBy } = companyData;

    const existingCompany = await this.model.findOne({
      where: { name },
    });

    if (existingCompany) {
      throw new Error("Company already exists");
    }

    return await this.model.create({
      name,
      modifiedBy,
    });
  }

  async updateCompany(id: string, updateData: UpdateCompanyData) {
    const { name } = updateData;

    const company = await this.getById(id);

    await company.update({ name });
    return company;
  }
}

export default CompanyService;
