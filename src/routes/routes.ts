import { Router } from "express";
import companyRoutes from "../company/company.routes.js";
import userRoutes from "../user/user.routes.js";
import warehouseRoutes from "../warehouse/warehouse.routes.js";
import orderRoutes from "../order/order.routes.js";
import orderItemRoutes from "../order-item/order-item.routes.js";
import productRoutes from "../product/product.routes.js";
import businessPartnerRoutes from "../business-partner/business-partner.routes.js";
import invoiceRoutes from "../Invoice/invoice.routes.js";

const router = Router();

router.use("/company", companyRoutes);
router.use("/user", userRoutes);
router.use("/warehouse", warehouseRoutes);
router.use("/order", orderRoutes);
router.use("/order-item", orderItemRoutes);
router.use("/product", productRoutes);
router.use("/business-partner", businessPartnerRoutes);
router.use("/invoice", invoiceRoutes);

export default router;
