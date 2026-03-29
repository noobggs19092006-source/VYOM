import ShinyText from '../components/ShinyText';
import { Link } from 'react-router-dom';
import { ChevronRight, ArrowRight } from 'lucide-react';
import { useEffect, useState } from 'react';
import axios from 'axios';
import qrCode from '../assets/QR-code.jpg';

import img3 from '../assets/Coorg_star_gazing.jpg';
import img7 from '../assets/URSC_ISRO_visit.jpg';
import img10 from '../assets/prakalp_spinlaunch.jpg';

const staticGalleryHighlights = [
  { _id: 's1', imageUrl: img3, caption: 'Coorg Star Gazing Session' },
  { _id: 's2', imageUrl: img7, caption: 'URSC ISRO Visit' },
  { _id: 's3', imageUrl: img10, caption: 'Prakalp Spinlaunch Demonstration' }
];

const Home = () => {
  const [recentEvents, setRecentEvents] = useState([]);
  const [recentGallery, setRecentGallery] = useState([]);
  const [recentBlogs, setRecentBlogs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [eventsRes, galleryRes, blogsRes] = await Promise.all([
          axios.get('http://localhost:5000/api/events'),
          axios.get('http://localhost:5000/api/gallery'),
          axios.get('http://localhost:5000/api/blogs')
        ]);
        setRecentEvents(eventsRes.data.slice(0, 3));
        
        const combinedGallery = [...galleryRes.data, ...staticGalleryHighlights];
        setRecentGallery(combinedGallery.slice(0, 3));
        
        setRecentBlogs(blogsRes.data.slice(0, 3));
        setLoading(false);
      } catch (error) {
        console.error('Error fetching data:', error);
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  return (
    <div className="space-y-24 pb-12">
      <section className="relative min-h-[80vh] flex flex-col justify-center items-center text-center">
        <div className="absolute inset-0 bg-brand-dark opacity-50 z-0"></div>
        <div className="z-10 animate-float space-y-6 max-w-4xl mx-auto px-4">
          <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight">
            <ShinyText text="Explore The Cosmos Together" speed={3} color="#38bdf8" shineColor="#ffffff" spread={150} />
          </h1>
          <p className="text-xl md:text-2xl text-gray-300 italic">
            "The universe is under no obligation to make sense to you." - Neil deGrasse Tyson
          </p>
          <div className="flex justify-center gap-4 pt-8">
            <Link to="/about" className="px-8 py-3 rounded-full bg-brand-secondary hover:bg-pink-600 text-white font-bold transition-all shadow-lg hover:shadow-pink-500/50 flex items-center gap-2">
              Join Us <ChevronRight size={20} />
            </Link>
          </div>
        </div>
      </section>

      <section className="space-y-8">
        <div className="flex justify-between items-end border-b border-glass-border pb-4">
          <h2 className="text-3xl font-bold">
             <ShinyText text="Recent Projects & Events" speed={3} color="#334155" shineColor="#ffffff" spread={150} />
          </h2>
          <Link to="/events" className="text-gray-400 hover:text-white flex items-center gap-1 transition-colors">
            View All <ArrowRight size={16} />
          </Link>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {recentEvents.map((event) => (
            <div key={event._id} className="glass-card overflow-hidden group">
              {event.image && (
                <div className="relative h-48 overflow-hidden">
                  <img 
                    src={event.image} 
                    alt={event.title} 
                    loading="lazy"
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" 
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-brand-dark/80 to-transparent"></div>
                </div>
              )}
              <div className="p-6">
                <span className="text-brand-secondary text-xs font-semibold uppercase tracking-wider">
                  {new Date(event.date).toLocaleDateString()}
                </span>
                <h3 className="text-xl font-bold mt-2 text-white">{event.title}</h3>
                <p className="text-gray-400 mt-2 line-clamp-3">{event.description}</p>
              </div>
            </div>
          ))}
          {!loading && recentEvents.length === 0 && <p className="text-gray-400">Loading events...</p>}
        </div>
      </section>

      <section className="space-y-8">
        <div className="flex justify-between items-end border-b border-glass-border pb-4">
          <h2 className="text-3xl font-bold">
            <ShinyText text="Gallery Highlights" speed={3} color="#334155" shineColor="#ffffff" spread={150} />
          </h2>
          <Link to="/gallery" className="text-gray-400 hover:text-white flex items-center gap-1 transition-colors">
            View Gallery <ArrowRight size={16} />
          </Link>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {recentGallery.map((item) => (
            <div key={item._id} className="relative group overflow-hidden rounded-xl aspect-square">
              <img 
                src={item.imageUrl} 
                alt={item.caption || "Gallery snippet"} 
                loading="lazy"
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" 
              />
              <div className="absolute inset-0 bg-gradient-to-t from-brand-dark/90 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-4">
                <p className="text-white font-medium truncate">{item.caption}</p>
              </div>
            </div>
          ))}
          {!loading && recentGallery.length === 0 && <p className="text-gray-400">Loading gallery...</p>}
        </div>
      </section>

      <section className="space-y-8">
        <div className="flex justify-between items-end border-b border-glass-border pb-4">
          <h2 className="text-3xl font-bold">
            <ShinyText text="From Our Writers" speed={3} color="#334155" shineColor="#ffffff" spread={150} />
          </h2>
          <Link to="/blogs" className="text-gray-400 hover:text-white flex items-center gap-1 transition-colors">
            Read Blogs <ArrowRight size={16} />
          </Link>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {recentBlogs.map((blog) => (
            <div key={blog._id} className="glass p-6 rounded-xl border border-glass-border hover:border-brand-secondary/50 transition-colors">
              <h3 className="text-2xl font-bold text-white mb-2">{blog.title}</h3>
              <p className="text-gray-400 mb-4 line-clamp-2">{blog.content}</p>
              <div className="flex justify-between items-center text-sm">
                <span className="text-brand-secondary">{blog.author}</span>
                <span className="text-gray-500">{new Date(blog.createdAt).toLocaleDateString()}</span>
              </div>
            </div>
          ))}
          {!loading && recentBlogs.length === 0 && <p className="text-gray-400">Loading blogs...</p>}
        </div>
      </section>

      <section className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center bg-white/5 p-8 rounded-2xl border border-glass-border">
        <div className="space-y-4">
          <h2 className="text-3xl font-bold text-white">Who Are We?</h2>
          <p className="text-gray-300">
            Vyom Club is a community of stargazers, physicists, and curious minds. We aim to explore the profound mysteries of the cosmos and bridge the gap between complex science and the public.
          </p>
          <Link to="/about" className="inline-block px-6 py-2 border border-brand-primary rounded-full hover:bg-brand-primary/20 transition-colors">
            Read Our Story
          </Link>
        </div>
        <div className="flex flex-col items-center space-y-4">
          <div className="w-48 h-48 bg-white p-2 rounded-xl">
            <img src={qrCode} alt="Join WhatsApp" className="w-full h-full object-contain" />
          </div>
          <p className="text-sm text-brand-secondary font-semibold">Scan to join the club!</p>
        </div>
      </section>

      <footer className="border-t border-glass-border pt-8 mt-12 text-center text-gray-500">
        <p>&copy; {new Date().getFullYear()} Vyom Club. Keep looking up.</p>
        <p className="text-sm mt-2">Contact us: contact@vyomclub.org</p>
      </footer>
    </div>
  );
};

export default Home;
