import mongoose from "mongoose";
import Product from "../models/product.js";
import ApiError from "../utils/ApiError.js";
import ApiResponse from "../utils/ApiResponse.js";
import asyncHandler from "../utils/asyncHandler.js";

// ================= CREATE PRODUCT =================
export const createProduct = asyncHandler(async (req, res) => {
  const {
    name,
    brand,
    model,
    description,
    price,
    originalPrice,
    discount,
    specifications,
    stock,
    tags,
    isFeatured,
    metaTitle,
    metaDescription,
  } = req.body;

  // Check if product with same brand and model already exists
  const existingProduct = await Product.findOne({ brand, model });
  if (existingProduct) {
    throw new ApiError(400, "Product with this brand and model already exists");
  }

  // Handle image uploads from Cloudinary middleware (optional)
  let mainImage = "";
  let images = [];

  if (req.cloudinaryResults) {
    if (req.cloudinaryResults.mainImage) {
      mainImage = req.cloudinaryResults.mainImage.url;
    }
    if (
      req.cloudinaryResults.images &&
      req.cloudinaryResults.images.length > 0
    ) {
      images = req.cloudinaryResults.images.map((img) => img.url);
    }
  }

  // If no main image but have gallery images, use first gallery image as main
  if (!mainImage && images.length > 0) {
    mainImage = images[0];
  }

  // Images are optional - product can be created without images

  const product = new Product({
    name,
    brand,
    model,
    description,
    price,
    originalPrice,
    discount,
    images,
    mainImage,
    specifications,
    stock,
    tags,
    isFeatured,
    metaTitle,
    metaDescription,
    seller: req.user?.id, // If you have authentication middleware
  });

  const savedProduct = await product.save();

  res
    .status(201)
    .json(new ApiResponse(201, savedProduct, "Product created successfully"));
});

// ================= GET ALL PRODUCTS =================
export const getAllProducts = asyncHandler(async (req, res) => {
  const {
    page = 1,
    limit = 12,
    sortBy = "createdAt",
    sortOrder = "desc",
    brand,
    minPrice,
    maxPrice,
    ram,
    storage,
    inStock,
    isFeatured,
    search,
  } = req.query;

  // Build filter object
  const filter = { isActive: true };

  if (brand) {
    filter.brand = new RegExp(brand, "i");
  }

  if (minPrice || maxPrice) {
    filter.price = {};
    if (minPrice) filter.price.$gte = Number(minPrice);
    if (maxPrice) filter.price.$lte = Number(maxPrice);
  }

  if (ram) {
    filter["specifications.memory.ram"] = new RegExp(ram, "i");
  }

  if (storage) {
    filter["specifications.memory.storage"] = new RegExp(storage, "i");
  }

  if (inStock !== undefined) {
    filter.inStock = inStock === "true";
  }

  if (isFeatured !== undefined) {
    filter.isFeatured = isFeatured === "true";
  }

  if (search) {
    filter.$or = [
      { name: new RegExp(search, "i") },
      { brand: new RegExp(search, "i") },
      { model: new RegExp(search, "i") },
      { description: new RegExp(search, "i") },
      { tags: { $in: [new RegExp(search, "i")] } },
    ];
  }

  // Build sort object
  const sort = {};
  sort[sortBy] = sortOrder === "desc" ? -1 : 1;

  // Calculate pagination
  const skip = (Number(page) - 1) * Number(limit);

  // Execute query
  const [products, totalCount] = await Promise.all([
    Product.find(filter)
      .sort(sort)
      .skip(skip)
      .limit(Number(limit))
      .populate("seller", "username email"),
    Product.countDocuments(filter),
  ]);

  // Calculate pagination info
  const totalPages = Math.ceil(totalCount / Number(limit));
  const hasNextPage = Number(page) < totalPages;
  const hasPrevPage = Number(page) > 1;

  res.json(
    new ApiResponse(
      200,
      {
        products,
        pagination: {
          currentPage: Number(page),
          totalPages,
          totalCount,
          hasNextPage,
          hasPrevPage,
          limit: Number(limit),
        },
      },
      "Products fetched successfully"
    )
  );
});

