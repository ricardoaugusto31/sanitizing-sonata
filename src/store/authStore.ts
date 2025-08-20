import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface User {
  id: string;
  email: string;
  name: string;
}

interface AuthState {
  isAuthenticated: boolean;
  user: User | null;
  login: (email: string, password: string) => Promise<boolean>;
  logout: () => void;
  register: (email: string, password: string, name: string) => Promise<boolean>;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      isAuthenticated: false,
      user: null,
      login: async (email: string, password: string) => {
        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 1000));
        
        // Mock successful login
        const mockUser: User = {
          id: '1',
          email,
          name: email.split('@')[0]
        };
        
        set({ isAuthenticated: true, user: mockUser });
        return true;
      },
      logout: () => {
        set({ isAuthenticated: false, user: null });
      },
      register: async (email: string, password: string, name: string) => {
        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 1000));
        
        // Mock successful registration
        const mockUser: User = {
          id: '1',
          email,
          name
        };
        
        set({ isAuthenticated: true, user: mockUser });
        return true;
      }
    }),
    {
      name: 'auth-storage'
    }
  )
);