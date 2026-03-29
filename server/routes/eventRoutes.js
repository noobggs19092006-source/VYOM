import express from 'express';
import multer from 'multer';
import Event from '../models/Event.js';
import { protect } from '../middleware/authMiddleware.js';
import { uploadToImgbb } from '../utils/imgbbUpload.js';

const router = express.Router();
const upload = multer({ storage: multer.memoryStorage() });

router.get('/', async (req, res) => {
  const events = await Event.find().sort({ date: -1 });
  res.json(events);
});

router.post('/', protect, upload.single('image'), async (req, res) => {
  try {
    const { title, description, date, contributors } = req.body;
    let imageUrl = '';
    
    if (req.file) {
      imageUrl = await uploadToImgbb(req.file.buffer, req.file.originalname);
    }
    
    const parsedContributors = contributors ? JSON.parse(contributors) : [];
    
    const event = await Event.create({
      title,
      description,
      date,
      image: imageUrl,
      contributors: parsedContributors
    });
    
    res.status(201).json(event);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.delete('/:id', protect, async (req, res) => {
  const event = await Event.findByIdAndDelete(req.params.id);
  if (event) {
    res.json({ message: 'Event removed' });
  } else {
    res.status(404).json({ message: 'Event not found' });
  }
});

router.put('/:id', protect, upload.single('image'), async (req, res) => {
  try {
    const { title, description, date, contributors } = req.body;
    let updateData = { title, description, date };
    
    if (contributors) {
      updateData.contributors = JSON.parse(contributors);
    }
    
    if (req.file) {
      updateData.image = await uploadToImgbb(req.file.buffer, req.file.originalname);
    }
    
    const event = await Event.findByIdAndUpdate(req.params.id, updateData, { new: true });
    if (!event) return res.status(404).json({ message: 'Event not found' });
    res.json(event);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

export default router;
