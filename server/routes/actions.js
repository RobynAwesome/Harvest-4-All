const express = require("express");
const router = express.Router();
const { db } = require("../localDb");

// GET all actions
router.get("/", (req, res) => {
  try {
    const actions = db.get("actions").value().reverse();
    res.json(actions);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// POST new action
router.post("/", (req, res) => {
  try {
    const { type, description, value, unit, location, notes, userId } = req.body;

    // Calculate points
    let points = 5;
    if (type === "grow") points = value * 0.5;
    if (type === "save") points = value * 2;
    if (type === "save_energy") points = value * 5;
    if (type === "reduce") points = value * 10;

    const action = {
      id: "a-" + Date.now(),
      type,
      description,
      value: parseFloat(value),
      unit,
      location,
      notes,
      points: Math.round(points),
      userId: userId || "anonymous",
      date: new Date().toISOString()
    };

    db.get("actions").push(action).write();

    // Update user points if userId is provided
    if (userId) {
      const user = db.get("users").find({ id: userId }).value();
      if (user) {
        db.get("users").find({ id: userId })
          .assign({ points: (user.points || 0) + action.points })
          .write();
      }
    }

    res.status(201).json(action);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// GET badges (Seed if empty)
router.get("/badges", (req, res) => {
  try {
    let badges = db.get("badges").value();
    if (!badges || badges.length === 0) {
      const seedBadges = [
        { id: "b-1", name: "First Harvest", description: "Successfully logged your first crop harvest.", icon: "🌱" },
        { id: "b-2", name: "Water Warrior", description: "Saved over 100L of water.", icon: "💧" },
        { id: "b-3", name: "Eco Champion", description: "Completed a 7-day Zero Waste challenge.", icon: "🏆" }
      ];
      db.set("badges", seedBadges).write();
      badges = seedBadges;
    }
    res.json(badges);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// DELETE action
router.delete("/:id", (req, res) => {
  try {
    const action = db.get("actions").find({ id: req.params.id }).value();
    if (!action) return res.status(404).json({ message: "Action not found" });
    
    db.get("actions").remove({ id: req.params.id }).write();
    res.json({ message: "Action deleted" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
