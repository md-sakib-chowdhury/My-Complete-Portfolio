const mongoose = require('mongoose');
module.exports = mongoose.model('Admin', new mongoose.Schema({
    username: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    email: { type: String, required: true }
}, { timestamps: true }));