import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft, Minus, Plus, ShoppingBag, Check } from 'lucide-react';
import { artworks } from '../data/artworks';
import { useCart } from '../context/CartContext';

interface ArtworkPageProps {
  artworkId: number;
  onNavigate: (page: 'home' | 'about' | 'artwork' | 'cart') => void;
}
export function ArtworkPage({ artworkId, onNavigate }: ArtworkPageProps) {
  const artwork = artworks.find((a) => a.id === artworkId);
  const { addToCart } = useCart();
  const [selectedSize, setSelectedSize] = useState<
    'Original' | 'Large Print' | 'Medium Print'>(
    'Original');
  const [quantity, setQuantity] = useState(1);
  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [addedToCart, setAddedToCart] = useState(false);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [artworkId]);

  if (!artwork) return null;

  const getPrice = () => {
    if (selectedSize === 'Original') return artwork.price;
    if (selectedSize === 'Large Print') return 450;
    if (selectedSize === 'Medium Print') return 250;
    return 0;
  };

  const handleAddToCart = () => {
    // For simplicity, we'll only add the original artwork
    // In a real app, you'd handle prints differently
    if (selectedSize === 'Original' && artwork.status === 'Available') {
      for (let i = 0; i < quantity; i++) {
        addToCart(artwork);
      }
      setAddedToCart(true);
      setTimeout(() => setAddedToCart(false), 2000);
    }
  };
  return (
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
      transition={{
        duration: 0.8
      }}
      className="bg-background min-h-screen w-full pt-32 pb-20 px-6 md:px-12">

      <div className="container mx-auto max-w-7xl">
        {/* Back Button */}
        <button
          onClick={() => onNavigate('home')}
          className="group inline-flex items-center gap-2 text-sm uppercase tracking-widest text-muted hover:text-charcoal transition-colors mb-12">

          <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
          Back to Gallery
        </button>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-24">
          {/* Left Column: Images */}
          <div className="lg:col-span-7 space-y-6">
            <div className="relative w-full aspect-[4/5] bg-white overflow-hidden shadow-sm">
              <motion.img
                key={activeImageIndex}
                initial={{
                  opacity: 0
                }}
                animate={{
                  opacity: 1
                }}
                transition={{
                  duration: 0.5
                }}
                src={artwork.images[activeImageIndex]}
                alt={artwork.title}
                className="w-full h-full object-cover"
                style={{
                  objectPosition:
                  activeImageIndex === 0 ? artwork.cropPosition : 'center'
                }} />

            </div>

            {/* Thumbnails */}
            <div className="flex gap-4 overflow-x-auto pb-2">
              {artwork.images.map((img, idx) =>
              <button
                key={idx}
                onClick={() => setActiveImageIndex(idx)}
                className={`relative w-24 h-24 flex-shrink-0 overflow-hidden border-2 transition-all ${activeImageIndex === idx ? 'border-terracotta' : 'border-transparent hover:border-charcoal/20'}`}>

                  <img
                  src={img}
                  alt={`View ${idx + 1}`}
                  className="w-full h-full object-cover"
                  style={{
                    objectPosition:
                    idx === 0 ? artwork.cropPosition : 'center'
                  }} />

                </button>
              )}
            </div>
          </div>

          {/* Right Column: Details & Purchase */}
          <div className="lg:col-span-5 flex flex-col h-full">
            <div className="border-b border-charcoal/10 pb-8 mb-8">
              <h1 className="font-serif text-4xl md:text-5xl text-charcoal mb-4">
                {artwork.title}
              </h1>
              <p className="text-2xl text-terracotta font-serif italic">
                €{getPrice().toLocaleString()}
              </p>
            </div>

            <div className="space-y-8 flex-1">
              <div>
                <h3 className="text-xs uppercase tracking-widest text-muted mb-4">
                  Description
                </h3>
                <p className="text-charcoal/80 font-light leading-relaxed">
                  {artwork.description}
                </p>
              </div>

              <div className="grid grid-cols-2 gap-8">
                <div>
                  <h3 className="text-xs uppercase tracking-widest text-muted mb-2">
                    Dimensions
                  </h3>
                  <p className="font-serif text-lg text-charcoal">
                    {artwork.dimensions}
                  </p>
                </div>
                <div>
                  <h3 className="text-xs uppercase tracking-widest text-muted mb-2">
                    Technique
                  </h3>
                  <p className="font-serif text-lg text-charcoal">
                    {artwork.technique}
                  </p>
                </div>
              </div>

              {/* Purchase Section */}
              <div className="bg-white p-8 border border-charcoal/5 space-y-8 mt-8">
                {/* Size Selector */}
                <div>
                  <label className="block text-xs uppercase tracking-widest text-muted mb-4">
                    Select Format
                  </label>
                  <div className="space-y-3">
                    {['Original', 'Large Print', 'Medium Print'].map((size) =>
                    <button
                      key={size}
                      onClick={() => setSelectedSize(size as any)}
                      disabled={
                      size === 'Original' && artwork.status === 'Sold'
                      }
                      className={`w-full flex items-center justify-between p-4 border transition-all ${selectedSize === size ? 'border-terracotta bg-terracotta/5' : 'border-charcoal/10 hover:border-charcoal/30'} ${size === 'Original' && artwork.status === 'Sold' ? 'opacity-50 cursor-not-allowed' : ''}`}>

                        <span className="font-serif text-charcoal">{size}</span>
                        {size === 'Original' && artwork.status === 'Sold' ?
                      <span className="text-xs uppercase tracking-widest text-terracotta">
                            Sold Out
                          </span> :

                      <span className="text-muted">
                            {size === 'Original' ?
                        `€${artwork.price.toLocaleString()}` :
                        size === 'Large Print' ?
                        '€450' :
                        '€250'}
                          </span>
                      }
                      </button>
                    )}
                  </div>
                </div>

                {/* Quantity */}
                <div>
                  <label className="block text-xs uppercase tracking-widest text-muted mb-4">
                    Quantity
                  </label>
                  <div className="flex items-center gap-4">
                    <div className="flex items-center border border-charcoal/20">
                      <button
                        onClick={() => setQuantity(Math.max(1, quantity - 1))}
                        className="p-3 hover:bg-charcoal/5 transition-colors">

                        <Minus className="w-4 h-4 text-charcoal" />
                      </button>
                      <span className="w-12 text-center font-serif text-lg text-charcoal">
                        {quantity}
                      </span>
                      <button
                        onClick={() => setQuantity(quantity + 1)}
                        className="p-3 hover:bg-charcoal/5 transition-colors">

                        <Plus className="w-4 h-4 text-charcoal" />
                      </button>
                    </div>
                  </div>
                </div>

                {/* Add to Cart */}
                <button 
                  onClick={handleAddToCart}
                  disabled={selectedSize === 'Original' && artwork.status === 'Sold'}
                  className="w-full bg-charcoal text-white py-4 px-8 hover:bg-terracotta transition-colors duration-300 flex items-center justify-center gap-3 disabled:opacity-50 disabled:cursor-not-allowed">
                  {addedToCart ? (
                    <>
                      <Check className="w-5 h-5" />
                      <span className="uppercase tracking-widest text-sm">
                        Added to Cart!
                      </span>
                    </>
                  ) : (
                    <>
                      <ShoppingBag className="w-5 h-5" />
                      <span className="uppercase tracking-widest text-sm">
                        Add to Cart • €{(getPrice() * quantity).toLocaleString()}
                      </span>
                    </>
                  )}
                </button>

                <button 
                  onClick={() => onNavigate('cart')}
                  className="w-full border-2 border-charcoal text-charcoal py-4 px-8 hover:bg-charcoal hover:text-white transition-colors duration-300">
                  <span className="uppercase tracking-widest text-sm">
                    View Cart
                  </span>
                </button>

                <p className="text-center text-xs text-muted">
                  Free worldwide shipping on all original artworks.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </motion.div>);

}