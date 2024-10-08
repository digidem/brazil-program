import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useQuery } from '@tanstack/react-query';

const fetchPartners = async () => {
  // In a real application, this would be an API call
  // For now, we'll simulate fetching data
  return [
    {
      name: "Partner Name 1",
      slug: "partner-name-1",
      logo: "https://via.placeholder.com/150",
      description: "Brief description of the partner."
    },
    // Add more partner data as needed
  ];
};

const Home = () => {
  const { data: partners, isLoading, error } = useQuery({
    queryKey: ['partners'],
    queryFn: fetchPartners,
  });

  if (isLoading) return <div className="text-white">Loading...</div>;
  if (error) return <div className="text-white">An error occurred: {error.message}</div>;

  return (
    <div className="min-h-screen bg-gray-900 text-white p-8">
      <h1 className="text-4xl font-bold mb-8">Our Partners</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {partners.map((partner) => (
          <motion.div
            key={partner.slug}
            whileHover={{ scale: 1.05 }}
            className="bg-gray-800 rounded-lg overflow-hidden shadow-lg"
          >
            <Link to={`/partners/${partner.slug}`}>
              <img src={partner.logo} alt={partner.name} className="w-full h-48 object-cover" />
              <div className="p-4">
                <h2 className="text-xl font-semibold mb-2">{partner.name}</h2>
                <p className="text-gray-400">{partner.description}</p>
              </div>
            </Link>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default Home;