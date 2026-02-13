import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft, ArrowRight, Eye, ShoppingCart } from 'lucide-react';
import { artworks, Artwork } from '../data/artworks';
import { useScrollReveal } from '../hooks/useScrollReveal';
import { useCart } from '../context/CartContext';

interface GalleryPageProps {
  onNavigate: (page: 'home' | 'about' | 'artwork' | 'gallery') => void;
  onSelectArtwork: (id: number) => void;
}

type MediumFilter = 'All' | 'Painting' | 'Drawing' | 'Clay Model';
type AvailabilityFilter = 'All' | 'Available' | 'Sold';

export function GalleryPage({ onNavigate, onSelectArtwork }: GalleryPageProps) {
  const [mediumFilter, setMediumFilter] = useState<MediumFilter>('All');
  const [availabilityFilter, setAvailabilityFilter] = useState<AvailabilityFilter>('All');
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 10000]);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const filteredArtworks = artworks.filter((artwork) => {
    const mediumMatch = mediumFilter === 'All' || artwork.medium === mediumFilter;
    const availabilityMatch = availabilityFilter === 'All' || artwork.status === availabilityFilter;
    const priceMatch = artwork.price >= priceRange[0] && artwork.price <= priceRange[1];
    return mediumMatch && availabilityMatch && priceMatch;
  });

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.8 }}
      className="bg-background min-h-screen w-full pt-32 pb-20 px-6 md:px-12"
    >
      <div className="container mx-auto max-w-7xl">
        {/* Header */}
        <div className="flex flex-col items-center text-center mb-16">
          <button
            onClick={() => onNavigate('home')}
            className="group inline-flex items-center gap-2 text-sm uppercase tracking-widest text-muted hover:text-charcoal transition-colors mb-12 self-start"
          >
            <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
            Back to Home
          </button>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.8 }}
          >
            <span className="text-xs md:text-sm tracking-[0.3em] uppercase text-terracotta mb-4 block">
              Complete Collection
            </span>
            <h1 className="font-serif text-5xl md:text-7xl text-charcoal mb-8">
              The Gallery
            </h1>
            <p className="text-muted font-light text-lg max-w-2xl mx-auto leading-relaxed">
              Explore the complete body of work. Each piece is a unique exploration of texture, light, and emotion.
            </p>
          </motion.div>
        </div>

        {/* Filters */}
        <div className="mb-16 pb-8 border-b border-charcoal/10">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Medium Filter */}
            <div>
              <label className="block text-xs tracking-[0.2em] uppercase text-muted mb-4">
                Medium
              </label>
              <div className="flex flex-wrap gap-2">
                {(['All', 'Painting', 'Drawing', 'Clay Model'] as MediumFilter[]).map((medium) => (
                  <button
                    key={medium}
                    onClick={() => setMediumFilter(medium)}
                    className={`px-4 py-2 text-sm transition-colors ${
                      mediumFilter === medium
                        ? 'bg-terracotta text-white'
                        : 'bg-white text-charcoal hover:bg-charcoal/5 border border-charcoal/10'
                    }`}
                  >
                    {medium}
                  </button>
                ))}
              </div>
            </div>

            {/* Availability Filter */}
            <div>
              <label className="block text-xs tracking-[0.2em] uppercase text-muted mb-4">
                Availability
              </label>
              <div className="flex flex-wrap gap-2">
                {(['All', 'Available', 'Sold'] as AvailabilityFilter[]).map((status) => (
                  <button
                    key={status}
                    onClick={() => setAvailabilityFilter(status)}
                    className={`px-4 py-2 text-sm transition-colors ${
                      availabilityFilter === status
                        ? 'bg-terracotta text-white'
                        : 'bg-white text-charcoal hover:bg-charcoal/5 border border-charcoal/10'
                    }`}
                  >
                    {status}
                  </button>
                ))}
              </div>
            </div>

            {/* Results Count */}
            <div className="flex items-end">
              <p className="text-sm text-muted">
                Showing <span className="text-charcoal font-medium">{filteredArtworks.length}</span> of{' '}
                <span className="text-charcoal font-medium">{artworks.length}</span> artworks
              </p>
            </div>
          </div>
        </div>

        {/* Artworks List */}
        <div className="space-y-32">
          {filteredArtworks.map((artwork, index) => (
            <GalleryItem
              key={artwork.id}
              artwork={artwork}
              index={index}
              onSelect={() => onSelectArtwork(artwork.id)}
            />
          ))}
        </div>

        {filteredArtworks.length === 0 && (
          <div className="text-center py-20">
            <p className="text-muted text-lg">No artworks match your current filters.</p>
          </div>
        )}

        {/* Footer Navigation */}
        <div className="mt-32 text-center border-t border-charcoal/10 pt-16">
          <h3 className="font-serif text-3xl text-charcoal mb-6">
            Interested in a commission?
          </h3>
          <button
            onClick={() => {
              onNavigate('home');
              setTimeout(() => {
                document.getElementById('contact')?.scrollIntoView({
                  behavior: 'smooth',
                });
              }, 100);
            }}
            className="inline-flex items-center gap-2 text-charcoal border-b border-charcoal pb-1 hover:text-terracotta hover:border-terracotta transition-colors duration-300 group"
          >
            <span className="text-sm tracking-widest uppercase">Get in Touch</span>
            <ArrowRight className="w-4 h-4 transform group-hover:translate-x-1 transition-transform" />
          </button>
        </div>
      </div>
    </motion.div>
  );
}

