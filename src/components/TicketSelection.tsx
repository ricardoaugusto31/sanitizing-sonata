import { motion } from 'framer-motion';
import { TicketTier } from '@/data/mockData';
import { FiCheck } from 'react-icons/fi';

interface TicketSelectionProps {
  tiers: TicketTier[];
  selectedTier: string | null;
  onTierSelect: (tierId: string) => void;
}

export const TicketSelection = ({ tiers, selectedTier, onTierSelect }: TicketSelectionProps) => {
  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      minimumFractionDigits: 0
    }).format(price);
  };

  return (
    <div className="space-y-4">
      <h3 className="text-2xl font-bold text-foreground mb-6">Select Ticket Tier</h3>
      
      <div className="grid gap-4">
        {tiers.map((tier, index) => (
          <motion.div
            key={tier.id}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.1 }}
            onClick={() => onTierSelect(tier.id)}
            className={`p-6 rounded-lg border-2 cursor-pointer transition-all duration-200 ${
              selectedTier === tier.id
                ? 'border-primary bg-primary/10 glow-effect'
                : 'border-border bg-card hover:border-primary/50'
            }`}
          >
            <div className="flex justify-between items-start mb-4">
              <div>
                <h4 className="text-xl font-semibold text-foreground">{tier.name}</h4>
                <p className="text-2xl font-bold text-primary">{formatPrice(tier.price)}</p>
              </div>
              {selectedTier === tier.id && (
                <div className="bg-primary text-primary-foreground p-2 rounded-full">
                  <FiCheck size={20} />
                </div>
              )}
            </div>
            
            <ul className="space-y-2">
              {tier.benefits.map((benefit, benefitIndex) => (
                <li key={benefitIndex} className="flex items-center text-muted-foreground">
                  <FiCheck className="text-primary mr-2" size={16} />
                  {benefit}
                </li>
              ))}
            </ul>
          </motion.div>
        ))}
      </div>
    </div>
  );
};