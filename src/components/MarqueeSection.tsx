import React from 'react';
import { Eye } from 'lucide-react';
export function MarqueeSection() {
  return (
    <div className="w-full py-12 md:py-20 border-t border-b border-charcoal/10 bg-white">
      <div className="flex items-center justify-center gap-6">
        <span className="hidden md:block w-16 h-px bg-charcoal/10"></span>
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 rounded-full border border-charcoal/20 flex items-center justify-center">
            <Eye className="w-5 h-5 text-charcoal/40" />
          </div>
          <span className="text-3xl md:text-5xl font-serif italic text-charcoal/20">
            View the full gallery online
          </span>
        </div>
        <span className="hidden md:block w-16 h-px bg-charcoal/10"></span>
      </div>
    </div>);

}