import ShinyText from '../components/ShinyText';
import { useState, useEffect } from 'react';
import axios from 'axios';

const Events = () => {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const res = await axios.get((import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000') + '/api/events');
        setEvents(res.data);
      } catch (error) {
        console.error('Error fetching events', error);
      } finally {
        setLoading(false);
      }
    };
    fetchEvents();
  }, []);

  if (loading) return <div className="text-center py-20 text-brand-secondary animate-pulse">Loading events...</div>;

  return (
    <div className="space-y-8 pb-12">
      <div className="text-center pt-8 space-y-4">
        <h1 className="text-4xl md:text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-brand-primary to-brand-secondary">
          Projects & Events
        </h1>
        <p className="text-gray-400 max-w-2xl mx-auto">
          Discover our latest stargazing sessions, research projects, and club gatherings.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 pb-12">
        {events.map((event) => (
          <div key={event._id} className="glass-card flex flex-col h-full overflow-hidden">
            {event.image && (
              <div className="relative h-56 w-full">
                <img 
                  src={event.image} 
                  alt={event.title} 
                  loading="lazy"
                  className="w-full h-full object-cover" 
                />
              </div>
            )}
            <div className="p-6 flex flex-col flex-grow">
              <span className="text-brand-secondary text-sm font-semibold mb-2 block">
                {new Date(event.date).toLocaleDateString(undefined, { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}
              </span>
              <h2 className="text-2xl font-bold text-white mb-3">{event.title}</h2>
              <p className="text-gray-300 mb-6 flex-grow whitespace-pre-line">{event.description}</p>
              
              {event.contributors && event.contributors.length > 0 && (
                <div className="mt-auto pt-4 border-t border-glass-border">
                  <p className="text-xs text-brand-primary font-semibold uppercase tracking-wider mb-2">Contributors</p>
                  <div className="flex flex-wrap gap-2">
                    {event.contributors.map((contributor, idx) => (
                      <span key={idx} className="bg-white/10 text-xs px-2 py-1 rounded-md text-gray-300">
                        {contributor}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
      
      {events.length === 0 && (
        <div className="text-center py-10 text-gray-500">No events found. Stay tuned!</div>
      )}
    </div>
  );
};

export default Events;
