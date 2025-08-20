import { motion } from 'framer-motion';
import { Navbar } from '@/components/Navbar';
import { FeaturedConcerts } from '@/components/FeaturedConcerts';
import { ConcertList } from '@/components/ConcertList';

const HomePage = () => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="min-h-screen bg-background"
    >
      <Navbar />
      
      {/* Hero Section */}
      <main className="pt-16">
        <FeaturedConcerts />
        <ConcertList />
      </main>
    </motion.div>
  );
};

export default HomePage;