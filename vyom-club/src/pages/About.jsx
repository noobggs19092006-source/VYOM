import ShinyText from '../components/ShinyText';
import mentor from '../assets/mentor.jpg';

const About = () => {
  return (
    <div className="min-h-[80vh] flex flex-col justify-center max-w-5xl mx-auto space-y-12 pb-12 pt-12">
      <div className="text-center space-y-6">
        <h1 className="text-5xl md:text-6xl font-extrabold bg-clip-text text-transparent bg-gradient-to-r from-brand-primary to-brand-secondary">
          About Vyom Club
        </h1>
        <p className="text-xl text-gray-300 leading-relaxed max-w-3xl mx-auto">
          Based on the principles of curiosity and exploration, Vyom Club is a dedicated student-run organization aiming to unravel the mysteries of the universe, one observation at a time.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="glass-card p-8 hover:border-brand-secondary transition-colors">
          <h2 className="text-2xl font-bold text-brand-secondary mb-4 flex items-center gap-2">Our Mission</h2>
          <p className="text-gray-300 leading-relaxed">
            Vyom Club is dedicated to fostering a community of individuals passionate about astrophysics, cosmology, and space exploration. We strive to make the wonders of the universe accessible through education, research, and hands-on learning experiences.
          </p>
        </div>
        <div className="glass-card p-8 hover:border-brand-secondary transition-colors">
          <h2 className="text-2xl font-bold text-brand-secondary mb-4 flex items-center gap-2">Our Vision</h2>
          <p className="text-gray-300 leading-relaxed">
            To cultivate a vibrant learning environment where curiosity about the cosmos inspires innovation and discovery, empowering members to contribute meaningfully to scientific understanding and exploration.
          </p>
        </div>
      </div>

      <div className="space-y-8">
        <h3 className="text-3xl font-bold text-center bg-clip-text text-transparent bg-gradient-to-r from-brand-primary to-brand-secondary">
          Role in College Events
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="glass-card p-6 text-center hover:scale-105 transition-transform">
            <div className="text-3xl mb-4">🎪</div>
            <h4 className="font-bold text-white mb-2">Science Fest Organizer</h4>
            <p className="text-gray-400 text-sm">Leading physics demonstrations and interactive exhibits</p>
          </div>
          <div className="glass-card p-6 text-center hover:scale-105 transition-transform">
            <div className="text-3xl mb-4">🔬</div>
            <h4 className="font-bold text-white mb-2">Research Symposium</h4>
            <p className="text-gray-400 text-sm">Presenting cutting-edge research projects and findings</p>
          </div>
          <div className="glass-card p-6 text-center hover:scale-105 transition-transform">
            <div className="text-3xl mb-4">🌟</div>
            <h4 className="font-bold text-white mb-2">Outreach Programs</h4>
            <p className="text-gray-400 text-sm">Inspiring local schools through physics demos and workshops</p>
          </div>
          <div className="glass-card p-6 text-center hover:scale-105 transition-transform">
            <div className="text-3xl mb-4">🏆</div>
            <h4 className="font-bold text-white mb-2">Competition Team</h4>
            <p className="text-gray-400 text-sm">Representing the college in national physics competitions</p>
          </div>
        </div>
      </div>

      <div className="space-y-8">
        <h3 className="text-3xl font-bold text-center bg-clip-text text-transparent bg-gradient-to-r from-brand-primary to-brand-secondary">
          Our Mentor
        </h3>
        <div className="glass-card p-8 max-w-md mx-auto text-center">
          <img src={mentor} alt="Mentor" className="w-28 h-28 mx-auto rounded-full object-cover border-4 border-brand-primary shadow-md mb-6" />
          <h4 className="text-2xl font-bold text-white mb-1">Manjunath Sir</h4>
          <p className="text-brand-secondary mb-4 text-sm font-semibold">Club Mentor &middot; Department of Physics</p>
          <div className="w-16 h-1 bg-gradient-to-r from-brand-primary to-brand-secondary mx-auto mb-4 rounded-full"></div>
          <p className="text-gray-400 text-sm leading-relaxed">
            An experienced physics educator and researcher with a strong background in astronomy. Actively mentors students in observational techniques, data interpretation, and scientific research methodologies.
          </p>
        </div>
      </div>

      <div className="space-y-8 border-t border-glass-border pt-12">
        <h3 className="text-3xl font-bold text-center bg-clip-text text-transparent bg-gradient-to-r from-brand-primary to-brand-secondary">
          What Makes Us Unique
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="glass-card p-6 text-center">
            <div className="text-4xl mb-4">🔭</div>
            <h4 className="text-xl font-bold text-white mb-2">Innovative Projects</h4>
            <p className="text-gray-400 text-sm">We design and build hands-on prototypes, transforming innovative ideas into meaningful explorations.</p>
          </div>
          <div className="glass-card p-6 text-center">
            <div className="text-4xl mb-4">🌌</div>
            <h4 className="text-xl font-bold text-white mb-2">Supportive Leadership</h4>
            <p className="text-gray-400 text-sm">Our office bearers foster an open, friendly environment, ensuring every member feels welcomed.</p>
          </div>
          <div className="glass-card p-6 text-center">
            <div className="text-4xl mb-4">🧠</div>
            <h4 className="text-xl font-bold text-white mb-2">Intellectual Growth</h4>
            <p className="text-gray-400 text-sm">Regular peer-led discussions and debates centered on physics help members strengthen analytical thinking.</p>
          </div>
        </div>
      </div>
      
      <div className="space-y-8 pb-12">
        <h3 className="text-2xl font-bold text-center text-white">Areas of Interest</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl mx-auto">
          {['Astrophysics & Cosmology', 'Space Technology', 'Observational Astronomy', 'Research & Innovation'].map((area, i) => (
            <div key={i} className="glass border border-glass-border rounded-xl p-4 text-center">
              <span className="text-brand-secondary font-semibold text-sm">{area}</span>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
};

export default About;
