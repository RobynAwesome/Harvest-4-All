const express = require("express");
const router = express.Router();
const Action = require("../models/Action");
const Badge = require("../models/Badge");

// GET all actions
router.get("/", async (req, res) => {
  try {
    // Mock data for debugging without DB
    const mockActions = [
      {
        _id: "action_1",
        type: "grow",
        description: "Planted tomato seeds",
        value: 10,
        unit: "seeds",
        location: "Home garden",
        points: 5,
        badgesEarned: [],
        date: new Date(Date.now() - 86400000), // Yesterday
        userId: "anonymous",
      },
      {
        _id: "action_2",
        type: "save",
        description: "Saved water by using greywater",
        value: 50,
        unit: "liters",
        location: "Kitchen",
        points: 10,
        badgesEarned: [],
        date: new Date(),
        userId: "anonymous",
      },
    ];
    res.json(mockActions);
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
    if (type === "save") points = value * 0.2;
    if (type === "reduce") points = value * 0.3;

    // Check for badges earned
    const badgesEarned = await checkBadgesEarned(type, value);

    const mockAction = {
      _id: "action_" + Date.now(),
      type,
      description,
      value,
      unit,
      location,
      notes,
      points: Math.round(points),
      badgesEarned,
      date: new Date(),
      userId: "anonymous",
    };

    res.status(201).json(mockAction);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// GET badges
router.get("/badges", async (req, res) => {
  try {
    // Mock badges data
    const mockBadges = [
      {
        _id: "badge_1",
        name: "Green Thumb",
        description: "Plant your first seeds",
        icon: "🌱",
        criteria: { actionType: "grow", threshold: 1, unit: "seeds" },
        points: 10,
        rarity: "common",
      },
      {
        _id: "badge_2",
        name: "Water Warrior",
        description: "Save 100 liters of water",
        icon: "💧",
        criteria: { actionType: "save", threshold: 100, unit: "liters" },
        points: 25,
        rarity: "rare",
      },
      {
        _id: "badge_3",
        name: "Waste Reducer",
        description: "Reduce 10kg of waste",
        icon: "♻️",
        criteria: { actionType: "reduce", threshold: 10, unit: "kg" },
        points: 15,
        rarity: "common",
      },
    ];
    res.json(mockBadges);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Helper function to check badges earned
async function checkBadgesEarned(actionType, value) {
  // Mock badge checking logic
  const badges = [];
  if (actionType === "grow" && value >= 1) {
    badges.push("badge_1"); // Green Thumb
  }
  if (actionType === "save" && value >= 100) {
    badges.push("badge_2"); // Water Warrior
  }
  if (actionType === "reduce" && value >= 10) {
    badges.push("badge_3"); // Waste Reducer
  }
  return badges;
}

module.exports = router;
