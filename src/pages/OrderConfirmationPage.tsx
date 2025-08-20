import { motion } from 'framer-motion';
import { useLocation, useNavigate } from 'react-router-dom';
import { Navbar } from '@/components/Navbar';
import { Button } from '@/components/ui/button';
import { FiCalendar, FiMapPin, FiUser } from 'react-icons/fi';

const OrderConfirmationPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  
  const bookingData = location.state?.bookingData;

  if (!bookingData) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-foreground mb-2">No Booking Data Found</h1>
          <Button onClick={() => navigate('/')}>Back to Home</Button>
        </div>
      </div>
    );
  }

  const { concert, selectedTier, selectedSeat } = bookingData;

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      minimumFractionDigits: 0
    }).format(price);
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

  const handleConfirm = () => {
    navigate('/payment', { 
      state: { 
        bookingData: {
          ...bookingData,
          totalPrice: selectedTier.price
        }
      } 
    });
  };

  const handleCancel = () => {
    navigate(`/concert/${concert.id}`);
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="min-h-screen bg-background"
    >
      <Navbar />
      
      <main className="pt-20 pb-16">
        <div className="container mx-auto px-4 max-w-2xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-center mb-8"
          >
            <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-2">
              Confirm Your Order
            </h1>
            <p className="text-muted-foreground">
              Please review your booking details before proceeding to payment
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="bg-card rounded-lg p-8 shadow-2xl mb-8"
          >
            {/* Concert Details */}
            <div className="border-b border-border pb-6 mb-6">
              <h2 className="text-2xl font-bold text-foreground mb-2">
                {concert.name}
              </h2>
              <p className="text-xl text-muted-foreground mb-4">
                {concert.artist}
              </p>
              
              <div className="space-y-3">
                <div className="flex items-center text-foreground">
                  <FiCalendar className="mr-3 text-primary" size={18} />
                  <span>{formatDate(concert.date)} at 20:00 WIB</span>
                </div>
                <div className="flex items-center text-foreground">
                  <FiMapPin className="mr-3 text-primary" size={18} />
                  <span>{concert.venue || concert.location}</span>
                </div>
              </div>
            </div>

            {/* Ticket Details */}
            <div className="border-b border-border pb-6 mb-6">
              <h3 className="text-lg font-semibold text-foreground mb-4">Ticket Details</h3>
              
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-muted-foreground">Ticket Tier:</span>
                  <span className="font-semibold text-foreground">{selectedTier.name}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-muted-foreground">Seat:</span>
                  <span className="font-semibold text-foreground">{selectedSeat}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-muted-foreground">Price:</span>
                  <span className="font-semibold text-foreground">{formatPrice(selectedTier.price)}</span>
                </div>
              </div>
            </div>

            {/* Benefits */}
            <div className="mb-6">
              <h3 className="text-lg font-semibold text-foreground mb-4">Included Benefits</h3>
              <ul className="space-y-2">
                {selectedTier.benefits.map((benefit, index) => (
                  <li key={index} className="flex items-center text-muted-foreground">
                    <div className="w-2 h-2 bg-primary rounded-full mr-3"></div>
                    {benefit}
                  </li>
                ))}
              </ul>
            </div>

            {/* Total */}
            <div className="border-t border-border pt-6">
              <div className="flex justify-between items-center">
                <span className="text-xl font-semibold text-foreground">Total Amount:</span>
                <span className="text-2xl font-bold text-primary">
                  {formatPrice(selectedTier.price)}
                </span>
              </div>
            </div>
          </motion.div>

          {/* Action Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="flex flex-col sm:flex-row gap-4"
          >
            <Button
              variant="outline"
              onClick={handleCancel}
              className="flex-1"
            >
              Cancel
            </Button>
            <Button
              onClick={handleConfirm}
              className="flex-1 glow-effect"
            >
              Confirm & Proceed to Payment
            </Button>
          </motion.div>
        </div>
      </main>
    </motion.div>
  );
};

export default OrderConfirmationPage;