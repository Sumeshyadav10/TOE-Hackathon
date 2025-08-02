// MongoDB Playground - Insert 20 Mobile Phone Dummy Data
// Use Ctrl+Space inside a snippet or a string literal to trigger completions.

// The current database to use.
use("Hackathon-Model");

// Clear existing products to avoid duplicate key errors
console.log("🗑️ Clearing existing products...");
db.getCollection("products").deleteMany({});
console.log("✅ Existing products cleared!");

// Insert 20 mobile phone dummy data records
console.log("📱 Inserting 20 mobile phone records...");
db.getCollection("products").insertMany([
  {
    name: "iPhone 15 Pro",
    brand: "Apple",
    model: "A3102",
    slug: "apple-a3102-iphone-15-pro",
    description:
      "Latest iPhone with titanium design and A17 Pro chip featuring advanced camera system",
    price: 134900,
    originalPrice: 144900,
    discount: 7,
    specifications: {
      display: {
        size: "6.1 inches",
        resolution: "2556 x 1179",
        type: "Super Retina XDR OLED",
        refreshRate: "120Hz",
      },
      memory: {
        ram: "8GB",
        storage: "256GB",
      },
      camera: {
        rear: {
          primary: "48MP",
          secondary: "12MP Ultra Wide",
          tertiary: "12MP Telephoto",
        },
        front: {
          primary: "12MP",
        },
      },
      battery: {
        capacity: "3274mAh",
        fastCharging: "20W",
        wirelessCharging: true,
      },
      os: {
        name: "iOS",
        version: "17",
      },
    },
    stock: 50,
    tags: ["5G", "Titanium", "Pro Camera", "Face ID"],
    isFeatured: true,
  },
  {
    name: "Galaxy S24 Ultra",
    brand: "Samsung",
    model: "SM-S928B",
    slug: "samsung-sm-s928b-galaxy-s24-ultra",
    description: "Premium Samsung flagship with S Pen and advanced AI features",
    price: 129999,
    originalPrice: 139999,
    discount: 7,
    specifications: {
      display: {
        size: "6.8 inches",
        resolution: "3120 x 1440",
        type: "Dynamic AMOLED 2X",
        refreshRate: "120Hz",
      },
      memory: {
        ram: "12GB",
        storage: "256GB",
      },
      camera: {
        rear: {
          primary: "200MP",
          secondary: "50MP Periscope Telephoto",
          tertiary: "12MP Ultra Wide",
        },
        front: {
          primary: "12MP",
        },
      },
      battery: {
        capacity: "5000mAh",
        fastCharging: "45W",
        wirelessCharging: true,
      },
      os: {
        name: "Android",
        version: "14",
      },
    },
    stock: 35,
    tags: ["5G", "S Pen", "AI Camera", "Ultra"],
    isFeatured: true,
  },
  {
    name: "Pixel 8 Pro",
    brand: "Google",
    model: "GX7AS",
    slug: "google-gx7as-pixel-8-pro",
    description:
      "Google's flagship with advanced AI photography and pure Android experience",
    price: 84999,
    originalPrice: 89999,
    discount: 6,
    specifications: {
      display: {
        size: "6.7 inches",
        resolution: "2992 x 1344",
        type: "LTPO OLED",
        refreshRate: "120Hz",
      },
      memory: {
        ram: "12GB",
        storage: "128GB",
      },
      camera: {
        rear: {
          primary: "50MP",
          secondary: "48MP Telephoto",
          tertiary: "48MP Ultra Wide",
        },
        front: {
          primary: "10.5MP",
        },
      },
      battery: {
        capacity: "5050mAh",
        fastCharging: "30W",
        wirelessCharging: true,
      },
      os: {
        name: "Android",
        version: "14",
      },
    },
    stock: 25,
    tags: ["5G", "AI Photography", "Pure Android", "Titan M"],
    isFeatured: true,
  },
  {
    name: "OnePlus 12",
    brand: "OnePlus",
    model: "CPH2573",
    slug: "oneplus-cph2573-oneplus-12",
    description:
      "Performance flagship with Snapdragon 8 Gen 3 and ultra-fast charging",
    price: 64999,
    originalPrice: 69999,
    discount: 7,
    specifications: {
      display: {
        size: "6.82 inches",
        resolution: "3168 x 1440",
        type: "LTPO AMOLED",
        refreshRate: "120Hz",
      },
      memory: {
        ram: "12GB",
        storage: "256GB",
      },
      camera: {
        rear: {
          primary: "50MP",
          secondary: "64MP Periscope",
          tertiary: "48MP Ultra Wide",
        },
        front: {
          primary: "32MP",
        },
      },
      battery: {
        capacity: "5400mAh",
        fastCharging: "100W",
        wirelessCharging: true,
      },
      os: {
        name: "Android",
        version: "14",
      },
    },
    stock: 40,
    tags: ["5G", "Fast Charging", "Gaming", "Performance"],
    isFeatured: false,
  },
  {
    name: "iPhone 14",
    brand: "Apple",
    model: "A2882",
    slug: "apple-a2882-iphone-14",
    description: "Reliable iPhone with excellent camera and long battery life",
    price: 69999,
    originalPrice: 79999,
    discount: 13,
    specifications: {
      display: {
        size: "6.1 inches",
        resolution: "2556 x 1179",
        type: "Super Retina XDR OLED",
        refreshRate: "60Hz",
      },
      memory: {
        ram: "6GB",
        storage: "128GB",
      },
      camera: {
        rear: {
          primary: "12MP",
          secondary: "12MP Ultra Wide",
        },
        front: {
          primary: "12MP",
        },
      },
      battery: {
        capacity: "3279mAh",
        fastCharging: "20W",
        wirelessCharging: true,
      },
      os: {
        name: "iOS",
        version: "16",
      },
    },
    stock: 60,
    tags: ["5G", "Dual Camera", "Face ID", "MagSafe"],
    isFeatured: false,
  },
  {
    name: "Galaxy A54 5G",
    brand: "Samsung",
    model: "SM-A546B",
    slug: "samsung-sm-a546b-galaxy-a54-5g",
    description: "Mid-range Samsung with excellent camera and 5G connectivity",
    price: 38999,
    originalPrice: 42999,
    discount: 9,
    specifications: {
      display: {
        size: "6.4 inches",
        resolution: "2340 x 1080",
        type: "Super AMOLED",
        refreshRate: "120Hz",
      },
      memory: {
        ram: "8GB",
        storage: "128GB",
      },
      camera: {
        rear: {
          primary: "50MP",
          secondary: "12MP Ultra Wide",
          tertiary: "5MP Macro",
        },
        front: {
          primary: "32MP",
        },
      },
      battery: {
        capacity: "5000mAh",
        fastCharging: "25W",
        wirelessCharging: false,
      },
      os: {
        name: "Android",
        version: "13",
      },
    },
    stock: 80,
    tags: ["5G", "Mid-range", "Triple Camera", "AMOLED"],
    isFeatured: false,
  },
  {
    name: "Pixel 7a",
    brand: "Google",
    model: "GHL1X",
    slug: "google-ghl1x-pixel-7a",
    description: "Affordable Google phone with flagship camera features",
    price: 43999,
    originalPrice: 47999,
    discount: 8,
    specifications: {
      display: {
        size: "6.1 inches",
        resolution: "2400 x 1080",
        type: "OLED",
        refreshRate: "90Hz",
      },
      memory: {
        ram: "8GB",
        storage: "128GB",
      },
      camera: {
        rear: {
          primary: "64MP",
          secondary: "13MP Ultra Wide",
        },
        front: {
          primary: "13MP",
        },
      },
      battery: {
        capacity: "4385mAh",
        fastCharging: "18W",
        wirelessCharging: true,
      },
      os: {
        name: "Android",
        version: "13",
      },
    },
    stock: 45,
    tags: ["5G", "AI Camera", "Affordable", "Pure Android"],
    isFeatured: false,
  },
  {
    name: "iPhone 13",
    brand: "Apple",
    model: "A2482",
    slug: "apple-a2482-iphone-13",
    description:
      "Previous generation iPhone with excellent performance and camera",
    price: 59999,
    originalPrice: 69999,
    discount: 14,
    specifications: {
      display: {
        size: "6.1 inches",
        resolution: "2532 x 1170",
        type: "Super Retina XDR OLED",
        refreshRate: "60Hz",
      },
      memory: {
        ram: "4GB",
        storage: "128GB",
      },
      camera: {
        rear: {
          primary: "12MP",
          secondary: "12MP Ultra Wide",
        },
        front: {
          primary: "12MP",
        },
      },
      battery: {
        capacity: "3240mAh",
        fastCharging: "20W",
        wirelessCharging: true,
      },
      os: {
        name: "iOS",
        version: "15",
      },
    },
    stock: 55,
    tags: ["5G", "A15 Bionic", "Dual Camera", "Cinematic Mode"],
    isFeatured: false,
  },
  {
    name: "Galaxy S23",
    brand: "Samsung",
    model: "SM-S911B",
    slug: "samsung-sm-s911b-galaxy-s23",
    description: "Compact Samsung flagship with powerful performance",
    price: 74999,
    originalPrice: 84999,
    discount: 12,
    specifications: {
      display: {
        size: "6.1 inches",
        resolution: "2340 x 1080",
        type: "Dynamic AMOLED 2X",
        refreshRate: "120Hz",
      },
      memory: {
        ram: "8GB",
        storage: "256GB",
      },
      camera: {
        rear: {
          primary: "50MP",
          secondary: "10MP Telephoto",
          tertiary: "12MP Ultra Wide",
        },
        front: {
          primary: "12MP",
        },
      },
      battery: {
        capacity: "3900mAh",
        fastCharging: "25W",
        wirelessCharging: true,
      },
      os: {
        name: "Android",
        version: "13",
      },
    },
    stock: 30,
    tags: ["5G", "Compact", "Triple Camera", "Snapdragon 8 Gen 2"],
    isFeatured: false,
  },
  {
    name: "OnePlus 11 5G",
    brand: "OnePlus",
    model: "CPH2449",
    slug: "oneplus-cph2449-oneplus-11-5g",
    description: "Premium OnePlus with Hasselblad camera and fast performance",
    price: 56999,
    originalPrice: 61999,
    discount: 8,
    specifications: {
      display: {
        size: "6.7 inches",
        resolution: "3216 x 1440",
        type: "LTPO AMOLED",
        refreshRate: "120Hz",
      },
      memory: {
        ram: "8GB",
        storage: "128GB",
      },
      camera: {
        rear: {
          primary: "50MP",
          secondary: "32MP Telephoto",
          tertiary: "48MP Ultra Wide",
        },
        front: {
          primary: "16MP",
        },
      },
      battery: {
        capacity: "5000mAh",
        fastCharging: "100W",
        wirelessCharging: false,
      },
      os: {
        name: "Android",
        version: "13",
      },
    },
    stock: 35,
    tags: ["5G", "Hasselblad", "Fast Charging", "Gaming"],
    isFeatured: false,
  },
  {
    name: "Redmi Note 13 Pro",
    brand: "Xiaomi",
    model: "23090RA98G",
    slug: "xiaomi-23090ra98g-redmi-note-13-pro",
    description:
      "Feature-packed mid-range phone with excellent value for money",
    price: 24999,
    originalPrice: 27999,
    discount: 11,
    specifications: {
      display: {
        size: "6.67 inches",
        resolution: "2712 x 1220",
        type: "AMOLED",
        refreshRate: "120Hz",
      },
      memory: {
        ram: "8GB",
        storage: "128GB",
      },
      camera: {
        rear: {
          primary: "200MP",
          secondary: "8MP Ultra Wide",
          tertiary: "2MP Macro",
        },
        front: {
          primary: "16MP",
        },
      },
      battery: {
        capacity: "5100mAh",
        fastCharging: "67W",
        wirelessCharging: false,
      },
      os: {
        name: "Android",
        version: "13",
      },
    },
    stock: 100,
    tags: ["5G", "200MP Camera", "Fast Charging", "Value for Money"],
    isFeatured: false,
  },
  {
    name: "iPhone SE (3rd Gen)",
    brand: "Apple",
    model: "A2782",
    slug: "apple-a2782-iphone-se-3rd-gen",
    description: "Compact iPhone with powerful A15 Bionic chip and Touch ID",
    price: 43999,
    originalPrice: 47999,
    discount: 8,
    specifications: {
      display: {
        size: "4.7 inches",
        resolution: "1334 x 750",
        type: "Retina IPS LCD",
        refreshRate: "60Hz",
      },
      memory: {
        ram: "4GB",
        storage: "64GB",
      },
      camera: {
        rear: {
          primary: "12MP",
        },
        front: {
          primary: "7MP",
        },
      },
      battery: {
        capacity: "2018mAh",
        fastCharging: "20W",
        wirelessCharging: true,
      },
      os: {
        name: "iOS",
        version: "15",
      },
    },
    stock: 40,
    tags: ["5G", "Compact", "Touch ID", "A15 Bionic"],
    isFeatured: false,
  },
  {
    name: "Galaxy Z Flip5",
    brand: "Samsung",
    model: "SM-F731B",
    slug: "samsung-sm-f731b-galaxy-z-flip5",
    description: "Innovative foldable phone with compact flip design",
    price: 99999,
    originalPrice: 109999,
    discount: 9,
    specifications: {
      display: {
        size: "6.7 inches",
        resolution: "2640 x 1080",
        type: "Dynamic AMOLED 2X",
        refreshRate: "120Hz",
      },
      memory: {
        ram: "8GB",
        storage: "256GB",
      },
      camera: {
        rear: {
          primary: "12MP",
          secondary: "12MP Ultra Wide",
        },
        front: {
          primary: "10MP",
        },
      },
      battery: {
        capacity: "3700mAh",
        fastCharging: "25W",
        wirelessCharging: true,
      },
      os: {
        name: "Android",
        version: "13",
      },
    },
    stock: 20,
    tags: ["5G", "Foldable", "Compact", "Innovative"],
    isFeatured: true,
  },
  {
    name: "Oppo Reno 10 Pro",
    brand: "Oppo",
    model: "CPH2525",
    slug: "oppo-cph2525-oppo-reno-10-pro",
    description:
      "Camera-focused smartphone with portrait photography expertise",
    price: 39999,
    originalPrice: 44999,
    discount: 11,
    specifications: {
      display: {
        size: "6.74 inches",
        resolution: "2772 x 1240",
        type: "AMOLED",
        refreshRate: "120Hz",
      },
      memory: {
        ram: "12GB",
        storage: "256GB",
      },
      camera: {
        rear: {
          primary: "50MP",
          secondary: "32MP Telephoto",
          tertiary: "8MP Ultra Wide",
        },
        front: {
          primary: "32MP",
        },
      },
      battery: {
        capacity: "4600mAh",
        fastCharging: "80W",
        wirelessCharging: false,
      },
      os: {
        name: "Android",
        version: "13",
      },
    },
    stock: 45,
    tags: ["5G", "Portrait Photography", "Fast Charging", "Selfie"],
    isFeatured: false,
  },
  {
    name: "Vivo V29 Pro",
    brand: "Vivo",
    model: "V2250",
    slug: "vivo-v2250-vivo-v29-pro",
    description: "Stylish phone with excellent selfie camera and design",
    price: 42999,
    originalPrice: 47999,
    discount: 10,
    specifications: {
      display: {
        size: "6.78 inches",
        resolution: "2800 x 1260",
        type: "AMOLED",
        refreshRate: "120Hz",
      },
      memory: {
        ram: "12GB",
        storage: "256GB",
      },
      camera: {
        rear: {
          primary: "50MP",
          secondary: "12MP Ultra Wide",
          tertiary: "2MP Bokeh",
        },
        front: {
          primary: "50MP",
        },
      },
      battery: {
        capacity: "4600mAh",
        fastCharging: "80W",
        wirelessCharging: false,
      },
      os: {
        name: "Android",
        version: "13",
      },
    },
    stock: 35,
    tags: ["5G", "Selfie Expert", "Stylish Design", "Fast Charging"],
    isFeatured: false,
  },
  {
    name: "Realme GT 3",
    brand: "Realme",
    model: "RMX3708",
    slug: "realme-rmx3708-realme-gt-3",
    description: "Gaming-focused smartphone with extreme fast charging",
    price: 34999,
    originalPrice: 39999,
    discount: 13,
    specifications: {
      display: {
        size: "6.74 inches",
        resolution: "2772 x 1240",
        type: "AMOLED",
        refreshRate: "144Hz",
      },
      memory: {
        ram: "12GB",
        storage: "256GB",
      },
      camera: {
        rear: {
          primary: "50MP",
          secondary: "8MP Ultra Wide",
          tertiary: "2MP Macro",
        },
        front: {
          primary: "16MP",
        },
      },
      battery: {
        capacity: "4600mAh",
        fastCharging: "240W",
        wirelessCharging: false,
      },
      os: {
        name: "Android",
        version: "13",
      },
    },
    stock: 50,
    tags: ["5G", "Gaming", "240W Charging", "144Hz Display"],
    isFeatured: false,
  },
  {
    name: "Nothing Phone (2)",
    brand: "Nothing",
    model: "A065",
    slug: "nothing-a065-nothing-phone-2",
    description: "Unique transparent design phone with Glyph interface",
    price: 44999,
    originalPrice: 49999,
    discount: 10,
    specifications: {
      display: {
        size: "6.7 inches",
        resolution: "2412 x 1080",
        type: "LTPO OLED",
        refreshRate: "120Hz",
      },
      memory: {
        ram: "8GB",
        storage: "128GB",
      },
      camera: {
        rear: {
          primary: "50MP",
          secondary: "50MP Ultra Wide",
        },
        front: {
          primary: "32MP",
        },
      },
      battery: {
        capacity: "4700mAh",
        fastCharging: "45W",
        wirelessCharging: true,
      },
      os: {
        name: "Android",
        version: "13",
      },
    },
    stock: 30,
    tags: ["5G", "Unique Design", "Glyph Interface", "Transparent"],
    isFeatured: true,
  },
  {
    name: "Motorola Edge 40 Pro",
    brand: "Motorola",
    model: "XT2301-4",
    slug: "motorola-xt2301-4-motorola-edge-40-pro",
    description: "Premium Motorola phone with clean Android experience",
    price: 49999,
    originalPrice: 54999,
    discount: 9,
    specifications: {
      display: {
        size: "6.67 inches",
        resolution: "2400 x 1080",
        type: "pOLED",
        refreshRate: "165Hz",
      },
      memory: {
        ram: "8GB",
        storage: "256GB",
      },
      camera: {
        rear: {
          primary: "50MP",
          secondary: "50MP Ultra Wide",
          tertiary: "12MP Telephoto",
        },
        front: {
          primary: "60MP",
        },
      },
      battery: {
        capacity: "4600mAh",
        fastCharging: "125W",
        wirelessCharging: true,
      },
      os: {
        name: "Android",
        version: "13",
      },
    },
    stock: 25,
    tags: ["5G", "Clean Android", "Fast Charging", "165Hz Display"],
    isFeatured: false,
  },
  {
    name: "Honor 90 Pro",
    brand: "Honor",
    model: "REP-NX9",
    slug: "honor-rep-nx9-honor-90-pro",
    description: "Elegant smartphone with advanced portrait photography",
    price: 37999,
    originalPrice: 42999,
    discount: 12,
    specifications: {
      display: {
        size: "6.78 inches",
        resolution: "2700 x 1224",
        type: "AMOLED",
        refreshRate: "120Hz",
      },
      memory: {
        ram: "12GB",
        storage: "256GB",
      },
      camera: {
        rear: {
          primary: "200MP",
          secondary: "12MP Ultra Wide",
          tertiary: "2MP Depth",
        },
        front: {
          primary: "50MP",
        },
      },
      battery: {
        capacity: "5000mAh",
        fastCharging: "90W",
        wirelessCharging: false,
      },
      os: {
        name: "Android",
        version: "13",
      },
    },
    stock: 40,
    tags: ["5G", "200MP Camera", "Portrait Photography", "Elegant Design"],
    isFeatured: false,
  },
  {
    name: "Asus ROG Phone 7",
    brand: "Asus",
    model: "AI2205",
    slug: "asus-ai2205-asus-rog-phone-7",
    description: "Ultimate gaming smartphone with advanced cooling system",
    price: 79999,
    originalPrice: 89999,
    discount: 11,
    specifications: {
      display: {
        size: "6.78 inches",
        resolution: "2448 x 1080",
        type: "AMOLED",
        refreshRate: "165Hz",
      },
      memory: {
        ram: "12GB",
        storage: "256GB",
      },
      camera: {
        rear: {
          primary: "50MP",
          secondary: "13MP Ultra Wide",
          tertiary: "5MP Macro",
        },
        front: {
          primary: "32MP",
        },
      },
      battery: {
        capacity: "6000mAh",
        fastCharging: "65W",
        wirelessCharging: false,
      },
      os: {
        name: "Android",
        version: "13",
      },
    },
    stock: 15,
    tags: ["5G", "Gaming Phone", "165Hz Display", "6000mAh Battery"],
    isFeatured: true,
  },
]);

