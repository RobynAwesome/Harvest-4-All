// ── Badges ──
export const MOCK_BADGES = [
  {
    _id: "badge_1",
    name: "First Harvest",
    icon: "🌱",
    description: "Successfully logged your first crop harvest.",
    requirement: { type: "harvest", count: 1 }
  },
  {
    _id: "badge_2",
    name: "Water Warrior",
    icon: "💧",
    description: "Saved over 100L of water through greywater recycling.",
    requirement: { type: "water_saved", count: 100 }
  },
  {
    _id: "badge_3",
    name: "Eco Champion",
    icon: "🏆",
    description: "Completed 50 sustainability actions.",
    requirement: { type: "any", count: 50 }
  },
  {
    _id: "badge_4",
    name: "Market Maven",
    icon: "🤝",
    description: "Completed your first community swap or sale.",
    requirement: { type: "market", count: 1 }
  },
  {
    _id: "badge_5",
    name: "Green Guardian",
    icon: "🛡️",
    description: "Logged 10 sustainability actions.",
    requirement: { type: "any", count: 10 }
  },
  {
    _id: "badge_6",
    name: "Community Hero",
    icon: "❤️",
    description: "Earned 500 total sustainability points.",
    requirement: { type: "points", count: 500 }
  }
];

// ── Market Listings (using local assets where available) ──
export const MOCK_MARKET_LISTINGS = [
  {
    _id: "m_1",
    title: "Organic Spinach (2kg)",
    description: "Fresh winter spinach grown in Khayelitsha community garden. Harvested this morning. High in iron and Vitamin A.",
    price: 15,
    type: "sale",
    category: "vegetables",
    location: "Khayelitsha",
    imageUrl: "/community resilience/growth.png"
  },
  {
    _id: "m_2",
    title: "Cherry Tomato Seedlings (x6)",
    description: "Determinate variety, perfect for containers. Includes planting guide.",
    price: 10,
    type: "sale",
    category: "seedlings",
    location: "Gugulethu",
    imageUrl: "/more crop focused indigenous & common crops/Gemini_Generated_Image_plo495plo495plo4.png"
  },
  {
    _id: "m_3",
    title: "Homemade Compost (5kg)",
    description: "Kitchen scraps + brown matter, aged 3 months. Perfect for WC sandy soil amendment — mix 1 part compost to 3 parts soil.",
    price: 25,
    type: "sale",
    category: "compost",
    location: "Mitchells Plain",
    imageUrl: "/General images/Gemini_Generated_Image_emx36yemx36yemx3.png"
  },
  {
    _id: "m_4",
    title: "Kale & Chard Bundle",
    description: "Swap for herbs or seedlings. Freshly cut from my winter garden.",
    price: 0,
    type: "swap",
    category: "vegetables",
    location: "Langa",
    imageUrl: "/community resilience/market.png"
  },
  {
    _id: "m_5",
    title: "Herb Starter Kit",
    description: "Basil, mint, parsley & rosemary in recycled containers. Ready to grow.",
    price: 35,
    type: "sale",
    category: "seedlings",
    location: "Khayelitsha",
    imageUrl: "/more crop focused indigenous & common crops/Gemini_Generated_Image_qo07baqo07baqo07.png"
  },
  {
    _id: "m_6",
    title: "Upcycled Tyre Planter",
    description: "Painted & sealed tyre planter with drainage. Includes soil mix.",
    price: 20,
    type: "sale",
    category: "tools",
    location: "Nyanga",
    imageUrl: "/General images/Gemini_Generated_Image_swnvonswnvonswnv.png"
  }
];

// ── Recent Actions ──
export const MOCK_ACTIONS = [
  {
    _id: "a_1",
    type: "harvest",
    description: "Harvested 2kg of Spinach from container garden",
    value: 2,
    unit: "kg",
    points: 50,
    date: new Date(Date.now() - 86400000).toISOString()
  },
  {
    _id: "a_2",
    type: "save",
    description: "Collected 20L rainwater from roof gutter",
    value: 20,
    unit: "L",
    points: 20,
    date: new Date(Date.now() - 172800000).toISOString()
  },
  {
    _id: "a_3",
    type: "reduce",
    description: "Started a compost bin from kitchen scraps",
    value: 5,
    unit: "kg",
    points: 30,
    date: new Date(Date.now() - 259200000).toISOString()
  },
  {
    _id: "a_4",
    type: "save_energy",
    description: "Switched to LED bulbs — saving 60W per room",
    value: 60,
    unit: "W",
    points: 15,
    date: new Date(Date.now() - 345600000).toISOString()
  }
];

