const express = require("express");
const router = express.Router();
const Action = require("../models/Action");
const Badge = require("../models/Badge");

// GET all actions
router.get("/", async (req, res) => {
  try {
    const actions = await Action.find().sort({ date: -1 }).limit(50);
    res.json(actions);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// POST new action
router.post("/", async (req, res) => {
  try {
    const { type, description, value, unit, location, notes } = req.body;

    // Calculate points based on action type
    let points = 5; // default
    if (type === "grow") points = value * 0.5;
    if (type === "save") points = value * 2; // e.g. 2 pts per liter
    if (type === "save_energy") points = value * 5; // e.g. 5 pts per kWh or R1 saved
    if (type === "reduce") points = value * 10; // e.g. 10 pts per kg

    // Build the action
    const action = new Action({
      type,
      description,
      value: parseFloat(value),
      unit,
      location,
      notes,
      points: Math.round(points),
      userId: "anonymous", // Or handle auth if implemented
    });

    // Check for badges earned (Simplified logic for now)
    const earnedBadgeIds = await checkBadgesEarned(action);
    action.badgesEarned = earnedBadgeIds;

    const savedAction = await action.save();
    res.status(201).json(savedAction);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// GET badges
router.get("/badges", async (req, res) => {
  try {
    let badges = await Badge.find();
    if (badges.length === 0) {
      // Seed if empty (First time)
      const seedBadges = [
        {
          name: "Green Thumb",
          description: "Plant your first seeds",
          icon: "🌱",
          requirement: { type: "grow", count: 1 }
        },
        {
          name: "Water Warrior",
          description: "Save 100 liters of water",
          icon: "💧",
          requirement: { type: "save", count: 100 }
        },
        {
          name: "Waste Reducer",
          description: "Reduce 10kg of waste",
          icon: "♻️",
          requirement: { type: "reduce", count: 10 }
        }
      ];
      badges = await Badge.insertMany(seedBadges);
    }
    res.json(badges);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Helper function to check badges earned
async function checkBadgesEarned(action) {
  const earned = [];
  try {
    // 1. Get all badges
    const allBadges = await Badge.find();
    
    // 2. Get user's current stats (Simplified: just count total actions of this type)
    const actionCount = await Action.countDocuments({ type: action.type });
    const totalValueResult = await Action.aggregate([
      { $match: { type: action.type } },
      { $group: { _id: null, total: { $sum: "$value" } } }
    ]);
    const totalValue = (totalValueResult[0]?.total || 0) + action.value;

    for (const badge of allBadges) {
      const req = badge.requirement;
      if (!req) continue;

      if (req.type === action.type) {
        if (totalValue >= req.count) {
          earned.push(badge._id);
        }
      }
    }
  } catch (err) {
    console.error("Badge check error:", err);
  }
  return earned;
}

module.exports = router;
