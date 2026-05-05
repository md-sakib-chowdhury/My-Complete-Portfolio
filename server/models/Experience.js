const mongoose = require('mongoose');
module.exports = mongoose.model('Experience', new mongoose.Schema({
    company: { type: String, required: true },
    position: { type: String, required: true },
    startDate: { type: String, required: true },
    endDate: { type: String, default: 'Present' },
    description: String,
    current: { type: Boolean, default: false },
    order: { type: Number, default: 0 }
}, { timestamps: true }));