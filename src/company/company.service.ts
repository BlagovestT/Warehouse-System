import CompanyModel from "./company.model.js";

class CompanyService {
  constructor() {
    console.log("CompanyService initialized");
  }

  // Get all companies
  async getAllCompanies() {
    console.log("Service called - getting all companies");
    console.log("CompanyModel:", CompanyModel);

    try {
      const result = await CompanyModel.findAll();
      console.log("Query result:", result);
      return result;
    } catch (error) {
      console.error("Service error:", error);
      throw error;
    }
  }

  // Get company by ID
  async getCompanyById(id: string) {
    const company = await CompanyModel.findByPk(id);

    if (!company) {
      throw new Error("Company not found");
    }

    return company;
  }

  // Create a new company
  async createCompany(companyData: { name: string; modifiedBy: string }) {
    const { name, modifiedBy } = companyData;

    const existingCompany = await CompanyModel.findOne({
      where: { name },
    });

    if (existingCompany) {
      throw new Error("Company already exists");
    }

    return await CompanyModel.create({
      name,
      modifiedBy,
    });
  }

  // Update company by ID
  async updateCompany(id: string, updateData: { name: string }) {
    const { name } = updateData;

    const company = await CompanyModel.findByPk(id);

    if (!company) {
      throw new Error("Company not found");
    }

    await company.update({ name });
    return company;
  }

  // Delete company by ID
  async deleteCompany(id: string) {
    const company = await CompanyModel.findByPk(id);

    if (!company) {
      throw new Error("Company not found");
    }

    await company.destroy();
    return { message: "Company deleted successfully" };
  }
}

export default CompanyService;
