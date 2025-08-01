# Product Controller API Documentation

## Overview

The Product Controller provides comprehensive CRUD operations for mobile phone products with advanced filtering, search, and pagination capabilities.

## API Endpoints

### 1. Create Product

**POST** `/api/products`

- **Authentication**: Required
- **Body**:

```json
{
  "name": "iPhone 15 Pro",
  "brand": "Apple",
  "model": "A3102",
  "description": "Latest iPhone with titanium design and A17 Pro chip",
  "price": 134900,
  "originalPrice": 144900,
  "discount": 7,
  "mainImage": "iphone15pro-main.jpg",
  "images": ["img1.jpg", "img2.jpg", "img3.jpg"],
  "specifications": {
    "display": {
      "size": "6.1 inches",
      "resolution": "2556 x 1179",
      "type": "Super Retina XDR OLED",
      "refreshRate": "120Hz"
    },
    "memory": {
      "ram": "8GB",
      "storage": "256GB",
      "expandable": false
    },
    "camera": {
      "rear": {
        "primary": "48MP",
        "secondary": "12MP Ultra Wide",
        "tertiary": "12MP Telephoto"
      },
      "front": {
        "primary": "12MP"
      }
    },
    "battery": {
      "capacity": "3274mAh",
      "fastCharging": "20W"
    },
    "os": {
      "name": "iOS",
      "version": "17"
    }
  },
  "stock": 50,
  "tags": ["5G", "Titanium", "Pro Camera"],
  "isFeatured": true
}
```

### 2. Get All Products

**GET** `/api/products`

- **Query Parameters**:
  - `page` (default: 1)
  - `limit` (default: 12)
  - `sortBy` (default: 'createdAt')
  - `sortOrder` ('asc' | 'desc', default: 'desc')
  - `brand` (filter by brand)
  - `minPrice` (minimum price filter)
  - `maxPrice` (maximum price filter)
  - `ram` (filter by RAM)
  - `storage` (filter by storage)
  - `inStock` (true | false)
  - `isFeatured` (true | false)
  - `search` (search in name, brand, model, description, tags)

**Example**: `/api/products?brand=Apple&minPrice=50000&maxPrice=150000&page=1&limit=10`

### 3. Get Product by ID

**GET** `/api/products/:id`

- **Parameters**:
  - `id` - Product ID

### 4. Get Products by Brand

**GET** `/api/products/brand/:brand`

- **Parameters**:
  - `brand` - Brand name (case-insensitive)
- **Query Parameters**: Same as Get All Products

**Example**: `/api/products/brand/Apple?ram=8GB&storage=256GB`

### 5. Get Featured Products

**GET** `/api/products/featured/list`

- **Query Parameters**:
  - `limit` (default: 8)

### 6. Get Products in Price Range

**GET** `/api/products/price/range`

- **Query Parameters**:
  - `minPrice` (required)
  - `maxPrice` (required)
  - `page` (default: 1)
  - `limit` (default: 12)

**Example**: `/api/products/price/range?minPrice=20000&maxPrice=80000`

### 7. Get Product Brands

**GET** `/api/products/brands/list`

- Returns all available brands with product counts

### 8. Search Products

**GET** `/api/products/search/query`

- **Query Parameters**:
  - `query` (required) - Search term
  - `page` (default: 1)
  - `limit` (default: 12)

**Example**: `/api/products/search/query?query=iPhone&page=1&limit=10`

### 9. Update Product

**PUT** `/api/products/:id`

- **Authentication**: Required
- **Parameters**:
  - `id` - Product ID
- **Body**: Any product fields to update

### 10. Update Stock

**PATCH** `/api/products/:id/stock`

- **Authentication**: Required
- **Parameters**:
  - `id` - Product ID
- **Body**:

```json
{
  "quantity": 10
}
```

### 11. Add Review

**PATCH** `/api/products/:id/review`

- **Authentication**: Required
- **Parameters**:
  - `id` - Product ID
- **Body**:

```json
{
  "rating": 4.5
}
```

### 12. Delete Product (Soft Delete)

**DELETE** `/api/products/:id`

- **Authentication**: Required
- **Parameters**:
  - `id` - Product ID

### 13. Hard Delete Product

**DELETE** `/api/products/:id/permanent`

- **Authentication**: Required (Admin only)
- **Parameters**:
  - `id` - Product ID

## Response Format

### Success Response

```json
{
  "statusCode": 200,
  "data": {
    // Response data
  },
  "message": "Success message",
  "success": true
}
```

### Error Response

```json
{
  "statusCode": 400,
  "message": "Error message",
  "success": false,
  "errors": []
}
```

### Paginated Response

```json
{
  "statusCode": 200,
  "data": {
    "products": [...],
    "pagination": {
      "currentPage": 1,
      "totalPages": 10,
      "totalCount": 95,
      "hasNextPage": true,
      "hasPrevPage": false,
      "limit": 12
    }
  },
  "message": "Products fetched successfully",
  "success": true
}
```

## Usage Examples

### Frontend Integration (React/JavaScript)

```javascript
// Fetch products with filters
const fetchProducts = async () => {
  try {
    const response = await fetch(
      "/api/products?brand=Samsung&minPrice=20000&maxPrice=80000",
      {
        credentials: "include",
      }
    );
    const data = await response.json();

    if (data.success) {
      setProducts(data.data.products);
      setPagination(data.data.pagination);
    }
  } catch (error) {
    console.error("Error fetching products:", error);
  }
};

// Search products
const searchProducts = async (searchQuery) => {
  try {
    const response = await fetch(
      `/api/products/search/query?query=${encodeURIComponent(searchQuery)}`,
      {
        credentials: "include",
      }
    );
    const data = await response.json();

    if (data.success) {
      setSearchResults(data.data.products);
    }
  } catch (error) {
    console.error("Error searching products:", error);
  }
};

// Create product (authenticated)
const createProduct = async (productData) => {
  try {
    const response = await fetch("/api/products", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
      body: JSON.stringify(productData),
    });

    const data = await response.json();

    if (data.success) {
      console.log("Product created:", data.data);
    }
  } catch (error) {
    console.error("Error creating product:", error);
  }
};
```

## Filter Examples

### Get Apple products with 8GB RAM

```
GET /api/products/brand/Apple?ram=8GB
```

### Get products between ₹50,000 - ₹1,00,000

```
GET /api/products/price/range?minPrice=50000&maxPrice=100000
```

### Search for "5G phones"

```
GET /api/products/search/query?query=5G phones
```

### Get featured Samsung products

```
GET /api/products?brand=Samsung&isFeatured=true
```

This comprehensive controller provides all the functionality needed for a mobile phone e-commerce platform with advanced filtering, search, and management capabilities.
