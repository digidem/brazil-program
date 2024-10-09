import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft } from 'lucide-react';

const Navigation = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <motion.nav
      className={`fixed top-0 left-0 right-0 z-50 px-6 py-4 transition-all duration-300 ${
        isScrolled ? 'bg-gray-900/95 shadow-lg' : 'bg-transparent'
      }`}
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="container mx-auto flex justify-between items-center">
        <button
          onClick={() => navigate('/')}
          className="text-white hover:text-cyan-400 transition-colors duration-300"
        >
          <ArrowLeft size={24} />
        </button>
        <div className="space-x-6">
          <Link to="/" className="text-white hover:text-cyan-400 transition-colors duration-300">Home</Link>
          <Link to="/about" className="text-white hover:text-cyan-400 transition-colors duration-300">About</Link>
          <Link to="/partners" className="text-white hover:text-cyan-400 transition-colors duration-300">Partners</Link>
        </div>
      </div>
    </motion.nav>
  );
};

export default Navigation;