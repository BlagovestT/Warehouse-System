import { Router, Request, Response } from "express";
import ProductService from "./product.service.js";
import { validateData } from "../middleware/validation.middleware.js";
import { createProductSchema, updateProductSchema } from "./product.schema.js";

const router = Router();
const productService = new ProductService();

// GET /api/product - Get all products
router.get("/", async (_req: Request, res: Response) => {
  try {
    const products = await productService.getAllProducts();
    res.status(200).json(products);
  } catch (error) {
    console.error("Error fetching products:", error);
    res.status(500).json({ message: "Error fetching products" });
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
    console.error("Error fetching best selling products:", error);
    res.status(500).json({ message: "Error fetching best selling products" });
  }
});

// GET /api/product/:id - Get product by ID
router.get("/:id", async (req: Request, res: Response) => {
  try {
    const product = await productService.getProductById(req.params.id);
    res.status(200).json(product);
  } catch (error) {
    console.error("Error fetching product:", error);

    if (error instanceof Error && error.message === "Product not found") {
      return res.status(404).json({ message: "Product not found" });
    }

    res.status(500).json({ message: "Error fetching product" });
  }
});

// POST /api/product - Create new product
router.post(
  "/",
  validateData(createProductSchema),
  async (req: Request, res: Response) => {
    try {
      const { companyId, name, price, type, modifiedBy } = req.body;

      const newProduct = await productService.createProduct({
        companyId,
        name,
        price,
        type,
        modifiedBy,
      });
      res
        .status(201)
        .json({ message: "Product created successfully", product: newProduct });
    } catch (error) {
      console.error("Error creating product:", error);

      if (
        error instanceof Error &&
        error.message === "Product already exists"
      ) {
        return res.status(400).json({ message: "Product already exists" });
      }

      res.status(500).json({ message: "Error creating product" });
    }
  }
);

// PUT /api/product/:id - Update product
router.put(
  "/:id",
  validateData(updateProductSchema),
  async (req: Request, res: Response) => {
    try {
      const { name, price, type, modifiedBy } = req.body;

      const updatedProduct = await productService.updateProduct(req.params.id, {
        name,
        price,
        type,
        modifiedBy,
      });
      res.status(200).json({
        message: "Product updated successfully",
        product: updatedProduct,
      });
    } catch (error) {
      console.error("Error updating product:", error);

      if (error instanceof Error && error.message === "Product not found") {
        return res.status(404).json({ message: "Product not found" });
      }

      if (
        error instanceof Error &&
        error.message === "Product name already exists"
      ) {
        return res.status(400).json({ message: "Product name already exists" });
      }

      res.status(500).json({ message: "Error updating product" });
    }
  }
);

// DELETE /api/product/:id - Delete product
router.delete("/:id", async (req: Request, res: Response) => {
  try {
    const result = await productService.deleteProduct(req.params.id);
    res.status(200).json(result);
  } catch (error) {
    console.error("Error deleting product:", error);

    if (error instanceof Error && error.message === "Product not found") {
      return res.status(404).json({ message: "Product not found" });
    }

    res.status(500).json({ message: "Error deleting product" });
  }
});

export default router;
