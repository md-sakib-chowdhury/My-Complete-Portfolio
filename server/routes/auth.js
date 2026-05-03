const router = require('express').Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const Admin = require('../models/Admin');
const auth = require('../middleware/auth');

router.post('/setup', async (req, res) => {
    try {
        if (await Admin.findOne()) return res.status(400).json({ message: 'Admin already exists' });
        const { username, password, email } = req.body;
        const hashed = await bcrypt.hash(password, 10);
        const admin = await Admin.create({ username, password: hashed, email });
        res.json({ message: 'Admin created!', id: admin._id });
    } catch (err) { res.status(500).json({ message: err.message }); }
});

router.post('/login', async (req, res) => {
    try {
        const { username, password } = req.body;
        const admin = await Admin.findOne({ username });
        if (!admin || !(await bcrypt.compare(password, admin.password)))
            return res.status(400).json({ message: 'Invalid credentials' });
        const token = jwt.sign({ id: admin._id }, process.env.JWT_SECRET, { expiresIn: '7d' });
        res.json({ token, username: admin.username });
    } catch (err) { res.status(500).json({ message: err.message }); }
});

router.get('/verify', auth, (req, res) => res.json({ valid: true }));

module.exports = router;