import { motion } from 'framer-motion';
import { FiCheckCircle } from 'react-icons/fi';
import { Button } from '@/components/ui/button';

interface PaymentSuccessModalProps {
  onClose: () => void;
}

export const PaymentSuccessModal = ({ onClose }: PaymentSuccessModalProps) => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4"
      onClick={onClose}
    >
      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.8, opacity: 0 }}
        transition={{ type: "spring", duration: 0.5 }}
        onClick={(e) => e.stopPropagation()}
        className="bg-card rounded-lg p-8 max-w-md w-full text-center shadow-2xl"
      >
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.2, type: "spring" }}
          className="mb-6"
        >
          <FiCheckCircle className="mx-auto text-green-500 glow-effect" size={80} />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          <h2 className="text-2xl font-bold text-foreground mb-4">
            Payment Successful!
          </h2>
          <p className="text-muted-foreground mb-8">
            Your ticket is confirmed. You can view it in your tickets section.
          </p>

          <Button onClick={onClose} className="w-full glow-effect">
            Back to Home
          </Button>
        </motion.div>
      </motion.div>
    </motion.div>
  );
};