import { Router, Request, Response } from "express";
import { validateData } from "../middleware/validation.middleware.js";
import {
  createBusinessPartnerSchema,
  updateBusinessPartnerSchema,
} from "./business-partner.schema.js";
import BusinessPartnersService from "./business-partner.service.js";

const router = Router();
const businessPartnersService = new BusinessPartnersService();

// GET /api/business-partners - Get all business partners
router.get("/", async (_req: Request, res: Response) => {
  try {
    const businessPartners =
      await businessPartnersService.getAllBusinessPartners();
    res.status(200).json(businessPartners);
  } catch (error) {
    console.error("Error fetching business partners:", error);
    res.status(500).json({ message: "Error fetching business partners" });
  }
});

// GET /api/business-partners/top-customer - Get customer with most orders
router.get("/top-customer", async (_req: Request, res: Response) => {
  try {
    const topCustomer =
      await businessPartnersService.getCustomerWithMostOrders();
    res.status(200).json({
      message: "Top customer retrieved successfully",
      data: topCustomer,
    });
  } catch (error) {
    console.error("Error fetching top customer:", error);
    res.status(500).json({ message: "Error fetching top customer" });
  }
});

// GET /api/business-partners/:id - Get business partner by ID
router.get("/:id", async (req: Request, res: Response) => {
  try {
    const businessPartner =
      await businessPartnersService.getBusinessPartnerById(req.params.id);
    res.status(200).json(businessPartner);
  } catch (error) {
    console.error("Error fetching business partner:", error);

    if (
      error instanceof Error &&
      error.message === "Business partner not found"
    ) {
      return res.status(404).json({ message: "Business partner not found" });
    }

    res.status(500).json({ message: "Error fetching business partner" });
  }
});

// POST /api/business-partners - Create new business partner
router.post(
  "/",
  validateData(createBusinessPartnerSchema),
  async (req: Request, res: Response) => {
    try {
      const { companyId, name, email, type, modifiedBy } = req.body;

      const newBusinessPartner =
        await businessPartnersService.createBusinessPartner({
          companyId,
          name,
          email,
          type,
          modifiedBy,
        });
      res.status(201).json({
        message: "Business partner created successfully",
        businessPartner: newBusinessPartner,
      });
    } catch (error) {
      console.error("Error creating business partner:", error);

      if (
        error instanceof Error &&
        error.message === "Business partner already exists"
      ) {
        return res
          .status(400)
          .json({ message: "Business partner already exists" });
      }

      res.status(500).json({ message: "Error creating business partner" });
    }
  }
);

// PUT /api/business-partners/:id - Update business partner
router.put(
  "/:id",
  validateData(updateBusinessPartnerSchema),
  async (req: Request, res: Response) => {
    try {
      const { name, email, type, modifiedBy } = req.body;

      const updatedBusinessPartner =
        await businessPartnersService.updateBusinessPartner(req.params.id, {
          name,
          email,
          type,
          modifiedBy,
        });
      res.status(200).json({
        message: "Business partner updated successfully",
        businessPartner: updatedBusinessPartner,
      });
    } catch (error) {
      console.error("Error updating business partner:", error);

      if (
        error instanceof Error &&
        error.message === "Business partner not found"
      ) {
        return res.status(404).json({ message: "Business partner not found" });
      }

      if (error instanceof Error && error.message === "Email already exists") {
        return res.status(400).json({ message: "Email already exists" });
      }

      res.status(500).json({ message: "Error updating business partner" });
    }
  }
);

// DELETE /api/business-partners/:id - Delete business partner
router.delete("/:id", async (req: Request, res: Response) => {
  try {
    const result = await businessPartnersService.deleteBusinessPartner(
      req.params.id
    );
    res.status(200).json(result);
  } catch (error) {
    console.error("Error deleting business partner:", error);

    if (
      error instanceof Error &&
      error.message === "Business partner not found"
    ) {
      return res.status(404).json({ message: "Business partner not found" });
    }

    res.status(500).json({ message: "Error deleting business partner" });
  }
});

export default router;