// ── Western Cape Crops (from kb.docx research) ──
export const CROPS_DATA = [
  // ─ Winter Crops (May–August) ─
  {
    name: "Spinach",
    time: 6,
    unit: "WEEKS",
    difficulty: "EASY",
    category: "Nutrient Powerhouse",
    minSpace: "small",
    seasons: ["winter", "year-round"],
    description: "Harvest in 6-8 weeks. High in iron (3.6mg/100g) and Vitamin A. Thrives in WC winter.",
    waterNeeds: "high",
    soilType: "pH 6.5-7.5, well-draining, fertile",
    containerDepth: "20cm",
    containerSize: "5-10L per plant",
    nutrition: { iron: 3.6, calcium: 99, vitA: 9377, vitC: 28, protein: 3.0 },
    img: "/community resilience/growth.png",
    container: true
  },
  {
    name: "Kale",
    time: 9,
    unit: "WEEKS",
    difficulty: "EASY",
    category: "Nutrient Powerhouse",
    minSpace: "small",
    seasons: ["winter", "year-round"],
    description: "Superfood: Vitamins A, C, K. 150mg calcium per 100g. Survives frost.",
    waterNeeds: "moderate",
    soilType: "pH 6.0-7.5, fertile, organic matter",
    containerDepth: "20cm",
    containerSize: "5-10L per plant",
    nutrition: { iron: 1.2, calcium: 150, vitA: 13600, vitC: 80, protein: 3.0 },
    img: "/more crop focused indigenous & common crops/Gemini_Generated_Image_uhby6vuhby6vuhby.png",
    container: true
  },
  {
    name: "Swiss Chard",
    time: 6,
    unit: "WEEKS",
    difficulty: "EASY",
    category: "Nutrient Powerhouse",
    minSpace: "small",
    seasons: ["winter", "summer", "year-round"],
    description: "Grows year-round in WC. Iron-rich, handles partial shade. Cut-and-come-again harvesting.",
    waterNeeds: "high",
    soilType: "pH 6.5-7.5, fertile",
    containerDepth: "20cm",
    containerSize: "5-10L per plant",
    img: "/more crop focused indigenous & common crops/Gemini_Generated_Image_vhbuwqvhbuwqvhbu.png",
    container: true
  },
  {
    name: "Cabbage",
    time: 11,
    unit: "WEEKS",
    difficulty: "MEDIUM",
    category: "Winter Staple",
    minSpace: "medium",
    seasons: ["winter"],
    description: "Plant March-May. Needs consistent moisture and fertile soil. Heavy feeder — add compost monthly.",
    waterNeeds: "high",
    soilType: "pH 6.5-7.0, fertile, moisture-retentive",
    containerDepth: "30cm",
    containerSize: "15-20L",
    img: "/General images/Gemini_Generated_Image_1z1mdz1z1mdz1z1m.png",
    container: true
  },
  {
    name: "Garden Peas",
    time: 11,
    unit: "WEEKS",
    difficulty: "EASY",
    category: "Winter Staple",
    minSpace: "medium",
    seasons: ["winter"],
    description: "Plant May-July. High protein, fixes nitrogen in soil. Great companion for leafy greens.",
    waterNeeds: "moderate",
    soilType: "Well-draining",
    img: "/General images/Gemini_Generated_Image_9pbhc29pbhc29pbh.png",
    container: true
  },
  // ─ Summer Crops (Oct–March) ─
  {
    name: "Cherry Tomatoes",
    time: 12,
    unit: "WEEKS",
    difficulty: "MEDIUM",
    category: "High Yielder",
    minSpace: "medium",
    seasons: ["summer"],
    description: "Plant Sep-Nov. Determinate varieties best for containers. Needs stakes. Water 2-3x weekly.",
    waterNeeds: "moderate",
    soilType: "pH 6.0-6.8, rich, well-draining",
    containerDepth: "25cm",
    containerSize: "20L per plant",
    img: "/more crop focused indigenous & common crops/Gemini_Generated_Image_plo495plo495plo4.png",
    container: true
  },
  {
    name: "Beans (Bush)",
    time: 9,
    unit: "WEEKS",
    difficulty: "EASY",
    category: "High Yielder",
    minSpace: "medium",
    seasons: ["summer"],
    description: "High protein yields in small spaces. Fixes nitrogen — improves soil for next crop.",
    waterNeeds: "moderate",
    soilType: "Well-draining, moderate fertility",
    img: "/General images/Gemini_Generated_Image_jw0kwgjw0kwgjw0k.png",
    container: true
  },
  {
    name: "Butternut Squash",
    time: 16,
    unit: "WEEKS",
    difficulty: "MEDIUM",
    category: "High Yielder",
    minSpace: "large",
    seasons: ["summer"],
    description: "Plant Oct-Dec. Long season but massive yields. Stores for months after harvest.",
    waterNeeds: "high",
    soilType: "Well-draining, fertile",
    img: "/General images/Gemini_Generated_Image_ffxta0ffxta0ffxt.png",
    container: false
  },
  {
    name: "Sweet Potatoes",
    time: 18,
    unit: "WEEKS",
    difficulty: "EASY",
    category: "High Yielder",
    minSpace: "large",
    seasons: ["summer"],
    description: "Plant Oct-Dec. Drought-tolerant once established. Highly nutritious — leaves are also edible.",
    waterNeeds: "moderate",
    soilType: "Well-draining, sandy acceptable",
    img: "/General images/Gemini_Generated_Image_xglduaxglduaxgld.png",
    container: false
  },
  // ─ Year-Round ─
  {
    name: "Spring Onions",
    time: 4,
    unit: "WEEKS",
    difficulty: "EASY",
    category: "Kitchen Staple",
    minSpace: "small",
    seasons: ["year-round"],
    description: "Regrow from kitchen scraps! Cut 3cm from root, place in water, transplant after roots appear.",
    waterNeeds: "moderate",
    soilType: "Any well-draining soil",
    img: "/General images/Gemini_Generated_Image_u66xsyu66xsyu66x.png",
    container: true
  },
  {
    name: "Herbs (Mixed)",
    time: 3,
    unit: "WEEKS",
    difficulty: "EASY",
    category: "Market Seller",
    minSpace: "small",
    seasons: ["year-round"],
    description: "Basil, mint, parsley, rosemary & thyme. High market value. 15cm depth, 3-5L per plant.",
    waterNeeds: "low",
    soilType: "Well-draining, minimal feeding",
    containerDepth: "15cm",
    containerSize: "3-5L per plant",
    img: "/more crop focused indigenous & common crops/Gemini_Generated_Image_qo07baqo07baqo07.png",
    container: true
  },
  {
    name: "Lettuce",
    time: 5,
    unit: "WEEKS",
    difficulty: "EASY",
    category: "Kitchen Staple",
    minSpace: "small",
    seasons: ["year-round"],
    description: "Regrow from kitchen scraps. Place stump in water for 2 weeks, then transplant. Prefers cool shade.",
    waterNeeds: "moderate",
    soilType: "Fertile, well-draining",
    img: "/General images/Gemini_Generated_Image_yaqh0jyaqh0jyaqh.png",
    container: true
  },
  // ─ Indigenous (drought-resistant) ─
  {
    name: "Amaranth (Pigweed)",
    time: 5,
    unit: "WEEKS",
    difficulty: "EASY",
    category: "Indigenous",
    minSpace: "small",
    seasons: ["summer", "year-round"],
    description: "Africa's most nutritious leaf vegetable. 4.5mg iron, 215mg calcium per 100g. Drought-tolerant once established.",
    waterNeeds: "moderate",
    soilType: "Adaptable — tolerates poor soils",
    nutrition: { iron: 4.5, calcium: 215, vitA: 6100, vitC: 70, protein: 4.5 },
    img: "/General images/Gemini_Generated_Image_rhcq0trhcq0trhcq.png",
    container: true
  },
  {
    name: "Dune Spinach",
    time: 5,
    unit: "WEEKS",
    difficulty: "EASY",
    category: "Indigenous",
    minSpace: "small",
    seasons: ["year-round"],
    description: "Endemic to WC coast. Thrives in sandy, poor soil with almost no water. Higher nutrients than cultivated spinach.",
    waterNeeds: "low",
    soilType: "Sandy, poor soil acceptable",
    nutrition: { iron: 2.5, calcium: 120, vitA: 8000, vitC: 45, protein: 2.5 },
    img: "/General images/Gemini_Generated_Image_od9zicod9zicod9z.png",
    container: true
  },
  {
    name: "Cowpea Leaves",
    time: 6,
    unit: "WEEKS",
    difficulty: "EASY",
    category: "Indigenous",
    minSpace: "small",
    seasons: ["summer"],
    description: "High protein — harvest both leaves and peas. Fixes nitrogen in soil. Self-seeds for next season.",
    waterNeeds: "moderate",
    soilType: "Adaptable, tolerates poor soil",
    img: "/General images/Gemini_Generated_Image_rhcq0trhcq0trhcq(1).png",
    container: true
  }
];

