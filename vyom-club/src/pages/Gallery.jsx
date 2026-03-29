import ShinyText from '../components/ShinyText';
import { useState, useEffect } from 'react';
import axios from 'axios';

import img1 from '../assets/1e09c6b2-8d51-4ee6-bf9b-2b1ff45ca316.jpg';
import img2 from '../assets/65010405-f066-4593-bfa0-2ea159831060.jpg';
import img3 from '../assets/Coorg_star_gazing.jpg';
import img4 from '../assets/Cosmic_conundrum.jpg';
import img5 from '../assets/HAL_visit.jpg';
import img6 from '../assets/IISC_Bangalore_visit.jpg';
import img7 from '../assets/URSC_ISRO_visit.jpg';
import img8 from '../assets/aarohan.jpg';
import img9 from '../assets/bb407daa-7491-4c0a-b81e-17451a4b021b.jpg';
import img10 from '../assets/prakalp_spinlaunch.jpg';

const staticGallery = [
  { _id: 's1', imageUrl: img3, caption: 'Coorg Star Gazing Session' },
  { _id: 's2', imageUrl: img5, caption: 'HAL Visit' },
  { _id: 's3', imageUrl: img6, caption: 'IISC Bangalore Visit' },
  { _id: 's4', imageUrl: img7, caption: 'URSC ISRO Visit' },
  { _id: 's5', imageUrl: img10, caption: 'Prakalp Spinlaunch Demonstration' },
  { _id: 's6', imageUrl: img8, caption: 'Aarohan Fest' },
  { _id: 's7', imageUrl: img4, caption: 'Cosmic Conundrum Exhibition' },
  { _id: 's8', imageUrl: img1, caption: 'Club Activity' },
  { _id: 's9', imageUrl: img2, caption: 'Telescope Observation' },
  { _id: 's10', imageUrl: img9, caption: 'Vyom Club Team' }
];

const Gallery = () => {
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchGallery = async () => {
      try {
        const res = await axios.get((import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000') + '/api/gallery');
        setImages([...res.data, ...staticGallery]);
      } catch (error) {
        console.error('Error fetching gallery', error);
      } finally {
        setLoading(false);
      }
    };
    fetchGallery();
  }, []);

  if (loading) return <div className="text-center py-20 text-brand-secondary animate-pulse">Loading cosmic visuals...</div>;

  return (
    <div className="space-y-8 pb-12">
      <div className="text-center pt-8 space-y-4">
        <h1 className="text-4xl md:text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-brand-primary to-brand-secondary">
          Astrophotography & Events Gallery
        </h1>
        <p className="text-gray-400 max-w-2xl mx-auto">
          A visual journey through our observations, events, and the infinite beauty of space.
        </p>
      </div>

      <div className="columns-1 sm:columns-2 md:columns-3 gap-4 space-y-4 pb-12">
        {images.map((item) => (
          <div key={item._id} className="break-inside-avoid relative group overflow-hidden rounded-xl mb-4 bg-white/5 border border-glass-border">
            <img 
              src={item.imageUrl} 
              alt={item.caption || "Gallery Image"} 
              loading="lazy"
              className="w-full h-auto object-cover transition-transform duration-700 group-hover:scale-105" 
            />
            {item.caption && (
              <div className="absolute inset-0 bg-gradient-to-t from-brand-dark via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end">
                <p className="text-white p-4 font-medium text-sm w-full bg-brand-dark/50 backdrop-blur-sm">
                  {item.caption}
                </p>
              </div>
            )}
          </div>
        ))}
      </div>
      
      {images.length === 0 && (
        <div className="text-center py-10 text-gray-500">No images yet. Starry skies await!</div>
      )}
    </div>
  );
};

export default Gallery;
