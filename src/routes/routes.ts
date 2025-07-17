import { Router } from "express";
import companyRoutes from "../company/company.routes.js";

const router = Router();

router.use("/company", companyRoutes);
//router.use("/user", userRoutes);

export default router;