// ================= GET PRODUCT BY ID =================
export const getProductById = asyncHandler(async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    throw new ApiError(400, "Invalid product ID");
  }

  const product = await Product.findById(id).populate(
    "seller",
    "username email"
  );

  if (!product || !product.isActive) {
    throw new ApiError(404, "Product not found");
  }

  res.json(new ApiResponse(200, product, "Product fetched successfully"));
});

// ================= GET PRODUCTS BY BRAND =================
export const getProductsByBrand = asyncHandler(async (req, res) => {
  const { brand } = req.params;
  const {
    page = 1,
    limit = 12,
    sortBy = "createdAt",
    sortOrder = "desc",
    minPrice,
    maxPrice,
    ram,
    storage,
    inStock,
  } = req.query;

  if (!brand) {
    throw new ApiError(400, "Brand parameter is required");
  }

  // Build filter object
  const filter = {
    brand: new RegExp(brand, "i"),
    isActive: true,
  };

  // Add additional filters
  if (minPrice || maxPrice) {
    filter.price = {};
    if (minPrice) filter.price.$gte = Number(minPrice);
    if (maxPrice) filter.price.$lte = Number(maxPrice);
  }

  if (ram) {
    filter["specifications.memory.ram"] = new RegExp(ram, "i");
  }

  if (storage) {
    filter["specifications.memory.storage"] = new RegExp(storage, "i");
  }

  if (inStock !== undefined) {
    filter.inStock = inStock === "true";
  }

  // Build sort object
  const sort = {};
  sort[sortBy] = sortOrder === "desc" ? -1 : 1;

  // Calculate pagination
  const skip = (Number(page) - 1) * Number(limit);

  // Execute query
  const [products, totalCount] = await Promise.all([
    Product.find(filter)
      .sort(sort)
      .skip(skip)
      .limit(Number(limit))
      .populate("seller", "username email"),
    Product.countDocuments(filter),
  ]);

  if (products.length === 0) {
    throw new ApiError(404, `No products found for brand: ${brand}`);
  }

  // Calculate pagination info
  const totalPages = Math.ceil(totalCount / Number(limit));
  const hasNextPage = Number(page) < totalPages;
  const hasPrevPage = Number(page) > 1;

  res.json(
    new ApiResponse(
      200,
      {
        brand,
        products,
        pagination: {
          currentPage: Number(page),
          totalPages,
          totalCount,
          hasNextPage,
          hasPrevPage,
          limit: Number(limit),
        },
      },
      `Products for brand ${brand} fetched successfully`
    )
  );
});

// ================= UPDATE PRODUCT =================
export const updateProduct = asyncHandler(async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    throw new ApiError(400, "Invalid product ID");
  }

  const product = await Product.findById(id);

  if (!product) {
    throw new ApiError(404, "Product not found");
  }

  // Check if user is authorized to update (if you have seller-specific products)
  // if (req.user && product.seller && product.seller.toString() !== req.user.id) {
  //   throw new ApiError(403, 'Not authorized to update this product');
  // }

  // Handle image uploads from Cloudinary middleware (optional)
  const updateData = { ...req.body };

  if (req.cloudinaryResults) {
    if (req.cloudinaryResults.mainImage) {
      updateData.mainImage = req.cloudinaryResults.mainImage.url;
    }
    if (
      req.cloudinaryResults.images &&
      req.cloudinaryResults.images.length > 0
    ) {
      updateData.images = req.cloudinaryResults.images.map((img) => img.url);
    }
  }

  const updatedProduct = await Product.findByIdAndUpdate(id, updateData, {
    new: true,
    runValidators: true,
  }).populate("seller", "username email");

  res.json(
    new ApiResponse(200, updatedProduct, "Product updated successfully")
  );
});

