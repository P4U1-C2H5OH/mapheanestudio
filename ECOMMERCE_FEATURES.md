# Aria Art Portfolio - E-Commerce Features

## 🎨 Overview

This portfolio has been enhanced with a complete e-commerce system while maintaining the elegant, minimalist aesthetic. The platform now supports online sales of paintings, drawings, and clay models.

## ✨ New Features

### 1. **Shopping Cart System**
- Persistent cart using localStorage
- Real-time cart count in navigation
- Add/remove items
- Quantity management
- Price calculations

### 2. **Enhanced Gallery**
- **Filters by Medium**: Paintings, Drawings, Clay Models
- **Availability Filter**: All, Available, Sold
- **Real-time filtering** with smooth animations
- **Add to Cart** directly from gallery
- Expanded artwork collection (9 pieces)

### 3. **Multi-Step Checkout**
- **Step 1: Shipping Information**
  - Full name, email, phone
  - Complete address details
  - Form validation
  
- **Step 2: Payment Method**
  - Stripe (Credit/Debit cards)
  - PayPal
  - Bank Transfer
  - Visual payment method selection

- **Step 3: Order Confirmation**
  - Order number generation
  - Complete order summary
  - Email confirmation notice

### 4. **Individual Artwork Pages**
- Multiple image views with thumbnails
- Detailed artwork information
- Format selection (Original, Large Print, Medium Print)
- Quantity selection
- Add to cart with confirmation feedback
- Direct navigation to cart

## 🏗️ Architecture

### New Components

```
src/
├── context/
│   └── CartContext.tsx          # Global cart state management
├── components/
│   └── CartIcon.tsx             # Navigation cart icon with badge
├── pages/
│   ├── CartPage.tsx             # Shopping cart view
│   ├── CheckoutPage.tsx         # Multi-step checkout
│   └── GalleryPage.tsx          # Enhanced with filters
```

### Updated Components

- **App.tsx**: Wrapped with CartProvider, added cart/checkout routes
- **Navigation.tsx**: Added cart icon
- **GalleryPage.tsx**: Added filters and add-to-cart functionality
- **ArtworkPage.tsx**: Added cart integration

### Data Structure

Enhanced `Artwork` interface:
```typescript
interface Artwork {
  id: number;
  title: string;
  dimensions: string;
  technique: string;
  medium: 'Painting' | 'Drawing' | 'Clay Model';  // NEW
  status: 'Available' | 'Sold';
  cropPosition: string;
  offsetClass: string;
  price: number;
  description: string;
  images: string[];
  year?: number;  // NEW
}
```

## 🎨 Design Consistency

All new features maintain the established design language:

- **Colors**: Terracotta (#A0522D), Charcoal (#2D2A26), Warm White (#FAF7F2)
- **Typography**: Playfair Display (serif) for headings, DM Sans for body
- **Animations**: Smooth framer-motion transitions
- **Spacing**: Consistent padding and margins
- **Interactions**: Hover states with color transitions

## 💳 Payment Integration

### Current Implementation
The checkout includes UI for three payment methods:
- **Stripe**: Ready for integration (placeholder form included)
- **PayPal**: Button ready for SDK integration
- **Bank Transfer**: Email-based payment details

### Production Setup

To make payments functional:

1. **Stripe Integration**:
```bash
npm install @stripe/stripe-js @stripe/react-stripe-js
```

2. **PayPal Integration**:
```bash
npm install @paypal/react-paypal-js
```

3. Add environment variables:
```env
VITE_STRIPE_PUBLIC_KEY=your_key_here
VITE_PAYPAL_CLIENT_ID=your_id_here
```

## 🚀 Usage

### Running the Project

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build
```

### User Flow

1. **Browse Gallery** → Filter by medium/availability
2. **View Artwork** → See details, select format
3. **Add to Cart** → Visual confirmation
4. **Review Cart** → Adjust quantities, remove items
5. **Checkout** → Enter shipping, choose payment
6. **Confirmation** → Order number and email confirmation

## 📱 Responsive Design

All e-commerce features are fully responsive:
- Mobile-first approach
- Touch-friendly interactions
- Optimized cart/checkout layouts for small screens
- Collapsible filters on mobile

## 🔒 Security Considerations

For production deployment:

1. **Never store payment info** in localStorage
2. Use HTTPS for all transactions
3. Implement proper backend validation
4. Use environment variables for API keys
5. Add CSRF protection
6. Implement rate limiting
7. Add input sanitization

## 📊 Analytics Ready

Key events to track:
- `add_to_cart`
- `remove_from_cart`
- `begin_checkout`
- `add_payment_info`
- `purchase`

## 🎯 Future Enhancements

Potential additions:
- Wishlist functionality
- Customer reviews
- Related artworks recommendations
- Email newsletter signup
- Commission request form integration
- Print customization options
- Gift wrapping options
- Discount codes
- Multi-currency support

## 🛠️ Customization

### Adding New Artworks

Edit `src/data/artworks.ts`:

```typescript
{
  id: 10,
  title: 'Your Artwork',
  dimensions: '100cm x 120cm',
  technique: 'Oil on canvas',
  medium: 'Painting',
  status: 'Available',
  cropPosition: '50% 50%',
  offsetClass: 'mt-0',
  price: 4500,
  year: 2024,
  description: 'Description...',
  images: ['/path-to-image.jpg']
}
```

### Customizing Colors

Edit `tailwind.config.js` to match your brand.

### Shipping Costs

Update shipping calculation in `src/pages/CheckoutPage.tsx`:

```typescript
const shippingCost = calculateShipping(country, items);
```

## 📄 License

This project maintains the original license while adding e-commerce functionality.

---

Built with React, TypeScript, Tailwind CSS, and Framer Motion.
