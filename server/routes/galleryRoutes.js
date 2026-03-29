import express from 'express';
import multer from 'multer';
import Gallery from '../models/Gallery.js';
import { protect } from '../middleware/authMiddleware.js';
import { uploadToImgbb } from '../utils/imgbbUpload.js';

const router = express.Router();
const upload = multer({ storage: multer.memoryStorage() });

router.get('/', async (req, res) => {
  const gallery = await Gallery.find().sort({ createdAt: -1 });
  res.json(gallery);
});

router.post('/', protect, upload.single('image'), async (req, res) => {
  try {
    const { caption } = req.body;
    if (!req.file) {
      return res.status(400).json({ message: 'No image provided' });
    }
    
    const imageUrl = await uploadToImgbb(req.file.buffer, req.file.originalname);
    
    const galleryItem = await Gallery.create({ imageUrl, caption });
    res.status(201).json(galleryItem);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.delete('/:id', protect, async (req, res) => {
  const galleryItem = await Gallery.findByIdAndDelete(req.params.id);
  if (galleryItem) {
    res.json({ message: 'Image removed' });
  } else {
    res.status(404).json({ message: 'Image not found' });
  }
});

router.put('/:id', protect, upload.single('image'), async (req, res) => {
  try {
    const { caption } = req.body;
    let updateData = { caption };
    
    if (req.file) {
      updateData.imageUrl = await uploadToImgbb(req.file.buffer, req.file.originalname);
    }
    
    const galleryItem = await Gallery.findByIdAndUpdate(req.params.id, updateData, { new: true });
    if (!galleryItem) return res.status(404).json({ message: 'Image not found' });
    res.json(galleryItem);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

export default router;
