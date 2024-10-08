import React from 'react';
import { useParams } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { motion } from 'framer-motion';

const fetchPartnerDetails = async (slug) => {
  // In a real application, this would be an API call
  // For now, we'll simulate fetching data
  return {
    name: "Partner Name 1",
    slug: "partner-name-1",
    logo: "https://via.placeholder.com/150",
    description: "Brief description of the partner.",
    project_highlight: {
      title: "Project Title",
      summary: "Summary of the project.",
      objectives: ["Objective 1", "Objective 2"],
      tools_used: ["Mapeo", "TerraStories"],
      results: "Impact of the project",
      impact_statement: "Statement on how this project defends indigenous land."
    },
    // Add more fields as needed
  };
};

const PartnerDetail = () => {
  const { slug } = useParams();
  const { data: partner, isLoading, error } = useQuery({
    queryKey: ['partner', slug],
    queryFn: () => fetchPartnerDetails(slug),
  });

  if (isLoading) return <div className="text-white">Loading...</div>;
  if (error) return <div className="text-white">An error occurred: {error.message}</div>;

  return (
    <div className="min-h-screen bg-gray-900 text-white p-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <img src={partner.logo} alt={partner.name} className="w-32 h-32 object-cover mb-4" />
        <h1 className="text-4xl font-bold mb-4">{partner.name}</h1>
        <p className="text-xl mb-8">{partner.description}</p>

        <h2 className="text-2xl font-semibold mb-4">Project Highlight</h2>
        <div className="bg-gray-800 rounded-lg p-6 mb-8">
          <h3 className="text-xl font-semibold mb-2">{partner.project_highlight.title}</h3>
          <p className="mb-4">{partner.project_highlight.summary}</p>
          <h4 className="font-semibold mb-2">Objectives:</h4>
          <ul className="list-disc list-inside mb-4">
            {partner.project_highlight.objectives.map((objective, index) => (
              <li key={index}>{objective}</li>
            ))}
          </ul>
          <h4 className="font-semibold mb-2">Tools Used:</h4>
          <p>{partner.project_highlight.tools_used.join(', ')}</p>
          <h4 className="font-semibold mt-4 mb-2">Results:</h4>
          <p>{partner.project_highlight.results}</p>
        </div>

        <h2 className="text-2xl font-semibold mb-4">Impact Statement</h2>
        <p className="text-xl mb-8">{partner.project_highlight.impact_statement}</p>

        {/* Add more sections for other partner details */}
      </motion.div>
    </div>
  );
};

export default PartnerDetail;