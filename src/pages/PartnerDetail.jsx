import React from 'react';
import { useParams } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import Navigation from '../components/Navigation';
import PartnerHero from '../components/PartnerHero';
import ProjectHighlight from '../components/ProjectHighlight';
import MapSection from '../components/MapSection';
import MediaGallery from '../components/MediaGallery';

const fetchPartnerDetails = async (slug) => {
  // Simulated API call
  return {
    name: "EcoGuardians",
    slug: "eco-guardians",
    logo: "https://via.placeholder.com/150",
    heroImage: "https://source.unsplash.com/random/1920x1080?rainforest",
    description: "EcoGuardians is at the forefront of protecting indigenous lands through innovative technology and community engagement.",
    project_highlight: {
      title: "Project Rainforest Shield",
      summary: "An initiative to protect 1 million acres of Amazon rainforest using advanced satellite monitoring and community-led conservation efforts.",
      objectives: [
        "Implement real-time deforestation alerts",
        "Train 500 indigenous rangers in conservation technology",
        "Establish sustainable agroforestry practices"
      ],
      tools_used: ["Mapeo", "TerraStories", "Satellite Imagery Analysis"],
      results: "Reduced deforestation by 75% in target areas and improved livelihoods for 10,000 indigenous community members.",
      impact_statement: "Project Rainforest Shield has not only preserved critical ecosystems but has also empowered indigenous communities to become the guardians of their ancestral lands, ensuring a sustainable future for generations to come."
    },
    media_gallery: {
      images: ["https://source.unsplash.com/random/800x600?amazon", "https://source.unsplash.com/random/800x600?forest", "https://source.unsplash.com/random/800x600?indigenous"],
      videos: ["https://www.youtube.com/embed/dQw4w9WgXcQ"]
    },
    latitude: -3.4653,
    longitude: -62.2159,
    territory_size: 1000000,
    population: 50000,
    villages: 25,
    ethnic_groups: ["Yanomami", "Ye'kwana"],
  };
};

const PartnerDetail = () => {
  const { slug } = useParams();
  const { data: partner, isLoading, error } = useQuery({
    queryKey: ['partner', slug],
    queryFn: () => fetchPartnerDetails(slug),
  });

  if (isLoading) return <div className="text-white text-center py-20">Loading...</div>;
  if (error) return <div className="text-white text-center py-20">An error occurred: {error.message}</div>;

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      <Navigation />
      <PartnerHero partner={partner} />

      <main className="container mx-auto px-4 py-16">
        <ProjectHighlight project={partner.project_highlight} />
        <MapSection partner={partner} />

        <section className="mb-16">
          <h2 className="text-4xl font-bold mb-8 text-center">Impact Statement</h2>
          <blockquote className="text-2xl italic border-l-4 border-cyan-400 pl-6 py-2 text-gray-300 max-w-4xl mx-auto">
            {partner.project_highlight.impact_statement}
          </blockquote>
        </section>

        <MediaGallery media={partner.media_gallery} />
      </main>

      <footer className="bg-gray-800 py-8 mt-16">
        <div className="container mx-auto px-4 flex justify-between items-center">
          <p className="text-gray-400">&copy; 2024 Indigenous Land Defense. All rights reserved.</p>
          <div className="flex space-x-4">
            {/* Add social media icons here */}
          </div>
        </div>
      </footer>
    </div>
  );
};

export default PartnerDetail;