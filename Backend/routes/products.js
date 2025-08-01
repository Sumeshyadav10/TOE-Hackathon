import express from "express";
import {
  createProduct,
  getAllProducts,
  getProductById,
  getProductsByBrand,
  updateProduct,
  deleteProduct,
  hardDeleteProduct,
  updateStock,
  addReview,
  getFeaturedProducts,
  getProductsInPriceRange,
  getProductBrands,
  searchProducts,
  uploadProductImages,
  uploadSingleImage,
  uploadMultipleImages,
  deleteProductImage,
} from "../controllers/productcontroller.js";
import { protect } from "../middlewares/authMiddleware.js";
import {
  uploadSingle,
  uploadMultiple,
  uploadProductImages as uploadProductImagesMulter,
} from "../utils/imageUpload.js";
import {
  uploadToCloudinary,
  uploadMultipleToCloudinary,
  uploadProductImagesToCloudinary,
  handleUploadError,
} from "../middlewares/uploadMiddleware.js";

const router = express.Router();

// ================= PUBLIC ROUTES =================
// Get all products with filtering and pagination
router.get("/", getAllProducts);

// Get product by ID
router.get("/:id", getProductById);

// Get products by brand
router.get("/brand/:brand", getProductsByBrand);

// Get featured products
router.get("/featured/list", getFeaturedProducts);

// Get products in price range
router.get("/price/range", getProductsInPriceRange);

// Get all product brands
router.get("/brands/list", getProductBrands);

// Search products
router.get("/search/query", searchProducts);

// ================= PROTECTED ROUTES =================
// Add review (requires authentication)
router.patch("/:id/review", addReview);

// ================= ADMIN/SELLER ROUTES =================
// Create product with optional images (requires authentication)
router.post(
  "/",
  uploadProductImagesMulter,
  uploadProductImagesToCloudinary,
  createProduct
);

// Create product without images (JSON only)
router.post("/create-without-images", createProduct);

// Update product (requires authentication)
router.put(
  "/:id",

  uploadProductImagesMulter,
  uploadProductImagesToCloudinary,
  updateProduct
);

// Update stock (requires authentication)
router.patch("/:id/stock", updateStock);

// Soft delete product (requires authentication)
router.delete("/:id", deleteProduct);

// Hard delete product (requires admin authorization)
router.delete("/:id/permanent", hardDeleteProduct);

// ================= IMAGE UPLOAD ROUTES =================
// Upload product images (mainImage + gallery images)
router.post(
  "/upload/product-images",
  uploadProductImagesMulter,
  uploadProductImagesToCloudinary,
  uploadProductImages
);

// Upload single image
router.post(
  "/upload/single",
  uploadSingle,
  uploadToCloudinary,
  uploadSingleImage
);

// Upload multiple images
router.post(
  "/upload/multiple",
  uploadMultiple,
  uploadMultipleToCloudinary,
  uploadMultipleImages
);

// Delete image from Cloudinary
router.delete("/upload/delete", deleteProductImage);

// Error handling middleware for uploads
router.use(handleUploadError);

export default router;
