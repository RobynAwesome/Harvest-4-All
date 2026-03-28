const express = require("express");
const router = express.Router();
const { db } = require("../localDb");

// GET /api/submissions
router.get("/", (req, res) => {
  const submissions = db.get("submissions").value() || [];
  res.json(submissions);
});

// POST /api/submissions
router.post("/", (req, res) => {
  const newSubmission = {
    id: "s-" + Date.now(),
    date: new Date().toISOString(),
    status: "Under Review → Pitching to Sponsors",
    ...req.body
  };
  
  db.get("submissions").push(newSubmission).write();
  res.status(201).json(newSubmission);
});

// DELETE /api/submissions/:id
router.delete("/:id", (req, res) => {
  const { id } = req.params;
  db.get("submissions").remove({ id }).write();
  res.json({ message: "Submission removed" });
});

module.exports = router;
