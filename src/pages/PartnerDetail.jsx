import React from 'react';
import { useParams } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { motion } from 'framer-motion';
import Navigation from '../components/Navigation';
import PartnerHero from '../components/PartnerHero';
import ProjectHighlight from '../components/ProjectHighlight';
import MapSection from '../components/MapSection';
import MediaGallery from '../components/MediaGallery';
import DonateSection from '../components/DonateSection';
import { Facebook, Twitter, Instagram, Linkedin, Youtube } from 'lucide-react';

const fetchPartnerDetails = async (slug) => {
  // Simulated API call
  const partners = [{
    name: "EcoGuardians",
    slug: "eco-guardians",
    logo: "https://picsum.photos/seed/eco1/150",
    heroImage: "https://picsum.photos/seed/rainforest/1920/1080",
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
      images: [
        "https://picsum.photos/seed/amazon/800/600",
        "https://picsum.photos/seed/forest/800/600",
        "https://picsum.photos/seed/indigenous/800/600"
      ],
      videos: ["https://www.youtube.com/embed/dQw4w9WgXcQ"]
    },
    latitude: -3.4653,
    longitude: -62.2159,
    territory_size: 1000000,
    population: 50000,
    villages: 25,
    ethnic_groups: ["Yanomami", "Ye'kwana"],
    social_media: {
      facebook: "https://facebook.com/ecoguardians",
      twitter: "https://twitter.com/ecoguardians",
      instagram: "https://instagram.com/ecoguardians",
      linkedin: "https://linkedin.com/company/ecoguardians",
      youtube: "https://youtube.com/ecoguardians"
    },
    donation: {
      openCollectiveUrl: "https://opencollective.com/ecoguardians",
      pixQrCode: "https://picsum.photos/seed/pix/200/200",
      totalRaised: 75000,
      goal: 100000
    }
  }];
  // return partners.find((partner) => partner.slug === slug);
  return partners[0];
};

const PartnerDetail = () => {
  const { slug } = useParams();
  const { data: partner, isLoading, error } = useQuery({
    queryKey: ['partner', slug],
    queryFn: () => fetchPartnerDetails(slug),
  });

  if (isLoading) return <div className="text-white text-center py-20">Loading...</div>;
  if (error) return <div className="text-white text-center py-20">An error occurred: {error.message}</div>;
  console.log(partner);

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      <Navigation />
      <PartnerHero partner={partner} />

      <main className="container mx-auto px-4 py-16">
        <ProjectHighlight project={partner.project_highlight} />
        
        <div className="my-16 bg-gray-800 rounded-lg p-8">
          <h2 className="text-3xl font-bold mb-6 text-cyan-300">Partner Territory</h2>
          <div className="flex flex-col lg:flex-row gap-8">
            <div className="w-full lg:w-1/2 xl:w-2/3">
              <div className="rounded-lg overflow-hidden shadow-xl">
                <MapSection 
                  filteredPartners={[partner]} 
                  noSideBar 
                  className="h-[400px] lg:h-[500px] w-full" 
                />
              </div>
            </div>
            <div className="w-full lg:w-1/2 xl:w-1/3 space-y-6">
              <div className="bg-gray-700 rounded-lg p-6">
                <h3 className="text-xl font-semibold mb-4 text-cyan-200">Territory Details</h3>
                <dl className="space-y-4">
                  <div>
                    <dt className="text-gray-400">Size</dt>
                    <dd className="text-lg font-medium">{partner.territory_size.toLocaleString()} hectares</dd>
                  </div>
                  <div>
                    <dt className="text-gray-400">Population</dt>
                    <dd className="text-lg font-medium">{partner.population.toLocaleString()} people</dd>
                  </div>
                  <div>
                    <dt className="text-gray-400">Villages</dt>
                    <dd className="text-lg font-medium">{partner.villages} villages</dd>
                  </div>
                  <div>
                    <dt className="text-gray-400">Ethnic Groups</dt>
                    <dd className="text-lg font-medium">{partner.ethnic_groups.join(", ")}</dd>
                  </div>
                </dl>
              </div>
            </div>
          </div>
        </div>

        <motion.section 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1 }}
          className="relative py-24 my-16 bg-gradient-to-r from-green-900 to-blue-900 overflow-hidden"
        >
          <div className="absolute inset-0 bg-cover bg-center opacity-20" style={{backgroundImage: "url('https://picsum.photos/seed/amazon-rainforest/1920/1080')"}}></div>
          <div className="container mx-auto px-4 relative z-10">
            <h2 className="text-4xl font-bold mb-8 text-center text-cyan-300">Impact Statement</h2>
            <motion.blockquote 
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.5, duration: 0.8 }}
              className="text-3xl italic text-center text-white max-w-4xl mx-auto leading-relaxed"
            >
              "{partner.project_highlight.impact_statement}"
            </motion.blockquote>
          </div>
        </motion.section>

        <MediaGallery media={partner.media_gallery} />
        
        <DonateSection donation={partner.donation} />
      </main>

      <footer className="bg-gray-800 py-12 mt-16">
        <div className="container mx-auto px-4">
          <div className="flex flex-col items-center">
            <h3 className="text-2xl font-semibold mb-6 text-cyan-400">Connect With {partner.name}</h3>
            <div className="flex space-x-6">
              {partner.social_media.facebook && (
                <a href={partner.social_media.facebook} target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white transition-colors transform hover:scale-110">
                  <Facebook size={32} />
                </a>
              )}
              {partner.social_media.twitter && (
                <a href={partner.social_media.twitter} target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white transition-colors transform hover:scale-110">
                  <Twitter size={32} />
                </a>
              )}
              {partner.social_media.instagram && (
                <a href={partner.social_media.instagram} target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white transition-colors transform hover:scale-110">
                  <Instagram size={32} />
                </a>
              )}
              {partner.social_media.linkedin && (
                <a href={partner.social_media.linkedin} target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white transition-colors transform hover:scale-110">
                  <Linkedin size={32} />
                </a>
              )}
              {partner.social_media.youtube && (
                <a href={partner.social_media.youtube} target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white transition-colors transform hover:scale-110">
                  <Youtube size={32} />
                </a>
              )}
            </div>
            <p className="mt-8 text-gray-400 text-center">&copy; 2024 {partner.name}. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default PartnerDetail;