function GalleryItem({
  artwork,
  index,
  onSelect,
}: {
  artwork: Artwork;
  index: number;
  onSelect: () => void;
}) {
  const { ref, isVisible } = useScrollReveal(0.1);
  const { addToCart } = useCart();
  const isEven = index % 2 === 0;

  const handleAddToCart = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (artwork.status === 'Available') {
      addToCart(artwork);
    }
  };

  return (
    <div
      ref={ref}
      className={`grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-24 items-center transition-all duration-1000 ease-out transform ${
        isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-20'
      }`}
    >
      {/* Image Side */}
      <div className={`lg:col-span-7 ${isEven ? 'lg:order-1' : 'lg:order-2'}`}>
        <div
          onClick={onSelect}
          className="group relative w-full aspect-[4/3] overflow-hidden cursor-pointer shadow-sm"
        >
          <div className="absolute inset-0 bg-charcoal/0 group-hover:bg-charcoal/10 transition-colors duration-500 z-10"></div>

          {/* Hover Overlay */}
          <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-20">
            <div className="bg-white/90 backdrop-blur-sm rounded-full p-6 transform scale-90 group-hover:scale-100 transition-transform duration-500">
              <Eye className="w-8 h-8 text-charcoal" />
            </div>
          </div>

          <img
            src={artwork.images[0]}
            alt={artwork.title}
            className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105"
            style={{ objectPosition: artwork.cropPosition }}
          />
        </div>
      </div>

      {/* Text Side */}
      <div className={`lg:col-span-5 ${isEven ? 'lg:order-2' : 'lg:order-1'}`}>
        <div className="space-y-6">
          <div>
            <div className="flex items-center gap-3 mb-2">
              <span className="text-xs tracking-[0.2em] uppercase text-terracotta">
                {artwork.medium}
              </span>
              {artwork.year && (
                <>
                  <span className="w-1 h-1 rounded-full bg-muted"></span>
                  <span className="text-xs text-muted">{artwork.year}</span>
                </>
              )}
            </div>
            <h2
              onClick={onSelect}
              className="font-serif text-4xl md:text-5xl text-charcoal mb-3 cursor-pointer hover:text-terracotta transition-colors"
            >
              {artwork.title}
            </h2>
            <div className="flex flex-wrap gap-4 text-xs uppercase tracking-widest text-muted">
              <span>{artwork.dimensions}</span>
              <span className="w-px h-4 bg-charcoal/20"></span>
              <span>{artwork.technique}</span>
            </div>
          </div>

          <p className="text-charcoal/80 font-light leading-relaxed text-lg">
            {artwork.description}
          </p>

          <div className="pt-4 space-y-4 border-t border-charcoal/10">
            <div className="flex items-center justify-between">
              <span
                className={`font-serif text-2xl ${
                  artwork.status === 'Available' ? 'text-terracotta' : 'text-muted line-through'
                }`}
              >
                {artwork.status === 'Available' ? `M${artwork.price.toLocaleString()}` : 'Sold'}
              </span>

              <button
                onClick={onSelect}
                className="group inline-flex items-center gap-2 text-charcoal hover:text-terracotta transition-colors"
              >
                <span className="text-sm tracking-widest uppercase border-b border-transparent group-hover:border-terracotta transition-all">
                  View Details
                </span>
                <ArrowRight className="w-4 h-4 transform group-hover:translate-x-1 transition-transform" />
              </button>
            </div>

            {artwork.status === 'Available' && (
              <button
                onClick={handleAddToCart}
                className="w-full py-3 bg-terracotta text-white hover:bg-terracotta/90 transition-colors flex items-center justify-center gap-2 font-medium text-sm tracking-wider uppercase"
              >
                <ShoppingCart className="w-5 h-5" />
                Add to Cart
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
