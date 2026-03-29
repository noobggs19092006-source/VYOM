import express from 'express';
import Blog from '../models/Blog.js';
import { protect } from '../middleware/authMiddleware.js';

const router = express.Router();

router.get('/', async (req, res) => {
  const blogs = await Blog.find().sort({ createdAt: -1 });
  res.json(blogs);
});

router.post('/', protect, async (req, res) => {
  const { title, author, content } = req.body;
  const blog = await Blog.create({ title, author, content });
  res.status(201).json(blog);
});

router.delete('/:id', protect, async (req, res) => {
  const blog = await Blog.findByIdAndDelete(req.params.id);
  if (blog) {
    res.json({ message: 'Blog removed' });
  } else {
    res.status(404).json({ message: 'Blog not found' });
  }
});

router.put('/:id', protect, async (req, res) => {
  try {
    const { title, author, content } = req.body;
    const blog = await Blog.findByIdAndUpdate(
      req.params.id,
      { title, author, content },
      { new: true }
    );
    if (!blog) return res.status(404).json({ message: 'Blog not found' });
    res.json(blog);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

export default router;
