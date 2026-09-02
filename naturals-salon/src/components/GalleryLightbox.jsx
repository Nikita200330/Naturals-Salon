import { useEffect, useState } from 'react';
import { X, ChevronLeft, ChevronRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export default function GalleryLightbox({ images, currentIndex, onClose, onNext, onPrevious }) {
  const navigate = useNavigate();
  const [touchStart, setTouchStart] = useState(null);
  const [touchEnd, setTouchEnd] = useState(null);

  const minSwipeDistance = 50;

  const onTouchStart = (e) => {
    setTouchEnd(null);
    setTouchStart(e.targetTouches[0].clientX);
  };

  const onTouchMove = (e) => setTouchEnd(e.targetTouches[0].clientX);

  const onTouchEnd = () => {
    if (!touchStart || !touchEnd) return;
    const distance = touchStart - touchEnd;
    const isLeftSwipe = distance > minSwipeDistance;
    const isRightSwipe = distance < -minSwipeDistance;
    if (isLeftSwipe) {
      onNext();
    }
    if (isRightSwipe) {
      onPrevious();
    }
  };

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') onClose();
      if (e.key === 'ArrowRight') onNext();
      if (e.key === 'ArrowLeft') onPrevious();
    };

    document.body.style.overflow = 'hidden';
    window.addEventListener('keydown', handleKeyDown);

    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [onClose, onNext, onPrevious]);

  useEffect(() => {
    // Preload next and previous images
    if (images.length > 0) {
      const nextIdx = (currentIndex + 1) % images.length;
      const prevIdx = (currentIndex - 1 + images.length) % images.length;
      const imgNext = new Image();
      imgNext.src = images[nextIdx].src;
      const imgPrev = new Image();
      imgPrev.src = images[prevIdx].src;
    }
  }, [currentIndex, images]);

  if (!images || images.length === 0) return null;

  const currentImage = images[currentIndex];

  const handleBookService = () => {
    if (currentImage.service) {
      navigate(`/appointment?service=${currentImage.service}`);
    } else {
      navigate('/appointment');
    }
    onClose();
  };

  return (
    <div 
      className="fixed inset-0 z-[9999] bg-brand-900/95 backdrop-blur-xl flex flex-col items-center justify-center" 
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-label="Image gallery"
    >
      <div className="absolute top-0 left-0 right-0 p-4 md:p-6 flex justify-between items-center z-50">
        <div className="text-white font-medium text-sm md:text-base tracking-widest bg-dark-900/50 px-4 py-2 rounded-full border border-white/10 backdrop-blur-md">
          {currentIndex + 1} / {images.length}
        </div>
        <button 
          onClick={onClose} 
          className="text-brand-300 hover:text-white bg-white/5 hover:bg-white/10 rounded-full p-2 transition-colors focus:outline-none focus:ring-2 focus:ring-brand-500"
          aria-label="Close lightbox"
        >
          <X className="w-6 h-6" />
        </button>
      </div>

      <button 
        onClick={(e) => { e.stopPropagation(); onPrevious(); }} 
        className="absolute left-2 md:left-6 text-brand-300 hover:text-white bg-white/5 hover:bg-white/10 rounded-full p-3 transition-colors z-50 focus:outline-none focus:ring-2 focus:ring-brand-500"
        aria-label="Previous image"
      >
        <ChevronLeft className="w-6 h-6 md:w-8 md:h-8" />
      </button>

      <div 
        className="relative w-full max-w-6xl max-h-[75vh] md:max-h-[85vh] px-12 md:px-24 flex items-center justify-center outline-none" 
        onClick={e => e.stopPropagation()}
        onTouchStart={onTouchStart}
        onTouchMove={onTouchMove}
        onTouchEnd={onTouchEnd}
      >
        <img 
          src={currentImage.src} 
          alt={currentImage.alt} 
          className="max-w-full max-h-[70vh] md:max-h-[80vh] object-contain rounded-xl shadow-2xl"
        />
      </div>

      <button 
        onClick={(e) => { e.stopPropagation(); onNext(); }} 
        className="absolute right-2 md:right-6 text-brand-300 hover:text-white bg-white/5 hover:bg-white/10 rounded-full p-3 transition-colors z-50 focus:outline-none focus:ring-2 focus:ring-brand-500"
        aria-label="Next image"
      >
        <ChevronRight className="w-6 h-6 md:w-8 md:h-8" />
      </button>

      <div 
        className="absolute bottom-6 md:bottom-8 left-0 right-0 px-4 flex flex-col md:flex-row items-center justify-center gap-4 z-50"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="text-center md:text-left">
          <p className="text-brand-300 text-xs font-semibold tracking-widest uppercase mb-1">{currentImage.category}</p>
          {currentImage.serviceName && (
            <h3 className="text-white text-lg font-serif">{currentImage.serviceName}</h3>
          )}
        </div>
        <button 
          onClick={handleBookService}
          className="bg-brand-500 hover:bg-brand-400 text-white px-6 py-2.5 rounded-full font-medium transition-colors shadow-lg shadow-brand-500/20 text-sm focus:outline-none focus:ring-2 focus:ring-white"
        >
          {currentImage.service ? "Book This Service" : "Book Appointment"}
        </button>
      </div>
    </div>
  );
}