// ================= DELETE PRODUCT =================
export const deleteProduct = asyncHandler(async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    throw new ApiError(400, "Invalid product ID");
  }

  const product = await Product.findById(id);

  if (!product) {
    throw new ApiError(404, "Product not found");
  }

  // Check if user is authorized to delete (if you have seller-specific products)
  // if (req.user && product.seller && product.seller.toString() !== req.user.id) {
  //   throw new ApiError(403, 'Not authorized to delete this product');
  // }

  // Soft delete - set isActive to false instead of actually deleting
  await Product.findByIdAndUpdate(id, { isActive: false });

  res.json(new ApiResponse(200, null, "Product deleted successfully"));
});

// ================= HARD DELETE PRODUCT =================
export const hardDeleteProduct = asyncHandler(async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    throw new ApiError(400, "Invalid product ID");
  }

  const product = await Product.findById(id);

  if (!product) {
    throw new ApiError(404, "Product not found");
  }

  await Product.findByIdAndDelete(id);

  res.json(new ApiResponse(200, null, "Product permanently deleted"));
});

// ================= UPDATE STOCK =================
export const updateStock = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const { quantity } = req.body;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    throw new ApiError(400, "Invalid product ID");
  }

  if (typeof quantity !== "number") {
    throw new ApiError(400, "Quantity must be a number");
  }

  const product = await Product.findById(id);

  if (!product) {
    throw new ApiError(404, "Product not found");
  }

  await product.updateStock(quantity);

  res.json(
    new ApiResponse(
      200,
      { stock: product.stock, inStock: product.inStock },
      "Stock updated successfully"
    )
  );
});

// ================= ADD REVIEW =================
export const addReview = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const { rating } = req.body;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    throw new ApiError(400, "Invalid product ID");
  }

  if (!rating || rating < 1 || rating > 5) {
    throw new ApiError(400, "Rating must be between 1 and 5");
  }

  const product = await Product.findById(id);

  if (!product) {
    throw new ApiError(404, "Product not found");
  }

  await product.addReview(rating);

  res.json(
    new ApiResponse(
      200,
      {
        averageRating: product.rating.average,
        totalReviews: product.rating.count,
      },
      "Review added successfully"
    )
  );
});

// ================= GET FEATURED PRODUCTS =================
export const getFeaturedProducts = asyncHandler(async (req, res) => {
  const { limit = 8 } = req.query;

  const products = await Product.find({
    isFeatured: true,
    isActive: true,
    inStock: true,
  })
    .limit(Number(limit))
    .sort({ "rating.average": -1, createdAt: -1 })
    .populate("seller", "username email");

  res.json(
    new ApiResponse(200, products, "Featured products fetched successfully")
  );
});

// ================= GET PRODUCTS IN PRICE RANGE =================
export const getProductsInPriceRange = asyncHandler(async (req, res) => {
  const { minPrice, maxPrice } = req.query;
  const { page = 1, limit = 12 } = req.query;

  if (!minPrice || !maxPrice) {
    throw new ApiError(400, "Both minPrice and maxPrice are required");
  }

  const skip = (Number(page) - 1) * Number(limit);

  const [products, totalCount] = await Promise.all([
    Product.findInPriceRange(Number(minPrice), Number(maxPrice))
      .skip(skip)
      .limit(Number(limit))
      .sort({ price: 1 })
      .populate("seller", "username email"),
    Product.countDocuments({
      price: { $gte: Number(minPrice), $lte: Number(maxPrice) },
      isActive: true,
    }),
  ]);

  const totalPages = Math.ceil(totalCount / Number(limit));

  res.json(
    new ApiResponse(
      200,
      {
        products,
        priceRange: { min: Number(minPrice), max: Number(maxPrice) },
        pagination: {
          currentPage: Number(page),
          totalPages,
          totalCount,
          limit: Number(limit),
        },
      },
      "Products in price range fetched successfully"
    )
  );
});

// ================= GET PRODUCT BRANDS =================
export const getProductBrands = asyncHandler(async (req, res) => {
  const brands = await Product.distinct("brand", { isActive: true });

  // Get count for each brand
  const brandsWithCount = await Promise.all(
    brands.map(async (brand) => {
      const count = await Product.countDocuments({ brand, isActive: true });
      return { brand, count };
    })
  );

  res.json(
    new ApiResponse(200, brandsWithCount, "Product brands fetched successfully")
  );
});

