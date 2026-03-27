const express = require('express');
const router = express.Router();
const Listing = require('../models/Listing');

// GET all listings
router.get('/', async (req, res) => {
    try {
        const listings = await Listing.find().sort({ createdAt: -1 });
        res.json(listings);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// POST new listing
router.post('/', async (req, res) => {
    const listing = new Listing({
        title: req.body.title,
        description: req.body.description,
        price: req.body.price,
        type: req.body.type,
        category: req.body.category,
        location: req.body.location,
        imageUrl: req.body.imageUrl
    });

    try {
        const newListing = await listing.save();
        res.status(201).json(newListing);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

module.exports = router;