// ── Pest Control Data (from pesticides.docx research) ──
export const PEST_CONTROL_DATA = [
  {
    id: "pest_1",
    name: "Aphids & Whitefly",
    affectedCrops: ["Kale", "Spinach", "Tomatoes", "Cabbage"],
    solution: "Neem Oil Spray",
    recipe: "Mix 2 tsp neem oil + 1 tsp dish soap + 1L warm water. Spray undersides of leaves every 5-7 days.",
    prevention: "Plant nasturtiums as trap crops nearby",
    img: "/Pest & diseases/Gemini_Generated_Image_7ak3yv7ak3yv7ak3.png"
  },
  {
    id: "pest_2",
    name: "Caterpillars & Bollworm",
    affectedCrops: ["Cabbage", "Kale", "Tomatoes", "Beans"],
    solution: "BT (Bacillus thuringiensis)",
    recipe: "Apply BT powder or spray to leaves according to product label. Safe for humans — only targets caterpillars.",
    prevention: "Check leaves daily. Remove eggs by hand. Plant basil near tomatoes.",
    img: "/Pest & diseases/Gemini_Generated_Image_bfvq4jbfvq4jbfvq.png"
  },
  {
    id: "pest_3",
    name: "Slugs & Snails",
    affectedCrops: ["Lettuce", "Spinach", "Swiss Chard", "Seedlings"],
    solution: "Eggshell Barrier + Beer Trap",
    recipe: "Crush eggshells around plants as barrier. OR sink a cup of beer into soil level — slugs are attracted and drown.",
    prevention: "Sprinkle diatomaceous earth around plants. Water in mornings, not evenings.",
    img: "/Pest & diseases/Gemini_Generated_Image_dgpyvpdgpyvpdgpy.png"
  },
  {
    id: "pest_4",
    name: "General Pests (Broad Spectrum)",
    affectedCrops: ["All crops"],
    solution: "Garlic-Chili Spray",
    recipe: "Blend 6 garlic cloves + 2 hot chilies + 1L water. Steep 24 hours, strain, add 1 tsp dish soap. Spray every 3-5 days.",
    prevention: "Companion planting: marigolds with tomatoes, basil with peppers, rosemary near beans.",
    img: "/Pest & diseases/Gemini_Generated_Image_oz3msaoz3msaoz3m.png"
  },
  {
    id: "pest_5",
    name: "Powdery Mildew",
    affectedCrops: ["Butternut", "Peas", "Swiss Chard"],
    solution: "Milk Spray",
    recipe: "Mix 1 part milk to 9 parts water. Spray on affected leaves in morning sun. Repeat every 5-7 days.",
    prevention: "Ensure good air circulation. Don't water leaves — water at soil level."
  },
  {
    id: "pest_6",
    name: "Mealybugs",
    affectedCrops: ["Herbs", "Tomatoes", "Sweet Potatoes"],
    solution: "Insecticidal Soap",
    recipe: "Mix 1 tbsp pure castile soap in 1L water. Spray directly on pests. Rinse plants after 2 hours.",
    prevention: "Inspect plants weekly. Isolate affected plants. Use neem oil preventatively."
  }
];

