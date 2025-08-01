# Image Upload with Cloudinary Integration

## Overview

This system provides comprehensive image upload functionality for product management using Cloudinary as the storage service. Images are uploaded to Cloudinary and their URLs are stored in the database.

## Features

- ✅ Single image upload
- ✅ Multiple images upload
- ✅ Product-specific upload (mainImage + gallery images)
- ✅ Automatic image optimization (1200x1200 max, quality: auto)
- ✅ File type validation (only images)
- ✅ File size limit (5MB per image)
- ✅ Cloudinary folder organization
- ✅ Image deletion from Cloudinary
- ✅ Public ID extraction for management

## API Endpoints

### 1. Create Product with Images

**POST** `/api/products`

- **Authentication**: Required
- **Content-Type**: `multipart/form-data`
- **Fields**:
  - `mainImage`: Single file (main product image)
  - `images`: Multiple files (gallery images, max 9)
  - Other product data as form fields

**Example using FormData (JavaScript)**:

```javascript
const formData = new FormData();

// Add main image
formData.append("mainImage", mainImageFile);

// Add gallery images
galleryImages.forEach((image) => {
  formData.append("images", image);
});

// Add product data
formData.append("name", "iPhone 15 Pro");
formData.append("brand", "Apple");
formData.append("price", "134900");
formData.append("description", "Latest iPhone with titanium design");

// Add specifications as JSON string
formData.append(
  "specifications",
  JSON.stringify({
    display: { size: "6.1 inches", type: "OLED" },
    memory: { ram: "8GB", storage: "256GB" },
  })
);

const response = await fetch("/api/products", {
  method: "POST",
  headers: {
    // Don't set Content-Type, let browser set it with boundary
  },
  credentials: "include",
  body: formData,
});
```

### 2. Upload Product Images Only

**POST** `/api/products/upload/product-images`

- **Authentication**: Required
- **Content-Type**: `multipart/form-data`
- **Fields**:
  - `mainImage`: Single file (optional)
  - `images`: Multiple files (optional, max 9)

**Response**:

```json
{
  "statusCode": 200,
  "data": {
    "mainImage": {
      "url": "https://res.cloudinary.com/.../main_123456_abc.jpg",
      "publicId": "products/main/main_123456_abc",
      "width": 1200,
      "height": 1200
    },
    "images": [
      {
        "url": "https://res.cloudinary.com/.../gallery_123456_0_def.jpg",
        "publicId": "products/gallery/gallery_123456_0_def",
        "width": 1200,
        "height": 1200,
        "originalName": "phone-side.jpg"
      }
    ]
  },
  "message": "Images uploaded successfully to Cloudinary"
}
```

### 3. Upload Single Image

**POST** `/api/products/upload/single`

- **Authentication**: Required
- **Content-Type**: `multipart/form-data`
- **Field**: `image` (single file)

### 4. Upload Multiple Images

**POST** `/api/products/upload/multiple`

- **Authentication**: Required
- **Content-Type**: `multipart/form-data`
- **Field**: `images` (multiple files, max 10)

### 5. Delete Image

**DELETE** `/api/products/upload/delete`

- **Authentication**: Required
- **Body**:

```json
{
  "publicId": "products/main/main_123456_abc"
}
```

## Frontend Integration Examples

### React Component for Product Creation

