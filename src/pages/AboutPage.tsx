import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft, Eye, PenTool, Circle } from 'lucide-react';
import { useScrollReveal } from '../hooks/useScrollReveal';
interface AboutPageProps {
  onNavigate: (page: 'home' | 'about') => void;
}
export function AboutPage({ onNavigate }: AboutPageProps) {
  // Scroll to top on mount
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
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
      className="bg-background min-h-screen w-full overflow-hidden">

      {/* 1. Hero / Opening */}
      <section className="relative w-full py-32 md:py-48 px-6 md:px-12 flex flex-col items-center justify-center text-center overflow-hidden">
        {/* Background Texture Text */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none select-none overflow-hidden">
          <span className="font-serif text-[20vw] leading-none text-charcoal/5 opacity-20 blur-sm">
            Aria
          </span>
        </div>

        <motion.div
          initial={{
            opacity: 0,
            y: 20
          }}
          animate={{
            opacity: 1,
            y: 0
          }}
          transition={{
            duration: 1.2,
            ease: 'easeOut'
          }}
          className="z-10 relative max-w-4xl mx-auto">

          <span className="block text-xs md:text-sm tracking-[0.3em] uppercase text-terracotta mb-6">
            About the Artist
          </span>
          <h1 className="font-serif text-3xl md:text-5xl italic text-charcoal leading-relaxed mb-12">
            "Art is not what you see, but what you make others see."
          </h1>
        </motion.div>

        <motion.div
          initial={{
            opacity: 0,
            scale: 1.02
          }}
          animate={{
            opacity: 1,
            scale: 1
          }}
          transition={{
            duration: 2,
            ease: 'easeOut'
          }}
          className="relative w-full max-w-2xl aspect-[3/4] md:aspect-[16/9] overflow-hidden shadow-xl mt-8">

          <img
            src="public/Image 5 - Abstract Female Busts.png"
            alt="Aria Artist Portrait"
            className="w-full h-full object-cover" />

        </motion.div>
      </section>

      {/* 2. Philosophy Section */}
      <section className="py-24 md:py-32 px-6 md:px-12 relative">
        {/* Breathing Circle Animation */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] pointer-events-none -z-10">
          <motion.div
            animate={{
              scale: [1, 1.08, 1]
            }}
            transition={{
              duration: 6,
              repeat: Infinity,
              ease: 'easeInOut'
            }}
            className="w-full h-full rounded-full bg-sage/10 blur-3xl" />

        </div>

        <div className="container mx-auto grid grid-cols-1 md:grid-cols-12 gap-12">
          <div className="md:col-span-2 hidden md:flex items-start justify-center pt-4">
            <span className="text-xs tracking-[0.2em] uppercase text-muted -rotate-90 origin-center whitespace-nowrap">
              Philosophy
            </span>
          </div>
          <div className="md:col-span-8 md:col-start-4 space-y-8">
            <h2 className="font-serif text-4xl md:text-5xl text-charcoal">
              Healing through creation
            </h2>
            <p className="text-lg md:text-xl text-muted font-light leading-relaxed">
              I believe that art is a form of energy exchange. In a world that
              moves too fast, painting is my way of slowing down time, of
              capturing the stillness that exists beneath the noise. My work is
              an invitation to pause, to breathe, and to reconnect with the
              subtle rhythms of your own inner landscape.
            </p>
            <p className="text-lg md:text-xl text-muted font-light leading-relaxed">
              Every canvas is a meditation, a dialogue between the seen and the
              unseen, grounded in the belief that beauty has the power to heal
              and transform.
            </p>
          </div>
        </div>
      </section>

      {/* 3. Journey / Story Section */}
      <section className="py-24 md:py-32 bg-white">
        <div className="container mx-auto px-6 md:px-12">
          <h2 className="font-serif text-5xl md:text-6xl text-charcoal mb-24 text-center">
            The Journey
          </h2>

          <div className="space-y-32">
            {/* Block 1 */}
            <JourneyBlock
              year="The Beginning"
              title="Early Years"
              text="Born into a family of musicians, I learned early on that expression comes in many forms. While sound was my first language, I soon found that color could speak the words I couldn't say. The silence of the canvas became my sanctuary."
              imagePosition="object-[30%_10%]"
              align="left" />

            {/* Block 2 */}
            <JourneyBlock
              year="The Awakening"
              title="Finding Light"
              text="A period of solitude led me to the coast of Brittany. There, amidst the raw elements, I discovered the textures that would define my style. The rough stone, the fluid sea, the shifting light—nature taught me that perfection lies in imperfection."
              imagePosition="object-[70%_50%]"
              align="right" />

            {/* Block 3 */}
            <JourneyBlock
              year="Present Day"
              title="The Collective"
              text="Today, my studio is not just a place of solitary creation but a space of gathering. Through workshops and collective exhibitions, I aim to open doors for others to find their own creative voice. Art is not meant to be kept; it is meant to be shared."
              imagePosition="object-[20%_80%]"
              align="left" />

          </div>
        </div>
      </section>

      {/* 4. The Process Section */}
      <section className="py-24 md:py-32 bg-sage/5">
        <div className="container mx-auto px-6 md:px-12">
          <div className="text-center mb-16">
            <h2 className="font-serif text-4xl md:text-5xl text-charcoal mb-4">
              The Creative Process
            </h2>
            <div className="w-12 h-1 bg-terracotta/30 mx-auto"></div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 max-w-5xl mx-auto">
            <ProcessStep
              icon={<Eye className="w-8 h-8 text-terracotta" />}
              title="Observation"
              text="Seeing beyond the surface. Noticing the way light falls on a leaf, or the emotion hidden in a glance." />

            <ProcessStep
              icon={<Circle className="w-8 h-8 text-sage" />}
              title="Meditation"
              text="Stillness before action. Allowing the mind to clear so that the intuition can guide the hand." />

            <ProcessStep
              icon={<PenTool className="w-8 h-8 text-gold" />}
              title="Creation"
              text="The act of surrender. Letting the materials speak, layering texture and color until the story emerges." />

          </div>
        </div>
      </section>

      {/* 5. Values Section */}
      <section className="py-24 md:py-32 px-6 md:px-12">
        <div className="container mx-auto">
          <h2 className="font-serif text-5xl md:text-6xl text-charcoal mb-20 text-center">
            What I Believe
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12">
            <ValueCard
              title="Connection"
              text="Art bridges the gap between souls. It reminds us that we are not alone in our experiences." />

            <ValueCard
              title="Resilience"
              text="Like nature, we grow through the cracks. Beauty often emerges from the places we thought were broken." />

            <ValueCard
              title="Presence"
              text="Each brushstroke is a meditation. To create is to be fully alive in the present moment." />

          </div>
        </div>
      </section>

      {/* 6. Closing / Return Section */}
      <section className="py-32 px-6 md:px-12 bg-charcoal text-white relative overflow-hidden">
        <div className="absolute inset-0 opacity-20">
          <img
            src="public/Image 8 - Cosmic Figures.png"
            alt="Background"
            className="w-full h-full object-cover grayscale" />

        </div>
        <div className="absolute inset-0 bg-charcoal/60"></div>

        <div className="relative z-10 container mx-auto text-center">
          <h2 className="font-serif text-4xl md:text-6xl mb-8">
            Ready to explore the collection?
          </h2>
          <button
            onClick={() => onNavigate('home')}
            className="group inline-flex items-center gap-4 text-lg tracking-widest uppercase border-b border-white/30 pb-2 hover:border-terracotta hover:text-terracotta transition-all duration-500">

            <ArrowLeft className="w-5 h-5 group-hover:-translate-x-2 transition-transform duration-300" />
            Return to Gallery
          </button>
        </div>
      </section>
    </motion.div>);

}
// Sub-components for cleaner code
function JourneyBlock({
  year,
  title,
  text,
  imagePosition,
  align






}: {year: string;title: string;text: string;imagePosition: string;align: 'left' | 'right';}) {
  const { ref, isVisible } = useScrollReveal(0.2);
  return (
    <div
      ref={ref}
      className={`flex flex-col md:flex-row gap-12 items-center ${align === 'right' ? 'md:flex-row-reverse' : ''} transition-all duration-1000 transform ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-20'}`}>

      <div className="w-full md:w-1/2">
        <div className="aspect-[4/5] overflow-hidden relative">
          <div className="absolute inset-0 bg-white/10 mix-blend-multiply"></div>
          <img
            src="public/Image 3 - Vibrant Portrait b-white.png"
            alt={title}
            className={`w-full h-full object-cover ${imagePosition} hover:scale-105 transition-transform duration-[2s]`} />

        </div>
      </div>
      <div className="w-full md:w-1/2 space-y-6 md:px-8">
        <span className="text-xs tracking-[0.2em] uppercase text-terracotta block">
          {year}
        </span>
        <h3 className="font-serif text-4xl text-charcoal">{title}</h3>
        <p className="text-muted font-light leading-relaxed text-lg">{text}</p>
      </div>
    </div>);

}
function ProcessStep({
  icon,
  title,
  text




}: {icon: React.ReactNode;title: string;text: string;}) {
  const { ref, isVisible } = useScrollReveal(0.2);
  return (
    <div
      ref={ref}
      className={`text-center space-y-4 transition-all duration-1000 transform ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-20'}`}>

      <div className="w-16 h-16 rounded-full bg-white border border-sage/20 flex items-center justify-center mx-auto mb-6 shadow-sm">
        {icon}
      </div>
      <h3 className="font-serif text-2xl text-charcoal">{title}</h3>
      <p className="text-muted font-light leading-relaxed">{text}</p>
    </div>);

}
function ValueCard({ title, text }: {title: string;text: string;}) {
  const { ref, isVisible } = useScrollReveal(0.1);
  return (
    <div
      ref={ref}
      className={`bg-white p-10 text-center border-b-2 border-gold/20 hover:border-gold transition-colors duration-500 transition-all duration-1000 transform ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-20'}`}>

      <h3 className="font-serif text-3xl text-charcoal mb-4">{title}</h3>
      <p className="text-muted font-light leading-relaxed">{text}</p>
    </div>);

}