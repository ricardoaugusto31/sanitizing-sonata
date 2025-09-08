import { motion } from 'framer-motion';
import { concerts } from '@/data/mockData';
import { ConcertCard } from './ConcertCard';

export const ConcertList = () => {
  // Sort concerts by date (newest first)
  const sortedConcerts = [...concerts].sort((a, b) => 
    new Date(b.date).getTime() - new Date(a.date).getTime()
  );

  return (
    <section className="py-16 bg-background">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            Upcoming Concerts
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Discover amazing live performances from your favorite artists
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 items-stretch">
          {sortedConcerts.map((concert, index) => (
            <ConcertCard 
              key={concert.id} 
              concert={concert} 
              index={index}
            />
          ))}
        </div>
      </div>
    </section>
  );
};