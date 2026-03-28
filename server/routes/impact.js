const express = require("express");
const router = express.Router();
const { db } = require("../localDb");

// GET all impact data
router.get("/", (req, res) => {
  try {
    const impacts = db.get("impacts").value().reverse();
    res.json(impacts);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Get Dispatch Activity Logs
router.get("/dispatch", (req, res) => {
  try {
    const logs = db.get("logs").value().reverse();
    res.json(logs);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// POST new impact action
router.post("/", (req, res) => {
  try {
    const impact = {
      id: "i-" + Date.now(),
      type: req.body.type,
      value: parseFloat(req.body.value),
      unit: req.body.unit,
      location: req.body.location,
      notes: req.body.notes,
      date: new Date().toISOString()
    };
    db.get("impacts").push(impact).write();
    res.status(201).json(impact);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// DELETE impact record
router.delete("/:id", (req, res) => {
  try {
    const impact = db.get("impacts").find({ id: req.params.id }).value();
    if (!impact) return res.status(404).json({ message: "Impact not found" });
    
    db.get("impacts").remove({ id: req.params.id }).write();
    res.json({ message: "Impact deleted" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
