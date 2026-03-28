const express = require("express");
const router = express.Router();
const { db } = require("../localDb");

// GET all listings
router.get("/", (req, res) => {
  try {
    const listings = db.get("listings").value().reverse();
    res.json(listings);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// POST new listing
router.post("/", (req, res) => {
  try {
    const listing = {
      id: "l-" + Date.now(),
      title: req.body.title,
      description: req.body.description,
      price: req.body.price,
      type: req.body.type,
      category: req.body.category,
      location: req.body.location,
      imageUrl: req.body.imageUrl || req.body.img || "/General images/Gemini_Generated_Image_plo495plo495plo4.png",
      author: req.body.author || "Demo User",
      createdAt: new Date().toISOString()
    };
    
    db.get("listings").push(listing).write();
    res.status(201).json(listing);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// DELETE listing
router.delete("/:id", (req, res) => {
  try {
    const listing = db.get("listings").find({ id: req.params.id }).value();
    if (!listing) return res.status(404).json({ message: "Listing not found" });
    
    db.get("listings").remove({ id: req.params.id }).write();
    res.json({ message: "Listing deleted" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
