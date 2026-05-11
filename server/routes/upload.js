const express = require('express');
const router = express.Router();
const { upload } = require('../config/cloudinary');
const auth = require('../middleware/auth');

router.post('/', auth, upload.single('image'), (req, res) => {
    try {
        res.json({ url: req.file.path });
    } catch {
        res.status(500).json({ msg: 'Upload failed' });
    }
});

module.exports = router;