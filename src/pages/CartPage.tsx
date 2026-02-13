import React from 'react';
import { motion } from 'framer-motion';
import { useCart } from '../context/CartContext';
import { ArrowLeft, Minus, Plus, X, ShoppingBag } from 'lucide-react';

interface CartPageProps {
  onNavigate: (page: 'home' | 'gallery' | 'checkout') => void;
}

export function CartPage({ onNavigate }: CartPageProps) {
  const { cartItems, removeFromCart, updateQuantity, getCartTotal } = useCart();

  if (cartItems.length === 0) {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="min-h-screen pt-32 pb-20 px-6 md:px-12"
      >
        <div className="max-w-4xl mx-auto text-center">
          <ShoppingBag className="w-20 h-20 mx-auto mb-8 text-muted stroke-[1]" />
          <h1 className="font-serif text-4xl md:text-5xl text-charcoal mb-4">
            Your Cart is Empty
          </h1>
          <p className="text-muted mb-12">
            Discover beautiful artworks in our gallery
          </p>
          <button
            onClick={() => onNavigate('gallery')}
            className="inline-flex items-center gap-2 px-8 py-4 bg-terracotta text-white hover:bg-terracotta/90 transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
            Continue Shopping
          </button>
        </div>
      </motion.div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="min-h-screen pt-32 pb-20 px-6 md:px-12"
    >
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-12">
          <button
            onClick={() => onNavigate('gallery')}
            className="flex items-center gap-2 text-charcoal hover:text-terracotta transition-colors group"
          >
            <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
            <span className="text-sm tracking-[0.2em] uppercase">Continue Shopping</span>
          </button>
          <h1 className="font-serif text-4xl md:text-5xl text-charcoal">Shopping Cart</h1>
          <div className="w-32"></div> {/* Spacer for centering */}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* Cart Items */}
          <div className="lg:col-span-2 space-y-6">
            {cartItems.map((item) => (
              <motion.div
                key={item.artwork.id}
                layout
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="flex gap-6 bg-white p-6 border border-charcoal/10"
              >
                {/* Image */}
                <div className="w-32 h-32 flex-shrink-0">
                  <img
                    src={item.artwork.images[0]}
                    alt={item.artwork.title}
                    className="w-full h-full object-cover"
                    style={{ objectPosition: item.artwork.cropPosition }}
                  />
                </div>

                {/* Details */}
                <div className="flex-1 flex flex-col justify-between">
                  <div>
                    <h3 className="font-serif text-2xl text-charcoal mb-2">
                      {item.artwork.title}
                    </h3>
                    <p className="text-sm text-muted mb-1">{item.artwork.medium}</p>
                    <p className="text-sm text-muted">{item.artwork.dimensions}</p>
                  </div>

                  <div className="flex items-center justify-between">
                    {/* Quantity Controls */}
                    <div className="flex items-center gap-4">
                      <button
                        onClick={() => updateQuantity(item.artwork.id, item.quantity - 1)}
                        className="w-8 h-8 flex items-center justify-center border border-charcoal/20 hover:border-terracotta hover:text-terracotta transition-colors"
                        aria-label="Decrease quantity"
                      >
                        <Minus className="w-4 h-4" />
                      </button>
                      <span className="w-8 text-center font-medium">{item.quantity}</span>
                      <button
                        onClick={() => updateQuantity(item.artwork.id, item.quantity + 1)}
                        className="w-8 h-8 flex items-center justify-center border border-charcoal/20 hover:border-terracotta hover:text-terracotta transition-colors"
                        aria-label="Increase quantity"
                      >
                        <Plus className="w-4 h-4" />
                      </button>
                    </div>

                    {/* Price */}
                    <div className="text-right">
                      <p className="font-serif text-xl text-charcoal">
                        €{(item.artwork.price * item.quantity).toLocaleString()}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Remove Button */}
                <button
                  onClick={() => removeFromCart(item.artwork.id)}
                  className="text-muted hover:text-terracotta transition-colors"
                  aria-label="Remove item"
                >
                  <X className="w-5 h-5" />
                </button>
              </motion.div>
            ))}
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <div className="bg-warmWhite border border-charcoal/10 p-8 sticky top-32">
              <h2 className="font-serif text-2xl text-charcoal mb-6">Order Summary</h2>
              
              <div className="space-y-4 mb-6 pb-6 border-b border-charcoal/10">
                <div className="flex justify-between text-sm">
                  <span className="text-muted">Subtotal</span>
                  <span className="text-charcoal">€{getCartTotal().toLocaleString()}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-muted">Shipping</span>
                  <span className="text-charcoal">Calculated at checkout</span>
                </div>
              </div>

              <div className="flex justify-between mb-8">
                <span className="font-serif text-xl text-charcoal">Total</span>
                <span className="font-serif text-2xl text-terracotta">
                  €{getCartTotal().toLocaleString()}
                </span>
              </div>

              <button
                onClick={() => onNavigate('checkout')}
                className="w-full py-4 bg-terracotta text-white hover:bg-terracotta/90 transition-colors font-medium tracking-wider uppercase text-sm"
              >
                Proceed to Checkout
              </button>

              <p className="text-xs text-muted text-center mt-6">
                Secure checkout powered by Stripe
              </p>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