// ================= SEARCH PRODUCTS =================
export const searchProducts = asyncHandler(async (req, res) => {
  const { query } = req.query;
  const { page = 1, limit = 12 } = req.query;

  if (!query) {
    throw new ApiError(400, "Search query is required");
  }

  const skip = (Number(page) - 1) * Number(limit);

  const searchFilter = {
    isActive: true,
    $or: [
      { name: new RegExp(query, "i") },
      { brand: new RegExp(query, "i") },
      { model: new RegExp(query, "i") },
      { description: new RegExp(query, "i") },
      { tags: { $in: [new RegExp(query, "i")] } },
    ],
  };

  const [products, totalCount] = await Promise.all([
    Product.find(searchFilter)
      .skip(skip)
      .limit(Number(limit))
      .sort({ "rating.average": -1, createdAt: -1 })
      .populate("seller", "username email"),
    Product.countDocuments(searchFilter),
  ]);

  const totalPages = Math.ceil(totalCount / Number(limit));

  res.json(
    new ApiResponse(
      200,
      {
        searchQuery: query,
        products,
        pagination: {
          currentPage: Number(page),
          totalPages,
          totalCount,
          limit: Number(limit),
        },
      },
      "Search results fetched successfully"
    )
  );
});

// ================= UPLOAD PRODUCT IMAGES =================
export const uploadProductImages = asyncHandler(async (req, res) => {
  if (!req.cloudinaryResults) {
    throw new ApiError(400, "No images uploaded");
  }

  const { mainImage, images } = req.cloudinaryResults;

  const response = {
    mainImage: mainImage
      ? {
          url: mainImage.url,
          publicId: mainImage.publicId,
          width: mainImage.width,
          height: mainImage.height,
        }
      : null,
    images: images.map((img) => ({
      url: img.url,
      publicId: img.publicId,
      width: img.width,
      height: img.height,
      originalName: img.originalName,
    })),
  };

  res.json(
    new ApiResponse(200, response, "Images uploaded successfully to Cloudinary")
  );
});

// ================= UPLOAD SINGLE IMAGE =================
export const uploadSingleImage = asyncHandler(async (req, res) => {
  if (!req.cloudinaryResult) {
    throw new ApiError(400, "No image uploaded");
  }

  const { url, publicId, width, height, format, bytes } = req.cloudinaryResult;

  res.json(
    new ApiResponse(
      200,
      {
        url,
        publicId,
        width,
        height,
        format,
        bytes,
      },
      "Image uploaded successfully to Cloudinary"
    )
  );
});

// ================= UPLOAD MULTIPLE IMAGES =================
export const uploadMultipleImages = asyncHandler(async (req, res) => {
  if (!req.cloudinaryResults || req.cloudinaryResults.length === 0) {
    throw new ApiError(400, "No images uploaded");
  }

  const uploadedImages = req.cloudinaryResults.map((img) => ({
    url: img.url,
    publicId: img.publicId,
    width: img.width,
    height: img.height,
    format: img.format,
    bytes: img.bytes,
    originalName: img.originalName,
  }));

  res.json(
    new ApiResponse(
      200,
      { images: uploadedImages },
      "Images uploaded successfully to Cloudinary"
    )
  );
});

// ================= DELETE IMAGE FROM CLOUDINARY =================
export const deleteProductImage = asyncHandler(async (req, res) => {
  const { publicId } = req.body;

  if (!publicId) {
    throw new ApiError(400, "Public ID is required");
  }

  try {
    const { deleteImageFromCloudinary } = await import(
      "../middlewares/uploadMiddleware.js"
    );
    const result = await deleteImageFromCloudinary(publicId);

    if (result.result === "ok") {
      res.json(
        new ApiResponse(
          200,
          { publicId, deleted: true },
          "Image deleted successfully from Cloudinary"
        )
      );
    } else {
      throw new ApiError(400, "Failed to delete image from Cloudinary");
    }
  } catch (error) {
    throw new ApiError(500, "Error deleting image from Cloudinary");
  }
});
