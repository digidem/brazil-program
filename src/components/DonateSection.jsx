import React from 'react';
import { motion } from 'framer-motion';
import { DollarSign, Share2 } from 'lucide-react';

const DonateSection = ({ donation }) => {
  const progressPercentage = (donation.totalRaised / donation.goal) * 100;

  return (
    <motion.section
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="py-16 bg-gradient-to-r from-green-900 to-blue-900 rounded-3xl overflow-hidden shadow-2xl my-16"
    >
      <div className="container mx-auto px-4">
        <h2 className="text-4xl font-bold mb-4 text-center text-white">Support Our Mission</h2>
        <p className="text-xl text-center text-gray-300 mb-8">
          Help us safeguard the Amazon rainforest and empower indigenous communities by making a donation. Every contribution counts!
        </p>

        <div className="flex flex-wrap justify-center items-center gap-8">
          <motion.a
            href={donation.openCollectiveUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="bg-green-500 hover:bg-green-600 text-white font-bold py-3 px-6 rounded-full inline-flex items-center transition-all duration-300 transform hover:scale-105"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <DollarSign className="mr-2" />
            Donate via Open Collective
          </motion.a>

          <div className="text-center">
            <h3 className="text-xl font-semibold mb-2 text-white">Donate with PIX</h3>
            <div className="bg-white p-2 rounded-lg shadow-lg inline-block">
              <img src={donation.pixQrCode} alt="PIX QR Code" className="w-40 h-40" />
            </div>
            <p className="mt-2 text-sm text-gray-300">Scan the code to donate directly via PIX</p>
          </div>
        </div>

        <div className="mt-12 max-w-2xl mx-auto">
          <h3 className="text-2xl font-semibold mb-2 text-center text-white">Our Progress</h3>
          <div className="bg-gray-700 h-4 rounded-full overflow-hidden">
            <div
              className="bg-cyan-400 h-full rounded-full transition-all duration-500 ease-out"
              style={{ width: `${progressPercentage}%` }}
            ></div>
          </div>
          <p className="text-center mt-2 text-gray-300">
            Raised: ${donation.totalRaised.toLocaleString()} / Goal: ${donation.goal.toLocaleString()}
          </p>
        </div>

        <div className="mt-8 text-center">
          <h3 className="text-xl font-semibold mb-2 text-white">Share Our Cause</h3>
          <div className="flex justify-center space-x-4">
            <motion.a
              href="#"
              className="text-gray-300 hover:text-white transition-colors"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              <Share2 size={24} />
            </motion.a>
            {/* Add more social share icons as needed */}
          </div>
        </div>
      </div>
    </motion.section>
  );
};

export default DonateSection;