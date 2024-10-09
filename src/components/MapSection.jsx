import React from 'react';
import { motion } from 'framer-motion';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import { Users, Home, Globe } from 'lucide-react';

const MapSection = ({ partner }) => {
  return (
    <section className="mb-16 px-4">
      <motion.h2 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-4xl font-bold mb-8 text-white text-center"
      >
        Territory Overview
      </motion.h2>
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8">
        <motion.div 
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
          className="bg-gray-800 rounded-3xl overflow-hidden shadow-2xl"
        >
          <MapContainer center={[partner.latitude, partner.longitude]} zoom={8} style={{ height: '400px', width: '100%' }}>
            <TileLayer
              url="https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png"
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>'
            />
            <Marker position={[partner.latitude, partner.longitude]}>
              <Popup>{partner.name}</Popup>
            </Marker>
          </MapContainer>
        </motion.div>
        <motion.div 
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
          className="bg-gradient-to-br from-gray-800 to-gray-900 rounded-3xl overflow-hidden shadow-2xl p-8"
        >
          <h3 className="text-3xl font-semibold mb-6 text-white">Territory Statistics</h3>
          <ul className="space-y-6">
            <li className="flex items-center">
              <Globe className="text-cyan-400 mr-4" size={24} />
              <div>
                <span className="text-lg font-medium text-gray-300">Size:</span>
                <span className="block text-2xl font-bold text-white">{partner.territory_size} hectares</span>
              </div>
            </li>
            <li className="flex items-center">
              <Users className="text-cyan-400 mr-4" size={24} />
              <div>
                <span className="text-lg font-medium text-gray-300">Population:</span>
                <span className="block text-2xl font-bold text-white">{partner.population}</span>
              </div>
            </li>
            <li className="flex items-center">
              <Home className="text-cyan-400 mr-4" size={24} />
              <div>
                <span className="text-lg font-medium text-gray-300">Villages:</span>
                <span className="block text-2xl font-bold text-white">{partner.villages}</span>
              </div>
            </li>
            <li>
              <span className="text-lg font-medium text-gray-300">Ethnic Groups:</span>
              <div className="mt-2 flex flex-wrap gap-2">
                {partner.ethnic_groups.map((group, index) => (
                  <span key={index} className="bg-gray-700 text-white px-3 py-1 rounded-full text-sm">
                    {group}
                  </span>
                ))}
              </div>
            </li>
          </ul>
        </motion.div>
      </div>
    </section>
  );
};

export default MapSection;