// ── Companion Planting Pairs ──
export const COMPANION_PLANTING = [
  { plant: "Tomatoes", companion: "Basil", benefit: "Repels aphids and whitefly, improves flavour" },
  { plant: "Cabbage", companion: "Marigolds", benefit: "Deters cabbage moth and nematodes" },
  { plant: "Beans", companion: "Rosemary", benefit: "Repels bean beetles" },
  { plant: "Carrots", companion: "Spring Onions", benefit: "Onion smell confuses carrot fly" },
  { plant: "Lettuce", companion: "Nasturtiums", benefit: "Trap crop — lures aphids away from lettuce" },
  { plant: "Peppers", companion: "Basil", benefit: "Improves growth and repels pests" }
];

// ── WC Soil Guide ──
export const SOIL_GUIDE = {
  wcSoilType: "Sandy loam (most of Western Cape)",
  amendment: "Mix 1 part compost to 3 parts existing soil. Let settle 2-3 days before planting.",
  idealPH: "6.0 - 7.5 (slightly acidic to neutral)",
  organicMatter: "Aim for 10-20% compost content",
  mulching: "Cover soil with leaves, straw, or cardboard. Reduces water evaporation by up to 70%.",
  composting: [
    "Collect kitchen scraps: vegetable peels, coffee grounds, eggshells",
    "Add dry materials: leaves, cardboard, shredded paper",
    "Turn pile every 1-2 weeks",
    "Ready in 2-4 months"
  ]
};

