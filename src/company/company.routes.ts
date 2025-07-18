import { Router, Request, Response } from "express";
import { validateData } from "../middleware/validation.middleware.js";
import { createCompanySchema, updateCompanySchema } from "./company.schema.js";
import CompanyService from "./company.service.js";
import { handleServiceError } from "../middleware/error-handler.middleware.js";

const router = Router();
const companyService = new CompanyService();

// GET /api/company - Get all companies
router.get("/", async (_req: Request, res: Response) => {
  try {
    const companies = await companyService.getAllCompanies();
    res.status(200).json(companies);
  } catch (error) {
    handleServiceError(error, res, "fetching companies");
  }
});

// GET /api/company/:id - Get company by ID
router.get("/:id", async (req: Request, res: Response) => {
  try {
    const company = await companyService.getCompanyById(req.params.id);
    res.status(200).json(company);
  } catch (error) {
    handleServiceError(error, res, "fetching company");
  }
});

// POST /api/company - Create new company
router.post(
  "/",
  validateData(createCompanySchema),
  async (req: Request, res: Response) => {
    try {
      const newCompany = await companyService.createCompany(req.body);
      res.status(201).json(newCompany);
    } catch (error) {
      handleServiceError(error, res, "creating company");
    }
  }
);

// PUT /api/company/:id - Update company
router.put(
  "/:id",
  validateData(updateCompanySchema),
  async (req: Request, res: Response) => {
    try {
      const updatedCompany = await companyService.updateCompany(
        req.params.id,
        req.body
      );
      res.status(200).json({
        message: "Company updated successfully",
        company: updatedCompany,
      });
    } catch (error) {
      handleServiceError(error, res, "updating company");
    }
  }
);

// DELETE /api/company/:id - Delete company
router.delete("/:id", async (req: Request, res: Response) => {
  try {
    const result = await companyService.deleteCompany(req.params.id);
    res.status(200).json(result);
  } catch (error) {
    handleServiceError(error, res, "deleting company");
  }
});

export default router;
