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
    description: "Completed a 7-day Zero Waste challenge.",
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
    description: "Shared 5 gardening tips with the community.",
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

export const MOCK_MARKET_LISTINGS = [
  {
    _id: "m_1",
    title: "Organic Spinach",
    price: 15,
    type: "sale",
    category: "vegetables",
    location: "Khayelitsha",
    imageUrl: "https://images.unsplash.com/photo-1576045057995-568f588f82fb?auto=format&fit=crop&q=80&w=400"
  },
  {
    _id: "m_2",
    title: "Tomato Seedlings",
    price: 10,
    type: "sale",
    category: "seedlings",
    location: "Gugulethu",
    imageUrl: "https://images.unsplash.com/photo-1591857177580-dc82b9ac4e1e?auto=format&fit=crop&q=80&w=400"
  },
  {
    _id: "m_3",
    title: "Homemade Compost",
    price: 25,
    type: "sale",
    category: "compost",
    location: "Mitchells Plain",
    imageUrl: "https://images.unsplash.com/photo-1585314062340-f1a5a7c9328d?auto=format&fit=crop&q=80&w=400"
  },
  {
    _id: "m_4",
    title: "Kale for Swap",
    price: 0,
    type: "swap",
    category: "vegetables",
    location: "Langa",
    imageUrl: "https://images.unsplash.com/photo-1524179524541-1bb169720078?auto=format&fit=crop&q=80&w=400"
  },
  {
    _id: "m_5",
    title: "Herb Starter Kit",
    price: 35,
    type: "sale",
    category: "seedlings",
    location: "Khayelitsha",
    imageUrl: "https://images.unsplash.com/photo-1596464716127-f2a82984de30?auto=format&fit=crop&q=80&w=400"
  },
  {
    _id: "m_6",
    title: "Upcycled Tyre Planter",
    price: 20,
    type: "sale",
    category: "tools",
    location: "Nyanga",
    imageUrl: "https://images.unsplash.com/photo-1592419044706-39796d40f98c?auto=format&fit=crop&q=80&w=400"
  }
];

export const MOCK_ACTIONS = [
  {
    _id: "a_1",
    type: "harvest",
    description: "Harvested 2kg of Spinach",
    points: 50,
    date: new Date(Date.now() - 86400000).toISOString()
  },
  {
    _id: "a_2",
    type: "save",
    description: "Recycled 20L of greywater",
    points: 20,
    date: new Date(Date.now() - 172800000).toISOString()
  },
  {
    _id: "a_3",
    type: "reduce",
    description: "Started a compost bin",
    points: 30,
    date: new Date(Date.now() - 259200000).toISOString()
  }
];

export const CROPS_DATA = [
  {
    name: "Swiss Chard",
    time: 6,
    unit: "WEEKS",
    difficulty: "EASY",
    category: "Nutrient Powerhouse",
    minSpace: "small",
    seasons: ["winter", "summer", "year-round"],
    description: "Fast-growing, iron-rich greens that love the Western Cape climate.",
    img: "https://images.unsplash.com/photo-1592419044706-39796d40f98c?auto=format&fit=crop&q=80&w=400",
    container: true
  },
  {
    name: "Spinach",
    time: 5,
    unit: "WEEKS",
    difficulty: "EASY",
    category: "Nutrient Powerhouse",
    minSpace: "small",
    seasons: ["winter", "year-round"],
    description: "Harvest in just 30-45 days. High nutrient density for family meals.",
    img: "https://images.unsplash.com/photo-1576045057995-568f588f82fb?auto=format&fit=crop&q=80&w=400",
    container: true
  },
  {
    name: "Cherry Tomatoes",
    time: 10,
    unit: "WEEKS",
    difficulty: "MEDIUM",
    category: "High Yielder",
    minSpace: "medium",
    seasons: ["summer"],
    description: "Productive and sweet. Perfect for sunny backyard patches.",
    img: "https://images.unsplash.com/photo-1591857177580-dc82b9ac4e1e?auto=format&fit=crop&q=80&w=400",
    container: true
  },
  {
    name: "Kale",
    time: 8,
    unit: "WEEKS",
    difficulty: "EASY",
    category: "Nutrient Powerhouse",
    minSpace: "small",
    seasons: ["winter", "year-round"],
    description: "Superfood that survives the cold. Rich in Vitamins A, C, and K.",
    img: "https://images.unsplash.com/photo-1524179524541-1bb169720078?auto=format&fit=crop&q=80&w=400",
    container: true
  },
  {
    name: "Baby Marrow",
    time: 8,
    unit: "WEEKS",
    difficulty: "MEDIUM",
    category: "High Yielder",
    minSpace: "large",
    seasons: ["summer"],
    description: "Produces massive amounts of food from single plants.",
    img: "https://images.unsplash.com/photo-1550592704-6c76defa9985?auto=format&fit=crop&q=80&w=400",
    container: false
  },
  {
    name: "Spring Onions",
    time: 4,
    unit: "WEEKS",
    difficulty: "EASY",
    category: "High Yielder",
    minSpace: "small",
    seasons: ["year-round"],
    description: "The ultimate beginner crop. Regrow them from kitchen scraps!",
    img: "https://images.unsplash.com/photo-1596464716127-f2a82984de30?auto=format&fit=crop&q=80&w=400",
    container: true
  },
  {
    name: "Beans",
    time: 9,
    unit: "WEEKS",
    difficulty: "EASY",
    category: "High Yielder",
    minSpace: "medium",
    seasons: ["summer"],
    description: "Bush beans provide high protein yields in small spaces.",
    img: "https://images.unsplash.com/photo-1567167690626-d24597034b15?auto=format&fit=crop&q=80&w=400",
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
    description: "Basil, Mint, and Parsley. High market value in small pots.",
    img: "https://images.unsplash.com/photo-1596464716127-f2a82984de30?auto=format&fit=crop&q=80&w=400",
    container: true
  }
];
