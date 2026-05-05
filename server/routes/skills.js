const router = require('express').Router();
const Skill = require('../models/Skill');
const auth = require('../middleware/auth');

router.get('/', async (req, res) => {
    try { res.json(await Skill.find().sort({ order: 1 })); }
    catch (err) { res.status(500).json({ message: err.message }); }
});
router.post('/', auth, async (req, res) => {
    try { res.status(201).json(await Skill.create(req.body)); }
    catch (err) { res.status(500).json({ message: err.message }); }
});
router.put('/:id', auth, async (req, res) => {
    try { res.json(await Skill.findByIdAndUpdate(req.params.id, req.body, { new: true })); }
    catch (err) { res.status(500).json({ message: err.message }); }
});
router.delete('/:id', auth, async (req, res) => {
    try { await Skill.findByIdAndDelete(req.params.id); res.json({ message: 'Deleted' }); }
    catch (err) { res.status(500).json({ message: err.message }); }
});

module.exports = router;