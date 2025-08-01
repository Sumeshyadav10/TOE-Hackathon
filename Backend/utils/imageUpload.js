import cloudinary from "./cloudinary.js";
import multer from "multer";
import ApiError from "./ApiError.js";

// Configure multer to store files in memory
const storage = multer.memoryStorage();

// Configure multer
const upload = multer({
  storage: storage,
  limits: {
    fileSize: 5 * 1024 * 1024, // 5MB limit
  },
  fileFilter: (req, file, cb) => {
    // Check file type
    if (file.mimetype.startsWith("image/")) {
      cb(null, true);
    } else {
      cb(new ApiError(400, "Only image files are allowed"), false);
    }
  },
});

// Upload single image
export const uploadSingle = upload.single("image");

// Upload multiple images (up to 10)
export const uploadMultiple = upload.array("images", 10);

// Upload mixed fields (mainImage + multiple images)
export const uploadProductImages = upload.fields([
  { name: "mainImage", maxCount: 1 },
  { name: "images", maxCount: 9 },
]);

// Function to upload image from buffer/base64
export const uploadImageFromBuffer = async (buffer, options = {}) => {
  try {
    const {
      folder = "products",
      width = 1200,
      height = 1200,
      quality = "auto",
      format = "auto",
    } = options;

    const result = await cloudinary.uploader.upload(
      `data:image/jpeg;base64,${buffer.toString("base64")}`,
      {
        folder: folder,
        transformation: [{ width, height, crop: "limit", quality, format }],
        public_id: `product_${Date.now()}_${Math.random()
          .toString(36)
          .substring(2, 8)}`,
      }
    );

    return {
      url: result.secure_url,
      publicId: result.public_id,
      width: result.width,
      height: result.height,
      format: result.format,
      bytes: result.bytes,
    };
  } catch (error) {
    console.error("Cloudinary upload error:", error);
    throw new ApiError(500, "Failed to upload image to Cloudinary");
  }
};

// Function to upload image from URL
export const uploadImageFromUrl = async (imageUrl, options = {}) => {
  try {
    const {
      folder = "products",
      width = 1200,
      height = 1200,
      quality = "auto",
    } = options;

    const result = await cloudinary.uploader.upload(imageUrl, {
      folder: folder,
      transformation: [{ width, height, crop: "limit", quality }],
      public_id: `product_${Date.now()}_${Math.random()
        .toString(36)
        .substring(2, 8)}`,
    });

    return {
      url: result.secure_url,
      publicId: result.public_id,
      width: result.width,
      height: result.height,
      format: result.format,
      bytes: result.bytes,
    };
  } catch (error) {
    console.error("Cloudinary upload error:", error);
    throw new ApiError(500, "Failed to upload image to Cloudinary");
  }
};

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

// Function to generate different image sizes
export const generateImageVariants = async (imageUrl, variants = []) => {
  try {
    const results = [];

    for (const variant of variants) {
      const { name, width, height, quality = "auto" } = variant;

      // Get the public_id from the URL
      const publicId = imageUrl.split("/").pop().split(".")[0];

      const transformedUrl = cloudinary.url(publicId, {
        width,
        height,
        crop: "fill",
        quality,
        format: "auto",
      });

      results.push({
        name,
        url: transformedUrl,
        width,
        height,
      });
    }

    return results;
  } catch (error) {
    console.error("Image variant generation error:", error);
    throw new ApiError(500, "Failed to generate image variants");
  }
};

// Middleware to handle upload errors
export const handleUploadError = (error, req, res, next) => {
  if (error instanceof multer.MulterError) {
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
  }

  if (error.message.includes("Only image files are allowed")) {
    return res
      .status(400)
      .json(new ApiError(400, "Only image files are allowed"));
  }

  next(error);
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

export default {
  uploadSingle,
  uploadMultiple,
  uploadProductImages,
  uploadImageFromBuffer,
  uploadImageFromUrl,
  deleteImageFromCloudinary,
  deleteMultipleImages,
  generateImageVariants,
  handleUploadError,
  extractPublicId,
};
