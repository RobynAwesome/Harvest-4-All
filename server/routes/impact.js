const express = require("express");
const router = express.Router();
const Impact = require("../models/Impact");
const DispatchLog = require("../models/DispatchLog");

// GET all impact data
router.get("/", async (req, res) => {
  try {
    const impacts = await Impact.find().sort({ date: -1 }).limit(100);
    res.json(impacts);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Get Dispatch Activity Logs
router.get("/dispatch", async (req, res) => {
  try {
    const logs = await DispatchLog.find().sort({ timestamp: -1 }).limit(50);
    res.json(logs);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// POST new impact action
router.post("/", async (req, res) => {
  try {
    const impact = new Impact({
      type: req.body.type,
      value: parseFloat(req.body.value),
      unit: req.body.unit,
      location: req.body.location,
      notes: req.body.notes,
      date: new Date(),
    });
    const savedImpact = await impact.save();
    res.status(201).json(savedImpact);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// DELETE impact record
router.delete("/:id", async (req, res) => {
  try {
    const impact = await Impact.findByIdAndDelete(req.params.id);
    if (!impact) return res.status(404).json({ message: "Impact not found" });
    res.json({ message: "Impact deleted" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
