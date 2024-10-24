import React from 'react';
import { motion } from 'framer-motion';
import { X } from 'lucide-react';

const Sidebar = ({ isSidebarOpen, setIsSidebarOpen, partners }) => {
  return (
    <>
      {isSidebarOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-[1001]" onClick={() => setIsSidebarOpen(false)}></div>
      )}

      <motion.div
        className="fixed top-0 right-0 h-full w-80 bg-gray-900 shadow-lg z-[1002] overflow-y-auto"
        initial={{ x: '100%' }}
        animate={{ x: isSidebarOpen ? 0 : '100%' }}
        transition={{ duration: 0.3 }}
      >
        <div className="p-4">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-2xl font-bold text-cyan-300">Partners</h2>
            <button
              onClick={() => setIsSidebarOpen(false)}
              className="p-2 rounded-full bg-gray-800 hover:bg-gray-700 transition-colors duration-200 text-cyan-300 hover:text-cyan-200"
            >
              <X className="h-6 w-6" />
            </button>
          </div>
          <div className="space-y-4">
            {partners.map((partner) => (
              <div key={partner.id} className="bg-gray-800 rounded-lg p-4 shadow-md hover:shadow-lg transition-all duration-200 border border-gray-700">
                <div className="flex items-center space-x-4">
                  <img src={partner.logo} alt={partner.name} className="w-12 h-12 rounded-full ring-2 ring-cyan-500" />
                  <div>
                    <h3 className="font-semibold text-cyan-300">{partner.name}</h3>
                    <p className="text-sm text-gray-400">{partner.description}</p>
                  </div>
                </div>
                <a
                  href={`/#partners/${partner.slug}`}
                  className="mt-4 block text-center bg-gradient-to-r from-cyan-500 to-cyan-700 text-white px-4 py-2 rounded-lg hover:from-cyan-600 hover:to-cyan-800 transition-all duration-200 transform hover:-translate-y-0.5 shadow-lg hover:shadow-cyan-500/25"
                >
                  View Details
                </a>
              </div>
            ))}
          </div>
        </div>
      </motion.div>
    </>
  );
};

export default Sidebar;