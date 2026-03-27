const express = require("express");
const router = express.Router();
const Grow = require("../models/Grow");

// GET all grow projects
router.get("/", async (req, res) => {
  try {
    const grows = await Grow.find().sort({ createdAt: -1 });
    res.json(grows);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// POST new grow project
router.post("/", async (req, res) => {
  const grow = new Grow({
    crop: req.body.crop,
    season: req.body.season,
    location: req.body.location,
    startDate: req.body.startDate,
    expectedHarvest: req.body.expectedHarvest,
    status: req.body.status,
    notes: req.body.notes,
    userId: req.body.userId,
  });

  try {
    const newGrow = await grow.save();
    res.status(201).json(newGrow);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// DELETE grow project
router.delete("/:id", async (req, res) => {
  try {
    const grow = await Grow.findByIdAndDelete(req.params.id);
    if (!grow) return res.status(404).json({ message: "Project not found" });
    res.json({ message: "Project deleted" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
