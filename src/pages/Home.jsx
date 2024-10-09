import React, { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import { motion } from 'framer-motion';
import { Search, Menu } from 'lucide-react';
import 'leaflet/dist/leaflet.css';

const fetchPartners = async () => {
  // Simulated API call
  return [
    {
      id: 1,
      name: "EcoGuardians",
      slug: "eco-guardians",
      logo: "https://via.placeholder.com/150",
      description: "Protecting indigenous lands through innovative technology.",
      latitude: -3.4653,
      longitude: -62.2159,
    },
    {
      id: 2,
      name: "TerraDefenders",
      slug: "terra-defenders",
      logo: "https://via.placeholder.com/150",
      description: "Empowering communities to preserve their natural heritage.",
      latitude: -5.2744,
      longitude: -60.3756,
    },
    // Add more partner data as needed
  ];
};

const Home = () => {
  const { data: partners, isLoading, error } = useQuery({
    queryKey: ['partners'],
    queryFn: fetchPartners,
  });

  const [searchTerm, setSearchTerm] = useState('');
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  if (isLoading) return <div className="text-white text-center py-20">Loading...</div>;
  if (error) return <div className="text-white text-center py-20">An error occurred: {error.message}</div>;

  const filteredPartners = partners.filter(partner =>
    partner.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="h-screen w-full relative">
      <MapContainer center={[-4.5, -60]} zoom={5} style={{ height: '100%', width: '100%' }}>
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        />
        {filteredPartners.map((partner) => (
          <Marker key={partner.id} position={[partner.latitude, partner.longitude]}>
            <Popup>
              <div className="text-center">
                <img src={partner.logo} alt={partner.name} className="w-16 h-16 mx-auto mb-2 rounded-full" />
                <h3 className="font-bold">{partner.name}</h3>
                <p className="text-sm">{partner.description}</p>
                <button 
                  className="mt-2 bg-green-500 text-white px-4 py-1 rounded hover:bg-green-600 transition-colors"
                  onClick={() => window.location.href = `/partners/${partner.slug}`}
                >
                  Learn More
                </button>
              </div>
            </Popup>
          </Marker>
        ))}
      </MapContainer>

      <div className="absolute top-4 left-4 right-4 flex justify-between items-center z-[1000]">
        <button
          onClick={() => setIsSidebarOpen(!isSidebarOpen)}
          className="p-2 bg-white rounded-full shadow-md"
        >
          <Menu className="h-6 w-6 text-gray-700" />
        </button>
        <div className="flex-1 mx-4">
          <input
            type="text"
            placeholder="Search partners..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full px-4 py-2 rounded-full shadow-md focus:outline-none focus:ring-2 focus:ring-green-500"
          />
        </div>
        <button className="p-2 bg-white rounded-full shadow-md">
          <Search className="h-6 w-6 text-gray-700" />
        </button>
      </div>

      <motion.div
        className="absolute top-0 left-0 h-full w-64 bg-white shadow-lg z-[1001]"
        initial={{ x: '-100%' }}
        animate={{ x: isSidebarOpen ? 0 : '-100%' }}
        transition={{ duration: 0.3 }}
      >
        <div className="p-4">
          <h2 className="text-2xl font-bold mb-4">Partners</h2>
          <ul>
            {partners.map((partner) => (
              <li key={partner.id} className="mb-2">
                <a
                  href={`/partners/${partner.slug}`}
                  className="text-blue-500 hover:underline"
                >
                  {partner.name}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </motion.div>
    </div>
  );
};

export default Home;