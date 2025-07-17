import CompanyModel from "./company.model.js";

class CompanyService {
  private companyModel: typeof CompanyModel;

  constructor(companyModel: typeof CompanyModel = CompanyModel) {
    this.companyModel = companyModel;
  }

  // Get all companies
  async getAllCompanies() {
    const result = await this.companyModel.findAll();

    if (!result) {
      throw new Error("No companies found");
    }
    return result;
  }

  // Get company by ID
  async getCompanyById(id: string) {
    const company = await this.companyModel.findByPk(id);

    if (!company) {
      throw new Error("Company not found");
    }

    return company;
  }

  // Create a new company
  async createCompany(companyData: { name: string; modifiedBy: string }) {
    const { name, modifiedBy } = companyData;

    const existingCompany = await this.companyModel.findOne({
      where: { name },
    });

    if (existingCompany) {
      throw new Error("Company already exists");
    }

    return await this.companyModel.create({
      name,
      modifiedBy,
    });
  }

  // Update company by ID
  async updateCompany(id: string, updateData: { name: string }) {
    const { name } = updateData;

    const company = await this.companyModel.findByPk(id);

    if (!company) {
      throw new Error("Company not found");
    }

    await company.update({ name });
    return company;
  }

  // Delete company by ID
  async deleteCompany(id: string) {
    const company = await this.companyModel.findByPk(id);

    if (!company) {
      throw new Error("Company not found");
    }

    await company.destroy();
    return { message: "Company deleted successfully" };
  }
}

export default CompanyService;
