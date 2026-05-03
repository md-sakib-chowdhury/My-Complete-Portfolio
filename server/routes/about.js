const router = require('express').Router();
const About = require('../models/About');
const auth = require('../middleware/auth');

router.get('/', async (req, res) => {
    try { res.json(await About.findOne() || {}); }
    catch (err) { res.status(500).json({ message: err.message }); }
});

router.put('/', auth, async (req, res) => {
    try {
        let a = await About.findOne();
        a = a ? await About.findByIdAndUpdate(a._id, req.body, { new: true })
            : await About.create(req.body);
        res.json(a);
    } catch (err) { res.status(500).json({ message: err.message }); }
});

module.exports = router;