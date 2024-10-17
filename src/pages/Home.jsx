import React, { useState, useRef } from 'react';
import { useQuery } from '@tanstack/react-query';
import Hero from '../components/Hero';
import MapSection from '../components/MapSection';
import Sidebar from '../components/Sidebar';

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
  const mapRef = useRef(null);

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
      <Hero scrollToMap={scrollToMap} />
      <MapSection 
        mapRef={mapRef}
        filteredPartners={filteredPartners}
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        setIsSidebarOpen={setIsSidebarOpen}
      />
      <Sidebar 
        isSidebarOpen={isSidebarOpen}
        setIsSidebarOpen={setIsSidebarOpen}
        partners={partners}
      />
    </div>
  );
};

export default Home;