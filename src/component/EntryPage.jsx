import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import backgroundimg from '../assets/backgorund-img.jpg';
import Footer from './Footer';

function EntryPage() {
  const navigate = useNavigate();
  const [showAnimation, setShowAnimation] = useState(false);

  const handleClick = () => {
    setShowAnimation(true);

    // Navigate to the next page after the animation plays
    setTimeout(() => {
      navigate('/workselection');
    }, 2000); // Adjust timing based on Lottie animation duration
  };

  return (
    <div 
      className="min-h-screen w-screen bg-cover bg-center flex flex-col items-center justify-center relative"
      style={{ backgroundImage: `url(${backgroundimg})` }}
    >
      {!showAnimation ? (
        <button 
          onClick={handleClick}
          className="px-8 py-4 text-xl font-bold text-white bg-gradient-to-r from-blue-500 to-teal-400 rounded-full shadow-lg hover:scale-110 transition transform duration-300"
        >
          Get Started
        </button>
      ) : (
        <iframe
          src="https://lottie.host/embed/d50c53d0-4c3a-4b21-83d8-c7dddaf1064f/srpBpMOOQ1.lottie"
          className="w-96 h-96 border-none"
          title="Lottie Animation"
        ></iframe>
      )}

      {/* Ensure footer stays at the bottom */}
      <div className="w-full absolute bottom-0">
        <Footer />
      </div>
    </div>
  );
}

export default EntryPage; // ✅ Now correctly exported
