import { Router, Request, Response } from "express";
import { validateData } from "../middleware/validation.middleware.js";
import {
  createBusinessPartnerSchema,
  updateBusinessPartnerSchema,
} from "./business-partner.schema.js";
import BusinessPartnersService from "./business-partner.service.js";
import { handleServiceError } from "../middleware/error-handler.middleware.js";

const router = Router();
const businessPartnersService = new BusinessPartnersService();

// GET /api/business-partners - Get all business partners
router.get("/", async (_req: Request, res: Response) => {
  try {
    const businessPartners =
      await businessPartnersService.getAllBusinessPartners();
    res.status(200).json(businessPartners);
  } catch (error) {
    handleServiceError(error, res, "fetching business partners");
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
    handleServiceError(error, res, "fetching top customer");
  }
});

// GET /api/business-partners/:id - Get business partner by ID
router.get("/:id", async (req: Request, res: Response) => {
  try {
    const businessPartner =
      await businessPartnersService.getBusinessPartnerById(req.params.id);
    res.status(200).json(businessPartner);
  } catch (error) {
    handleServiceError(error, res, "fetching business partner");
  }
});

// POST /api/business-partners - Create new business partner
router.post(
  "/",
  validateData(createBusinessPartnerSchema),
  async (req: Request, res: Response) => {
    try {
      const newBusinessPartner =
        await businessPartnersService.createBusinessPartner(req.body);
      res.status(201).json({
        message: "Business partner created successfully",
        businessPartner: newBusinessPartner,
      });
    } catch (error) {
      handleServiceError(error, res, "creating business partner");
    }
  }
);

// PUT /api/business-partners/:id - Update business partner
router.put(
  "/:id",
  validateData(updateBusinessPartnerSchema),
  async (req: Request, res: Response) => {
    try {
      const updatedBusinessPartner =
        await businessPartnersService.updateBusinessPartner(
          req.params.id,
          req.body
        );
      res.status(200).json({
        message: "Business partner updated successfully",
        businessPartner: updatedBusinessPartner,
      });
    } catch (error) {
      handleServiceError(error, res, "updating business partner");
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
    handleServiceError(error, res, "deleting business partner");
  }
});

export default router;
