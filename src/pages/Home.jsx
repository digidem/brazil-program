import React, { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { motion, useScroll, useTransform } from 'framer-motion';
import { useQuery } from '@tanstack/react-query';
import { ArrowUpCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';

const fetchPartners = async () => {
  // Simulated API call
  return [
    {
      name: "EcoGuardians",
      slug: "eco-guardians",
      logo: "https://via.placeholder.com/150",
      description: "Protecting indigenous lands through innovative technology."
    },
    {
      name: "TerraDefenders",
      slug: "terra-defenders",
      logo: "https://via.placeholder.com/150",
      description: "Empowering communities to preserve their natural heritage."
    },
    // Add more partner data as needed
  ];
};

const Home = () => {
  const { data: partners, isLoading, error } = useQuery({
    queryKey: ['partners'],
    queryFn: fetchPartners,
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
          <h1 className="text-6xl font-bold mb-4 fade-in">Defending Indigenous Lands</h1>
          <p className="text-xl mb-8 fade-in">Together with our partners, we're preserving our planet's heritage.</p>
          <Button className="text-lg px-8 py-3 rounded-full bg-primary text-primary-foreground hover:bg-primary/90 neon-glow">
            Learn More
          </Button>
        </motion.div>
        <motion.div
          className="absolute inset-0 z-0"
          style={{ y }}
        >
          {/* Add a subtle background animation or pattern here */}
        </motion.div>
      </header>

      <main className="container mx-auto px-4 py-16">
        <h2 className="text-4xl font-bold mb-12 text-center">Our Partners</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {partners.map((partner) => (
            <motion.div
              key={partner.slug}
              whileHover={{ scale: 1.05 }}
              className="bg-card rounded-lg overflow-hidden shadow-lg hover-lift"
            >
              <Link to={`/partners/${partner.slug}`}>
                <img src={partner.logo} alt={partner.name} className="w-full h-48 object-cover" />
                <div className="p-6">
                  <h3 className="text-2xl font-semibold mb-2">{partner.name}</h3>
                  <p className="text-muted-foreground">{partner.description}</p>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </main>

      <footer className="bg-secondary py-8 mt-16">
        <div className="container mx-auto px-4 flex justify-between items-center">
          <p>&copy; 2024 Indigenous Land Defense. All rights reserved.</p>
          <div className="flex space-x-4">
            {/* Add social media icons here */}
          </div>
        </div>
      </footer>

      <Button
        className="fixed bottom-8 right-8 rounded-full p-2 bg-primary text-primary-foreground hover:bg-primary/90"
        onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
      >
        <ArrowUpCircle size={24} />
      </Button>
    </div>
  );
};

export default Home;