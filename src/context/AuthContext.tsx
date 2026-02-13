import React, { createContext, useContext, useState, useEffect } from 'react';

export interface User {
  id: string;
  name: string;
  email: string;
  avatar?: string;
  provider: 'google' | 'facebook' | 'instagram' | 'email';
  role?: 'admin' | 'artist' | 'user';
  favoriteArtworks?: number[];
  favoriteMoments?: number[];
}

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<void>;
  loginWithGoogle: () => Promise<void>;
  loginWithFacebook: () => Promise<void>;
  loginWithInstagram: () => Promise<void>;
  signup: (name: string, email: string, password: string) => Promise<void>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(() => {
    const saved = localStorage.getItem('aria-user');
    return saved ? JSON.parse(saved) : null;
  });

  useEffect(() => {
    if (user) {
      localStorage.setItem('aria-user', JSON.stringify(user));
    } else {
      localStorage.removeItem('aria-user');
    }
  }, [user]);

  const login = async (email: string, password: string) => {
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // Check if admin/artist login
    const isArtist = email.toLowerCase().includes('artist') || email.toLowerCase().includes('aria');
    const isAdmin = email.toLowerCase().includes('admin');
    
    // Mock login - in production, this would validate against backend
    const mockUser: User = {
      id: '1',
      name: isArtist ? 'Aria (Artist)' : isAdmin ? 'Admin User' : email.split('@')[0],
      email,
      provider: 'email',
      role: isArtist ? 'artist' : isAdmin ? 'admin' : 'user',
      favoriteArtworks: [],
      favoriteMoments: []
    };
    
    setUser(mockUser);
  };

  const loginWithGoogle = async () => {
    // Simulate OAuth flow
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    const mockUser: User = {
      id: '2',
      name: 'Google User',
      email: 'user@gmail.com',
      avatar: 'https://ui-avatars.com/api/?name=Google+User&background=A0522D&color=fff',
      provider: 'google'
    };
    
    setUser(mockUser);
  };

  const loginWithFacebook = async () => {
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    const mockUser: User = {
      id: '3',
      name: 'Facebook User',
      email: 'user@facebook.com',
      avatar: 'https://ui-avatars.com/api/?name=Facebook+User&background=1877F2&color=fff',
      provider: 'facebook'
    };
    
    setUser(mockUser);
  };

  const loginWithInstagram = async () => {
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    const mockUser: User = {
      id: '4',
      name: 'Instagram User',
      email: 'user@instagram.com',
      avatar: 'https://ui-avatars.com/api/?name=Instagram+User&background=E4405F&color=fff',
      provider: 'instagram'
    };
    
    setUser(mockUser);
  };

  const signup = async (name: string, email: string, password: string) => {
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    const mockUser: User = {
      id: '5',
      name,
      email,
      provider: 'email'
    };
    
    setUser(mockUser);
  };

  const logout = () => {
    setUser(null);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated: !!user,
        login,
        loginWithGoogle,
        loginWithFacebook,
        loginWithInstagram,
        signup,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within AuthProvider');
  }
  return context;
}
