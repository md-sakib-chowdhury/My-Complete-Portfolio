const mongoose = require('mongoose');
module.exports = mongoose.model('Skill', new mongoose.Schema({
    name: { type: String, required: true },
    icon: String,
    category: { type: String, default: 'Frontend' },
    level: { type: Number, default: 80 },
    order: { type: Number, default: 0 }
}, { timestamps: true }));