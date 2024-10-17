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
        className="fixed top-0 right-0 h-full w-80 bg-white shadow-lg z-[1002] overflow-y-auto"
        initial={{ x: '100%' }}
        animate={{ x: isSidebarOpen ? 0 : '100%' }}
        transition={{ duration: 0.3 }}
      >
        <div className="p-4">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-2xl font-bold text-gray-800">Partners</h2>
            <button onClick={() => setIsSidebarOpen(false)} className="p-1 hover:bg-gray-200 rounded-full">
              <X className="h-6 w-6 text-gray-700" />
            </button>
          </div>
          <div className="space-y-4">
            {partners.map((partner) => (
              <div key={partner.id} className="bg-gray-100 rounded-lg p-4 shadow hover:shadow-md transition-shadow">
                <div className="flex items-center space-x-4">
                  <img src={partner.logo} alt={partner.name} className="w-12 h-12 rounded-full" />
                  <div>
                    <h3 className="font-semibold text-gray-800">{partner.name}</h3>
                    <p className="text-sm text-gray-600">{partner.description}</p>
                  </div>
                </div>
                <a
                  href={`/#partners/${partner.slug}`}
                  className="mt-2 block text-center bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 transition-colors"
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