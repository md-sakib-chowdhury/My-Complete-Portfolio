const mongoose = require('mongoose');
module.exports = mongoose.model('Project', new mongoose.Schema({
    title: { type: String, required: true },
    description: { type: String, required: true },
    image: String, liveUrl: String, githubUrl: String,
    tags: [String],
    featured: { type: Boolean, default: false },
    order: { type: Number, default: 0 }
}, { timestamps: true }));