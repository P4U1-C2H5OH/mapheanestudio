import React, { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { CartProvider } from './context/CartContext';
import { AuthProvider } from './context/AuthContext';
import { Navigation } from './components/Navigation';
import { HeroSection } from './components/HeroSection';
import { AboutSection } from './components/AboutSection';
import { GallerySection } from './components/GallerySection';
import { MarqueeSection } from './components/MarqueeSection';
import { ArtistMomentsSection } from './components/ServicesSection';
import { EventsSection } from './components/EventsSection';
import { ContactSection } from './components/ContactSection';
import { Footer } from './components/Footer';
import { AboutPage } from './pages/AboutPage';
import { ArtworkPage } from './pages/ArtworkPage';
import { GalleryPage } from './pages/GalleryPage';
import { CartPage } from './pages/CartPage';
import { CheckoutPage } from './pages/CheckoutPage';
import { MomentsPage } from './pages/MomentsPage';
import { MomentDetailPage } from './pages/MomentDetailPage';
import { EventsPage } from './pages/EventsPage';
import { EventDetailPage } from './pages/EventDetailPage';
import { AuthPage } from './pages/AuthPage';
import { AdminDashboard } from './pages/AdminDashboard';
export function App() {
  const [currentPage, setCurrentPage] = useState<
    'home' | 'about' | 'artwork' | 'gallery' | 'cart' | 'checkout' | 'moments' | 'moment-detail' | 'events' | 'event-detail' | 'auth' | 'admin'>(
    'home');
  const [selectedArtworkId, setSelectedArtworkId] = useState<number | null>(
    null
  );
  const [selectedMomentId, setSelectedMomentId] = useState<number | null>(
    null
  );
  const [selectedEventId, setSelectedEventId] = useState<number | null>(
    null
  );
  
  const handleNavigate = (page: 'home' | 'about' | 'artwork' | 'gallery' | 'cart' | 'checkout' | 'moments' | 'moment-detail' | 'events' | 'event-detail' | 'auth') => {
    setCurrentPage(page);
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };
  
  const handleSelectArtwork = (id: number) => {
    setSelectedArtworkId(id);
    handleNavigate('artwork');
  };
  
  const handleSelectMoment = (id: number) => {
    setSelectedMomentId(id);
    handleNavigate('moment-detail');
  };
  
  const handleSelectEvent = (id: number) => {
    setSelectedEventId(id);
    handleNavigate('event-detail');
  };
  
  return (
    <AuthProvider>
      <CartProvider>
        <div className="min-h-screen bg-background text-charcoal overflow-x-hidden selection:bg-terracotta/20 selection:text-terracotta">
          {/* Only show navigation if not on admin page */}
          {currentPage !== 'admin' && <Navigation onNavigate={handleNavigate} />}

          <main>
            <AnimatePresence mode="wait">
              {currentPage === 'home' ?
              <motion.div
                key="home"
                initial={{
                  opacity: 0
                }}
                animate={{
                  opacity: 1
                }}
                exit={{
                  opacity: 0
                }}
                transition={{
                  duration: 0.5
                }}>

                  <HeroSection />
                  <AboutSection onNavigate={handleNavigate} />
                  <GallerySection
                  onSelectArtwork={handleSelectArtwork}
                  onViewFullGallery={() => handleNavigate('gallery')} />

                  <MarqueeSection />
                  <ArtistMomentsSection onNavigate={handleNavigate} />
                  <EventsSection 
                    onNavigate={handleNavigate}
                    onSelectEvent={handleSelectEvent} />
                  <ContactSection />
                </motion.div> :
              currentPage === 'about' ?
              <AboutPage key="about" onNavigate={handleNavigate} /> :
              currentPage === 'gallery' ?
              <GalleryPage
                key="gallery"
                onNavigate={handleNavigate}
                onSelectArtwork={handleSelectArtwork} /> :
              currentPage === 'cart' ?
              <CartPage
                key="cart"
                onNavigate={handleNavigate} /> :
              currentPage === 'checkout' ?
              <CheckoutPage
                key="checkout"
                onNavigate={handleNavigate} /> :
              currentPage === 'moments' ?
              <MomentsPage
                key="moments"
                onNavigate={handleNavigate}
                onSelectMoment={handleSelectMoment} /> :
              currentPage === 'moment-detail' ?
              <MomentDetailPage
                key="moment-detail"
                momentId={selectedMomentId!}
                onNavigate={handleNavigate}
                onSelectMoment={handleSelectMoment} /> :
              currentPage === 'events' ?
              <EventsPage
                key="events"
                onNavigate={handleNavigate}
                onSelectEvent={handleSelectEvent} /> :
              currentPage === 'event-detail' ?
              <EventDetailPage
                key="event-detail"
                eventId={selectedEventId!}
                onNavigate={handleNavigate}
                onSelectEvent={handleSelectEvent} /> :
              currentPage === 'auth' ?
              <AuthPage
                key="auth"
                onNavigate={handleNavigate} /> :
              currentPage === 'admin' ?
              <AdminDashboard
                key="admin"
                onNavigate={handleNavigate} /> :

              <ArtworkPage
                key="artwork"
                artworkId={selectedArtworkId!}
                onNavigate={handleNavigate} />

              }
            </AnimatePresence>
          </main>

          {/* Only show footer if not on admin page */}
          {currentPage !== 'admin' && <Footer />}
        </div>
      </CartProvider>
    </AuthProvider>);

}