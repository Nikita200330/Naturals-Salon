import { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, ImageIcon } from 'lucide-react';
import { galleryData } from '../data/gallery';
import GalleryLightbox from './GalleryLightbox';

export default function GalleryPreview() {
  const [lightboxIndex, setLightboxIndex] = useState(null);

  const featuredImages = galleryData.filter(img => img.featured).slice(0, 5);

  const openLightbox = (index) => setLightboxIndex(index);
  const closeLightbox = () => setLightboxIndex(null);
  
  const handleNext = () => {
    setLightboxIndex((prev) => (prev + 1) % featuredImages.length);
  };
  
  const handlePrevious = () => {
    setLightboxIndex((prev) => (prev - 1 + featuredImages.length) % featuredImages.length);
  };

  const handleImageError = (e) => {
    e.target.style.display = 'none';
    e.target.nextSibling.style.display = 'flex';
  };

  if (featuredImages.length === 0) return null;

  return (
    <section className="py-20 px-4 md:px-8 max-w-7xl mx-auto w-full">
      <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-6">
        <div className="max-w-2xl">
          <span className="text-brand-400 text-sm font-bold tracking-[0.2em] uppercase mb-4 block">
            Our Space
          </span>
          <h2 className="text-3xl md:text-5xl font-serif font-bold text-white mb-4">
            A Glimpse Inside
          </h2>
          <p className="text-brand-200 text-lg">
            Immerse yourself in our premium salon environment designed for your ultimate comfort.
          </p>
        </div>
        <Link to="/gallery" className="inline-flex items-center gap-2 text-brand-300 hover:text-white transition-colors font-medium group">
          View Full Gallery <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
        </Link>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 md:grid-rows-2 gap-4 md:gap-6 h-[500px] md:h-[600px]">
        {featuredImages.map((img, idx) => {
          // Creating an asymmetric layout based on index
          let layoutClasses = "";
          if (idx === 0) {
            layoutClasses = "md:col-span-2 md:row-span-2"; // Large hero image
          } else if (idx === 1) {
            layoutClasses = "md:col-span-2 md:row-span-1"; // Wide image top right
          } else {
            layoutClasses = "md:col-span-1 md:row-span-1"; // Small square images bottom right
          }

          return (
            <div 
              key={img.id} 
              className={`relative group rounded-3xl overflow-hidden border border-white/5 shadow-xl bg-dark-900 cursor-pointer ${layoutClasses}`}
              onClick={() => openLightbox(idx)}
            >
              <div className="absolute inset-0 bg-dark-950/20 group-hover:bg-transparent transition-colors z-10 pointer-events-none" />
              <img 
                src={img.src} 
                alt={img.alt}
                onError={handleImageError}
                loading="lazy"
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div className="hidden absolute inset-0 bg-dark-800 flex flex-col items-center justify-center text-brand-300/50 p-4 text-center">
                 <ImageIcon className="w-8 h-8 mb-2 opacity-50" />
                 <span className="text-xs">Image unavailable</span>
              </div>
            </div>
          );
        })}
      </div>

      {lightboxIndex !== null && (
        <GalleryLightbox 
          images={featuredImages}
          currentIndex={lightboxIndex}
          onClose={closeLightbox}
          onNext={handleNext}
          onPrevious={handlePrevious}
        />
      )}
    </section>
  );
}
