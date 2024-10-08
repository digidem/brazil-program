import React, { useEffect, useRef } from 'react';
import { useParams } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";
import { Card, CardContent } from "@/components/ui/card";
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';

const fetchPartnerDetails = async (slug) => {
  // Simulated API call
  return {
    name: "EcoGuardians",
    slug: "eco-guardians",
    logo: "https://via.placeholder.com/150",
    description: "EcoGuardians is at the forefront of protecting indigenous lands through innovative technology and community engagement.",
    project_highlight: {
      title: "Project Rainforest Shield",
      summary: "An initiative to protect 1 million acres of Amazon rainforest using advanced satellite monitoring and community-led conservation efforts.",
      objectives: ["Implement real-time deforestation alerts", "Train 500 indigenous rangers in conservation technology", "Establish sustainable agroforestry practices"],
      tools_used: ["Mapeo", "TerraStories", "Satellite Imagery Analysis"],
      results: "Reduced deforestation by 75% in target areas and improved livelihoods for 10,000 indigenous community members.",
      impact_statement: "Project Rainforest Shield has not only preserved critical ecosystems but has also empowered indigenous communities to become the guardians of their ancestral lands, ensuring a sustainable future for generations to come."
    },
    media_gallery: {
      images: ["https://via.placeholder.com/800x600", "https://via.placeholder.com/800x600", "https://via.placeholder.com/800x600"],
      videos: ["https://www.youtube.com/embed/dQw4w9WgXcQ"]
    },
    // New data for the map section
    latitude: -3.4653,
    longitude: -62.2159,
    territory_size: 1000000,
    population: 50000,
    villages: 25,
    ethnic_groups: ["Yanomami", "Ye'kwana"],
  };
};

const MapSection = ({ partner }) => {
  return (
    <section className="mb-16">
      <h2 className="text-4xl font-bold mb-8">Territory Overview</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="bg-card rounded-lg overflow-hidden shadow-lg">
          <MapContainer center={[partner.latitude, partner.longitude]} zoom={8} style={{ height: '400px', width: '100%' }}>
            <TileLayer
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            />
            <Marker position={[partner.latitude, partner.longitude]}>
              <Popup>{partner.name}</Popup>
            </Marker>
          </MapContainer>
        </div>
        <Card className="hover-lift">
          <CardContent className="p-8">
            <h3 className="text-3xl font-semibold mb-4">Territory Statistics</h3>
            <ul className="space-y-4">
              <li className="flex justify-between items-center">
                <span className="text-lg font-medium">Size:</span>
                <span className="text-2xl font-bold">{partner.territory_size} hectares</span>
              </li>
              <li className="flex justify-between items-center">
                <span className="text-lg font-medium">Population:</span>
                <span className="text-2xl font-bold">{partner.population}</span>
              </li>
              <li className="flex justify-between items-center">
                <span className="text-lg font-medium">Villages:</span>
                <span className="text-2xl font-bold">{partner.villages}</span>
              </li>
              <li className="flex justify-between items-center">
                <span className="text-lg font-medium">Ethnic Groups:</span>
                <span className="text-2xl font-bold">{partner.ethnic_groups.join(', ')}</span>
              </li>
            </ul>
          </CardContent>
        </Card>
      </div>
    </section>
  );
};

const PartnerDetail = () => {
  const { slug } = useParams();
  const { data: partner, isLoading, error } = useQuery({
    queryKey: ['partner', slug],
    queryFn: () => fetchPartnerDetails(slug),
  });

  const heroRef = useRef(null);
  const { scrollY } = useScroll();
  const y = useTransform(scrollY, [0, 500], [0, 150]);

  useEffect(() => {
    const handleScroll = () => {
      const scrollOffset = window.pageYOffset;
      if (heroRef.current) {
        heroRef.current.style.setProperty('--scroll-offset', `${scrollOffset * 0.5}px`);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  if (isLoading) return <div className="text-white text-center py-20">Loading...</div>;
  if (error) return <div className="text-white text-center py-20">An error occurred: {error.message}</div>;

  return (
    <div className="min-h-screen bg-background text-foreground">
      <header ref={heroRef} className="hero-parallax relative h-screen flex items-center justify-center overflow-hidden">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          className="text-center z-10"
        >
          <img src={partner.logo} alt={partner.name} className="w-48 h-48 object-cover mb-8 mx-auto rounded-full fade-in" />
          <h1 className="text-6xl font-bold mb-4 fade-in">{partner.name}</h1>
          <p className="text-xl mb-8 fade-in max-w-2xl mx-auto">{partner.description}</p>
        </motion.div>
        <motion.div
          className="absolute inset-0 z-0"
          style={{ y }}
        >
          {/* Add a subtle background animation or pattern here */}
        </motion.div>
      </header>

      <main className="container mx-auto px-4 py-16">
        <section className="mb-16">
          <h2 className="text-4xl font-bold mb-8">Project Highlight</h2>
          <Card className="hover-lift">
            <CardContent className="p-8">
              <h3 className="text-3xl font-semibold mb-4">{partner.project_highlight.title}</h3>
              <p className="text-xl mb-6">{partner.project_highlight.summary}</p>
              <h4 className="text-2xl font-semibold mb-4">Objectives:</h4>
              <ul className="list-disc list-inside mb-6">
                {partner.project_highlight.objectives.map((objective, index) => (
                  <li key={index} className="text-lg mb-2">{objective}</li>
                ))}
              </ul>
              <h4 className="text-2xl font-semibold mb-4">Tools Used:</h4>
              <p className="text-lg mb-6">{partner.project_highlight.tools_used.join(', ')}</p>
              <h4 className="text-2xl font-semibold mb-4">Results:</h4>
              <p className="text-lg">{partner.project_highlight.results}</p>
            </CardContent>
          </Card>
        </section>

        <MapSection partner={partner} />

        <section className="mb-16">
          <h2 className="text-4xl font-bold mb-8">Impact Statement</h2>
          <blockquote className="text-2xl italic border-l-4 border-primary pl-6 py-2">
            {partner.project_highlight.impact_statement}
          </blockquote>
        </section>

        <section className="mb-16">
          <h2 className="text-4xl font-bold mb-8">Media Gallery</h2>
          <Carousel className="w-full max-w-4xl mx-auto">
            <CarouselContent>
              {partner.media_gallery.images.map((image, index) => (
                <CarouselItem key={index}>
                  <img src={image} alt={`Gallery image ${index + 1}`} className="w-full h-96 object-cover rounded-lg" />
                </CarouselItem>
              ))}
              {partner.media_gallery.videos.map((video, index) => (
                <CarouselItem key={`video-${index}`}>
                  <iframe
                    width="100%"
                    height="400"
                    src={video}
                    title={`Partner video ${index + 1}`}
                    frameBorder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                    className="rounded-lg"
                  ></iframe>
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious />
            <CarouselNext />
          </Carousel>
        </section>
      </main>

      <footer className="bg-secondary py-8 mt-16">
        <div className="container mx-auto px-4 flex justify-between items-center">
          <p>&copy; 2024 Indigenous Land Defense. All rights reserved.</p>
          <div className="flex space-x-4">
            {/* Add social media icons here */}
          </div>
        </div>
      </footer>
    </div>
  );
};

export default PartnerDetail;
