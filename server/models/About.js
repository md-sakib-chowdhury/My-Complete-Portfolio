const mongoose = require('mongoose');
module.exports = mongoose.model('About', new mongoose.Schema({
    name: String, title: String, bio: String,
    email: String, phone: String, location: String,
    github: String, linkedin: String, resumeUrl: String
}, { timestamps: true }));