```jsx
import React, { useState } from "react";

const CreateProduct = () => {
  const [mainImage, setMainImage] = useState(null);
  const [galleryImages, setGalleryImages] = useState([]);
  const [productData, setProductData] = useState({
    name: "",
    brand: "",
    model: "",
    price: "",
    description: "",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();

    // Add images
    if (mainImage) {
      formData.append("mainImage", mainImage);
    }

    galleryImages.forEach((image) => {
      formData.append("images", image);
    });

    // Add product data
    Object.keys(productData).forEach((key) => {
      formData.append(key, productData[key]);
    });

    // Add specifications
    formData.append(
      "specifications",
      JSON.stringify({
        display: { size: "6.1 inches", type: "OLED" },
        memory: { ram: "8GB", storage: "256GB" },
      })
    );

    try {
      const response = await fetch("/api/products", {
        method: "POST",
        credentials: "include",
        body: formData,
      });

      const result = await response.json();

      if (result.success) {
        console.log("Product created:", result.data);
        // Reset form or redirect
      }
    } catch (error) {
      console.error("Error creating product:", error);
    }
  };

  return (
    <form onSubmit={handleSubmit} encType="multipart/form-data">
      {/* Main Image Upload */}
      <div>
        <label>Main Image:</label>
        <input
          type="file"
          accept="image/*"
          onChange={(e) => setMainImage(e.target.files[0])}
        />
      </div>

      {/* Gallery Images Upload */}
      <div>
        <label>Gallery Images:</label>
        <input
          type="file"
          accept="image/*"
          multiple
          onChange={(e) => setGalleryImages(Array.from(e.target.files))}
        />
      </div>

      {/* Product Data */}
      <input
        type="text"
        placeholder="Product Name"
        value={productData.name}
        onChange={(e) =>
          setProductData({ ...productData, name: e.target.value })
        }
      />

      <input
        type="text"
        placeholder="Brand"
        value={productData.brand}
        onChange={(e) =>
          setProductData({ ...productData, brand: e.target.value })
        }
      />

      <button type="submit">Create Product</button>
    </form>
  );
};
```

### Image Upload Hook

```jsx
import { useState } from "react";

export const useImageUpload = () => {
  const [uploading, setUploading] = useState(false);
  const [uploadedImages, setUploadedImages] = useState([]);

  const uploadImages = async (files, type = "multiple") => {
    setUploading(true);

    const formData = new FormData();

    if (type === "single") {
      formData.append("image", files[0]);
    } else if (type === "product") {
      if (files.mainImage) {
        formData.append("mainImage", files.mainImage);
      }
      if (files.images) {
        files.images.forEach((img) => formData.append("images", img));
      }
    } else {
      files.forEach((file) => formData.append("images", file));
    }

    try {
      const endpoint =
        type === "single"
          ? "/api/products/upload/single"
          : type === "product"
          ? "/api/products/upload/product-images"
          : "/api/products/upload/multiple";

      const response = await fetch(endpoint, {
        method: "POST",
        credentials: "include",
        body: formData,
      });

      const result = await response.json();

      if (result.success) {
        setUploadedImages(result.data);
        return result.data;
      } else {
        throw new Error(result.message);
      }
    } catch (error) {
      console.error("Upload failed:", error);
      throw error;
    } finally {
      setUploading(false);
    }
  };

  return { uploadImages, uploading, uploadedImages };
};
```

## File Organization in Cloudinary

```
cloudinary-account/
├── products/
│   ├── main/           # Main product images
│   │   ├── main_123456_abc.jpg
│   │   └── main_789012_def.jpg
│   └── gallery/        # Gallery images
│       ├── gallery_123456_0_ghi.jpg
│       ├── gallery_123456_1_jkl.jpg
│       └── gallery_789012_0_mno.jpg
```

## Image Transformations

All uploaded images are automatically optimized:

- **Maximum dimensions**: 1200x1200 pixels
- **Crop mode**: limit (maintains aspect ratio)
- **Quality**: auto (Cloudinary optimizes)
- **Format**: auto (Cloudinary chooses best format)

## Error Handling

The system handles various error scenarios:

- **File too large**: Maximum 5MB per image
- **Invalid file type**: Only image files allowed
- **Too many files**: Maximum 10 images per upload
- **Cloudinary errors**: Upload failures with retry logic
- **Authentication errors**: Protected routes require valid tokens

## Security Features

- **File type validation**: Only image files accepted
- **Size limits**: 5MB maximum per file
- **Authentication**: All upload endpoints require authentication
- **Secure URLs**: All Cloudinary URLs use HTTPS
- **Public ID obfuscation**: Random strings prevent guessing

## Usage Tips

1. **Always handle file validation on frontend** before uploading
2. **Show upload progress** for better user experience
3. **Compress images** on frontend for faster uploads
4. **Use proper error handling** for network failures
5. **Store Cloudinary URLs** in database, not local file paths
6. **Clean up unused images** periodically to save storage

This comprehensive image upload system provides everything needed for a modern e-commerce platform with professional image management capabilities.
