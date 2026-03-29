import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
import blogRoutes from './routes/blogRoutes.js';
import eventRoutes from './routes/eventRoutes.js';
import galleryRoutes from './routes/galleryRoutes.js';
import adminRoutes from './routes/adminRoutes.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.error('MongoDB connection error:', err));

app.use('/api/blogs', blogRoutes);
app.use('/api/events', eventRoutes);
app.use('/api/gallery', galleryRoutes);
app.use('/api/admin', adminRoutes);

// Serve the production-compiled React frontend statically!
app.use(express.static(path.join(__dirname, '../vyom-club/dist')));

// Native proxy catch-all to enable React Router (SPA) client-side routing
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../vyom-club/dist/index.html'));
});

// Fly.io automatically assigns the PORT env variable and expects 0.0.0.0 binds
app.listen(PORT, '0.0.0.0', () => {
  console.log(`Backend Monolith active globally on 0.0.0.0:${PORT}`);
});
