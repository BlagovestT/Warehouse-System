import { Router, Request, Response } from "express";
import ProductService from "./product.service.js";
import { validateData } from "../middleware/validation.middleware.js";
import { createProductSchema, updateProductSchema } from "./product.schema.js";
import { handleServiceError } from "../middleware/error-handler.middleware.js";

const router = Router();
const productService = new ProductService();

// GET /api/product - Get all products
router.get("/", async (_req: Request, res: Response) => {
  try {
    const products = await productService.getAllProducts();
    res.status(200).json(products);
  } catch (error) {
    handleServiceError(error, res, "fetching products");
  }
});

// GET /api/product/best-sellers - Get best selling products
router.get("/best-sellers", async (_req: Request, res: Response) => {
  try {
    const bestSellingProducts = await productService.getBestSellingProducts();
    res.status(200).json({
      message: "Best selling products retrieved successfully",
      data: bestSellingProducts,
    });
  } catch (error) {
    handleServiceError(error, res, "fetching best selling products");
  }
});

// GET /api/product/:id - Get product by ID
router.get("/:id", async (req: Request, res: Response) => {
  try {
    const product = await productService.getProductById(req.params.id);
    res.status(200).json(product);
  } catch (error) {
    handleServiceError(error, res, "fetching product");
  }
});

// POST /api/product - Create new product
router.post(
  "/",
  validateData(createProductSchema),
  async (req: Request, res: Response) => {
    try {
      const newProduct = await productService.createProduct(req.body);
      res
        .status(201)
        .json({ message: "Product created successfully", product: newProduct });
    } catch (error) {
      handleServiceError(error, res, "creating product");
    }
  }
);

// PUT /api/product/:id - Update product
router.put(
  "/:id",
  validateData(updateProductSchema),
  async (req: Request, res: Response) => {
    try {
      const updatedProduct = await productService.updateProduct(
        req.params.id,
        req.body
      );
      res.status(200).json({
        message: "Product updated successfully",
        product: updatedProduct,
      });
    } catch (error) {
      handleServiceError(error, res, "updating product");
    }
  }
);

// DELETE /api/product/:id - Delete product
router.delete("/:id", async (req: Request, res: Response) => {
  try {
    const result = await productService.deleteProduct(req.params.id);
    res.status(200).json(result);
  } catch (error) {
    handleServiceError(error, res, "deleting product");
  }
});

export default router;
