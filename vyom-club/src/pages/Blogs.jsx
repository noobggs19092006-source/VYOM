import ShinyText from '../components/ShinyText';
import { useState, useEffect } from 'react';
import axios from 'axios';

const Blogs = () => {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const res = await axios.get((import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000') + '/api/blogs');
        setBlogs(res.data);
      } catch (error) {
        console.error('Error fetching blogs', error);
      } finally {
        setLoading(false);
      }
    };
    fetchBlogs();
  }, []);

  if (loading) return <div className="text-center py-20 text-brand-secondary animate-pulse">Loading blogs...</div>;

  return (
    <div className="space-y-8 pb-12 max-w-4xl mx-auto">
      <div className="text-center pt-8 space-y-4">
        <h1 className="text-4xl md:text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-brand-primary to-brand-secondary">
          Cosmic Logs
        </h1>
        <p className="text-gray-400">
          Thoughts, theories, and observations from our members.
        </p>
      </div>

      <div className="space-y-8 pb-12">
        {blogs.map((blog) => (
          <article key={blog._id} className="glass p-8 rounded-2xl border border-glass-border shadow-xl">
            <header className="mb-6 border-b border-white/10 pb-4">
              <h2 className="text-3xl font-bold text-white mb-2">{blog.title}</h2>
              <div className="flex items-center gap-4 text-sm">
                <span className="text-brand-secondary font-medium">{blog.author}</span>
                <span className="text-gray-500">&bull;</span>
                <span className="text-gray-400">
                  {new Date(blog.createdAt).toLocaleDateString(undefined, { year: 'numeric', month: 'long', day: 'numeric' })}
                </span>
              </div>
            </header>
            <div className="prose prose-invert prose-pink max-w-none text-gray-300 whitespace-pre-wrap leading-relaxed">
              {blog.content}
            </div>
          </article>
        ))}
      </div>
      
      {blogs.length === 0 && (
        <div className="text-center py-10 text-gray-500">No blogs yet. The universe awaits your words.</div>
      )}
    </div>
  );
};

export default Blogs;
