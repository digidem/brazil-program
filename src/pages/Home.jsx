import React, { useState, useEffect, useRef } from 'react';
import { useQuery } from '@tanstack/react-query';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Search, Menu, X, ChevronDown } from 'lucide-react';
import 'leaflet/dist/leaflet.css';
const baseUrl = import.meta.env.BASE_URL || '/';

const fetchPartners = async () => {
  // Simulated API call
  return [
    {
      id: 1,
      name: "EcoGuardians",
      slug: "eco-guardians",
      logo: "https://picsum.photos/seed/eco1/150",
      description: "Protecting indigenous lands through innovative technology.",
      latitude: -3.4653,
      longitude: -62.2159,
    },
    {
      id: 2,
      name: "TerraDefenders",
      slug: "terra-defenders",
      logo: "https://picsum.photos/seed/terra2/150",
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
        <video
          autoPlay
          loop
          muted
          className="absolute w-full h-full object-cover"
        >
          <source src="https://videos.pexels.com/video-files/4051989/4051989-sd_640_360_30fps.mp4" type="video/mp4" />
          Your browser does not support the video tag.
        </video>
        <div className="absolute inset-0 bg-black opacity-50"></div>
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
            url="https://tiles.stadiamaps.com/tiles/alidade_satellite/{z}/{x}/{y}{r}.jpg"
            minZoom={0}
            maxZoom={20}
            attribution='&copy; CNES, Distribution Airbus DS, © Airbus DS, © PlanetObserver (Contains Copernicus Data) | &copy; <a href="https://www.stadiamaps.com/" target="_blank">Stadia Maps</a> &copy; <a href="https://openmaptiles.org/" target="_blank">OpenMapTiles</a> &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
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
                    onClick={() => window.location.href = `${baseUrl}/partners/${partner.slug}`}
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
                    href={`/partners/${partner.slug}`}
                    className="mt-2 block text-center bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 transition-colors"
                  >
                    View Details
                  </a>
                </div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Home;