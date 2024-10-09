import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

const PartnerHero = ({ partner }) => {
  const heroRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"]
  });

  const y = useTransform(scrollYProgress, [0, 1], ['0%', '50%']);
  const opacity = useTransform(scrollYProgress, [0, 1], [1, 0]);

  return (
    <header ref={heroRef} className="relative h-screen flex items-center justify-center overflow-hidden">
      <motion.div
        style={{ y, opacity }}
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: `url(${partner.heroImage || 'https://source.unsplash.com/random/1920x1080?rainforest'})`,
        }}
      />
      <div className="absolute inset-0 bg-gradient-to-b from-transparent to-gray-900 opacity-75" />
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
        className="relative z-10 text-center px-4"
      >
        <img src={partner.logo} alt={partner.name} className="w-32 h-32 object-cover mb-8 mx-auto rounded-full shadow-lg" />
        <h1 className="text-6xl font-bold mb-4 text-white tracking-tight">{partner.name}</h1>
        <p className="text-xl mb-8 max-w-2xl mx-auto text-gray-300">{partner.description}</p>
      </motion.div>
    </header>
  );
};

export default PartnerHero;