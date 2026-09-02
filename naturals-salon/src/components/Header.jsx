import { useState, useEffect, useRef } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, Phone } from 'lucide-react';
import { businessInfo } from '../data/businessInfo';
import clsx from 'clsx';

const navLinks = [
  { name: 'Home', path: '/' },
  { name: 'Services', path: '/services' },
  { name: 'Gallery', path: '/gallery' },
  { name: 'Reviews', path: '/reviews' },
  { name: 'About', path: '/about' },
  { name: 'Contact', path: '/contact' },
];

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();
  const menuRef = useRef(null);
  const buttonRef = useRef(null);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    // removed sync setMobileMenuOpen
  }, [location]);

  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = 'hidden';
      const handleEscape = (e) => {
        if (e.key === 'Escape') 
    setMobileMenuOpen(false);
      };
      window.addEventListener('keydown', handleEscape);
      return () => {
        document.body.style.overflow = '';
        window.removeEventListener('keydown', handleEscape);
      };
    } else {
      document.body.style.overflow = '';
    }
  }, [mobileMenuOpen]);

  const handleBackdropClick = (e) => {
    if (menuRef.current && !menuRef.current.contains(e.target) && buttonRef.current && !buttonRef.current.contains(e.target)) {
      setMobileMenuOpen(false);
    }
  };

  return (
    <header className={clsx(
      'fixed top-0 w-full z-50 transition-all duration-300',
      isScrolled 
        ? 'bg-brand-900/90 backdrop-blur-xl border-b border-brand-500/20 shadow-[0_4px_30px_rgba(0,0,0,0.4)] py-3' 
        : 'bg-transparent py-5'
    )}>
      <div className="max-w-7xl mx-auto px-4 md:px-8 flex items-center justify-between">
        
        {/* Logo / Brand */}
        <Link to="/" className="flex flex-col z-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-400 rounded">
          <span className="text-2xl font-serif font-bold text-white tracking-wide text-gradient">
            {businessInfo.name}
          </span>
          <span className="text-[10px] uppercase tracking-[0.2em] text-brand-300/80 -mt-1">Kalaburagi</span>
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden lg:flex items-center gap-6 xl:gap-8" aria-label="Main Navigation">
          {navLinks.map((link) => {
            const isActive = location.pathname === link.path;
            return (
              <Link 
                key={link.name} 
                to={link.path}
                className="relative text-[15px] font-medium transition-all group py-2 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-400 rounded px-1"
                aria-current={isActive ? 'page' : undefined}
              >
                <span className={clsx(
                  "transition-colors duration-300",
                  isActive ? "text-brand-300 drop-shadow-[0_0_8px_rgba(177,143,240,0.5)]" : "text-light-200 group-hover:text-white"
                )}>
                  {link.name}
                </span>
                {/* Active Indicator */}
                <span className={clsx(
                  "absolute bottom-0 left-1/2 -translate-x-1/2 h-0.5 rounded-full transition-all duration-300 shadow-glow bg-brand-400",
                  isActive ? "w-full opacity-100" : "w-0 opacity-0 group-hover:w-full group-hover:opacity-30"
                )}></span>
              </Link>
            );
          })}
        </nav>

        {/* Right Actions (Desktop) */}
        <div className="hidden lg:flex items-center gap-4">
          <a 
            href={`tel:${businessInfo.phone}`} 
            className="btn-secondary py-2 px-5 text-sm flex items-center gap-2"
            aria-label="Call Now"
          >
            <Phone className="w-4 h-4" />
            <span>Call Now</span>
          </a>
          <Link 
            to="/appointment" 
            className="btn-primary py-2 px-6 text-sm"
          >
            Book Appointment
          </Link>
        </div>

        {/* Mobile Menu Button */}
        <button 
          ref={buttonRef}
          className="lg:hidden z-50 p-2.5 rounded-xl bg-white/5 border border-white/10 text-light-200 hover:text-white hover:bg-white/10 transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-400 flex items-center justify-center min-w-[44px] min-h-[44px]"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          aria-expanded={mobileMenuOpen}
          aria-label={mobileMenuOpen ? "Close menu" : "Open menu"}
        >
          {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>

      </div>

      {/* Mobile Drawer Backdrop */}
      <div 
        className={clsx(
          "lg:hidden fixed inset-0 bg-black/60 backdrop-blur-sm transition-opacity duration-300 z-[90]",
          mobileMenuOpen ? "opacity-100" : "opacity-0 pointer-events-none"
        )}
        onClick={handleBackdropClick}
        aria-hidden="true"
      />

      {/* Mobile Drawer */}
      <div 
        ref={menuRef}
        className={clsx(
          "lg:hidden fixed inset-y-0 right-0 w-[280px] sm:w-[320px] bg-brand-900/95 backdrop-blur-2xl border-l border-brand-500/20 shadow-[-10px_0_30px_rgba(0,0,0,0.5)] transition-transform duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] z-[100] flex flex-col",
          mobileMenuOpen ? "translate-x-0" : "translate-x-full"
        )}
      >
        <div className="flex items-center px-6 h-[88px] border-b border-white/5 shrink-0">
          <span className="text-xl font-serif font-bold text-white tracking-wide text-gradient">Menu</span>
        </div>
        
        <nav className="flex-1 overflow-y-auto px-6 py-6 flex flex-col gap-1" aria-label="Mobile Navigation">
          {navLinks.map((link) => {
             const isActive = location.pathname === link.path;
             return (
              <Link 
                key={link.name} 
                to={link.path}
                className={clsx(
                  "text-lg font-serif py-3.5 px-4 rounded-xl transition-all duration-300 flex items-center",
                  isActive 
                    ? "bg-brand-500/20 text-brand-300 border border-brand-500/30 font-medium shadow-[inset_0_0_12px_rgba(177,143,240,0.1)]" 
                    : "text-light-200 hover:bg-white/5 hover:text-white"
                )}
                aria-current={isActive ? 'page' : undefined}
              >
                {link.name}
              </Link>
            )
          })}
          
          <div className="mt-8 flex flex-col gap-4 border-t border-white/5 pt-8">
             <Link to="/appointment" className="btn-primary w-full text-center py-3.5">
               Book Appointment
             </Link>
             <a href={`tel:${businessInfo.phone}`} className="btn-secondary w-full text-center py-3.5 flex items-center justify-center gap-2">
               <Phone className="w-5 h-5" />
               Call Now
             </a>
          </div>
        </nav>
      </div>
    </header>
  );
}
