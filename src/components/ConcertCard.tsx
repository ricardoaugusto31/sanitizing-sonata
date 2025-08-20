import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Concert } from '@/data/mockData';
import { FiCalendar, FiMapPin } from 'react-icons/fi';

interface ConcertCardProps {
  concert: Concert;
  index?: number;
}

export const ConcertCard = ({ concert, index = 0 }: ConcertCardProps) => {
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      weekday: 'short',
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1 }}
      whileHover={{ scale: 1.03 }}
      className="group"
    >
      <Link to={`/concert/${concert.id}`}>
        <div className="bg-card rounded-lg overflow-hidden card-hover">
          {/* Concert Poster */}
          <div className="relative aspect-[3/4] overflow-hidden">
            <img
              src={concert.posterImageUrl}
              alt={`${concert.name} poster`}
              className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
            
            {/* Featured Badge */}
            {concert.isFeatured && (
              <div className="absolute top-4 left-4">
                <span className="bg-primary text-primary-foreground px-3 py-1 rounded-full text-sm font-semibold">
                  Featured
                </span>
              </div>
            )}
          </div>

          {/* Concert Info */}
          <div className="p-6">
            <h3 className="text-xl font-bold text-foreground mb-2 group-hover:text-primary transition-colors">
              {concert.name}
            </h3>
            <p className="text-muted-foreground text-lg mb-4">
              {concert.artist}
            </p>
            
            <div className="space-y-2">
              <div className="flex items-center text-muted-foreground">
                <FiCalendar className="mr-2" size={16} />
                <span>{formatDate(concert.date)}</span>
              </div>
              <div className="flex items-center text-muted-foreground">
                <FiMapPin className="mr-2" size={16} />
                <span>{concert.location}</span>
              </div>
            </div>
          </div>
        </div>
      </Link>
    </motion.div>
  );
};