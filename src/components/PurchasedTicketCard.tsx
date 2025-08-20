import { motion } from 'framer-motion';
import { PurchasedTicket } from '@/data/mockData';
import { FiCalendar, FiMapPin, FiUser, FiCreditCard } from 'react-icons/fi';

interface PurchasedTicketCardProps {
  ticket: PurchasedTicket;
  index?: number;
}

export const PurchasedTicketCard = ({ ticket, index = 0 }: PurchasedTicketCardProps) => {
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      weekday: 'short',
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      minimumFractionDigits: 0
    }).format(price);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1 }}
      className="bg-card rounded-lg overflow-hidden shadow-2xl"
    >
      {/* Ticket Header */}
      <div className="bg-gradient-to-r from-primary/20 to-accent/20 p-6 border-b border-border">
        <div className="flex justify-between items-start mb-4">
          <div>
            <h3 className="text-xl font-bold text-foreground mb-1">
              {ticket.concertName}
            </h3>
            <p className="text-muted-foreground">{ticket.artist}</p>
          </div>
          <div className="text-right">
            <span className="bg-primary text-primary-foreground px-3 py-1 rounded-full text-sm font-semibold">
              {ticket.tier}
            </span>
          </div>
        </div>

        <div className="space-y-2 text-sm">
          <div className="flex items-center text-foreground">
            <FiCalendar className="mr-2 text-primary" size={14} />
            <span>{formatDate(ticket.date)}</span>
          </div>
          <div className="flex items-center text-foreground">
            <FiUser className="mr-2 text-primary" size={14} />
            <span>Seat {ticket.seat}</span>
          </div>
          <div className="flex items-center text-foreground">
            <FiCreditCard className="mr-2 text-primary" size={14} />
            <span>{formatPrice(ticket.price)}</span>
          </div>
        </div>
      </div>

      {/* Ticket Body */}
      <div className="p-6">
        {/* Ticket ID */}
        <div className="mb-6">
          <p className="text-sm text-muted-foreground mb-1">Ticket ID</p>
          <p className="font-mono text-foreground font-semibold">
            {ticket.ticketId}
          </p>
        </div>

        {/* QR Code */}
        <div className="text-center">
          <p className="text-sm text-muted-foreground mb-4">
            Show this QR code at the venue
          </p>
          <div className="inline-block p-4 bg-white rounded-lg">
            <img
              src={ticket.qrCodeUrl}
              alt={`QR Code for ${ticket.ticketId}`}
              className="w-32 h-32 mx-auto"
            />
          </div>
        </div>
      </div>

      {/* Perforated Edge Effect */}
      <div className="border-t border-dashed border-border mx-6"></div>
      
      {/* Ticket Footer */}
      <div className="p-6 pt-4 text-center">
        <p className="text-xs text-muted-foreground">
          Please arrive 30 minutes before the show starts
        </p>
      </div>
    </motion.div>
  );
};