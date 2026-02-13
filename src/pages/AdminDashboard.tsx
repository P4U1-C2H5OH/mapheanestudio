import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Home, Image, Calendar, Sparkles, ShoppingBag, Users,
  Settings, LogOut, Menu, X, BarChart3, ChevronLeft, ChevronRight
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { GalleryManager } from '../components/admin/GalleryManager';
import { MomentsManager } from '../components/admin/MomentsManager';
import { EventsManager } from '../components/admin/EventsManager';
import { OrdersManager } from '../components/admin/OrdersManager';
import { DashboardOverview } from '../components/admin/DashboardOverview';

interface AdminDashboardProps {
  onNavigate: (page: 'home') => void;
}

type AdminView = 'overview' | 'gallery' | 'moments' | 'events' | 'orders' | 'settings';

export function AdminDashboard({ onNavigate }: AdminDashboardProps) {
  const [currentView, setCurrentView] = useState<AdminView>('overview');
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const { user, logout } = useAuth();

  // Check if mobile
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 1024);
      if (window.innerWidth < 1024) {
        setSidebarOpen(false);
      }
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const handleLogout = () => {
    logout();
    onNavigate('home');
  };

  const handleMenuItemClick = (view: AdminView) => {
    setCurrentView(view);
    if (isMobile) {
      setMobileMenuOpen(false);
    }
  };

  const menuItems = [
    { id: 'overview', label: 'Dashboard', icon: BarChart3, color: 'from-terracotta to-clay' },
    { id: 'gallery', label: 'Gallery', icon: Image, color: 'from-clay to-gold' },
    { id: 'moments', label: 'Moments', icon: Sparkles, color: 'from-sage to-terracotta' },
    { id: 'events', label: 'Events', icon: Calendar, color: 'from-gold to-sage' },
    { id: 'orders', label: 'Orders', icon: ShoppingBag, color: 'from-terracotta to-sage' }
  ];

  return (
    <div className="min-h-screen bg-warmWhite flex overflow-hidden">
      {/* Mobile Header */}
      {isMobile && (
        <div className="fixed top-0 left-0 right-0 h-16 bg-white border-b border-charcoal/10 z-40 flex items-center justify-between px-4">
          <button
            onClick={() => setMobileMenuOpen(true)}
            className="p-2 hover:bg-charcoal/5 rounded-lg transition-colors"
          >
            <Menu className="w-6 h-6 text-charcoal" />
          </button>
          
          <h1 className="font-serif text-2xl text-charcoal italic">Aria</h1>
          
          <div className="w-10 h-10 rounded-full bg-gradient-to-br from-terracotta to-gold flex items-center justify-center text-sm font-semibold text-white">
            {user?.name[0].toUpperCase()}
          </div>
        </div>
      )}

      {/* Mobile Overlay */}
      <AnimatePresence>
        {isMobile && mobileMenuOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              onClick={() => setMobileMenuOpen(false)}
              className="fixed inset-0 bg-charcoal/60 backdrop-blur-sm z-40"
            />
            
            {/* Slide-in Menu */}
            <motion.aside
              initial={{ x: -280 }}
              animate={{ x: 0 }}
              exit={{ x: -280 }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className="fixed left-0 top-0 bottom-0 w-[280px] bg-gradient-to-b from-charcoal via-charcoal to-charcoal/95 text-white z-50 shadow-2xl flex flex-col"
            >
              {/* Close Button */}
              <div className="h-16 flex items-center justify-between px-6 border-b border-white/10">
                <div>
                  <h1 className="font-serif text-2xl text-white italic">Aria</h1>
                  <p className="text-xs text-white/50 uppercase tracking-[0.2em] mt-0.5">
                    Studio
                  </p>
                </div>
                <button
                  onClick={() => setMobileMenuOpen(false)}
                  className="text-white/60 hover:text-white transition-colors p-2"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>

              {/* User Profile */}
              <div className="px-6 py-6 border-b border-white/10">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-full bg-gradient-to-br from-terracotta to-gold flex items-center justify-center text-base font-semibold ring-2 ring-white/20">
                    {user?.name[0].toUpperCase()}
                  </div>
                  <div className="overflow-hidden flex-1">
                    <p className="text-sm font-medium truncate text-white">{user?.name}</p>
                    <p className="text-xs text-white/50 truncate capitalize">{user?.role || 'Artist'}</p>
                  </div>
                </div>
              </div>

              {/* Navigation Menu */}
              <nav className="flex-1 py-6 overflow-y-auto">
                <div className="space-y-1 px-3">
                  {menuItems.map((item) => {
                    const Icon = item.icon;
                    const isActive = currentView === item.id;
                    
                    return (
                      <button
                        key={item.id}
                        onClick={() => handleMenuItemClick(item.id as AdminView)}
                        className={`w-full px-4 py-3.5 flex items-center gap-4 rounded-xl transition-all duration-200 ${
                          isActive 
                            ? 'bg-gradient-to-r ' + item.color + ' shadow-lg text-white' 
                            : 'text-white/60 hover:text-white hover:bg-white/5'
                        }`}
                      >
                        <Icon className="w-5 h-5 flex-shrink-0" />
                        <span className="text-sm font-medium tracking-wide">{item.label}</span>
                      </button>
                    );
                  })}
                </div>
              </nav>

              {/* Bottom Actions */}
              <div className="px-3 py-6 border-t border-white/10 space-y-1">
                <button
                  onClick={() => {
                    onNavigate('home');
                    setMobileMenuOpen(false);
                  }}
                  className="w-full px-4 py-3 flex items-center gap-4 rounded-xl text-white/60 hover:text-white hover:bg-white/5 transition-all duration-200"
                >
                  <Home className="w-5 h-5 flex-shrink-0" />
                  <span className="text-sm font-medium tracking-wide">View Site</span>
                </button>
                
                <button
                  onClick={() => {
                    handleLogout();
                    setMobileMenuOpen(false);
                  }}
                  className="w-full px-4 py-3 flex items-center gap-4 rounded-xl text-red-400 hover:text-red-300 hover:bg-red-500/10 transition-all duration-200"
                >
                  <LogOut className="w-5 h-5 flex-shrink-0" />
                  <span className="text-sm font-medium tracking-wide">Sign Out</span>
                </button>
              </div>
            </motion.aside>
          </>
        )}
      </AnimatePresence>

      {/* Desktop Sidebar */}
      {!isMobile && (
        <motion.aside
          initial={false}
          animate={{ width: sidebarOpen ? 280 : 88 }}
          transition={{ duration: 0.3, ease: 'easeInOut' }}
          className="bg-gradient-to-b from-charcoal via-charcoal to-charcoal/95 text-white flex flex-col fixed left-0 top-0 bottom-0 z-50 shadow-2xl"
        >
          {/* Brand Header */}
          <div className="h-24 flex items-center justify-between px-6 border-b border-white/10">
            <AnimatePresence mode="wait">
              {sidebarOpen ? (
                <motion.div
                  key="expanded"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.2 }}
                >
                  <h1 className="font-serif text-3xl text-white italic">Aria</h1>
                  <p className="text-xs text-white/50 uppercase tracking-[0.2em] mt-1">
                    Studio
                  </p>
                </motion.div>
              ) : (
                <motion.div
                  key="collapsed"
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.8 }}
                  transition={{ duration: 0.2 }}
                  className="w-10 h-10 rounded-full bg-gradient-to-br from-terracotta to-gold flex items-center justify-center"
                >
                  <span className="font-serif text-xl text-white">A</span>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* User Profile */}
          <div className="px-6 py-6 border-b border-white/10">
            <div className={`flex items-center ${sidebarOpen ? 'gap-4' : 'justify-center'}`}>
              {user?.avatar ? (
                <img 
                  src={user.avatar} 
                  alt={user.name}
                  className={`${sidebarOpen ? 'w-12 h-12' : 'w-10 h-10'} rounded-full ring-2 ring-white/20 flex-shrink-0`}
                />
              ) : (
                <div className={`${sidebarOpen ? 'w-12 h-12' : 'w-10 h-10'} rounded-full bg-gradient-to-br from-terracotta to-gold flex items-center justify-center text-base font-semibold flex-shrink-0 ring-2 ring-white/20`}>
                  {user?.name[0].toUpperCase()}
                </div>
              )}
              <AnimatePresence>
                {sidebarOpen && (
                  <motion.div
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -10 }}
                    transition={{ duration: 0.2 }}
                    className="overflow-hidden flex-1"
                  >
                    <p className="text-sm font-medium truncate text-white">{user?.name}</p>
                    <p className="text-xs text-white/50 truncate capitalize">{user?.role || 'Artist'}</p>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>

          {/* Navigation Menu */}
          <nav className="flex-1 py-6 overflow-y-auto">
            <div className="space-y-1 px-3">
              {menuItems.map((item) => {
                const Icon = item.icon;
                const isActive = currentView === item.id;
                
                return (
                  <button
                    key={item.id}
                    onClick={() => setCurrentView(item.id as AdminView)}
                    className={`w-full group relative ${
                      sidebarOpen ? 'px-4 py-3.5' : 'px-0 py-3.5'
                    } flex items-center ${
                      sidebarOpen ? 'gap-4' : 'justify-center'
                    } rounded-xl transition-all duration-200 ${
                      isActive 
                        ? 'bg-gradient-to-r ' + item.color + ' shadow-lg text-white' 
                        : 'text-white/60 hover:text-white hover:bg-white/5'
                    }`}
                  >
                    <Icon className={`${sidebarOpen ? 'w-5 h-5' : 'w-6 h-6'} flex-shrink-0 ${
                      isActive ? 'drop-shadow-lg' : ''
                    }`} />
                    <AnimatePresence>
                      {sidebarOpen && (
                        <motion.span
                          initial={{ opacity: 0, x: -10 }}
                          animate={{ opacity: 1, x: 0 }}
                          exit={{ opacity: 0, x: -10 }}
                          transition={{ duration: 0.2 }}
                          className="text-sm font-medium tracking-wide"
                        >
                          {item.label}
                        </motion.span>
                      )}
                    </AnimatePresence>
                    
                    {/* Active indicator */}
                    {isActive && !sidebarOpen && (
                      <div className="absolute right-0 top-1/2 -translate-y-1/2 w-1 h-8 bg-white rounded-l-full" />
                    )}
                  </button>
                );
              })}
            </div>
          </nav>

          {/* Bottom Actions */}
          <div className="px-3 py-6 border-t border-white/10 space-y-1">
            <button
              onClick={() => onNavigate('home')}
              className={`w-full group ${
                sidebarOpen ? 'px-4 py-3' : 'px-0 py-3'
              } flex items-center ${
                sidebarOpen ? 'gap-4' : 'justify-center'
              } rounded-xl text-white/60 hover:text-white hover:bg-white/5 transition-all duration-200`}
            >
              <Home className={`${sidebarOpen ? 'w-5 h-5' : 'w-6 h-6'} flex-shrink-0`} />
              <AnimatePresence>
                {sidebarOpen && (
                  <motion.span
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -10 }}
                    transition={{ duration: 0.2 }}
                    className="text-sm font-medium tracking-wide"
                  >
                    View Site
                  </motion.span>
                )}
              </AnimatePresence>
            </button>
            
            <button
              onClick={handleLogout}
              className={`w-full group ${
                sidebarOpen ? 'px-4 py-3' : 'px-0 py-3'
              } flex items-center ${
                sidebarOpen ? 'gap-4' : 'justify-center'
              } rounded-xl text-red-400 hover:text-red-300 hover:bg-red-500/10 transition-all duration-200`}
            >
              <LogOut className={`${sidebarOpen ? 'w-5 h-5' : 'w-6 h-6'} flex-shrink-0`} />
              <AnimatePresence>
                {sidebarOpen && (
                  <motion.span
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -10 }}
                    transition={{ duration: 0.2 }}
                    className="text-sm font-medium tracking-wide"
                  >
                    Sign Out
                  </motion.span>
                )}
              </AnimatePresence>
            </button>
          </div>

          {/* Toggle Button */}
          <button
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="absolute -right-3 top-24 w-6 h-6 bg-gradient-to-br from-terracotta to-gold rounded-full shadow-lg flex items-center justify-center text-white hover:scale-110 transition-transform duration-200"
          >
            {sidebarOpen ? (
              <ChevronLeft className="w-4 h-4" />
            ) : (
              <ChevronRight className="w-4 h-4" />
            )}
          </button>
        </motion.aside>
      )}

      {/* Main Content Area */}
      <motion.main
        initial={false}
        animate={{ 
          marginLeft: isMobile ? 0 : (sidebarOpen ? 280 : 88),
          marginTop: isMobile ? 64 : 0
        }}
        transition={{ duration: 0.3, ease: 'easeInOut' }}
        className="flex-1 min-h-screen"
      >
        <div className="max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8 py-6 lg:py-10">
          {/* Page Header */}
          <motion.div
            key={currentView}
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="mb-6 lg:mb-10"
          >
            <h1 className="font-serif text-3xl sm:text-4xl lg:text-5xl text-charcoal mb-2 lg:mb-3">
              {menuItems.find(item => item.id === currentView)?.label}
            </h1>
            <p className="text-muted text-sm sm:text-base lg:text-lg">
              {currentView === 'overview' && 'Welcome to your creative command center'}
              {currentView === 'gallery' && 'Curate and manage your artwork collection'}
              {currentView === 'moments' && 'Share your artistic journey with the world'}
              {currentView === 'events' && 'Organize exhibitions, workshops, and talks'}
              {currentView === 'orders' && 'Track and fulfill customer purchases'}
              {currentView === 'settings' && 'Customize your studio preferences'}
            </p>
          </motion.div>

          {/* Content Area */}
          <AnimatePresence mode="wait">
            <motion.div
              key={currentView}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
            >
              {currentView === 'overview' && <DashboardOverview />}
              {currentView === 'gallery' && <GalleryManager />}
              {currentView === 'moments' && <MomentsManager />}
              {currentView === 'events' && <EventsManager />}
              {currentView === 'orders' && <OrdersManager />}
              {currentView === 'settings' && (
                <div className="bg-white border border-charcoal/10 p-12 text-center">
                  <Settings className="w-16 h-16 text-muted mx-auto mb-4" />
                  <p className="text-muted text-lg">Settings panel coming soon...</p>
                </div>
              )}
            </motion.div>
          </AnimatePresence>
        </div>
      </motion.main>
    </div>
  );
}
