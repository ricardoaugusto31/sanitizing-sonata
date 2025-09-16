export interface Concert {
  id: number;
  name: string;
  artist: string;
  date: string;
  location: string;
  posterImageUrl: string;
  isFeatured: boolean;
  description?: string;
  venue?: string;
}

export interface TicketTier {
  id: string;
  name: string;
  price: number;
  benefits: string[];
}

export interface PurchasedTicket {
  ticketId: string;
  concertName: string;
  artist: string;
  date: string;
  seat: string;
  qrCodeUrl: string;
  tier: string;
  price: number;
}

export const concerts: Concert[] = [
  {
    id: 1,
    name: "Midnight Bloom Tour",
    artist: "AURORA",
    date: "2025-03-15",
    location: "Jakarta Convention Hall",
    posterImageUrl: "https://lh3.googleusercontent.com/jL_2EtZtQB4YNVWkryGymoQOSQmx7VCFkaUu9yc3tyvueYJBUGXqt_CWPCprpnz6I-OL-SXK3--8l3s=w2880-h1200-p-l90-rj",
    isFeatured: true,
    description: "Experience AURORA's ethereal voice and mystical performance in this unforgettable concert. Join us for an evening of dreamy melodies and powerful vocals.",
    venue: "Jakarta Convention Hall - Main Auditorium"
  },
  {
    id: 2,
    name: "Electric Dreams World Tour",
    artist: "The Midnight",
    date: "2025-03-22",
    location: "Bandung Music Hall",
    posterImageUrl: "https://images.unsplash.com/photo-1501594907352-04cda38ebc29?w=800&h=600&fit=crop",
    isFeatured: true,
    description: "Synthwave legends The Midnight bring their neon-soaked soundscapes to life. Prepare for a journey through the nostalgic sounds of the 80s.",
    venue: "Bandung Music Hall - Grand Theater"
  },
  {
    id: 3,
    name: "Quantum Harmony",
    artist: "Porcupine Tree",
    date: "2025-04-05",
    location: "Surabaya Arena",
    posterImageUrl: "https://images.unsplash.com/photo-1514525253161-7a46d19cd819?w=800&h=600&fit=crop",
    isFeatured: false,
    description: "Progressive rock masters Porcupine Tree return with their mind-bending compositions and intricate musicianship.",
    venue: "Surabaya Arena - Center Stage"
  },
  {
    id: 4,
    name: "Neon Genesis",
    artist: "Carpenter Brut",
    date: "2025-04-12",
    location: "Yogyakarta Concert Hall",
    posterImageUrl: "https://images.unsplash.com/photo-1506157786151-b8491531f063?w=800&h=600&fit=crop",
    isFeatured: false,
    description: "Dark synthwave meets horror aesthetics in this electrifying performance by Carpenter Brut.",
    venue: "Yogyakarta Concert Hall"
  },
  {
    id: 5,
    name: "Stellar Voyage",
    artist: "Hans Zimmer",
    date: "2025-04-20",
    location: "Bali Cultural Center",
    posterImageUrl: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=800&h=600&fit=crop",
    isFeatured: true,
    description: "Epic orchestral compositions that defined modern cinema, performed live by Hans Zimmer and his ensemble.",
    venue: "Bali Cultural Center - Symphony Hall"
  }
];

export const ticketTiers: Record<number, TicketTier[]> = {
  1: [
    {
      id: "regular",
      name: "Regular",
      price: 750000,
      benefits: ["Standard seating", "Concert access", "Merchandise voucher"]
    },
    {
      id: "vip",
      name: "VIP",
      price: 1500000,
      benefits: ["Premium seating", "Meet & greet", "Exclusive merchandise", "Complimentary drinks"]
    },
    {
      id: "vvip",
      name: "VVIP",
      price: 2500000,
      benefits: ["Front row seats", "Private meet & greet", "Signed merchandise", "Premium dining", "Photo opportunity"]
    }
  ],
  2: [
    {
      id: "regular",
      name: "Regular",
      price: 850000,
      benefits: ["Standard seating", "Concert access", "Digital album"]
    },
    {
      id: "vip",
      name: "VIP",
      price: 1750000,
      benefits: ["Premium seating", "Artist meet & greet", "Vinyl record", "VIP lounge access"]
    },
    {
      id: "vvip",
      name: "VVIP",
      price: 2750000,
      benefits: ["Front row seats", "Private soundcheck", "Signed vinyl", "Exclusive party access", "Professional photos"]
    }
  ],
  // Add similar tiers for other concerts
  3: [
    {
      id: "regular",
      name: "Regular",
      price: 950000,
      benefits: ["Standard seating", "Concert access"]
    },
    {
      id: "vip",
      name: "VIP",
      price: 1850000,
      benefits: ["Premium seating", "Backstage tour", "Band merchandise"]
    }
  ]
};

export const purchasedTickets: PurchasedTicket[] = [
  {
    ticketId: "SNST-123XYZ",
    concertName: "Midnight Bloom Tour",
    artist: "AURORA",
    date: "2025-03-15",
    seat: "VVIP-A7",
    qrCodeUrl: "https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=SNST-123XYZ",
    tier: "VVIP",
    price: 2500000
  },
  {
    ticketId: "SNST-456ABC",
    concertName: "Electric Dreams World Tour",
    artist: "The Midnight",
    date: "2025-03-22",
    seat: "VIP-B12",
    qrCodeUrl: "https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=SNST-456ABC",
    tier: "VIP",
    price: 1750000
  }
];