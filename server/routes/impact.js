const express = require('express');
const router = express.Router();
const Impact = require('../models/Impact');

// GET all impact data
router.get('/', async (req, res) => {
    try {
        const impacts = await Impact.find().sort({ date: -1 });
        res.json(impacts);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// POST new impact action
router.post('/', async (req, res) => {
    const impact = new Impact({
        type: req.body.type,
        value: req.body.value,
        unit: req.body.unit,
        location: req.body.location,
        notes: req.body.notes
    });

    try {
        const newImpact = await impact.save();
        res.status(201).json(newImpact);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

module.exports = router;
