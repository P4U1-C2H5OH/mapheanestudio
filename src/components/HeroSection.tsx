import React from 'react';
import { ArrowDown, Instagram, Facebook, Mail } from 'lucide-react';
import { motion } from 'framer-motion';
export function HeroSection() {
  return (
    <section className="relative min-h-screen w-full pt-32 pb-20 px-6 md:px-12 flex flex-col justify-between overflow-hidden">
      {/* Top Content */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 w-full max-w-7xl mx-auto">
        {/* Quote Area - Spans 7 columns */}
        <div className="lg:col-span-7 flex flex-col justify-center z-10">
          <motion.h1
            initial={{
              opacity: 0,
              y: 30
            }}
            animate={{
              opacity: 1,
              y: 0
            }}
            transition={{
              duration: 1,
              ease: 'easeOut'
            }}
            className="font-serif text-5xl md:text-7xl lg:text-8xl leading-[1.1] text-charcoal mb-8">

            “To give meaning to one's life and life to one's senses.”
          </motion.h1>

          <motion.div
            initial={{
              opacity: 0
            }}
            animate={{
              opacity: 1
            }}
            transition={{
              delay: 0.5,
              duration: 0.8
            }}
            className="flex flex-col gap-4 mt-8 md:mt-16">

            <div className="flex items-center gap-6">
              <a
                href="mailto:hello@aria-art.com"
                className="text-sm border-b border-charcoal/30 pb-0.5 hover:border-terracotta hover:text-terracotta transition-colors">

                hello@aria-art.com
              </a>
              <a
                href="tel:+1234567890"
                className="text-sm border-b border-charcoal/30 pb-0.5 hover:border-terracotta hover:text-terracotta transition-colors">

                +33 6 12 34 56 78
              </a>
            </div>
            <div className="flex items-center gap-4 text-charcoal">
              <a
                href="#"
                aria-label="Facebook"
                className="hover:text-terracotta transition-colors">

                <Facebook size={18} />
              </a>
              <a
                href="#"
                aria-label="Instagram"
                className="hover:text-terracotta transition-colors">

                <Instagram size={18} />
              </a>
              <a
                href="#"
                aria-label="Email"
                className="hover:text-terracotta transition-colors">

                <Mail size={18} />
              </a>
            </div>
          </motion.div>
        </div>

        {/* Right Side - Image & Label */}
        <div className="lg:col-span-5 relative flex flex-col items-end">
          <motion.div
            initial={{
              opacity: 0,
              x: 20
            }}
            animate={{
              opacity: 1,
              x: 0
            }}
            transition={{
              delay: 0.3,
              duration: 0.8
            }}
            className="text-right mb-8 w-full">

            <p className="text-xs tracking-[0.2em] uppercase text-muted mb-1">
              Contemporary Painting
            </p>
            <p className="font-serif italic text-xl text-charcoal">
              2024 Collection
            </p>
          </motion.div>

          <motion.div
            initial={{
              opacity: 0,
              scale: 0.95
            }}
            animate={{
              opacity: 1,
              scale: 1
            }}
            transition={{
              delay: 0.6,
              duration: 1,
              ease: 'easeOut'
            }}
            className="relative w-full aspect-[3/4] max-w-md ml-auto overflow-hidden">

            <div className="absolute inset-0 bg-terracotta/10 z-0"></div>
            <img
              src="/artportfolio.jpg"
              alt="Featured Artwork"
              className="w-full h-full object-cover object-center hover:scale-105 transition-transform duration-[2s] ease-out" />

          </motion.div>

          <motion.div
            initial={{
              opacity: 0,
              y: -20
            }}
            animate={{
              opacity: 1,
              y: 0
            }}
            transition={{
              delay: 1.2,
              duration: 0.8
            }}
            className="absolute -bottom-12 -left-12 hidden lg:block">

            <ArrowDown className="w-12 h-12 text-terracotta animate-bounce stroke-[1]" />
          </motion.div>
        </div>
      </div>
    </section>);

}