// Print success message and show results
console.log("✅ Successfully inserted 20 mobile phone records!");

// Display the total count of products
const totalProducts = db.getCollection("products").countDocuments();
console.log(`📱 Total products in database: ${totalProducts}`);

// Show featured products
console.log("\n🌟 Featured Products:");
db.getCollection("products")
  .find({ isFeatured: true })
  .forEach((product) => {
    console.log(
      `${product.brand} ${product.name} - ₹${product.price.toLocaleString()}`
    );
  });

// Show products by price range
console.log("\n💰 Price Range Distribution:");
console.log(
  "Premium (₹80,000+):",
  db.getCollection("products").countDocuments({ price: { $gte: 80000 } })
);
console.log(
  "Mid-Premium (₹50,000-79,999):",
  db
    .getCollection("products")
    .countDocuments({ price: { $gte: 50000, $lt: 80000 } })
);
console.log(
  "Mid-Range (₹30,000-49,999):",
  db
    .getCollection("products")
    .countDocuments({ price: { $gte: 30000, $lt: 50000 } })
);
console.log(
  "Budget (Under ₹30,000):",
  db.getCollection("products").countDocuments({ price: { $lt: 30000 } })
);

// Show brand distribution
console.log("\n🏭 Brand Distribution:");
db.getCollection("products")
  .aggregate([
    { $group: { _id: "$brand", count: { $sum: 1 } } },
    { $sort: { count: -1 } },
  ])
  .forEach((brand) => {
    console.log(`${brand._id}: ${brand.count} products`);
  });
