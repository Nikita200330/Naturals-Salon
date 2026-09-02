import { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import GalleryLightbox from '../components/GalleryLightbox';
import { galleryData, galleryCategories } from '../data/gallery';
import { ImageIcon, Upload } from 'lucide-react';

import SEO from '../components/SEO';

export default function Gallery() {
  const [filter, setFilter] = useState('All');
  const [lightboxIndex, setLightboxIndex] = useState(null);
  const [uploadedImages, setUploadedImages] = useState([]);

  const allImages = useMemo(() => [...uploadedImages, ...galleryData], [uploadedImages]);
  const dynamicCategories = useMemo(() => ["All", ...new Set(allImages.map(img => img.category))], [allImages]);

  const filteredImages = useMemo(() => {
    return filter === 'All' 
      ? allImages 
      : allImages.filter(img => img.category === filter);
  }, [filter, allImages]);

  const openLightbox = (index) => setLightboxIndex(index);
  const closeLightbox = () => setLightboxIndex(null);
  
  const handleNext = () => {
    setLightboxIndex((prev) => (prev + 1) % filteredImages.length);
  };
  
  const handlePrevious = () => {
    setLightboxIndex((prev) => (prev - 1 + filteredImages.length) % filteredImages.length);
  };

  const handleFileUpload = (e) => {
    const files = e.target.files;
    if (files && files.length > 0) {
      const newImages = Array.from(files).map((file, i) => ({
        id: `uploaded-${Date.now()}-${i}`,
        src: URL.createObjectURL(file),
        alt: "Uploaded Image",
        category: "Uploaded",
        featured: false
      }));
      setUploadedImages(prev => [...prev, ...newImages]);
    }
  };

  return (
    <>
      <SEO 
        title="Naturals Salon Gallery | Kalaburagi Salon Photos"
        description="Explore salon, hair, beauty, bridal and grooming photos from Naturals Salon in Kalaburagi."
        url="/gallery"
      />
      <div className="pt-24 pb-24 min-h-screen relative overflow-hidden bg-dark-950">
        <div className="max-w-7xl mx-auto px-4 md:px-8 relative z-10">
        
        {/* Gallery Hero */}
        <div className="text-center mb-12">
          <p className="text-brand-400 text-sm font-semibold tracking-widest uppercase mb-3">Our Gallery</p>
          <h1 className="text-4xl md:text-5xl font-serif font-bold mb-6 text-white tracking-wide">Inside Naturals Salon</h1>
          <p className="text-brand-300/80 max-w-2xl mx-auto text-base md:text-lg leading-relaxed mb-8">
            Explore the salon environment, hair styling, beauty services, bridal looks, grooming and customer transformations.
          </p>
          <div className="flex justify-center gap-4">
            <Link 
              to="/appointment"
              className="bg-brand-500 hover:bg-brand-400 text-white px-8 py-3 rounded-full font-medium transition-all shadow-lg shadow-brand-500/25"
            >
              Book Appointment
            </Link>
            <Link 
              to="/services"
              className="bg-dark-900/50 hover:bg-dark-800 text-white border border-white/10 px-8 py-3 rounded-full font-medium transition-all"
            >
              Explore Services
            </Link>
          </div>
        </div>



        {/* Grid */}
        {filteredImages.length > 0 || filter === 'Uploaded' ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
            {(filter === 'All' || filter === 'Uploaded') && (
              <label className="relative bg-dark-900/50 rounded-2xl overflow-hidden cursor-pointer group border-2 border-dashed border-white/20 hover:border-brand-500/50 hover:bg-dark-900/80 transition-all flex flex-col items-center justify-center aspect-square">
                <input type="file" accept="image/*" multiple className="hidden" onChange={handleFileUpload} />
                <div className="flex flex-col items-center text-brand-300/70 group-hover:text-brand-400 transition-colors">
                  <Upload className="w-10 h-10 mb-3" />
                  <span className="font-medium">Click to Upload</span>
                </div>
              </label>
            )}
            
            {filteredImages.map((img, idx) => (
              <div 
                key={img.id} 
                className={`relative bg-dark-900 rounded-2xl overflow-hidden cursor-pointer group border border-white/5 shadow-md ${
                  img.featured ? 'md:col-span-2 md:row-span-2 aspect-[4/3] sm:aspect-auto' : 'aspect-square'
                }`}
                onClick={() => openLightbox(idx)}
              >
                <img 
                  src={img.src} 
                  alt={img.alt}
                  loading={idx < 4 ? "eager" : "lazy"}
                  className="w-full h-full object-cover transition-transform duration-700 ease-out opacity-90 group-hover:opacity-100 group-hover:scale-105"
                  onError={(e) => { 
                    e.target.style.display = 'none';
                    e.target.nextSibling.style.display = 'flex';
                  }}
                />
                <div className="hidden absolute inset-0 bg-dark-800 flex flex-col items-center justify-center text-brand-300/50 p-4 text-center">
                   <ImageIcon className="w-8 h-8 mb-2 opacity-50" />
                   <span className="text-xs">Image unavailable</span>
                </div>
                
                <div className="absolute inset-0 bg-gradient-to-t from-dark-950/90 via-dark-900/20 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-300 flex flex-col justify-end p-6 border-2 border-transparent group-hover:border-brand-500/30 rounded-2xl">
                   <p className="text-brand-400 text-xs font-semibold tracking-widest uppercase mb-1 transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300">{img.category}</p>
                   {img.serviceName && (
                     <h3 className="text-white text-lg font-serif transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300 delay-75">{img.serviceName}</h3>
                   )}
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="py-24 text-center border border-white/5 rounded-3xl bg-dark-900/30">
            <h3 className="text-xl text-white font-medium mb-3">No photos available in this category yet</h3>
            <button 
              onClick={() => setFilter('All')}
              className="text-brand-400 hover:text-brand-300 font-medium transition-colors"
            >
              View All Photos
            </button>
          </div>
        )}

        {/* Final CTA */}
        <div className="mt-24 text-center bg-gradient-to-br from-brand-900/40 to-dark-900 border border-white/10 rounded-3xl p-8 md:p-12 relative overflow-hidden">
          <div className="relative z-10">
            <h2 className="text-3xl font-serif font-bold text-white mb-4">Like What You See?</h2>
            <p className="text-brand-300 max-w-xl mx-auto mb-8">
              Explore our services and request your preferred appointment at Naturals Salon.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <Link to="/appointment" className="bg-brand-500 hover:bg-brand-400 text-white px-8 py-3 rounded-full font-medium transition-all shadow-lg shadow-brand-500/25">
                Book Appointment
              </Link>
              <Link to="/services" className="bg-dark-900/80 hover:bg-dark-800 text-white border border-white/10 px-8 py-3 rounded-full font-medium transition-all">
                View Services
              </Link>
            </div>
          </div>
        </div>

        {/* Lightbox */}
        {lightboxIndex !== null && (
          <GalleryLightbox 
            images={filteredImages}
            currentIndex={lightboxIndex}
            onClose={closeLightbox}
            onNext={handleNext}
            onPrevious={handlePrevious}
          />
        )}

      </div>
      
      {/* Global styles for hide-scrollbar */}
      <style dangerouslySetInnerHTML={{__html: `
        .hide-scrollbar::-webkit-scrollbar {
          display: none;
        }
        .hide-scrollbar {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      `}} />
    </div>
    </>
  );
}
