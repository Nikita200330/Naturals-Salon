import { Calendar, Phone } from 'lucide-react';
import { Link } from 'react-router-dom';
import { businessInfo } from '../data/businessInfo';

export default function HomeBookingCTA() {
  return (
    <section className="py-24 px-4 md:px-8 bg-brand-950 relative overflow-hidden">
      {/* Dynamic Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent to-brand-900/50 z-0" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[300px] bg-brand-600/10 rounded-full blur-[100px] pointer-events-none z-0" />
      
      <div className="max-w-4xl mx-auto w-full relative z-10 text-center bg-brand-900/60 backdrop-blur-xl border border-brand-700/50 rounded-3xl p-10 md:p-16 shadow-[0_20px_50px_rgba(0,0,0,0.5)]">
        <h2 className="text-4xl md:text-5xl font-serif font-bold text-white mb-6">
          Ready for Your Next Salon Experience?
        </h2>
        <p className="text-brand-200 text-lg mb-10 max-w-2xl mx-auto">
          Book your preferred service at {businessInfo.name}, {businessInfo.address.city.split(',')[0]}.
        </p>
        
        <div className="flex flex-col sm:flex-row justify-center items-center gap-6">
          <Link to="/appointment" className="btn-primary w-full sm:w-auto flex items-center justify-center gap-2 px-10 py-5 text-lg font-semibold shadow-[0_0_20px_rgba(142,97,214,0.4)] hover:shadow-[0_0_30px_rgba(142,97,214,0.6)] transition-all">
            <Calendar className="w-6 h-6" />
            Book Appointment
          </Link>
          <a href={`tel:${businessInfo.phone}`} className="btn-secondary w-full sm:w-auto flex items-center justify-center gap-2 px-10 py-5 text-lg font-semibold">
            <Phone className="w-6 h-6" />
            Call Now
          </a>
        </div>
      </div>
    </section>
  );
}
