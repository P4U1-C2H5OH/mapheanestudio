import React from 'react';
import { Instagram, Facebook } from 'lucide-react';
export function Footer() {
  return (
    <footer className="bg-white pt-20 pb-10 border-t border-charcoal/5">
      <div className="container mx-auto px-6 md:px-12">
        <div className="flex flex-col md:flex-row justify-between items-center gap-8 mb-16">
          <div className="text-center md:text-left">
            <h2 className="font-serif text-4xl italic text-charcoal mb-2">
              Aria
            </h2>
            <p className="text-xs uppercase tracking-widest text-muted">
              Contemporary Artist
            </p>
          </div>

          <div className="flex gap-6">
            <a
              href="#"
              className="w-10 h-10 rounded-full border border-charcoal/10 flex items-center justify-center text-charcoal hover:bg-terracotta hover:text-white hover:border-terracotta transition-all duration-300">

              <Instagram size={18} />
            </a>
            <a
              href="#"
              className="w-10 h-10 rounded-full border border-charcoal/10 flex items-center justify-center text-charcoal hover:bg-terracotta hover:text-white hover:border-terracotta transition-all duration-300">

              <Facebook size={18} />
            </a>
          </div>
        </div>

        <div className="flex flex-col md:flex-row justify-between items-center text-xs text-muted border-t border-charcoal/5 pt-8">
          <p>&copy; 2024 Aria Art Portfolio. All rights reserved.</p>
          <div className="flex gap-6 mt-4 md:mt-0">
            <a href="#" className="hover:text-terracotta transition-colors">
              Privacy Policy
            </a>
            <a href="#" className="hover:text-terracotta transition-colors">
              Terms of Use
            </a>
          </div>
        </div>
      </div>
    </footer>);

}