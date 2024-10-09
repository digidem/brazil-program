import React, { useState, useEffect, useRef } from 'react';
import { useQuery } from '@tanstack/react-query';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Search, Menu, X, ChevronDown } from 'lucide-react';
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
  const heroRef = useRef(null);
  const mapRef = useRef(null);
  const sidebarRef = useRef(null);
  const { scrollY } = useScroll();
  const y = useTransform(scrollY, [0, 500], [0, 150]);

  useEffect(() => {
    const handleScroll = () => {
      const scrollOffset = window.pageYOffset;
      if (heroRef.current) {
        heroRef.current.style.setProperty('--scroll-offset', `${scrollOffset * 0.5}px`);
      }
    };

    const handleClickOutside = (event) => {
      if (sidebarRef.current && !sidebarRef.current.contains(event.target)) {
        setIsSidebarOpen(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    document.addEventListener('mousedown', handleClickOutside);

    return () => {
      window.removeEventListener('scroll', handleScroll);
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const scrollToMap = () => {
    mapRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  if (isLoading) return <div className="text-white text-center py-20">Loading...</div>;
  if (error) return <div className="text-white text-center py-20">An error occurred: {error.message}</div>;

  const filteredPartners = partners.filter(partner =>
    partner.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="min-h-screen">
      <header ref={heroRef} className="hero-parallax relative h-screen flex items-center justify-center overflow-hidden">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          className="text-center z-10"
        >
          <h1 className="text-6xl font-bold mb-4 fade-in">Defending Indigenous Lands</h1>
          <p className="text-xl mb-8 fade-in">Together with our partners, we're preserving our planet's heritage.</p>
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
        <motion.div
          className="absolute inset-0 z-0"
          style={{ y }}
        >
          {/* Add a subtle background animation or pattern here */}
        </motion.div>
      </header>

      <div ref={mapRef} className="h-screen w-full relative">
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

        <div className="absolute top-4 right-4 flex items-center z-[1000]">
          <div className="mr-2 relative">
            <input
              type="text"
              placeholder="Search partners..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="px-4 py-2 rounded-full shadow-md focus:outline-none focus:ring-2 focus:ring-green-500 pr-10"
            />
            <Search className="absolute right-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
          </div>
          <button
            onClick={() => setIsSidebarOpen(!isSidebarOpen)}
            className="p-2 bg-white rounded-full shadow-md"
          >
            <Menu className="h-6 w-6 text-gray-700" />
          </button>
        </div>

        {isSidebarOpen && (
          <div className="fixed inset-0 bg-black bg-opacity-50 z-[1001]" onClick={() => setIsSidebarOpen(false)}></div>
        )}

        <motion.div
          ref={sidebarRef}
          className="fixed top-0 right-0 h-full w-64 bg-white shadow-lg z-[1002]"
          initial={{ x: '100%' }}
          animate={{ x: isSidebarOpen ? 0 : '100%' }}
          transition={{ duration: 0.3 }}
        >
          <div className="p-4">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-2xl font-bold">Partners</h2>
              <button onClick={() => setIsSidebarOpen(false)} className="p-1 hover:bg-gray-200 rounded-full">
                <X className="h-6 w-6 text-gray-700" />
              </button>
            </div>
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
    </div>
  );
};

export default Home;