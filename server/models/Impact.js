const mongoose = require('mongoose');

const impactSchema = new mongoose.Schema({
    type: {
        type: String,
        required: true,
        enum: ['water', 'energy', 'meals', 'waste']
    },
    value: {
        type: Number,
        required: true
    },
    unit: String,
    date: {
        type: Date,
        default: Date.now
    },
    location: String,
    notes: String
});

module.exports = mongoose.model('Impact', impactSchema);
