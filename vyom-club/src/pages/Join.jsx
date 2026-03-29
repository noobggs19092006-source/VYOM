import ShinyText from '../components/ShinyText';
import qrCode from '../assets/QR-code.jpg';

const Join = () => {
  return (
    <div className="min-h-[80vh] flex flex-col justify-center max-w-2xl mx-auto space-y-8 pb-12 pt-12">
      <div className="text-center space-y-4">
        <h1 className="text-5xl font-extrabold bg-clip-text text-transparent bg-gradient-to-r from-brand-primary to-brand-secondary">
          Join Vyom Club
        </h1>
        <p className="text-xl text-gray-300">
          Become part of our astronomical journey.
        </p>
      </div>

      <div className="glass-card p-12 flex flex-col items-center space-y-6 text-center">
        <h2 className="text-2xl font-bold text-white">Scan to join our WhatsApp Community</h2>
        
        <div className="w-64 h-64 bg-white p-4 rounded-2xl flex items-center justify-center">
          <img src={qrCode} alt="Join WhatsApp" className="w-full h-full object-contain" />
        </div>
        
        <p className="text-gray-400 max-w-md">
          Once you scan the QR code, you will be directed to our community group where you will receive updates about events, stargazing trips, and meetings.
        </p>
      </div>
    </div>
  );
};

export default Join;
