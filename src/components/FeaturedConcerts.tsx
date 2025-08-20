import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import { concerts } from '@/data/mockData';
import { Button } from '@/components/ui/button';
import { FiChevronLeft, FiChevronRight } from 'react-icons/fi';

export const FeaturedConcerts = () => {
  const featuredConcerts = concerts.filter(concert => concert.isFeatured);
  const [currentSlide, setCurrentSlide] = useState(0);

  // Auto-play carousel
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => 
        prev === featuredConcerts.length - 1 ? 0 : prev + 1
      );
    }, 5000);

    return () => clearInterval(interval);
  }, [featuredConcerts.length]);

  const nextSlide = () => {
    setCurrentSlide(prev => 
      prev === featuredConcerts.length - 1 ? 0 : prev + 1
    );
  };

  const prevSlide = () => {
    setCurrentSlide(prev => 
      prev === 0 ? featuredConcerts.length - 1 : prev - 1
    );
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  return (
    <div className="relative h-[70vh] overflow-hidden">
      <AnimatePresence mode="wait">
        {featuredConcerts.map((concert, index) => (
          index === currentSlide && (
            <motion.div
              key={concert.id}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.5 }}
              className="absolute inset-0"
            >
              {/* Background Image */}
              <div 
                className="absolute inset-0 bg-cover bg-center bg-no-repeat"
                style={{ 
                  backgroundImage: `url(${concert.posterImageUrl})`
                }}
              />
              
              {/* Gradient Overlay */}
              <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/50 to-transparent" />
              
              {/* Content */}
              <div className="relative h-full flex items-center">
                <div className="container mx-auto px-4">
                  <div className="max-w-2xl">
                    <motion.div
                      initial={{ y: 30, opacity: 0 }}
                      animate={{ y: 0, opacity: 1 }}
                      transition={{ delay: 0.2 }}
                    >
                      <h1 className="text-5xl md:text-6xl font-bold text-white mb-4">
                        {concert.name}
                      </h1>
                      <h2 className="text-2xl md:text-3xl text-gray-200 mb-4">
                        {concert.artist}
                      </h2>
                      <p className="text-lg text-gray-300 mb-2">
                        {formatDate(concert.date)}
                      </p>
                      <p className="text-lg text-gray-300 mb-8">
                        {concert.location}
                      </p>
                      
                      <Link to={`/concert/${concert.id}`}>
                        <Button size="lg" className="glow-effect">
                          View Details
                        </Button>
                      </Link>
                    </motion.div>
                  </div>
                </div>
              </div>
            </motion.div>
          )
        ))}
      </AnimatePresence>

      {/* Navigation Arrows */}
      <button
        onClick={prevSlide}
        className="absolute left-4 top-1/2 -translate-y-1/2 bg-black/30 hover:bg-black/50 text-white p-2 rounded-full transition-colors"
      >
        <FiChevronLeft size={24} />
      </button>
      <button
        onClick={nextSlide}
        className="absolute right-4 top-1/2 -translate-y-1/2 bg-black/30 hover:bg-black/50 text-white p-2 rounded-full transition-colors"
      >
        <FiChevronRight size={24} />
      </button>

      {/* Slide Indicators */}
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex space-x-2">
        {featuredConcerts.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentSlide(index)}
            className={`w-3 h-3 rounded-full transition-colors ${
              index === currentSlide ? 'bg-primary' : 'bg-white/30'
            }`}
          />
        ))}
      </div>
    </div>
  );
};