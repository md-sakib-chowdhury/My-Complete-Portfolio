const express = require('express');
const router = express.Router();
const Certificate = require('../models/Certificate');
const auth = require('../middleware/auth');

// Public - সবাই দেখতে পাবে
router.get('/', async (req, res) => {
    const certs = await Certificate.find().sort({ createdAt: -1 });
    res.json(certs);
});

// Admin only - add
router.post('/', auth, async (req, res) => {
    const cert = new Certificate(req.body);
    await cert.save();
    res.json(cert);
});

// Admin only - update
router.put('/:id', auth, async (req, res) => {
    const cert = await Certificate.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(cert);
});

// Admin only - delete
router.delete('/:id', auth, async (req, res) => {
    await Certificate.findByIdAndDelete(req.params.id);
    res.json({ msg: 'Deleted' });
});

module.exports = router;