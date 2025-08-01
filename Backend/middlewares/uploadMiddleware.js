import cloudinary from "../utils/cloudinary.js";
import ApiError from "../utils/ApiError.js";
import asyncHandler from "../utils/asyncHandler.js";

// Middleware to upload single image to Cloudinary
export const uploadToCloudinary = asyncHandler(async (req, res, next) => {
  if (!req.file) {
    return next();
  }

  try {
    const timestamp = Date.now();
    const randomString = Math.random().toString(36).substring(2, 8);

    const result = await cloudinary.uploader.upload(
      `data:${req.file.mimetype};base64,${req.file.buffer.toString("base64")}`,
      {
        folder: "products",
        public_id: `product_${timestamp}_${randomString}`,
        transformation: [
          { width: 1200, height: 1200, crop: "limit", quality: "auto" },
        ],
      }
    );

    // Add Cloudinary result to request object
    req.cloudinaryResult = {
      url: result.secure_url,
      publicId: result.public_id,
      width: result.width,
      height: result.height,
      format: result.format,
      bytes: result.bytes,
    };

    next();
  } catch (error) {
    console.error("Cloudinary upload error:", error);
    throw new ApiError(500, "Failed to upload image to Cloudinary");
  }
});

// Middleware to upload multiple images to Cloudinary
export const uploadMultipleToCloudinary = asyncHandler(
  async (req, res, next) => {
    if (!req.files || req.files.length === 0) {
      return next();
    }

    try {
      const uploadPromises = req.files.map(async (file) => {
        const timestamp = Date.now();
        const randomString = Math.random().toString(36).substring(2, 8);

        const result = await cloudinary.uploader.upload(
          `data:${file.mimetype};base64,${file.buffer.toString("base64")}`,
          {
            folder: "products",
            public_id: `product_${timestamp}_${randomString}`,
            transformation: [
              { width: 1200, height: 1200, crop: "limit", quality: "auto" },
            ],
          }
        );

        return {
          url: result.secure_url,
          publicId: result.public_id,
          width: result.width,
          height: result.height,
          format: result.format,
          bytes: result.bytes,
          originalName: file.originalname,
        };
      });

      const uploadResults = await Promise.all(uploadPromises);

      // Add Cloudinary results to request object
      req.cloudinaryResults = uploadResults;

      next();
    } catch (error) {
      console.error("Cloudinary multiple upload error:", error);
      throw new ApiError(500, "Failed to upload images to Cloudinary");
    }
  }
);

// Middleware to upload product images (mainImage + multiple images) to Cloudinary
export const uploadProductImagesToCloudinary = asyncHandler(
  async (req, res, next) => {
    if (!req.files) {
      return next();
    }

    try {
      const results = {
        mainImage: null,
        images: [],
      };

      // Upload main image
      if (req.files.mainImage && req.files.mainImage[0]) {
        const mainImageFile = req.files.mainImage[0];
        const timestamp = Date.now();
        const randomString = Math.random().toString(36).substring(2, 8);

        const mainImageResult = await cloudinary.uploader.upload(
          `data:${
            mainImageFile.mimetype
          };base64,${mainImageFile.buffer.toString("base64")}`,
          {
            folder: "products/main",
            public_id: `main_${timestamp}_${randomString}`,
            transformation: [
              { width: 1200, height: 1200, crop: "limit", quality: "auto" },
            ],
          }
        );

        results.mainImage = {
          url: mainImageResult.secure_url,
          publicId: mainImageResult.public_id,
          width: mainImageResult.width,
          height: mainImageResult.height,
          format: mainImageResult.format,
          bytes: mainImageResult.bytes,
        };
      }

      // Upload additional images
      if (req.files.images && req.files.images.length > 0) {
        const uploadPromises = req.files.images.map(async (file, index) => {
          const timestamp = Date.now();
          const randomString = Math.random().toString(36).substring(2, 8);

          const result = await cloudinary.uploader.upload(
            `data:${file.mimetype};base64,${file.buffer.toString("base64")}`,
            {
              folder: "products/gallery",
              public_id: `gallery_${timestamp}_${index}_${randomString}`,
              transformation: [
                { width: 1200, height: 1200, crop: "limit", quality: "auto" },
              ],
            }
          );

          return {
            url: result.secure_url,
            publicId: result.public_id,
            width: result.width,
            height: result.height,
            format: result.format,
            bytes: result.bytes,
            originalName: file.originalname,
          };
        });

        results.images = await Promise.all(uploadPromises);
      }

      // Add Cloudinary results to request object
      req.cloudinaryResults = results;

      next();
    } catch (error) {
      console.error("Cloudinary product images upload error:", error);
      throw new ApiError(500, "Failed to upload product images to Cloudinary");
    }
  }
);

// Function to delete image from Cloudinary
export const deleteImageFromCloudinary = async (publicId) => {
  try {
    const result = await cloudinary.uploader.destroy(publicId);
    return result;
  } catch (error) {
    console.error("Cloudinary delete error:", error);
    throw new ApiError(500, "Failed to delete image from Cloudinary");
  }
};

// Function to delete multiple images from Cloudinary
export const deleteMultipleImages = async (publicIds) => {
  try {
    const result = await cloudinary.api.delete_resources(publicIds);
    return result;
  } catch (error) {
    console.error("Cloudinary bulk delete error:", error);
    throw new ApiError(500, "Failed to delete images from Cloudinary");
  }
};

// Function to extract public ID from Cloudinary URL
export const extractPublicId = (cloudinaryUrl) => {
  try {
    const parts = cloudinaryUrl.split("/");
    const fileWithExtension = parts[parts.length - 1];
    const fileName = fileWithExtension.split(".")[0];

    // Find the folder path
    const folderIndex = parts.findIndex((part) => part === "products");
    if (folderIndex !== -1) {
      const folderPath = parts.slice(folderIndex, -1).join("/");
      return `${folderPath}/${fileName}`;
    }

    return fileName;
  } catch (error) {
    console.error("Error extracting public ID:", error);
    return null;
  }
};

// Middleware to handle upload errors
export const handleUploadError = (error, req, res, next) => {
  if (error.code === "LIMIT_FILE_SIZE") {
    return res
      .status(400)
      .json(new ApiError(400, "File too large. Maximum size is 5MB"));
  }
  if (error.code === "LIMIT_FILE_COUNT") {
    return res
      .status(400)
      .json(new ApiError(400, "Too many files. Maximum 10 images allowed"));
  }
  if (error.message && error.message.includes("Only image files are allowed")) {
    return res
      .status(400)
      .json(new ApiError(400, "Only image files are allowed"));
  }

  next(error);
};
