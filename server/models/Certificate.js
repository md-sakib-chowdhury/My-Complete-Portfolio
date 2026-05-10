const mongoose = require('mongoose');

const CertificateSchema = new mongoose.Schema({
    title: { type: String, required: true },
    issuer: { type: String, required: true },
    date: { type: String },
    image: { type: String }, // image URL
    link: { type: String },  // certificate verify link
}, { timestamps: true });

module.exports = mongoose.model('Certificate', CertificateSchema);