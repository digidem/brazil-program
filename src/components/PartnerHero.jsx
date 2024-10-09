import React, { useRef, useEffect } from 'react';
import { motion } from 'framer-motion';

const PartnerHero = ({ partner }) => {
  const heroRef = useRef(null);

  useEffect(() => {
    const handleScroll = () => {
      const scrollOffset = window.pageYOffset;
      if (heroRef.current) {
        heroRef.current.style.setProperty('--scroll-offset', `${scrollOffset * 0.5}px`);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header ref={heroRef} className="hero-parallax relative h-screen flex items-center justify-center overflow-hidden bg-gradient-to-b from-gray-900 to-gray-800">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
        className="text-center z-10"
      >
        <img src={partner.logo} alt={partner.name} className="w-48 h-48 object-cover mb-8 mx-auto rounded-full fade-in shadow-lg" />
        <h1 className="text-6xl font-bold mb-4 fade-in text-white tracking-tight">{partner.name}</h1>
        <p className="text-xl mb-8 fade-in max-w-2xl mx-auto text-gray-300">{partner.description}</p>
      </motion.div>
      <div className="absolute inset-0 bg-black opacity-50"></div>
      <div className="absolute inset-0 bg-gradient-to-t from-transparent to-gray-900 opacity-75"></div>
    </header>
  );
};

export default PartnerHero;