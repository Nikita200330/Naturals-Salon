import { Link } from 'react-router-dom';
import { Phone, MapPin, Navigation } from 'lucide-react';
import { businessInfo } from '../data/businessInfo';

const Instagram = ({ className }) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
    <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
  </svg>
);

export default function Footer() {
  return (
    <footer className="bg-brand-900 border-t border-brand-500/20 text-light-200 pt-16 pb-24 md:pb-12 relative overflow-hidden">
      {/* Subtle background glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-[800px] h-[300px] bg-brand-600/10 rounded-full blur-[100px] pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-4 md:px-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-12 relative z-10">
        
        {/* COLUMN 1 - BRAND */}
        <div className="flex flex-col">
          <h3 className="text-2xl font-serif mb-4 text-white tracking-wide">
            <span className="text-gradient">{businessInfo.name}</span>
          </h3>
          <p className="text-brand-300/80 text-sm leading-relaxed mb-6">
            Professional hair, beauty, grooming and bridal services in Kalaburagi.
          </p>
          <div className="flex items-start gap-3 text-sm text-brand-300/80 mb-2">
             <MapPin className="w-5 h-5 text-brand-400 shrink-0 mt-0.5" />
             <address className="not-italic leading-relaxed">
               {businessInfo.address.full}
             </address>
          </div>
          <div className="pl-8 mb-6">
            <a 
              href={businessInfo.googleMapsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-sm text-brand-400 hover:text-brand-300 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-400 rounded"
            >
              <Navigation className="w-4 h-4" /> Get Directions
            </a>
          </div>
        </div>

        {/* COLUMN 2 - QUICK LINKS */}
        <div>
          <h4 className="text-lg font-serif font-medium mb-6 text-white tracking-wide">Quick Links</h4>
          <ul className="space-y-3">
            {['Home', 'Services', 'Gallery', 'Reviews', 'About', 'Contact'].map(link => (
              <li key={link}>
                <Link 
                  to={link === 'Home' ? '/' : `/${link.toLowerCase()}`}
                  className="text-brand-300/80 hover:text-white hover:translate-x-1 inline-block transition-all duration-300 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-400 rounded px-1 -ml-1"
                >
                  {link}
                </Link>
              </li>
            ))}

          </ul>
        </div>

        {/* COLUMN 3 - CONTACT */}
        <div>
          <h4 className="text-lg font-serif font-medium mb-6 text-white tracking-wide">Contact</h4>
          <div className="space-y-5 text-sm">
            <div className="flex items-center gap-3">
               <Phone className="w-5 h-5 text-brand-400 shrink-0" />
               <span className="text-light-200 font-medium tracking-wide">
                 {businessInfo.displayPhone}
               </span>
            </div>
            
            {businessInfo.socials && businessInfo.socials.instagram && (
              <div className="flex items-center gap-3">
                 <Instagram className="w-5 h-5 text-brand-400 shrink-0" />
                 <a 
                   href={businessInfo.socials.instagram}
                   target="_blank" 
                   rel="noopener noreferrer"
                   className="text-light-200 font-medium tracking-wide hover:text-brand-300 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-400 rounded"
                 >
                   naturals.gulbarga
                 </a>
              </div>
            )}
            

          </div>
        </div>

        {/* COLUMN 4 - BUSINESS HOURS */}
        <div>
          <h4 className="text-lg font-serif font-medium mb-6 text-white tracking-wide">Business Hours</h4>
          <ul className="space-y-2 text-sm">
            {businessInfo.openingHours.map((schedule) => (
              <li key={schedule.day} className="flex justify-between items-center py-1 border-b border-white/5 last:border-0">
                <span className="text-light-200">{schedule.day}</span>
                <span className="text-brand-300/80 text-xs font-medium bg-white/5 px-2 py-0.5 rounded">{schedule.hours}</span>
              </li>
            ))}
          </ul>
        </div>

      </div>
      
      {/* FOOTER BOTTOM BAR */}
      <div className="max-w-7xl mx-auto px-4 md:px-8 mt-16 pt-8 border-t border-brand-500/20 flex flex-col md:flex-row items-center justify-between gap-4 text-brand-300/60 text-xs tracking-wider">
        <p>&copy; {new Date().getFullYear()} {businessInfo.name}. All rights reserved.</p>
        <p>Kalaburagi, Karnataka</p>
      </div>
    </footer>
  );
}
