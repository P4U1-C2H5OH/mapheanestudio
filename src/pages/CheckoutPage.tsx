import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useCart } from '../context/CartContext';
import { ArrowLeft, Check, CreditCard, Building2 } from 'lucide-react';

interface CheckoutPageProps {
  onNavigate: (page: 'cart' | 'home') => void;
}

type CheckoutStep = 'shipping' | 'payment' | 'confirmation';
type PaymentMethod = 'stripe' | 'paypal' | 'bank';

export function CheckoutPage({ onNavigate }: CheckoutPageProps) {
  const { cartItems, getCartTotal, clearCart } = useCart();
  const [currentStep, setCurrentStep] = useState<CheckoutStep>('shipping');
  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>('stripe');
  const [orderNumber] = useState(() => Math.random().toString(36).substring(2, 10).toUpperCase());

  const [shippingData, setShippingData] = useState({
    fullName: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    postalCode: '',
    country: '',
  });

  const handleShippingSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setCurrentStep('payment');
  };

  const handlePaymentSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // In a real app, this would process payment
    setCurrentStep('confirmation');
  };

  const handleCompleteOrder = () => {
    clearCart();
    setTimeout(() => {
      onNavigate('home');
    }, 2000);
  };

  const shippingCost = 50;
  const total = getCartTotal() + shippingCost;

  if (currentStep === 'confirmation') {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="min-h-screen pt-32 pb-20 px-6 md:px-12 flex items-center justify-center"
      >
        <div className="max-w-2xl w-full text-center">
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2, type: 'spring' }}
            className="w-20 h-20 bg-sage rounded-full flex items-center justify-center mx-auto mb-8"
          >
            <Check className="w-10 h-10 text-white" />
          </motion.div>

          <h1 className="font-serif text-4xl md:text-5xl text-charcoal mb-4">
            Order Confirmed!
          </h1>
          <p className="text-muted mb-2">Order Number: #{orderNumber}</p>
          <p className="text-charcoal/80 mb-12 max-w-md mx-auto">
            Thank you for your purchase. A confirmation email has been sent to{' '}
            <span className="text-terracotta">{shippingData.email}</span>
          </p>

          <div className="bg-warmWhite border border-charcoal/10 p-8 mb-8">
            <h2 className="font-serif text-2xl text-charcoal mb-6">Order Summary</h2>
            <div className="space-y-3 text-left">
              {cartItems.map((item) => (
                <div key={item.artwork.id} className="flex justify-between text-sm">
                  <span className="text-charcoal">
                    {item.artwork.title} × {item.quantity}
                  </span>
                  <span className="text-charcoal">
                    M{(item.artwork.price * item.quantity).toLocaleString()}
                  </span>
                </div>
              ))}
              <div className="flex justify-between text-sm pt-3 border-t border-charcoal/10">
                <span className="text-muted">Shipping</span>
                <span className="text-charcoal">M{shippingCost}</span>
              </div>
              <div className="flex justify-between font-serif text-xl pt-3 border-t border-charcoal/10">
                <span className="text-charcoal">Total</span>
                <span className="text-terracotta">M{total.toLocaleString()}</span>
              </div>
            </div>
          </div>

          <button
            onClick={handleCompleteOrder}
            className="px-8 py-4 bg-terracotta text-white hover:bg-terracotta/90 transition-colors"
          >
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
            onClick={() => currentStep === 'shipping' ? onNavigate('cart') : setCurrentStep('shipping')}
            className="flex items-center gap-2 text-charcoal hover:text-terracotta transition-colors group"
          >
            <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
            <span className="text-sm tracking-[0.2em] uppercase">
              {currentStep === 'shipping' ? 'Back to Cart' : 'Back'}
            </span>
          </button>
          <h1 className="font-serif text-4xl md:text-5xl text-charcoal">Checkout</h1>
          <div className="w-32"></div>
        </div>

        {/* Progress Steps */}
        <div className="flex items-center justify-center mb-16">
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              <div
                className={`w-8 h-8 rounded-full flex items-center justify-center ${
                  currentStep === 'shipping' ? 'bg-terracotta text-white' : 'bg-sage text-white'
                }`}
              >
                {currentStep === 'payment' ? <Check className="w-5 h-5" /> : '1'}
              </div>
              <span className="text-sm tracking-wider uppercase text-charcoal hidden md:inline">
                Shipping
              </span>
            </div>

            <div className="w-12 h-px bg-charcoal/20"></div>

            <div className="flex items-center gap-2">
              <div
                className={`w-8 h-8 rounded-full flex items-center justify-center ${
                  currentStep === 'payment'
                    ? 'bg-terracotta text-white'
                    : 'bg-charcoal/10 text-muted'
                }`}
              >
                2
              </div>
              <span className="text-sm tracking-wider uppercase text-charcoal hidden md:inline">
                Payment
              </span>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* Main Form Area */}
          <div className="lg:col-span-2">
            <AnimatePresence mode="wait">
              {currentStep === 'shipping' && (
                <motion.form
                  key="shipping"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 20 }}
                  onSubmit={handleShippingSubmit}
                  className="bg-white p-8 border border-charcoal/10"
                >
                  <h2 className="font-serif text-3xl text-charcoal mb-8">Shipping Information</h2>

                  <div className="space-y-6">
                    <div>
                      <label className="block text-sm text-charcoal mb-2">Full Name *</label>
                      <input
                        type="text"
                        required
                        value={shippingData.fullName}
                        onChange={(e) => setShippingData({ ...shippingData, fullName: e.target.value })}
                        className="w-full px-4 py-3 border border-charcoal/20 focus:border-terracotta focus:outline-none transition-colors"
                      />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <label className="block text-sm text-charcoal mb-2">Email *</label>
                        <input
                          type="email"
                          required
                          value={shippingData.email}
                          onChange={(e) => setShippingData({ ...shippingData, email: e.target.value })}
                          className="w-full px-4 py-3 border border-charcoal/20 focus:border-terracotta focus:outline-none transition-colors"
                        />
                      </div>

                      <div>
                        <label className="block text-sm text-charcoal mb-2">Phone *</label>
                        <input
                          type="tel"
                          required
                          value={shippingData.phone}
                          onChange={(e) => setShippingData({ ...shippingData, phone: e.target.value })}
                          className="w-full px-4 py-3 border border-charcoal/20 focus:border-terracotta focus:outline-none transition-colors"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm text-charcoal mb-2">Address *</label>
                      <input
                        type="text"
                        required
                        value={shippingData.address}
                        onChange={(e) => setShippingData({ ...shippingData, address: e.target.value })}
                        className="w-full px-4 py-3 border border-charcoal/20 focus:border-terracotta focus:outline-none transition-colors"
                      />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                      <div>
                        <label className="block text-sm text-charcoal mb-2">City *</label>
                        <input
                          type="text"
                          required
                          value={shippingData.city}
                          onChange={(e) => setShippingData({ ...shippingData, city: e.target.value })}
                          className="w-full px-4 py-3 border border-charcoal/20 focus:border-terracotta focus:outline-none transition-colors"
                        />
                      </div>

                      <div>
                        <label className="block text-sm text-charcoal mb-2">Postal Code *</label>
                        <input
                          type="text"
                          required
                          value={shippingData.postalCode}
                          onChange={(e) =>
                            setShippingData({ ...shippingData, postalCode: e.target.value })
                          }
                          className="w-full px-4 py-3 border border-charcoal/20 focus:border-terracotta focus:outline-none transition-colors"
                        />
                      </div>

                      <div>
                        <label className="block text-sm text-charcoal mb-2">Country *</label>
                        <input
                          type="text"
                          required
                          value={shippingData.country}
                          onChange={(e) => setShippingData({ ...shippingData, country: e.target.value })}
                          className="w-full px-4 py-3 border border-charcoal/20 focus:border-terracotta focus:outline-none transition-colors"
                        />
                      </div>
                    </div>
                  </div>

                  <button
                    type="submit"
                    className="w-full mt-8 py-4 bg-terracotta text-white hover:bg-terracotta/90 transition-colors font-medium tracking-wider uppercase text-sm"
                  >
                    Continue to Payment
                  </button>
                </motion.form>
              )}

              {currentStep === 'payment' && (
                <motion.form
                  key="payment"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 20 }}
                  onSubmit={handlePaymentSubmit}
                  className="bg-white p-8 border border-charcoal/10"
                >
                  <h2 className="font-serif text-3xl text-charcoal mb-8">Payment Method</h2>

                  <div className="space-y-4 mb-8">
                    {/* Stripe */}
                    <button
                      type="button"
                      onClick={() => setPaymentMethod('stripe')}
                      className={`w-full p-6 border-2 transition-colors text-left ${
                        paymentMethod === 'stripe'
                          ? 'border-terracotta bg-terracotta/5'
                          : 'border-charcoal/10 hover:border-charcoal/30'
                      }`}
                    >
                      <div className="flex items-center gap-4">
                        <CreditCard className="w-6 h-6 text-charcoal" />
                        <div>
                          <p className="font-medium text-charcoal">Credit / Debit Card</p>
                          <p className="text-sm text-muted">Pay securely with Stripe</p>
                        </div>
                      </div>
                    </button>

                    {/* PayPal */}
                    <button
                      type="button"
                      onClick={() => setPaymentMethod('paypal')}
                      className={`w-full p-6 border-2 transition-colors text-left ${
                        paymentMethod === 'paypal'
                          ? 'border-terracotta bg-terracotta/5'
                          : 'border-charcoal/10 hover:border-charcoal/30'
                      }`}
                    >
                      <div className="flex items-center gap-4">
                        <div className="w-6 h-6 bg-[#0070BA] rounded flex items-center justify-center text-white text-xs font-bold">
                          P
                        </div>
                        <div>
                          <p className="font-medium text-charcoal">PayPal</p>
                          <p className="text-sm text-muted">Pay with your PayPal account</p>
                        </div>
                      </div>
                    </button>

                    {/* Bank Transfer */}
                    <button
                      type="button"
                      onClick={() => setPaymentMethod('bank')}
                      className={`w-full p-6 border-2 transition-colors text-left ${
                        paymentMethod === 'bank'
                          ? 'border-terracotta bg-terracotta/5'
                          : 'border-charcoal/10 hover:border-charcoal/30'
                      }`}
                    >
                      <div className="flex items-center gap-4">
                        <Building2 className="w-6 h-6 text-charcoal" />
                        <div>
                          <p className="font-medium text-charcoal">Bank Transfer</p>
                          <p className="text-sm text-muted">Receive payment details by email</p>
                        </div>
                      </div>
                    </button>
                  </div>

                  {paymentMethod === 'stripe' && (
                    <div className="space-y-4 p-6 bg-warmWhite border border-charcoal/10 mb-8">
                      <p className="text-sm text-muted mb-4">
                        This is a demo. In production, Stripe payment form would appear here.
                      </p>
                      <input
                        type="text"
                        placeholder="Card Number"
                        className="w-full px-4 py-3 border border-charcoal/20 focus:border-terracotta focus:outline-none transition-colors"
                      />
                      <div className="grid grid-cols-2 gap-4">
                        <input
                          type="text"
                          placeholder="MM / YY"
                          className="w-full px-4 py-3 border border-charcoal/20 focus:border-terracotta focus:outline-none transition-colors"
                        />
                        <input
                          type="text"
                          placeholder="CVC"
                          className="w-full px-4 py-3 border border-charcoal/20 focus:border-terracotta focus:outline-none transition-colors"
                        />
                      </div>
                    </div>
                  )}

                  {paymentMethod === 'bank' && (
                    <div className="p-6 bg-warmWhite border border-charcoal/10 mb-8">
                      <p className="text-sm text-charcoal">
                        Bank transfer details will be sent to your email. Please complete the transfer
                        within 7 days to secure your purchase.
                      </p>
                    </div>
                  )}

                  <button
                    type="submit"
                    className="w-full py-4 bg-terracotta text-white hover:bg-terracotta/90 transition-colors font-medium tracking-wider uppercase text-sm"
                  >
                    {paymentMethod === 'bank' ? 'Complete Order' : 'Pay Now'}
                  </button>
                </motion.form>
              )}
            </AnimatePresence>
          </div>

          {/* Order Summary Sidebar */}
          <div className="lg:col-span-1">
            <div className="bg-warmWhite border border-charcoal/10 p-8 sticky top-32">
              <h2 className="font-serif text-2xl text-charcoal mb-6">Order Summary</h2>

              <div className="space-y-4 mb-6 pb-6 border-b border-charcoal/10">
                {cartItems.map((item) => (
                  <div key={item.artwork.id} className="flex gap-3">
                    <img
                      src={item.artwork.images[0]}
                      alt={item.artwork.title}
                      className="w-16 h-16 object-cover"
                      style={{ objectPosition: item.artwork.cropPosition }}
                    />
                    <div className="flex-1">
                      <p className="text-sm text-charcoal font-medium">{item.artwork.title}</p>
                      <p className="text-xs text-muted">Qty: {item.quantity}</p>
                      <p className="text-sm text-charcoal">
                        M{(item.artwork.price * item.quantity).toLocaleString()}
                      </p>
                    </div>
                  </div>
                ))}
              </div>

              <div className="space-y-3 mb-6 pb-6 border-b border-charcoal/10">
                <div className="flex justify-between text-sm">
                  <span className="text-muted">Subtotal</span>
                  <span className="text-charcoal">M{getCartTotal().toLocaleString()}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-muted">Shipping</span>
                  <span className="text-charcoal">M{shippingCost}</span>
                </div>
              </div>

              <div className="flex justify-between">
                <span className="font-serif text-xl text-charcoal">Total</span>
                <span className="font-serif text-2xl text-terracotta">
                  M{total.toLocaleString()}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
