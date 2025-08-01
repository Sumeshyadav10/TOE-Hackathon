import mongoose from "mongoose";

const productSchema = new mongoose.Schema(
  {
    // Basic Information
    name: {
      type: String,
      required: true,
      trim: true,
    },
    brand: {
      type: String,
      required: true,
      trim: true,
    },
    model: {
      type: String,
      required: true,
      trim: true,
    },
    description: {
      type: String,
      required: true,
    },

    // Pricing
    price: {
      type: Number,
      required: true,
      min: 0,
    },
    originalPrice: {
      type: Number,
      min: 0,
    },
    discount: {
      type: Number,
      default: 0,
      min: 0,
      max: 100,
    },

    // Images
    images: [
      {
        type: String,
      },
    ],
    mainImage: {
      type: String,
    },

    // Category and Classification
    category: {
      type: String,
      default: "Mobile Phone",
      required: true,
    },
    subCategory: {
      type: String,
      enum: ["Smartphone", "Feature Phone", "Rugged Phone"],
      default: "Smartphone",
    },

    // Technical Specifications
    specifications: {
      // Display
      display: {
        size: {
          type: String, // e.g., "6.1 inches"
        },
        resolution: {
          type: String, // e.g., "2556 x 1179"
        },
        type: {
          type: String, // e.g., "Super Retina XDR OLED"
        },
        refreshRate: {
          type: String, // e.g., "120Hz"
        },
      },

      // Performance
      processor: {
        chipset: {
          type: String, // e.g., "Apple A16 Bionic"
        },
        cpu: {
          type: String, // e.g., "Hexa-core"
        },
        gpu: {
          type: String, // e.g., "Apple GPU"
        },
      },

      // Memory and Storage
      memory: {
        ram: {
          type: String, // e.g., "8GB"
          required: true,
        },
        storage: {
          type: String, // e.g., "256GB"
          required: true,
        },
        expandable: {
          type: Boolean,
          default: false,
        },
        maxExpandable: {
          type: String, // e.g., "1TB"
        },
      },

      // Camera
      camera: {
        rear: {
          primary: {
            type: String, // e.g., "48MP"
          },
          secondary: {
            type: String, // e.g., "12MP Ultra Wide"
          },
          tertiary: {
            type: String, // e.g., "12MP Telephoto"
          },
          features: [String], // e.g., ["Night Mode", "Portrait Mode"]
        },
        front: {
          primary: {
            type: String, // e.g., "12MP"
          },
          features: [String],
        },
        videoRecording: {
          type: String, // e.g., "4K at 60fps"
        },
      },

      // Battery
      battery: {
        capacity: {
          type: String, // e.g., "4000mAh"
        },
        type: {
          type: String, // e.g., "Li-Polymer"
        },
        fastCharging: {
          type: String, // e.g., "67W"
        },
        wirelessCharging: {
          type: Boolean,
          default: false,
        },
      },

      // Connectivity
      connectivity: {
        network: [String], // e.g., ["5G", "4G LTE"]
        wifi: {
          type: String, // e.g., "Wi-Fi 6"
        },
        bluetooth: {
          type: String, // e.g., "5.3"
        },
        nfc: {
          type: Boolean,
          default: false,
        },
        usb: {
          type: String, // e.g., "USB-C"
        },
      },

      // Build and Design
      build: {
        dimensions: {
          type: String, // e.g., "160.7 x 78.1 x 7.8 mm"
        },
        weight: {
          type: String, // e.g., "240g"
        },
        material: {
          type: String, // e.g., "Aluminum frame, Glass back"
        },
        colors: [String], // e.g., ["Black", "White", "Blue"]
      },

      // Operating System
      os: {
        name: {
          type: String, // e.g., "iOS", "Android"
          required: true,
        },
        version: {
          type: String, // e.g., "16.0", "13"
        },
      },

      // Security
      security: {
        fingerprint: {
          type: Boolean,
          default: false,
        },
        faceUnlock: {
          type: Boolean,
          default: false,
        },
        other: [String], // e.g., ["Face ID", "Touch ID"]
      },

      // Other Features
      waterResistance: {
        type: String, // e.g., "IP68"
      },
      sensors: [String], // e.g., ["Accelerometer", "Gyroscope", "Proximity"]
    },

    // Inventory
    stock: {
      type: Number,
      default: 0,
      min: 0,
    },
    inStock: {
      type: Boolean,
      default: true,
    },

    // Ratings and Reviews
    rating: {
      average: {
        type: Number,
        default: 0,
        min: 0,
        max: 5,
      },
      count: {
        type: Number,
        default: 0,
      },
    },

    // Status
    isActive: {
      type: Boolean,
      default: true,
    },
    isFeatured: {
      type: Boolean,
      default: false,
    },

    // SEO
    slug: {
      type: String,
      unique: true,
    },
    metaTitle: String,
    metaDescription: String,

    // Seller Information (if marketplace)
    seller: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },

    // Tags for search
    tags: [String],
  },
  {
    timestamps: true, // Adds createdAt and updatedAt
  }
);

// Indexes for better query performance
productSchema.index({ brand: 1, model: 1 });
productSchema.index({ price: 1 });
productSchema.index({ "specifications.memory.ram": 1 });
productSchema.index({ "specifications.memory.storage": 1 });
productSchema.index({ "rating.average": -1 });
productSchema.index({ createdAt: -1 });
productSchema.index({ slug: 1 });

// Pre-save middleware to generate slug
productSchema.pre("save", function (next) {
  if (
    this.isModified("name") ||
    this.isModified("brand") ||
    this.isModified("model")
  ) {
    this.slug = `${this.brand}-${this.model}-${this.name}`
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/^-|-$/g, "");
  }
  next();
});

// Virtual for formatted price
productSchema.virtual("formattedPrice").get(function () {
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
  }).format(this.price);
});

// Virtual for discount price
productSchema.virtual("discountedPrice").get(function () {
  if (this.originalPrice && this.discount > 0) {
    return this.originalPrice - (this.originalPrice * this.discount) / 100;
  }
  return this.price;
});

// Method to update stock
productSchema.methods.updateStock = function (quantity) {
  this.stock += quantity;
  this.inStock = this.stock > 0;
  return this.save();
};

// Method to add review
productSchema.methods.addReview = function (rating) {
  const totalRating = this.rating.average * this.rating.count + rating;
  this.rating.count += 1;
  this.rating.average = totalRating / this.rating.count;
  return this.save();
};

// Static method to find by brand
productSchema.statics.findByBrand = function (brand) {
  return this.find({ brand: new RegExp(brand, "i"), isActive: true });
};

// Static method to find in price range
productSchema.statics.findInPriceRange = function (minPrice, maxPrice) {
  return this.find({
    price: { $gte: minPrice, $lte: maxPrice },
    isActive: true,
  });
};

const Product = mongoose.model("Product", productSchema);

export default Product;
