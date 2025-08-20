import { motion } from 'framer-motion';
import { Navigate } from 'react-router-dom';
import { useAuthStore } from '@/store/authStore';
import { purchasedTickets } from '@/data/mockData';
import { Navbar } from '@/components/Navbar';
import { PurchasedTicketCard } from '@/components/PurchasedTicketCard';

const MyTicketsPage = () => {
  const { isAuthenticated } = useAuthStore();

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

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
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-center mb-12"
          >
            <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              My Tickets
            </h1>
            <p className="text-muted-foreground text-lg">
              Your purchased concert tickets
            </p>
          </motion.div>

          {purchasedTickets.length === 0 ? (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="text-center py-16"
            >
              <div className="text-6xl mb-4">🎫</div>
              <h2 className="text-2xl font-semibold text-foreground mb-2">
                No tickets yet
              </h2>
              <p className="text-muted-foreground mb-8">
                When you purchase tickets, they'll appear here
              </p>
            </motion.div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {purchasedTickets.map((ticket, index) => (
                <PurchasedTicketCard 
                  key={ticket.ticketId} 
                  ticket={ticket} 
                  index={index}
                />
              ))}
            </div>
          )}
        </div>
      </main>
    </motion.div>
  );
};

export default MyTicketsPage;