const express = require("express");
const router = express.Router();
const Impact = require("../models/Impact");

// GET all impact data
router.get("/", async (req, res) => {
  try {
    // Mock data for debugging without DB
    const mockImpacts = [
      {
        type: "water_saved",
        value: 1000,
        unit: "liters",
        location: "Cape Town",
        notes: "Community garden irrigation",
        date: new Date(),
      },
      {
        type: "waste_reduced",
        value: 50,
        unit: "kg",
        location: "Stellenbosch",
        notes: "Food waste composting",
        date: new Date(),
      },
    ];
    res.json(mockImpacts);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// POST new impact action
router.post("/", async (req, res) => {
  // Mock response for debugging
  const mockImpact = {
    _id: "mock_" + Date.now(),
    type: req.body.type,
    value: req.body.value,
    unit: req.body.unit,
    location: req.body.location,
    notes: req.body.notes,
    date: new Date(),
  };
  res.status(201).json(mockImpact);
});

module.exports = router;
