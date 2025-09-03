import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

export default function About() {
  return (
    <motion.section
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: 'easeOut' }}
      className="min-h-[80vh] flex flex-col items-center justify-center px-4 py-12"
    >
      <div className="bg-card/80 rounded-xl shadow-xl p-8 max-w-2xl w-full flex flex-col items-center border border-border">
        {/* Wrap Logo and Title with a Link to the homepage */}
        <Link to="/" className="flex flex-col items-center no-underline text-current transition-transform hover:scale-105">
          <img
            src="/logo.png"
            alt="Sanitizing Sonata Logo"
            className="h-24 w-24 mb-4 rounded-full shadow-lg border-4 border-primary"
          />
          <h1 className="text-4xl font-extrabold text-primary mb-2 tracking-tight text-center">
            Sanitizing Sonata
          </h1>
        </Link>
        
        <p className="text-lg text-foreground/80 mb-6 text-center">
          Welcome to <span className="font-semibold text-primary">Sanitizing Sonata</span>, your premier destination for booking tickets to the most exciting concerts and events. We provide a seamless and modern platform to ensure you never miss out on your favorite artists and shows.
        </p>
        
        <div className="w-full flex flex-col items-center gap-2">
          <span className="text-base text-secondary-foreground">Created by:</span>
          <a
            href="https://github.com/ricardoaugusto31"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 px-4 py-2 rounded-lg bg-primary text-primary-foreground font-semibold shadow hover:scale-105 transition-transform"
          >
            <svg width="22" height="22" fill="currentColor" className="inline-block" viewBox="0 0 24 24">
              <path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.387.6.113.82-.258.82-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.084-.729.084-.729 1.205.084 1.84 1.236 1.84 1.236 1.07 1.834 2.809 1.304 3.495.997.108-.775.418-1.305.762-1.605-2.665-.305-5.466-1.334-5.466-5.931 0-1.31.469-2.381 1.236-3.221-.124-.303-.535-1.523.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.873.119 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.804 5.624-5.475 5.921.43.371.823 1.102.823 2.222v3.293c0 .322.218.694.825.576C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12"/>
            </svg>
            Saikyo Sonata
          </a>
        </div>
      </div>
    </motion.section>
  );
}