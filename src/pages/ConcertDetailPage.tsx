import { useState } from 'react';
import { motion } from 'framer-motion';
import { useParams, useNavigate } from 'react-router-dom';
import { concerts, ticketTiers } from '@/data/mockData';
import { useAuthStore } from '@/store/authStore';
import { Navbar } from '@/components/Navbar';
import { TicketSelection } from '@/components/TicketSelection';
import { SeatMap } from '@/components/SeatMap';
import { Button } from '@/components/ui/button';
import { FiCalendar, FiMapPin, FiClock } from 'react-icons/fi';

const ConcertDetailPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { isAuthenticated } = useAuthStore();
  
  const [selectedTier, setSelectedTier] = useState<string | null>(null);
  const [selectedSeat, setSelectedSeat] = useState<string | null>(null);

  const concert = concerts.find(c => c.id === parseInt(id || '0'));
  const concertTiers = ticketTiers[parseInt(id || '0')] || [];

  if (!concert) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-foreground mb-2">Concert Not Found</h1>
          <Button onClick={() => navigate('/')}>Back to Home</Button>
        </div>
      </div>
    );
  }

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return {
      date: date.toLocaleDateString('en-US', {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric'
      }),
      time: '20:00 WIB' // Mock time
    };
  };

  const { date, time } = formatDate(concert.date);

  const handleBookNow = () => {
    if (!isAuthenticated) {
      navigate('/login', { state: { from: `/concert/${id}` } });
      return;
    }

    // Store booking details for order confirmation
    const bookingData = {
      concert,
      selectedTier: concertTiers.find(t => t.id === selectedTier),
      selectedSeat
    };
    
    navigate('/order-confirmation', { state: { bookingData } });
  };

  const isBookingReady = selectedTier && selectedSeat;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="min-h-screen bg-background"
    >
      <Navbar />
      
      <main className="pt-20 pb-16">
        <div className="container mx-auto px-4">
          {/* Concert Header */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16">
            {/* Concert Poster */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
              className="relative"
            >
              <img
                src={concert.posterImageUrl}
                alt={`${concert.name} poster`}
                className="w-full rounded-lg shadow-2xl"
              />
            </motion.div>

            {/* Concert Info */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3 }}
              className="space-y-6"
            >
              <div>
                <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
                  {concert.name}
                </h1>
                <h2 className="text-2xl md:text-3xl text-muted-foreground mb-6">
                  {concert.artist}
                </h2>
              </div>

              <div className="space-y-4 text-lg">
                <div className="flex items-center text-foreground">
                  <FiCalendar className="mr-3 text-primary" size={20} />
                  <span>{date}</span>
                </div>
                <div className="flex items-center text-foreground">
                  <FiClock className="mr-3 text-primary" size={20} />
                  <span>{time}</span>
                </div>
                <div className="flex items-center text-foreground">
                  <FiMapPin className="mr-3 text-primary" size={20} />
                  <span>{concert.venue || concert.location}</span>
                </div>
              </div>

              {concert.description && (
                <div className="border-t border-border pt-6">
                  <h3 className="text-xl font-semibold text-foreground mb-3">About This Concert</h3>
                  <p className="text-muted-foreground leading-relaxed">
                    {concert.description}
                  </p>
                </div>
              )}
            </motion.div>
          </div>

          {/* Ticket Selection */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="mb-16"
          >
            <TicketSelection
              tiers={concertTiers}
              selectedTier={selectedTier}
              onTierSelect={setSelectedTier}
            />
          </motion.div>

          {/* Seat Map */}
          {selectedTier && (
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="mb-16"
            >
              <SeatMap
                selectedSeat={selectedSeat}
                onSeatSelect={setSelectedSeat}
              />
            </motion.div>
          )}

          {/* Book Now Button */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="text-center"
          >
            <Button
              size="lg"
              onClick={handleBookNow}
              disabled={!isBookingReady}
              className={`px-12 py-4 text-lg font-semibold ${
                isBookingReady ? 'glow-effect' : ''
              }`}
            >
              {isBookingReady ? 'Book Now' : 'Select Tier & Seat to Continue'}
            </Button>
            
            {!isAuthenticated && isBookingReady && (
              <p className="text-muted-foreground mt-2">
                You'll be redirected to login first
              </p>
            )}
          </motion.div>
        </div>
      </main>
    </motion.div>
  );
};

export default ConcertDetailPage;