import mongoose from 'mongoose';

const eventSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  image: { type: String }, // ImgBB URL
  date: { type: Date, required: true },
  contributors: { type: [String], default: [] },
  createdAt: { type: Date, default: Date.now }
});

export default mongoose.model('Event', eventSchema);
