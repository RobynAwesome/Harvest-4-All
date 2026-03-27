const mongoose = require('mongoose');

const listingSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    description: String,
    price: Number,
    type: {
        type: String,
        enum: ['sale', 'swap'],
        default: 'sale'
    },
    category: {
        type: String,
        enum: ['vegetables', 'seedlings', 'compost', 'tools', 'other']
    },
    location: {
        type: String,
        required: true
    },
    imageUrl: String,
    createdAt: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('Listing', listingSchema);