// ── Container Gardening Guide ──
export const CONTAINER_GUIDE = [
  {
    title: "Plastic Packet Method",
    description: "Use recycled shopping bags filled with soil/compost mix. Punch drainage holes, hang on fence or wooden frame. Saves 50% water.",
    plants: ["Herbs", "Spinach", "Lettuce", "Spring Onions"]
  },
  {
    title: "Self-Watering WickBox",
    description: "Two containers — inner with drainage holes, outer holds water reservoir. Fabric strip wicks water to roots. 70% recycled plastic.",
    plants: ["Tomatoes", "Kale", "Swiss Chard"]
  },
  {
    title: "2L Bottle Planters",
    description: "Cut bottle in half. Use top as funnel planter with cap loosened for drainage. Fill with compost mix.",
    plants: ["Herbs", "Spring Onions", "Small lettuce"]
  },
  {
    title: "Tyre Gardens",
    description: "Stack 2-3 tyres, fill with soil/compost. Paint exterior to reduce heat absorption. Add drainage holes at base.",
    plants: ["Sweet Potatoes", "Beans", "Butternut"]
  }
];

// ── Water Conservation Tips ──
export const WATER_TIPS = {
  wcDamLevel: 72.4, // Current approximate WC dam level %
  restrictionLevel: 2,
  dailySavings: [
    { action: "5-Minute Shower", liters: 57, type: "save" },
    { action: "Laundry Greywater Reuse", liters: 50, type: "save" },
    { action: "Cup-Method Teeth Brushing", liters: 2, type: "save" },
    { action: "Rainwater Collection (per m2 roof)", liters: 100, type: "save" },
    { action: "Bucket Bath vs Shower", liters: 150, type: "save" },
    { action: "Drip Irrigation Setup", liters: 30, type: "save" }
  ],
  facts: [
    "WC vegetables on 1,000m2 need 15,000-20,000L per week",
    "Drip irrigation reduces water waste by 30-50% vs overhead",
    "Mulching reduces soil water evaporation by up to 70%",
    "Grey water from bathing & laundry (no bleach) is safe for non-leafy crops",
    "23% of Cape Town's water is lost through infrastructure leaks"
  ]
};
