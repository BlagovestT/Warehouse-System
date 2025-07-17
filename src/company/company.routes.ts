import { Router, Request, Response } from "express";
import { validateData } from "../middleware/validation.middleware.js";
import { createCompanySchema, updateCompanySchema } from "./company.schema.js";
import CompanyService from "./company.service.js";

const router = Router();
const companyService = new CompanyService();

// GET /api/company - Get all companies
router.get("/", async (_req: Request, res: Response) => {
  try {
    const companies = await companyService.getAllCompanies();
    res.status(200).json(companies);
  } catch (error) {
    console.error("Error fetching companies:", error);
    res.status(500).json({ message: "Error fetching companies" });
  }
});

// GET /api/company/:id - Get company by ID
router.get("/:id", async (req: Request, res: Response) => {
  try {
    const company = await companyService.getCompanyById(req.params.id);
    res.status(200).json(company);
  } catch (error) {
    console.error("Error fetching company:", error);

    if (error instanceof Error && error.message === "Company not found") {
      return res.status(404).json({ message: "Company not found" });
    }

    res.status(500).json({ message: "Error fetching company" });
  }
});

// POST /api/company - Create new company
router.post(
  "/",
  validateData(createCompanySchema),
  async (req: Request, res: Response) => {
    try {
      const { name, modifiedBy } = req.body;

      const newCompany = await companyService.createCompany({
        name,
        modifiedBy,
      });
      res.status(201).json(newCompany);
    } catch (error) {
      console.error("Error creating company:", error);

      if (
        error instanceof Error &&
        error.message === "Company already exists"
      ) {
        return res.status(400).json({ message: "Company already exists" });
      }

      res.status(500).json({ message: "Error creating company" });
    }
  }
);

// PUT /api/company/:id - Update company
router.put(
  "/:id",
  validateData(updateCompanySchema),
  async (req: Request, res: Response) => {
    try {
      const { name } = req.body;

      const updatedCompany = await companyService.updateCompany(req.params.id, {
        name,
      });
      res.status(200).json({
        message: "Company updated successfully",
        company: updatedCompany,
      });
    } catch (error) {
      console.error("Error updating company:", error);

      if (error instanceof Error && error.message === "Company not found") {
        return res.status(404).json({ message: "Company not found" });
      }

      res.status(500).json({ message: "Error updating company" });
    }
  }
);

// DELETE /api/company/:id - Delete company
router.delete("/:id", async (req: Request, res: Response) => {
  try {
    const result = await companyService.deleteCompany(req.params.id);
    res.status(200).json(result);
  } catch (error) {
    console.error("Error deleting company:", error);

    if (error instanceof Error && error.message === "Company not found") {
      return res.status(404).json({ message: "Company not found" });
    }

    res.status(500).json({ message: "Error deleting company" });
  }
});

export default router;
