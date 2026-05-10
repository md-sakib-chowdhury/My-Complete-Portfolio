const express = require('express');
const router = express.Router();
const Blog = require('../models/Blog');
const auth = require('../middleware/auth');

router.get('/', async (req, res) => {
    const blogs = await Blog.find({ published: true }).sort({ createdAt: -1 });
    res.json(blogs);
});

router.get('/:id', async (req, res) => {
    const blog = await Blog.findById(req.params.id);
    res.json(blog);
});

router.post('/', auth, async (req, res) => {
    const blog = new Blog(req.body);
    await blog.save();
    res.json(blog);
});

router.put('/:id', auth, async (req, res) => {
    const blog = await Blog.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(blog);
});

router.delete('/:id', auth, async (req, res) => {
    await Blog.findByIdAndDelete(req.params.id);
    res.json({ msg: 'Deleted' });
});

module.exports = router;