import { Link } from 'react-router-dom';
import { businessInfo } from '../data/businessInfo';
import { galleryData as galleryImages } from '../data/gallery';
import { MapPin, Clock, Calendar, CheckCircle, ChevronRight, Star } from 'lucide-react';
import LocationSection from '../components/LocationSection';
import SEO from '../components/SEO';

export default function About() {
  const schemaData = {
    "@context": "https://schema.org",
    "@type": "BeautySalon",
    "name": businessInfo.name,
    "url": businessInfo.websiteUrl,
    "telephone": businessInfo.phone,
    "address": {
      "@type": "PostalAddress",
      "streetAddress": "Shop no 1-6, Prime Mall, Plot no 1-72, Station Rd, opp. KEB Office, Shambhognlli",
      "addressLocality": "Kalaburagi",
      "addressRegion": "Karnataka",
      "postalCode": "585102",
      "addressCountry": "IN"
    },
    "openingHoursSpecification": businessInfo.openingHours.map(hours => ({
      "@type": "OpeningHoursSpecification",
      "dayOfWeek": hours.day,
      "opens": "09:00",
      "closes": "21:00"
    })),
    "aggregateRating": {
      "@type": "AggregateRating",
      "ratingValue": businessInfo.googleRating,
      "reviewCount": businessInfo.googleReviewCount
    }
  };

  return (
    <>
      <SEO 
        title="About Naturals Salon Kalaburagi | Hair & Beauty Services"
        description="Learn about Naturals Salon in Prime Mall, Kalaburagi and explore available hair, beauty, bridal, grooming, waxing and nail services."
        url="/about"
        schemaData={schemaData}
      />
      <div className="pt-32 pb-24 min-h-screen relative overflow-hidden">
        {/* About Hero */}
        <div className="max-w-4xl mx-auto px-4 md:px-8 relative z-10 text-center mb-16">
          <span className="inline-block px-4 py-2 rounded-full bg-brand-800/50 border border-brand-500/30 text-brand-300 text-xs font-bold tracking-widest uppercase mb-6 shadow-3d">
            ABOUT NATURALS SALON
          </span>
          <h1 className="text-4xl md:text-5xl font-serif font-bold mb-6 text-gradient leading-tight">
            Beauty, Grooming & Salon Care in Kalaburagi
          </h1>
          <p className="text-brand-300/80 text-lg leading-relaxed max-w-2xl mx-auto mb-8">
            Naturals Salon offers hair, beauty, skin, grooming, bridal, nail and waxing services for customers in Kalaburagi.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link to="/services" className="btn-primary w-full sm:w-auto">
              Explore Services
            </Link>
            <Link to="/appointment" className="btn-secondary w-full sm:w-auto">
              Book Appointment
            </Link>
          </div>
        </div>

        {/* About Naturals Salon Section */}
        <div className="max-w-4xl mx-auto px-4 md:px-8 relative z-10 mb-20">
          <div className="card-3d">
            <h2 className="text-3xl font-serif font-bold mb-6 text-white text-center">About Naturals Salon</h2>
            <p className="text-light-200/90 text-lg leading-relaxed text-center">
              Naturals Salon in Kalaburagi provides a range of hair, beauty, grooming, bridal, skin, nail and waxing services. Located at Shop no 1-6, Prime Mall on Station Rd, the salon is open every day from 9:00 AM to 9:00 PM.
            </p>
          </div>
        </div>

        {/* What We Offer */}
        <div className="max-w-6xl mx-auto px-4 md:px-8 relative z-10 mb-20">
          <h2 className="text-3xl font-serif font-bold mb-10 text-white text-center">What We Offer</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <Link to="/services?category=hair" className="card-3d hover:-translate-y-1 transition-transform group">
              <h3 className="text-xl font-bold text-white mb-2 group-hover:text-brand-300 transition-colors">Hair Services</h3>
              <p className="text-brand-300/80 mb-4">Haircuts, styling, balayage, blow dry and hair care.</p>
              <span className="text-brand-400 flex items-center text-sm font-semibold uppercase tracking-wider">
                View Services <ChevronRight className="w-4 h-4 ml-1" />
              </span>
            </Link>
            <Link to="/services?category=beauty" className="card-3d hover:-translate-y-1 transition-transform group">
              <h3 className="text-xl font-bold text-white mb-2 group-hover:text-brand-300 transition-colors">Beauty & Skin</h3>
              <p className="text-brand-300/80 mb-4">Facials, skin care, acne-focused salon care and eyebrow beautification.</p>
              <span className="text-brand-400 flex items-center text-sm font-semibold uppercase tracking-wider">
                View Services <ChevronRight className="w-4 h-4 ml-1" />
              </span>
            </Link>
            <Link to="/services?category=bridal" className="card-3d hover:-translate-y-1 transition-transform group">
              <h3 className="text-xl font-bold text-white mb-2 group-hover:text-brand-300 transition-colors">Bridal & Makeup</h3>
              <p className="text-brand-300/80 mb-4">Bridal services and makeup services.</p>
              <span className="text-brand-400 flex items-center text-sm font-semibold uppercase tracking-wider">
                View Services <ChevronRight className="w-4 h-4 ml-1" />
              </span>
            </Link>
            <Link to="/services?category=waxing" className="card-3d hover:-translate-y-1 transition-transform group">
              <h3 className="text-xl font-bold text-white mb-2 group-hover:text-brand-300 transition-colors">Waxing & Hair Removal</h3>
              <p className="text-brand-300/80 mb-4">Waxing, body waxing, Brazilian waxing and eyebrow threading.</p>
              <span className="text-brand-400 flex items-center text-sm font-semibold uppercase tracking-wider">
                View Services <ChevronRight className="w-4 h-4 ml-1" />
              </span>
            </Link>
            <Link to="/services?category=nails" className="card-3d hover:-translate-y-1 transition-transform group">
              <h3 className="text-xl font-bold text-white mb-2 group-hover:text-brand-300 transition-colors">Nail Care</h3>
              <p className="text-brand-300/80 mb-4">Manicure and pedicure.</p>
              <span className="text-brand-400 flex items-center text-sm font-semibold uppercase tracking-wider">
                View Services <ChevronRight className="w-4 h-4 ml-1" />
              </span>
            </Link>
            <Link to="/services?category=grooming" className="card-3d hover:-translate-y-1 transition-transform group">
              <h3 className="text-xl font-bold text-white mb-2 group-hover:text-brand-300 transition-colors">Grooming</h3>
              <p className="text-brand-300/80 mb-4">Haircut and shaving services.</p>
              <span className="text-brand-400 flex items-center text-sm font-semibold uppercase tracking-wider">
                View Services <ChevronRight className="w-4 h-4 ml-1" />
              </span>
            </Link>
          </div>
        </div>

        {/* Salon Experience */}
        <div className="max-w-4xl mx-auto px-4 md:px-8 relative z-10 mb-20 text-center">
          <h2 className="text-3xl font-serif font-bold mb-6 text-white">Salon Experience</h2>
          <p className="text-light-200/90 text-lg leading-relaxed mb-8">
            Enjoy a comfortable salon environment with personalized service selection. We provide various hair and beauty care options with easy appointment requests in a convenient Kalaburagi location, open daily.
          </p>
        </div>

        {/* Why Customers Visit */}
        <div className="max-w-6xl mx-auto px-4 md:px-8 relative z-10 mb-20">
          <h2 className="text-3xl font-serif font-bold mb-10 text-white text-center">Why Customers Visit</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="card-3d flex items-start gap-4">
              <div className="w-12 h-12 rounded-full bg-brand-800/80 border border-brand-500/30 flex items-center justify-center text-brand-400 flex-shrink-0">
                <CheckCircle className="w-6 h-6" />
              </div>
              <div>
                <h3 className="text-xl font-bold text-white mb-2">Wide Range of Services</h3>
                <p className="text-brand-300/80">Hair, beauty, bridal, grooming, waxing and nail options.</p>
              </div>
            </div>
            <div className="card-3d flex items-start gap-4">
              <div className="w-12 h-12 rounded-full bg-brand-800/80 border border-brand-500/30 flex items-center justify-center text-brand-400 flex-shrink-0">
                <MapPin className="w-6 h-6" />
              </div>
              <div>
                <h3 className="text-xl font-bold text-white mb-2">Convenient Location</h3>
                <p className="text-brand-300/80">Located at {businessInfo.address.line1}, {businessInfo.address.city}.</p>
              </div>
            </div>
            <div className="card-3d flex items-start gap-4">
              <div className="w-12 h-12 rounded-full bg-brand-800/80 border border-brand-500/30 flex items-center justify-center text-brand-400 flex-shrink-0">
                <Clock className="w-6 h-6" />
              </div>
              <div>
                <h3 className="text-xl font-bold text-white mb-2">Open Every Day</h3>
                <p className="text-brand-300/80">9:00 AM – 9:00 PM, Monday through Sunday.</p>
              </div>
            </div>
            <div className="card-3d flex items-start gap-4">
              <div className="w-12 h-12 rounded-full bg-brand-800/80 border border-brand-500/30 flex items-center justify-center text-brand-400 flex-shrink-0">
                <Calendar className="w-6 h-6" />
              </div>
              <div>
                <h3 className="text-xl font-bold text-white mb-2">Easy Appointment Requests</h3>
                <p className="text-brand-300/80">Choose a service and request your preferred date/time online.</p>
              </div>
            </div>
          </div>
        </div>

        {/* Gallery Visual Strip */}
        <div className="mb-20">
          <div className="max-w-6xl mx-auto px-4 md:px-8 mb-6 flex justify-between items-end">
            <h2 className="text-3xl font-serif font-bold text-white">Salon Gallery</h2>
            <Link to="/gallery" className="text-brand-400 hover:text-brand-300 flex items-center text-sm font-semibold uppercase tracking-wider hidden sm:flex">
              View Gallery <ChevronRight className="w-4 h-4 ml-1" />
            </Link>
          </div>
          <div className="flex overflow-x-auto gap-4 px-4 md:px-8 pb-8 snap-x hide-scrollbar">
            {galleryImages.slice(0, 4).map((img, idx) => (
              <div key={idx} className="w-[280px] md:w-[320px] h-[200px] md:h-[240px] flex-shrink-0 rounded-2xl overflow-hidden snap-center border border-white/5 relative">
                <img src={img.src} alt={img.title || "Salon Photo"} className="w-full h-full object-cover" />
              </div>
            ))}
          </div>
          <div className="px-4 text-center sm:hidden">
            <Link to="/gallery" className="btn-secondary inline-block">
              View Gallery
            </Link>
          </div>
        </div>

        {/* Reviews Trust Strip */}
        <div className="max-w-4xl mx-auto px-4 md:px-8 relative z-10 mb-20 text-center">
          <div className="card-3d flex flex-col md:flex-row items-center justify-center gap-8 py-10">
            <div className="flex flex-col items-center">
              <div className="flex gap-1 text-yellow-500 mb-2">
                {[...Array(5)].map((_, i) => <Star key={i} className="w-6 h-6 fill-current" />)}
              </div>
              <div className="text-4xl font-bold text-white mb-1">{businessInfo.googleRating} / 5</div>
              <div className="text-brand-300/80">{businessInfo.googleReviewCount} Google Reviews</div>
            </div>
            <div className="hidden md:block w-px h-24 bg-white/10"></div>
            <div>
              <Link to="/reviews" className="btn-primary">
                Read Customer Reviews
              </Link>
            </div>
          </div>
        </div>

        {/* Location Section */}
        <div className="mb-20">
          <LocationSection />
        </div>

        {/* Final Booking CTA */}
        <div className="max-w-4xl mx-auto px-4 md:px-8 relative z-10 text-center">
          <div className="card-3d bg-brand-900/40 border-brand-500/40 py-12">
            <h2 className="text-3xl font-serif font-bold mb-4 text-white">Find the Right Service for You</h2>
            <p className="text-brand-300/80 text-lg mb-8 max-w-xl mx-auto">
              Explore salon services and request your preferred appointment at Naturals Salon, Kalaburagi.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link to="/services" className="btn-secondary w-full sm:w-auto">
                Explore Services
              </Link>
              <Link to="/appointment" className="btn-primary w-full sm:w-auto">
                Book Appointment
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
