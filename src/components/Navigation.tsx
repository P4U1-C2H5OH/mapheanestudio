import React, { useEffect, useState } from 'react';
import { Menu, X, User as UserIcon, LogOut, ShoppingBag, Heart, Settings } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { CartIcon } from './CartIcon';
import { useAuth } from '../context/AuthContext';

interface NavigationProps {
  onNavigate?: (page: 'home' | 'about' | 'artwork' | 'gallery' | 'cart' | 'checkout' | 'auth') => void;
}
export function Navigation({ onNavigate }: NavigationProps) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const { user, isAuthenticated, logout } = useAuth();
  
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);
  const handleNavClick = (href: string, name: string) => {
    setIsMenuOpen(false);
    if (name === 'About' && onNavigate) {
      onNavigate('about');
      return;
    }
    if (name === 'Moments' && onNavigate) {
      onNavigate('moments');
      return;
    }
    // If we are navigating to a section, ensure we are on home page first
    if (href.startsWith('#') && onNavigate) {
      onNavigate('home');
      // Small timeout to allow page switch before scrolling
      setTimeout(() => {
        const element = document.querySelector(href);
        if (element) {
          element.scrollIntoView({
            behavior: 'smooth'
          });
        }
      }, 100);
    }
  };
  const handleLogoClick = (e: React.MouseEvent) => {
    e.preventDefault();
    if (onNavigate) {
      onNavigate('home');
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
    }
  };
  const navLinks = [
  {
    name: 'Portfolio',
    href: '#gallery'
  },
  {
    name: 'About',
    href: '#about'
  },
  {
    name: 'Moments',
    href: '#moments'
  },
  {
    name: 'Events',
    href: '#events'
  },
  {
    name: 'Contact',
    href: '#contact'
  }];

  return (
    <>
      <nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${isScrolled ? 'bg-background/90 backdrop-blur-sm py-4 shadow-sm' : 'bg-transparent py-6'}`}>

        <div className="container mx-auto px-6 md:px-12 flex items-center justify-between">
          {/* Left: Category */}
          <div className="hidden md:block w-1/3">
            <span className="text-xs tracking-[0.2em] uppercase font-medium text-muted">
              Contemporary Painting
            </span>
          </div>

          {/* Center: Logo */}
          <div className="w-1/3 text-center md:text-center flex justify-start md:justify-center">
            <a
              href="#"
              onClick={handleLogoClick}
              className="font-serif text-3xl italic text-charcoal hover:text-terracotta transition-colors duration-300">

              Aria
            </a>
          </div>

          {/* Right: Cart, User, Menu */}
          <div className="w-1/3 flex justify-end items-center gap-2 md:gap-4">
            <CartIcon onClick={() => onNavigate?.('cart')} />
            
            {/* User Menu */}
            {isAuthenticated ? (
              <div className="relative">
                <button
                  onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
                  className="flex items-center gap-2 text-charcoal hover:text-terracotta transition-colors"
                  aria-label="User Menu"
                >
                  {user?.avatar ? (
                    <img 
                      src={user.avatar} 
                      alt={user.name}
                      className="w-8 h-8 rounded-full border-2 border-charcoal/20"
                    />
                  ) : (
                    <div className="w-8 h-8 rounded-full bg-terracotta text-white flex items-center justify-center text-sm font-medium">
                      {user.name[0].toUpperCase()}
                    </div>
                  )}
                  <span className="hidden md:inline text-sm font-medium">{user.name.split(' ')[0]}</span>
                </button>

                {/* User Dropdown */}
                <AnimatePresence>
                  {isUserMenuOpen && (
                    <motion.div
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      className="absolute right-0 top-full mt-2 w-56 bg-white border border-charcoal/10 shadow-lg z-50"
                    >
                      <div className="p-4 border-b border-charcoal/10">
                        <p className="font-medium text-charcoal">{user.name}</p>
                        <p className="text-sm text-muted">{user.email}</p>
                      </div>
                      
                      <div className="py-2">
                        <button 
                          onClick={() => {
                            setIsUserMenuOpen(false);
                            onNavigate?.('cart');
                          }}
                          className="w-full px-4 py-2 text-left hover:bg-charcoal/5 transition-colors flex items-center gap-3"
                        >
                          <ShoppingBag className="w-4 h-4 text-muted" />
                          <span className="text-sm">My Orders</span>
                        </button>
                        
                        <button className="w-full px-4 py-2 text-left hover:bg-charcoal/5 transition-colors flex items-center gap-3">
                          <Heart className="w-4 h-4 text-muted" />
                          <span className="text-sm">Favorites</span>
                        </button>
                        
                        <button className="w-full px-4 py-2 text-left hover:bg-charcoal/5 transition-colors flex items-center gap-3">
                          <Settings className="w-4 h-4 text-muted" />
                          <span className="text-sm">Settings</span>
                        </button>
                      </div>

                      <div className="py-2 border-t border-charcoal/10">
                        <button 
                          onClick={() => {
                            logout();
                            setIsUserMenuOpen(false);
                          }}
                          className="w-full px-4 py-2 text-left hover:bg-red-50 transition-colors flex items-center gap-3 text-red-600"
                        >
                          <LogOut className="w-4 h-4" />
                          <span className="text-sm">Sign Out</span>
                        </button>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ) : (
              <button
                onClick={() => onNavigate?.('auth')}
                className="flex items-center gap-2 text-charcoal hover:text-terracotta transition-colors"
                aria-label="Login"
              >
                <UserIcon className="w-6 h-6 stroke-[1.5]" />
                <span className="hidden md:inline text-xs tracking-wider uppercase">Login</span>
              </button>
            )}
            
            <button
              onClick={() => setIsMenuOpen(true)}
              className="group flex items-center gap-2 md:gap-3 text-charcoal hover:text-terracotta transition-colors duration-300"
              aria-label="Open Menu">

              <span className="hidden md:inline text-xs tracking-[0.2em] uppercase font-medium group-hover:tracking-[0.25em] transition-all duration-300">
                Menu
              </span>
              <Menu className="w-6 h-6 stroke-[1.5]" />
            </button>
          </div>
        </div>
      </nav>

      {/* Full Screen Menu Overlay */}
      <AnimatePresence>
        {isMenuOpen &&
        <motion.div
          initial={{
            opacity: 0
          }}
          animate={{
            opacity: 1
          }}
          exit={{
            opacity: 0
          }}
          className="fixed inset-0 z-[60] bg-terracotta text-white flex flex-col justify-center items-center">

            <button
            onClick={() => setIsMenuOpen(false)}
            className="absolute top-6 right-6 md:top-10 md:right-12 p-2 hover:rotate-90 transition-transform duration-500"
            aria-label="Close Menu">

              <X className="w-8 h-8 stroke-[1.5]" />
            </button>

            <ul className="space-y-8 text-center">
              {navLinks.map((link, index) =>
            <motion.li
              key={link.name}
              initial={{
                opacity: 0,
                y: 20
              }}
              animate={{
                opacity: 1,
                y: 0
              }}
              transition={{
                delay: index * 0.1 + 0.2
              }}>

                  <button
                onClick={() => handleNavClick(link.href, link.name)}
                className="font-serif text-4xl md:text-6xl italic hover:text-gold transition-colors duration-300 block w-full">

                    {link.name}
                  </button>
                </motion.li>
            )}
            </ul>

            <div className="absolute bottom-12 text-center">
              <p className="text-white/60 text-sm tracking-widest uppercase mb-2">
                Contact
              </p>
              <a
              href="mailto:hello@aria-art.com"
              className="font-serif text-xl hover:underline decoration-1 underline-offset-4">

                hello@aria-art.com
              </a>
            </div>
          </motion.div>
        }
      </AnimatePresence>
    </>);

}