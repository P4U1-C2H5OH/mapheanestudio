import React from 'react';
import { useScrollReveal } from '../hooks/useScrollReveal';
import { Eye, ArrowRight } from 'lucide-react';
import { artworks, Artwork } from '../data/artworks';
interface GallerySectionProps {
  onSelectArtwork?: (id: number) => void;
  onViewFullGallery?: () => void;
}
export function GallerySection({
  onSelectArtwork,
  onViewFullGallery
}: GallerySectionProps) {
  return (
    <section id="gallery" className="py-24 md:py-32 w-full bg-background">
      <div className="container mx-auto px-6 md:px-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12 mb-16">
          {artworks.slice(0, 3).map((art, index) =>
          <GalleryCard
            key={art.id}
            artwork={art}
            index={index}
            onClick={() => onSelectArtwork?.(art.id)} />

          )}
        </div>

        {/* View Full Gallery Link */}
        <div className="flex justify-center">
          <button
            onClick={onViewFullGallery}
            className="group inline-flex items-center gap-3 text-charcoal hover:text-terracotta transition-colors duration-300">

            <span className="text-sm tracking-[0.2em] uppercase border-b border-charcoal pb-1 group-hover:border-terracotta transition-colors">
              View Full Gallery
            </span>
            <ArrowRight className="w-4 h-4 transform group-hover:translate-x-1 transition-transform duration-300" />
          </button>
        </div>
      </div>
    </section>);

}
function GalleryCard({
  artwork,
  index,
  onClick




}: {artwork: Artwork;index: number;onClick: () => void;}) {
  const { ref, isVisible } = useScrollReveal(0.1);
  return (
    <div
      ref={ref}
      className={`flex flex-col ${artwork.offsetClass} transition-all duration-1000 ease-out transform ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-20'}`}
      style={{
        transitionDelay: `${index * 150}ms`
      }}>

      <div
        onClick={onClick}
        className="group relative w-full aspect-[3/4] overflow-hidden mb-6 cursor-pointer">

        <div className="absolute inset-0 bg-charcoal/0 group-hover:bg-charcoal/10 transition-colors duration-500 z-10"></div>

        {/* Hover Overlay */}
        <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-20">
          <div className="bg-white/90 backdrop-blur-sm rounded-full p-4 transform scale-90 group-hover:scale-100 transition-transform duration-500">
            <Eye className="w-6 h-6 text-charcoal" />
          </div>
        </div>

        <img
          src={artwork.images[0]}
          alt={artwork.title}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
          style={{
            objectPosition: artwork.cropPosition
          }} />

      </div>

      <div className="text-center space-y-2">
        <h3
          onClick={onClick}
          className="font-serif text-2xl md:text-3xl text-charcoal cursor-pointer hover:text-terracotta transition-colors">

          {artwork.title}
        </h3>
        <div className="text-xs uppercase tracking-wider text-muted space-y-1">
          <p>{artwork.dimensions}</p>
          <p>{artwork.technique}</p>
          <p
            className={
            artwork.status === 'Available' ?
            'text-terracotta' :
            'text-muted line-through'
            }>

            {artwork.status}
          </p>
        </div>
      </div>
    </div>);

}