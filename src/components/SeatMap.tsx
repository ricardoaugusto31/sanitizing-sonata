import { useState } from 'react';
import { motion } from 'framer-motion';

interface SeatMapProps {
  selectedSeat: string | null;
  onSeatSelect: (seatId: string) => void;
}

export const SeatMap = ({ selectedSeat, onSeatSelect }: SeatMapProps) => {
  // Generate a mock seat layout
  const generateSeats = () => {
    const seats = [];
    const rows = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H'];
    const seatsPerRow = 12;
    const unavailableSeats = ['A3', 'A4', 'B7', 'C2', 'D9', 'E5', 'F8'];

    for (const row of rows) {
      for (let seatNum = 1; seatNum <= seatsPerRow; seatNum++) {
        const seatId = `${row}${seatNum}`;
        seats.push({
          id: seatId,
          row,
          number: seatNum,
          isAvailable: !unavailableSeats.includes(seatId)
        });
      }
    }
    return seats;
  };

  const seats = generateSeats();

  const getSeatStyle = (seat: any) => {
    if (!seat.isAvailable) {
      return 'bg-red-800 cursor-not-allowed';
    }
    if (selectedSeat === seat.id) {
      return 'bg-primary cursor-pointer glow-effect';
    }
    return 'bg-gray-600 cursor-pointer hover:bg-gray-500';
  };

  return (
    <div className="space-y-6">
      <h3 className="text-2xl font-bold text-foreground">Select Your Seat</h3>
      
      {/* Stage */}
      <div className="text-center mb-8">
        <div className="bg-gradient-to-r from-primary/20 via-primary/40 to-primary/20 text-primary-foreground py-3 px-8 rounded-lg inline-block">
          <span className="text-lg font-semibold">🎤 STAGE 🎤</span>
        </div>
      </div>

      {/* Seat Grid */}
      <div className="space-y-2 max-w-4xl mx-auto">
        {['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H'].map((row, rowIndex) => (
          <motion.div
            key={row}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: rowIndex * 0.05 }}
            className="flex items-center justify-center space-x-1"
          >
            {/* Row Label */}
            <div className="w-6 text-center text-muted-foreground font-semibold mr-4">
              {row}
            </div>
            
            {/* Seats */}
            <div className="flex space-x-1">
              {seats
                .filter(seat => seat.row === row)
                .map((seat) => (
                  <motion.button
                    key={seat.id}
                    whileHover={seat.isAvailable ? { scale: 1.1 } : {}}
                    whileTap={seat.isAvailable ? { scale: 0.95 } : {}}
                    onClick={() => seat.isAvailable && onSeatSelect(seat.id)}
                    className={`w-8 h-8 rounded-sm transition-colors duration-200 ${getSeatStyle(seat)}`}
                    disabled={!seat.isAvailable}
                    title={`Seat ${seat.id} ${seat.isAvailable ? '(Available)' : '(Unavailable)'}`}
                  >
                    <span className="text-xs font-bold text-white">
                      {seat.number}
                    </span>
                  </motion.button>
                ))}
            </div>
          </motion.div>
        ))}
      </div>

      {/* Legend */}
      <div className="flex justify-center space-x-6 text-sm">
        <div className="flex items-center space-x-2">
          <div className="w-4 h-4 bg-gray-600 rounded-sm"></div>
          <span className="text-muted-foreground">Available</span>
        </div>
        <div className="flex items-center space-x-2">
          <div className="w-4 h-4 bg-primary rounded-sm"></div>
          <span className="text-muted-foreground">Selected</span>
        </div>
        <div className="flex items-center space-x-2">
          <div className="w-4 h-4 bg-red-800 rounded-sm"></div>
          <span className="text-muted-foreground">Unavailable</span>
        </div>
      </div>

      {selectedSeat && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center p-4 bg-primary/10 rounded-lg border border-primary/20"
        >
          <p className="text-primary font-semibold">
            Selected Seat: <span className="font-bold">{selectedSeat}</span>
          </p>
        </motion.div>
      )}
    </div>
  );
};