const express = require("express");
const router = express.Router();
const { db } = require("../localDb");

// GET all grow projects
router.get("/", (req, res) => {
  try {
    const grows = db.get("growProjects").value().reverse();
    res.json(grows);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// POST new grow project
router.post("/", (req, res) => {
  try {
    const grow = {
      id: "g-" + Date.now(),
      crop: req.body.crop,
      season: req.body.season,
      location: req.body.location,
      startDate: req.body.startDate || new Date().toISOString(),
      expectedHarvest: req.body.expectedHarvest,
      status: req.body.status || "Planting",
      notes: req.body.notes,
      userId: req.body.userId,
      createdAt: new Date().toISOString()
    };

    db.get("growProjects").push(grow).write();
    res.status(201).json(grow);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// DELETE grow project
router.delete("/:id", (req, res) => {
  try {
    const grow = db.get("growProjects").find({ id: req.params.id }).value();
    if (!grow) return res.status(404).json({ message: "Project not found" });
    
    db.get("growProjects").remove({ id: req.params.id }).write();
    res.json({ message: "Project deleted" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
