import ShinyText from '../components/ShinyText';
import { useState, useEffect } from 'react';
import axios from 'axios';
import { LogOut, Image, Calendar, FileText, Trash2, Edit3, XCircle } from 'lucide-react';

const AdminDashboard = () => {
  const [token, setToken] = useState(localStorage.getItem('adminToken'));
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [activeTab, setActiveTab] = useState('gallery');

  const [galleryItems, setGalleryItems] = useState([]);
  const [eventsList, setEventsList] = useState([]);
  const [blogsList, setBlogsList] = useState([]);

  // Gallery Form State
  const [galleryCaption, setGalleryCaption] = useState('');
  const [galleryFile, setGalleryFile] = useState(null);
  const [galleryEditId, setGalleryEditId] = useState(null);

  // Event Form State
  const [eventTitle, setEventTitle] = useState('');
  const [eventDesc, setEventDesc] = useState('');
  const [eventDate, setEventDate] = useState('');
  const [eventFile, setEventFile] = useState(null);
  const [eventContributors, setEventContributors] = useState('');
  const [eventEditId, setEventEditId] = useState(null);

  // Blog Form State
  const [blogTitle, setBlogTitle] = useState('');
  const [blogAuthor, setBlogAuthor] = useState('');
  const [blogContent, setBlogContent] = useState('');
  const [blogEditId, setBlogEditId] = useState(null);

  useEffect(() => {
    if (activeTab === 'gallery') fetchGallery();
    if (activeTab === 'events') fetchEvents();
    if (activeTab === 'blogs') fetchBlogs();
  }, [activeTab]);

  // --- Fetchers ---
  const fetchGallery = async () => {
    try {
      const res = await axios.get('http://localhost:5000/api/gallery');
      setGalleryItems(res.data);
    } catch (err) { console.error(err); }
  };
  const fetchEvents = async () => {
    try {
      const res = await axios.get('http://localhost:5000/api/events');
      setEventsList(res.data);
    } catch (err) { console.error(err); }
  };
  const fetchBlogs = async () => {
    try {
      const res = await axios.get('http://localhost:5000/api/blogs');
      setBlogsList(res.data);
    } catch (err) { console.error(err); }
  };

  // --- Auth ---
  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post('http://localhost:5000/api/admin/login', { username, password });
      setToken(res.data.token);
      localStorage.setItem('adminToken', res.data.token);
    } catch (err) {
      alert('Login failed. Check credentials.');
    }
  };

  const handleLogout = () => {
    setToken(null);
    localStorage.removeItem('adminToken');
  };

  // --- Submission Logic (Create / Update) ---
  const handleGallerySubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    if (galleryFile) formData.append('image', galleryFile);
    formData.append('caption', galleryCaption);
    
    try {
      if (galleryEditId) {
        await axios.put(`http://localhost:5000/api/gallery/${galleryEditId}`, formData, {
          headers: { Authorization: `Bearer ${token}` }
        });
        alert('Image updated successfully!');
      } else {
        await axios.post('http://localhost:5000/api/gallery', formData, {
          headers: { Authorization: `Bearer ${token}` }
        });
        alert('Image uploaded successfully!');
      }
      setGalleryCaption(''); setGalleryFile(null); setGalleryEditId(null);
      fetchGallery();
    } catch (err) {
      alert('Gallery operation failed.');
    }
  };

  const handleEventSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('title', eventTitle);
    formData.append('description', eventDesc);
    formData.append('date', eventDate);
    if (eventFile) formData.append('image', eventFile);
    
    const contributorsArr = eventContributors.split(',').map(c => c.trim()).filter(c => c);
    formData.append('contributors', JSON.stringify(contributorsArr));

    try {
      if (eventEditId) {
        await axios.put(`http://localhost:5000/api/events/${eventEditId}`, formData, {
          headers: { Authorization: `Bearer ${token}` }
        });
        alert('Event updated successfully!');
      } else {
        await axios.post('http://localhost:5000/api/events', formData, {
          headers: { Authorization: `Bearer ${token}` }
        });
        alert('Event created successfully!');
      }
      setEventTitle(''); setEventDesc(''); setEventDate(''); 
      setEventFile(null); setEventContributors(''); setEventEditId(null);
      fetchEvents();
    } catch (err) {
      alert('Event operation failed.');
    }
  };

  const handleBlogSubmit = async (e) => {
    e.preventDefault();
    try {
      if (blogEditId) {
        await axios.put(`http://localhost:5000/api/blogs/${blogEditId}`, {
          title: blogTitle, author: blogAuthor, content: blogContent
        }, { headers: { Authorization: `Bearer ${token}` } });
        alert('Blog updated successfully!');
      } else {
        await axios.post('http://localhost:5000/api/blogs', {
          title: blogTitle, author: blogAuthor, content: blogContent
        }, { headers: { Authorization: `Bearer ${token}` } });
        alert('Blog created successfully!');
      }
      setBlogTitle(''); setBlogAuthor(''); setBlogContent(''); setBlogEditId(null);
      fetchBlogs();
    } catch (err) {
      alert('Blog operation failed.');
    }
  };

  // --- Deletion Logic ---
  const handleDeleteGallery = async (id) => {
    if (!window.confirm('Delete this image?')) return;
    try {
      await axios.delete(`http://localhost:5000/api/gallery/${id}`, { headers: { Authorization: `Bearer ${token}` } });
      fetchGallery();
    } catch (err) { alert('Delete failed.'); }
  };
  const handleDeleteEvent = async (id) => {
    if (!window.confirm('Delete this event?')) return;
    try {
      await axios.delete(`http://localhost:5000/api/events/${id}`, { headers: { Authorization: `Bearer ${token}` } });
      fetchEvents();
    } catch (err) { alert('Delete failed.'); }
  };
  const handleDeleteBlog = async (id) => {
    if (!window.confirm('Delete this blog?')) return;
    try {
      await axios.delete(`http://localhost:5000/api/blogs/${id}`, { headers: { Authorization: `Bearer ${token}` } });
      fetchBlogs();
    } catch (err) { alert('Delete failed.'); }
  };

  // --- Edit Mode Triggers ---
  const triggerEditGallery = (item) => {
    setGalleryEditId(item._id);
    setGalleryCaption(item.caption || '');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };
  const triggerEditEvent = (item) => {
    setEventEditId(item._id);
    setEventTitle(item.title);
    setEventDesc(item.description);
    setEventDate(item.date.split('T')[0]);
    setEventContributors(item.contributors?.join(', ') || '');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };
  const triggerEditBlog = (item) => {
    setBlogEditId(item._id);
    setBlogTitle(item.title);
    setBlogAuthor(item.author);
    setBlogContent(item.content);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // --- Login Screen ---
  if (!token) {
    return (
      <div className="min-h-[80vh] flex items-center justify-center">
        <div className="glass-card p-8 w-full max-w-md space-y-6">
          <h2 className="text-3xl font-bold text-center text-white">Admin Login</h2>
          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-300">Username</label>
              <input type="text" required value={username} onChange={e => setUsername(e.target.value)} 
                className="mt-1 w-full p-2 bg-white/10 border border-glass-border rounded-md text-white focus:outline-none focus:border-brand-secondary" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-300">Password</label>
              <input type="password" required value={password} onChange={e => setPassword(e.target.value)} 
                className="mt-1 w-full p-2 bg-white/10 border border-glass-border rounded-md text-white focus:outline-none focus:border-brand-secondary" />
            </div>
            <button type="submit" className="w-full py-2 px-4 bg-brand-secondary hover:bg-[#38bdf8] rounded-md text-white font-bold transition-colors">
              Login
            </button>
          </form>
        </div>
      </div>
    );
  }

  // --- Main Dashboard UI ---
  return (
    <div className="space-y-8 pb-12 pt-8">
      <div className="flex justify-between items-center border-b border-glass-border pb-4">
        <h1 className="text-3xl font-bold text-white">Admin Dashboard</h1>
        <button onClick={handleLogout} className="flex items-center gap-2 text-gray-400 hover:text-white transition-colors">
          <LogOut size={20} /> Logout
        </button>
      </div>

      <div className="flex space-x-4 border-b border-glass-border overflow-x-auto pb-2">
        <button onClick={() => { setActiveTab('gallery'); setGalleryEditId(null); setGalleryCaption(''); }} className={`whitespace-nowrap pb-2 px-4 flex items-center gap-2 transition-colors ${activeTab === 'gallery' ? 'border-b-2 border-brand-secondary text-brand-secondary font-bold' : 'text-gray-400 hover:text-white'}`}>
          <Image size={18} /> Manage Gallery
        </button>
        <button onClick={() => { setActiveTab('events'); setEventEditId(null); setEventTitle(''); setEventDesc(''); setEventDate(''); setEventContributors(''); }} className={`whitespace-nowrap pb-2 px-4 flex items-center gap-2 transition-colors ${activeTab === 'events' ? 'border-b-2 border-brand-secondary text-brand-secondary font-bold' : 'text-gray-400 hover:text-white'}`}>
          <Calendar size={18} /> Manage Events
        </button>
        <button onClick={() => { setActiveTab('blogs'); setBlogEditId(null); setBlogTitle(''); setBlogAuthor(''); setBlogContent(''); }} className={`whitespace-nowrap pb-2 px-4 flex items-center gap-2 transition-colors ${activeTab === 'blogs' ? 'border-b-2 border-brand-secondary text-brand-secondary font-bold' : 'text-gray-400 hover:text-white'}`}>
          <FileText size={18} /> Manage Blogs
        </button>
      </div>

      <div className="glass p-6 md:p-8 rounded-2xl border border-glass-border shadow-[0_4px_30px_rgba(0,0,0,0.5)]">
        
        {/* =============== GALLERY TAB =============== */}
        {activeTab === 'gallery' && (
          <div className="space-y-12">
            <form onSubmit={handleGallerySubmit} className="space-y-4 max-w-xl">
              <div className="flex justify-between items-center">
                <h2 className="text-2xl font-bold text-white">{galleryEditId ? 'Edit Image Meta' : 'Upload New Image'}</h2>
                {galleryEditId && <button type="button" onClick={() => {setGalleryEditId(null); setGalleryCaption('');}} className="text-gray-400 hover:text-white flex items-center gap-1"><XCircle size={16}/> Cancel</button>}
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-1">Image File {galleryEditId && "(Optional to Replace)"}</label>
                <input type="file" required={!galleryEditId} onChange={e => setGalleryFile(e.target.files[0])} className="w-full text-gray-300 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-brand-secondary/20 file:text-brand-secondary hover:file:bg-[#38bdf8]/40 transition-colors" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-1">Caption</label>
                <input type="text" value={galleryCaption} onChange={e => setGalleryCaption(e.target.value)} 
                  className="w-full p-2 bg-white/10 border border-glass-border rounded-md text-white focus:outline-none focus:border-brand-secondary" />
              </div>
              <button type="submit" className="py-2 px-6 bg-brand-secondary rounded-md text-brand-dark font-bold hover:bg-[#38bdf8] transition-colors">
                {galleryEditId ? 'Update Image Changes' : 'Upload Image'}
              </button>
            </form>

            <div className="border-t border-glass-border pt-8">
              <h2 className="text-2xl font-bold mb-6 text-white bg-clip-text text-transparent bg-gradient-to-r from-brand-primary to-brand-secondary">Live Database Assets</h2>
              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
                {galleryItems.map(item => (
                  <div key={item._id} className="relative group bg-[#020617] border border-glass-border rounded-lg overflow-hidden">
                    <img src={item.imageUrl} alt={item.caption || "Gallery"} loading="lazy" className="w-full h-32 object-cover" />
                    <div className="absolute inset-0 bg-[#020617]/70 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col items-center justify-center gap-3">
                      <p className="text-xs px-2 text-center text-brand-secondary truncate w-full">{item.caption}</p>
                      <div className="flex gap-2">
                        <button onClick={() => triggerEditGallery(item)} className="bg-brand-secondary hover:bg-[#38bdf8] text-brand-dark p-2 rounded-full transition-colors" title="Edit Meta"><Edit3 size={18} /></button>
                        <button onClick={() => handleDeleteGallery(item._id)} className="bg-red-500/80 hover:bg-red-500 text-white p-2 rounded-full transition-colors" title="Delete Image"><Trash2 size={18} /></button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              {galleryItems.length === 0 && <p className="text-gray-400">No images found in database.</p>}
            </div>
          </div>
        )}

        {/* =============== EVENTS TAB =============== */}
        {activeTab === 'events' && (
          <div className="space-y-12">
            <form onSubmit={handleEventSubmit} className="space-y-4 max-w-xl">
              <div className="flex justify-between items-center">
                <h2 className="text-2xl font-bold text-white">{eventEditId ? 'Edit Event Details' : 'Create New Event'}</h2>
                {eventEditId && <button type="button" onClick={() => {setEventEditId(null); setEventTitle(''); setEventDesc(''); setEventDate(''); setEventContributors('');}} className="text-gray-400 hover:text-white flex items-center gap-1"><XCircle size={16}/> Cancel</button>}
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-1">Title</label>
                <input type="text" required value={eventTitle} onChange={e => setEventTitle(e.target.value)} 
                  className="w-full p-2 bg-white/10 border border-glass-border rounded-md text-white focus:outline-none focus:border-brand-secondary" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-1">Description</label>
                <textarea required value={eventDesc} onChange={e => setEventDesc(e.target.value)} rows="3"
                  className="w-full p-2 bg-white/10 border border-glass-border rounded-md text-white focus:outline-none focus:border-brand-secondary"></textarea>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-1">Date</label>
                <input type="date" required value={eventDate} onChange={e => setEventDate(e.target.value)} 
                  className="w-full p-2 bg-white/10 border border-glass-border rounded-md text-white focus:outline-none focus:border-brand-secondary" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-1">Contributors (comma separated)</label>
                <input type="text" value={eventContributors} onChange={e => setEventContributors(e.target.value)} placeholder="Alice, Bob, Charlie"
                  className="w-full p-2 bg-white/10 border border-glass-border rounded-md text-white focus:outline-none focus:border-brand-secondary" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-1">Event Flyer File {eventEditId && "(Optional to Replace)"}</label>
                <input type="file" onChange={e => setEventFile(e.target.files[0])} className="w-full text-gray-300 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-brand-secondary/20 file:text-brand-secondary hover:file:bg-[#38bdf8]/40 transition-colors" />
              </div>
              <button type="submit" className="py-2 px-6 bg-brand-secondary rounded-md text-brand-dark font-bold hover:bg-[#38bdf8] transition-colors">
                {eventEditId ? 'Update Valid Event' : 'Commit New Event'}
              </button>
            </form>

            <div className="border-t border-glass-border pt-8">
              <h2 className="text-2xl font-bold mb-6 text-white bg-clip-text text-transparent bg-gradient-to-r from-brand-primary to-brand-secondary">Tracked Event Database</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {eventsList.map(event => (
                  <div key={event._id} className="relative group bg-[#020617] border border-glass-border rounded-xl p-5 hover:border-brand-secondary transition-colors">
                     <h3 className="font-bold text-lg text-white mb-2 truncate">{event.title}</h3>
                     <p className="text-brand-secondary text-xs mb-2">{new Date(event.date).toLocaleDateString()}</p>
                     <p className="text-gray-400 text-sm line-clamp-2 mb-4">{event.description}</p>
                     <div className="flex gap-2 border-t border-glass-border pt-4">
                        <button onClick={() => triggerEditEvent(event)} className="flex items-center gap-1 text-sm bg-brand-secondary/10 hover:bg-brand-secondary/30 text-brand-secondary px-3 py-1 rounded transition-colors"><Edit3 size={14} /> Edit</button>
                        <button onClick={() => handleDeleteEvent(event._id)} className="flex items-center gap-1 text-sm bg-red-500/10 hover:bg-red-500/30 text-red-500 px-3 py-1 rounded transition-colors"><Trash2 size={14} /> Delete</button>
                     </div>
                  </div>
                ))}
              </div>
              {eventsList.length === 0 && <p className="text-gray-400">No events found in database.</p>}
            </div>
          </div>
        )}

        {/* =============== BLOGS TAB =============== */}
        {activeTab === 'blogs' && (
          <div className="space-y-12">
            <form onSubmit={handleBlogSubmit} className="space-y-4 max-w-2xl">
              <div className="flex justify-between items-center">
                <h2 className="text-2xl font-bold text-white">{blogEditId ? 'Modify Local Article' : 'Compose New Article'}</h2>
                {blogEditId && <button type="button" onClick={() => {setBlogEditId(null); setBlogTitle(''); setBlogAuthor(''); setBlogContent('');}} className="text-gray-400 hover:text-white flex items-center gap-1"><XCircle size={16}/> Cancel</button>}
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-1">Title</label>
                <input type="text" required value={blogTitle} onChange={e => setBlogTitle(e.target.value)} 
                  className="w-full p-2 bg-white/10 border border-glass-border rounded-md text-white focus:outline-none focus:border-brand-secondary" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-1">Author Name / Credits</label>
                <input type="text" required value={blogAuthor} onChange={e => setBlogAuthor(e.target.value)} 
                  className="w-full p-2 bg-white/10 border border-glass-border rounded-md text-white focus:outline-none focus:border-brand-secondary" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-1">Article Format Layout</label>
                <textarea required value={blogContent} onChange={e => setBlogContent(e.target.value)} rows="8"
                  className="w-full p-2 bg-white/10 border border-glass-border rounded-md text-white focus:outline-none focus:border-brand-secondary"></textarea>
              </div>
              <button type="submit" className="py-2 px-6 bg-brand-secondary rounded-md text-brand-dark font-bold hover:bg-[#38bdf8] transition-colors">
                {blogEditId ? 'Update Published Post' : 'Sign & Broadcast Post'}
              </button>
            </form>

            <div className="border-t border-glass-border pt-8">
              <h2 className="text-2xl font-bold mb-6 text-white bg-clip-text text-transparent bg-gradient-to-r from-brand-primary to-brand-secondary">Published Post Network</h2>
              <div className="space-y-4">
                {blogsList.map(blog => (
                  <div key={blog._id} className="relative group bg-[#020617] border border-glass-border rounded-xl p-5 hover:border-brand-secondary transition-colors flex justify-between items-center">
                     <div>
                       <h3 className="font-bold text-xl text-white mb-1">{blog.title}</h3>
                       <p className="text-gray-400 text-sm">Authored by <span className="text-brand-secondary">{blog.author}</span> • {new Date(blog.createdAt).toLocaleDateString()}</p>
                     </div>
                     <div className="flex gap-2">
                        <button onClick={() => triggerEditBlog(blog)} className="bg-brand-secondary hover:bg-[#38bdf8] text-brand-dark p-2 rounded-lg transition-colors" title="Edit Article"><Edit3 size={18} /></button>
                        <button onClick={() => handleDeleteBlog(blog._id)} className="bg-red-500/20 hover:bg-red-500/80 text-white p-2 rounded-lg transition-colors border border-red-500/20" title="Revoke Post"><Trash2 size={18} /></button>
                     </div>
                  </div>
                ))}
              </div>
              {blogsList.length === 0 && <p className="text-gray-400">No blog articles found.</p>}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminDashboard;
