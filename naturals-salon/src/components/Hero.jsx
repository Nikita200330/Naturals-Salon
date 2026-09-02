import { Star, Sparkles, Calendar, Phone, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { businessInfo } from '../data/businessInfo';
import heroImage from '../assets/salon/hero.jpg';

export default function Hero() {
  return (
    <section className="relative w-full min-h-[90vh] flex items-center justify-start lg:px-12 py-20 lg:py-24 overflow-hidden bg-brand-950">
      {/* Background with Depth */}
      <div className="absolute inset-0 z-0">
        <div 
          className="absolute inset-0 z-10" 
          style={{
            background: 'linear-gradient(90deg, rgba(15, 3, 30, 0.85) 0%, rgba(15, 3, 30, 0.45) 25%, rgba(15, 3, 30, 0.12) 45%, rgba(15, 3, 30, 0.02) 70%, transparent 100%)'
          }} 
        />
        <div className="absolute inset-0 bg-gradient-to-t from-brand-950 via-transparent to-transparent z-10 pointer-events-none" />
        
        {/* Subtle radial purple lighting */}
        <div className="absolute -top-40 -left-40 w-[600px] h-[600px] bg-brand-600/20 rounded-full blur-[100px] pointer-events-none mix-blend-screen" />
        
        <img 
          src={heroImage} 
          alt="Naturals Salon Interior" 
          className="w-full h-full object-cover object-[70%_center] lg:object-[75%_center] xl:object-[80%_center]"
          onError={(e) => { e.target.src = 'https://images.unsplash.com/photo-1521590832167-7bfc17484d20?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80' }}
        />
      </div>

      {/* Content Container */}
      <div className="relative z-20 w-full max-w-7xl mx-auto px-4 md:px-8">
        <div className="w-full md:max-w-xl lg:max-w-[40%] xl:max-w-[38%] bg-brand-900/30 backdrop-blur-md border border-brand-400/30 rounded-3xl p-6 md:p-8 lg:p-10 shadow-[0_20px_40px_rgba(0,0,0,0.4)]">
          
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-brand-800/60 border border-brand-500/30 text-gold-300 text-xs font-bold tracking-widest uppercase mb-6 shadow-sm">
            <Sparkles className="w-4 h-4" /> 
            <span>NATURALS SALON • KALABURAGI</span>
          </div>
          
          <h1 className="text-5xl md:text-6xl lg:text-7xl font-serif font-bold mb-4 leading-tight text-white drop-shadow-lg">
            {businessInfo.name}
          </h1>
          
          <h2 className="text-xl md:text-3xl text-brand-200 font-medium mb-4 drop-shadow-md">
            Hair. Beauty. Grooming. Bridal.
          </h2>
          
          <p className="text-base md:text-lg text-light-300 mb-8 max-w-lg leading-relaxed">
            Professional hair, beauty, skin, grooming and bridal services in Kalaburagi.
          </p>
          
          <div className="flex items-center gap-3 mb-10">
            <div className="flex items-center text-gold-400 drop-shadow-md">
              {[1,2,3,4,5].map(i => <Star key={i} className="w-5 h-5 fill-current" />)}
            </div>
            <div className="flex flex-col text-sm font-medium">
              <span className="text-white">{businessInfo.googleRating} Rating</span>
              <span className="text-light-400 text-xs">{businessInfo.googleReviewCount} Reviews</span>
            </div>
          </div>
          
          <div className="flex flex-col sm:flex-row gap-4 items-center">
            <Link to="/appointment" className="btn-primary w-full sm:w-auto flex items-center justify-center gap-2 px-8 py-4 text-base font-semibold shadow-[0_0_20px_rgba(142,97,214,0.3)]">
              <Calendar className="w-5 h-5" />
              Book Appointment
            </Link>
            <a href={`tel:${businessInfo.phone}`} className="btn-secondary w-full sm:w-auto flex items-center justify-center gap-2 px-8 py-4 text-base font-semibold">
              <Phone className="w-5 h-5" />
              Call Now
            </a>
          </div>

          <div className="mt-8 border-t border-brand-700/30 pt-6">
            <Link to="/services" className="inline-flex items-center gap-2 text-brand-300 hover:text-white transition-colors text-sm font-medium uppercase tracking-wider group">
              View Services <ArrowRight className="w-4 h-4 transform group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
