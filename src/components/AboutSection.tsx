import React from 'react';
import { useScrollReveal } from '../hooks/useScrollReveal';
import { ArrowRight } from 'lucide-react';
interface AboutSectionProps {
  onNavigate?: (page: 'home' | 'about') => void;
}
export function AboutSection({ onNavigate }: AboutSectionProps) {
  const { ref, isVisible } = useScrollReveal(0.2);
  const handleLearnMore = (e: React.MouseEvent) => {
    e.preventDefault();
    if (onNavigate) {
      onNavigate('about');
    }
  };
  return (
    <section
      id="about"
      className="py-24 md:py-32 w-full bg-white relative overflow-hidden">

      {/* Decorative background element */}
      <div className="absolute top-0 right-0 w-1/3 h-full bg-background/50 -z-10"></div>

      <div ref={ref} className="container mx-auto px-6 md:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20 items-center">
          {/* Image Column - Spans 5 */}
          <div
            className={`lg:col-span-5 transition-all duration-1000 ease-out transform ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-20'}`}>

            <div className="relative w-full aspect-[4/5] overflow-hidden group">
              <div className="absolute inset-0 bg-terracotta mix-blend-multiply opacity-0 group-hover:opacity-20 transition-opacity duration-500 z-10"></div>
              <img
                src="/artportfolio.jpg"
                alt="Artist Portrait"
                className="w-full h-full object-cover object-[20%_30%] grayscale-[20%] group-hover:grayscale-0 transition-all duration-700" />

            </div>
          </div>

          {/* Text Column - Spans 7 */}
          <div
            className={`lg:col-span-7 transition-all duration-1000 delay-300 ease-out transform ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-20'}`}>

            <h2 className="font-serif text-6xl md:text-8xl text-charcoal mb-8 leading-none">
              aria
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12">
              <div>
                <span className="text-xs tracking-[0.2em] uppercase text-terracotta font-medium block mb-4">
                  Who am I?
                </span>
                <h3 className="font-serif text-2xl md:text-3xl italic text-charcoal leading-tight">
                  A story of resilience...
                </h3>
              </div>

              <div className="space-y-6">
                <p className="text-muted leading-relaxed font-light">
                  The strength that exists in each of us. A grief followed by an
                  encounter can open up an infinite world. My art explores the
                  delicate balance between vulnerability and power, using
                  texture and color to map the human emotional landscape.
                </p>
                <p className="text-muted leading-relaxed font-light">
                  Through layers of oil and mixed media, I attempt to capture
                  fleeting moments of connection—the silence between words, the
                  glance that changes everything.
                </p>

                <button
                  onClick={handleLearnMore}
                  className="inline-flex items-center gap-2 text-charcoal border-b border-charcoal pb-1 hover:text-terracotta hover:border-terracotta transition-colors duration-300 mt-4 group">

                  <span className="text-sm tracking-widest uppercase">
                    Learn More
                  </span>
                  <ArrowRight className="w-4 h-4 transform group-hover:translate-x-1 transition-transform" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>);

}