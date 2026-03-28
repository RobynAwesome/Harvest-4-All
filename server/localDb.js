const low = require('lowdb');
const FileSync = require('lowdb/adapters/FileSync');
const path = require('path');
const fs = require('fs');

const dataDir = path.join(__dirname, 'data');
if (!fs.existsSync(dataDir)) {
  fs.mkdirSync(dataDir);
}

const file = path.join(dataDir, 'db.json');
const adapter = new FileSync(file);
const db = low(adapter);

// Initial Sample Data (Township-Focused)
const defaultData = {
  users: [
    { 
      id: "admin-kholofelo", 
      username: "Kholofelo", 
      email: "rkholofelo@gmail.com", 
      password: "harvest2026", // Plain text fallback for demo
      role: "admin", 
      location: "Tygerberg",
      points: 5200,
      badges: ["Founder", "Champion"]
    },
    { 
      id: "u-1", 
      username: "Kea", 
      email: "kea@harvest4all.org", 
      password: "password123",
      role: "user", 
      location: "Gugulethu",
      points: 1250,
      badges: ["Water Saver"]
    },
    { 
      id: "u-2", 
      username: "Karabo", 
      email: "karabo@harvest4all.org", 
      password: "password123",
      role: "user", 
      location: "Khayelitsha",
      points: 980,
      badges: ["Waste Warrior"]
    }
  ],
  listings: [
    { id: "l-1", title: "Organic Spinach Bundles", category: "Vegetables", type: "sale", price: 25, location: "Khayelitsha", img: "/General images/Gemini_Generated_Image_plo495plo495plo4.png", author: "Karabo" },
    { id: "l-2", title: "Spare Composting Bin", category: "Tools", type: "swap", location: "Gugulethu", img: "/community resilience/growth.png", author: "Kea" }
  ],
  impacts: [],
  logs: [],
  growProjects: [],
  actions: [],
  submissions: [
    {
      id: "s-1",
      title: "Vertical Wind Turbines for Townships",
      description: "Low-cost, vertical axis turbines that capture wind in dense residential corridors.",
      category: "Energy",
      impact: "Reduces grid dependency by 30% for small shacks.",
      status: "Pitched to Sponsors (UWC Innovation Hub)",
      creatorId: "admin-kholofelo",
      icon: "Zap"
    },
    {
      id: "s-2",
      title: "Closed-Loop Hydroponic Rainwater Harvesters",
      description: "A system that captures runoff from corrugated iron roofs to feed vertical spinach trays.",
      category: "Water/Food",
      impact: "Saves 1500L of municipal water per month.",
      status: "Pitched to Sponsors (CPUT Research)",
      creatorId: "admin-kholofelo",
      icon: "Droplets"
    }
  ],
  badges: [
    { id: "b-1", name: "Founder", icon: "Shield", description: "Platform Core Team" },
    { id: "b-2", name: "Champion", icon: "Trophy", description: "Top Sustainability Contributor" }
  ]
};

// Initialize DB safely
function initDb() {
  db.defaults(defaultData).write();
  console.log('✅ Offline JSON Database Initialized (server/data/db.json)');
  return db;
}

module.exports = { db, initDb };
