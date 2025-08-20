import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useLocation, useNavigate } from 'react-router-dom';
import { Navbar } from '@/components/Navbar';
import { PaymentSuccessModal } from '@/components/PaymentSuccessModal';
import { FiClock } from 'react-icons/fi';

const PaymentPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  
  const [timeLeft, setTimeLeft] = useState(600); // 10 minutes in seconds
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [pollCount, setPollCount] = useState(0);

  const bookingData = location.state?.bookingData;

  useEffect(() => {
    if (!bookingData) {
      navigate('/');
      return;
    }

    // Countdown timer
    const timer = setInterval(() => {
      setTimeLeft(prev => {
        if (prev <= 1) {
          clearInterval(timer);
          // Redirect to timeout page or home
          navigate('/');
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    // Payment polling simulation
    const pollInterval = setInterval(() => {
      setPollCount(prev => {
        const newCount = prev + 1;
        // Simulate success after 3 polls (15 seconds)
        if (newCount >= 3) {
          clearInterval(pollInterval);
          clearInterval(timer);
          setShowSuccessModal(true);
        }
        return newCount;
      });
    }, 5000);

    return () => {
      clearInterval(timer);
      clearInterval(pollInterval);
    };
  }, [bookingData, navigate]);

  if (!bookingData) {
    return null;
  }

  const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes.toString().padStart(2, '0')}:${remainingSeconds.toString().padStart(2, '0')}`;
  };

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      minimumFractionDigits: 0
    }).format(price);
  };

  const handleSuccess = () => {
    setShowSuccessModal(false);
    navigate('/');
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
              Complete Your Payment
            </h1>
            <p className="text-muted-foreground">
              Scan the QR code below to complete your payment
            </p>
          </motion.div>

          {/* Timer */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.3 }}
            className="bg-card rounded-lg p-6 mb-8 text-center shadow-2xl"
          >
            <div className="flex items-center justify-center mb-4">
              <FiClock className="text-primary mr-2" size={24} />
              <span className="text-muted-foreground">Payment deadline:</span>
            </div>
            <div className="text-3xl font-bold text-primary font-mono">
              {formatTime(timeLeft)}
            </div>
            <p className="text-sm text-muted-foreground mt-2">
              Please complete your payment before the timer expires
            </p>
          </motion.div>

          {/* Payment Details */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="bg-card rounded-lg p-8 mb-8 shadow-2xl"
          >
            {/* QRIS Code */}
            <div className="text-center mb-8">
              <h2 className="text-xl font-semibold text-foreground mb-4">
                Scan QR Code to Pay
              </h2>
              <div className="inline-block p-4 bg-white rounded-lg">
                {/* Mock QRIS QR Code */}
                <img
                  src="https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=QRIS_PAYMENT_CODE_MOCK"
                  alt="QRIS Payment Code"
                  className="w-48 h-48 mx-auto"
                />
              </div>
              <p className="text-sm text-muted-foreground mt-4">
                Use any e-wallet app to scan this QR code
              </p>
            </div>

            {/* Amount */}
            <div className="border-t border-border pt-6">
              <div className="flex justify-between items-center">
                <span className="text-lg text-muted-foreground">Total Amount:</span>
                <span className="text-2xl font-bold text-primary">
                  {formatPrice(bookingData.totalPrice)}
                </span>
              </div>
            </div>
          </motion.div>

          {/* Payment Status */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="text-center"
          >
            <div className="flex items-center justify-center space-x-2 text-muted-foreground">
              <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-primary"></div>
              <span>Waiting for payment confirmation...</span>
            </div>
            <p className="text-sm text-muted-foreground mt-2">
              Poll count: {pollCount}/3 (Payment will be confirmed automatically)
            </p>
          </motion.div>
        </div>
      </main>

      <AnimatePresence>
        {showSuccessModal && (
          <PaymentSuccessModal onClose={handleSuccess} />
        )}
      </AnimatePresence>
    </motion.div>
  );
};

export default PaymentPage;