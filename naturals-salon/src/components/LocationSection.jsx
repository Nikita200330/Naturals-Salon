import { MapPin, Phone, Calendar, Navigation, Copy, Check } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useState, useEffect, useRef } from 'react';
import { businessInfo } from '../data/businessInfo';

export default function LocationSection() {
  const [copied, setCopied] = useState(false);
  const timerRef = useRef(null);

  useEffect(() => {
    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, []);

  const handleCopyAddress = () => {
    navigator.clipboard.writeText(businessInfo.address.full).then(() => {
      setCopied(true);
      if (timerRef.current) clearTimeout(timerRef.current);
      timerRef.current = setTimeout(() => setCopied(false), 2000);
    });
  };

  return (
    <section className="py-20 px-4 md:px-8 max-w-7xl mx-auto w-full relative">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
        
        {/* Information Side */}
        <div>
          <span className="text-gold-400 text-sm font-bold tracking-[0.2em] uppercase mb-4 block">
            Visit Us
          </span>
          <h2 className="text-3xl md:text-5xl font-serif font-bold text-white mb-6">
            Find Naturals Salon
          </h2>
          
          <div className="bg-brand-900/40 backdrop-blur-md rounded-2xl border border-brand-700/50 p-6 md:p-8 shadow-lg mb-8">
            <div className="flex items-start gap-4 mb-6">
              <div className="w-12 h-12 rounded-xl bg-brand-800/80 flex items-center justify-center border border-brand-600/50 shrink-0">
                <MapPin className="w-6 h-6 text-gold-300" />
              </div>
              <div className="flex-1">
                <div className="flex items-center justify-between gap-4 mb-3">
                  <h3 className="text-xl font-bold text-white">{businessInfo.name}</h3>
                  <button 
                    onClick={handleCopyAddress}
                    className="flex items-center gap-2 text-xs font-semibold text-brand-300 hover:text-white transition-colors bg-brand-800/50 px-3 py-1.5 rounded-lg border border-brand-700/50"
                  >
                    {copied ? <Check className="w-3.5 h-3.5 text-green-400" /> : <Copy className="w-3.5 h-3.5" />}
                    {copied ? 'Copied' : 'Copy Address'}
                  </button>
                </div>
                <p className="text-brand-200 leading-relaxed text-sm select-all">
                  {businessInfo.address.line1}<br/>
                  {businessInfo.address.line2}<br/>
                  {businessInfo.address.line3}<br/>
                  {businessInfo.address.city}, {businessInfo.address.state} {businessInfo.address.pin}
                </p>
              </div>
            </div>
            
            <div className="flex flex-col sm:flex-row gap-4">
              <a 
                href={businessInfo.googleMapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-primary flex-1 flex items-center justify-center gap-2 px-6 py-4 text-sm"
              >
                <Navigation className="w-4 h-4" />
                Get Directions
              </a>
              <a 
                href={`tel:${businessInfo.phone}`}
                className="btn-secondary flex-1 flex items-center justify-center gap-2 px-6 py-4 text-sm"
              >
                <Phone className="w-4 h-4" />
                Call Salon
              </a>
              <Link 
                to="/appointment"
                className="btn-secondary flex-1 flex items-center justify-center gap-2 px-6 py-4 border-brand-600 hover:border-gold-400 text-sm"
              >
                <Calendar className="w-4 h-4" />
                Book
              </Link>
            </div>
          </div>
        </div>

        {/* Maps Graphic / Placeholder Side */}
        <div className="h-[280px] md:h-[350px] lg:h-[400px] xl:h-[500px] relative rounded-3xl overflow-hidden border border-brand-700/50 shadow-[0_10px_30px_rgba(0,0,0,0.3)] group bg-brand-950 flex items-center justify-center">
          {/* Subtle background glow since we don't have an iframe */}
          <div className="absolute inset-0 bg-brand-900/60 z-10"></div>
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-brand-600/20 rounded-full blur-[80px] pointer-events-none mix-blend-screen z-0"></div>
          
          <div className="relative z-20 text-center px-6">
            <div className="w-20 h-20 mx-auto bg-brand-800/80 rounded-full flex items-center justify-center border border-brand-600/50 mb-6 group-hover:scale-110 transition-transform">
              <MapPin className="w-10 h-10 text-gold-400" />
            </div>
            <h3 className="text-2xl font-serif font-bold text-white mb-4">Located in {businessInfo.address.city.split(',')[0]}</h3>
            <p className="text-brand-300 max-w-sm mx-auto mb-6 text-sm">
              Click 'Get Directions' to open our exact location in Google Maps.
            </p>
            <a 
              href={businessInfo.googleMapsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-gold-300 hover:text-gold-100 font-semibold uppercase tracking-wider text-sm inline-flex items-center gap-2"
            >
              Open in Google Maps <Navigation className="w-4 h-4" />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
