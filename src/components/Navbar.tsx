import { motion } from 'framer-motion';
import { Link, useLocation } from 'react-router-dom';
import { useAuthStore } from '@/store/authStore';
import { Button } from '@/components/ui/button';
import { FiUser, FiLogOut } from 'react-icons/fi';

export const Navbar = () => {
  const location = useLocation();
  const { isAuthenticated, user, logout } = useAuthStore();

  const isActive = (path: string) => location.pathname === path;

  return (
    <motion.nav
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-md border-b border-border"
    >
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        {/* Logo */}
        <Link to="/" className="text-2xl font-bold text-primary">
          Sanitizing Sonata
        </Link>

        {/* Navigation Links */}
        <div className="hidden md:flex items-center space-x-8">
          <Link
            to="/"
            className={`transition-colors ${
              isActive('/') ? 'text-primary' : 'text-foreground hover:text-primary'
            }`}
          >
            Home
          </Link>
          {isAuthenticated && (
            <Link
              to="/my-tickets"
              className={`transition-colors ${
                isActive('/my-tickets') ? 'text-primary' : 'text-foreground hover:text-primary'
              }`}
            >
              My Tickets
            </Link>
          )}
        </div>

        {/* Auth Section */}
        <div className="flex items-center space-x-4">
          {isAuthenticated ? (
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2">
                <FiUser className="text-primary" />
                <span className="text-foreground">{user?.name}</span>
              </div>
              <Button
                variant="outline"
                size="sm"
                onClick={logout}
                className="flex items-center space-x-2"
              >
                <FiLogOut size={16} />
                <span>Logout</span>
              </Button>
            </div>
          ) : (
            <div className="flex items-center space-x-3">
              <Link to="/login">
                <Button variant="outline" size="sm">
                  Login
                </Button>
              </Link>
              <Link to="/signup">
                <Button size="sm">
                  Sign Up
                </Button>
              </Link>
            </div>
          )}
        </div>
      </div>
    </motion.nav>
  );
};