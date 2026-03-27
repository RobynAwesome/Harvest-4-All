const express = require("express");
const router = express.Router();
const Listing = require("../models/Listing");

// GET all listings
router.get("/", async (req, res) => {
  try {
    // Mock data for debugging
    const mockListings = [
      {
        _id: "mock_1",
        title: "Organic Tomatoes",
        description: "Fresh organic tomatoes from local farm",
        price: 25,
        type: "sell",
        category: "vegetables",
        location: "Cape Town",
        imageUrl: "/images/tomatoes.jpg",
        createdAt: new Date(),
      },
      {
        _id: "mock_2",
        title: "Composting Workshop",
        description: "Learn how to compost food waste",
        price: 0,
        type: "service",
        category: "education",
        location: "Stellenbosch",
        imageUrl: "/images/compost.jpg",
        createdAt: new Date(),
      },
    ];
    res.json(mockListings);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// POST new listing
router.post("/", async (req, res) => {
  // Mock response for debugging
  const mockListing = {
    _id: "mock_" + Date.now(),
    title: req.body.title,
    description: req.body.description,
    price: req.body.price,
    type: req.body.type,
    category: req.body.category,
    location: req.body.location,
    imageUrl: req.body.imageUrl,
    createdAt: new Date(),
  };
  res.status(201).json(mockListing);
});

module.exports = router;
