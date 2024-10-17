import React from 'react';
import { motion } from 'framer-motion';
import { ChevronDown } from 'lucide-react';

const Hero = ({ scrollToMap }) => {
  return (
    <header className="hero-parallax relative h-screen flex items-center justify-center overflow-hidden">
      <div 
        className="absolute inset-0 bg-cover bg-center"
        style={{
          backgroundImage: "url('https://picsum.photos/seed/hero/1920/1080')",
          filter: "brightness(50%)"
        }}
      ></div>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
        className="text-center z-10"
      >
        <h1 className="text-6xl font-bold mb-4 fade-in text-white">Defending Indigenous Lands</h1>
        <p className="text-xl mb-8 fade-in text-white">Together with our partners, we're preserving our planet's heritage.</p>
        <button 
          onClick={scrollToMap}
          className="text-lg px-8 py-3 rounded-full bg-primary text-primary-foreground hover:bg-primary/90 neon-glow"
        >
          Partner Map
        </button>
        <motion.div
          initial={{ y: 10, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 1, duration: 1, repeat: Infinity, repeatType: 'reverse' }}
          className="mt-8 flex justify-center"
        >
          <ChevronDown size={32} className="text-white" />
        </motion.div>
      </motion.div>
    </header>
  );
};

export default Hero;