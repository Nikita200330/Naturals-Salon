import { useState, useEffect, useMemo, useCallback } from 'react';
import { useLocation, Link, useNavigate } from 'react-router-dom';
import { Search, Star, X, Sparkles, XCircle, Phone, RefreshCw } from 'lucide-react';
import { businessInfo } from '../data/businessInfo';
import { getServices } from '../services/servicesService';

import SEO from '../components/SEO';

export default function Services() {
  const location = useLocation();
  const navigate = useNavigate();
  const queryParams = new URLSearchParams(location.search);
  
  const initialCategory = queryParams.get('category') || 'All';
  const initialSearch = queryParams.get('search') || '';

  const [activeCategory, setActiveCategory] = useState(initialCategory);
  const [searchQuery, setSearchQuery] = useState(initialSearch);
  const [selectedService, setSelectedService] = useState(null);

  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchServices = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      // Backend expects q, but our state is searchQuery
      const params = {};
      // If we wanted to search via API we could pass them, but we'll do local filtering of fetched API data
      const data = await getServices();
      setServices(data.data || []);
    } catch (err) {
      setError(err.message || 'Unable to load services right now.');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    fetchServices();
  }, [fetchServices]);

  // Sync state to URL (optional but good practice for sharing)
  useEffect(() => {
    const params = new URLSearchParams();
    if (activeCategory !== 'All') params.set('category', activeCategory);
    if (searchQuery) params.set('search', searchQuery);
    
    const newSearch = params.toString();
    const currentSearch = location.search.replace('?', '');
    
    if (newSearch !== currentSearch) {
      navigate(`/services${newSearch ? `?${newSearch}` : ''}`, { replace: true });
    }
  }, [activeCategory, searchQuery, navigate, location.search]);

  // Lock body scroll when modal is open
  useEffect(() => {
    if (selectedService) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => { document.body.style.overflow = 'unset'; };
  }, [selectedService]);

  // Close modal on Escape
  useEffect(() => {
    const handleEsc = (e) => {
      if (e.key === 'Escape') setSelectedService(null);
    };
    window.addEventListener('keydown', handleEsc);
    return () => window.removeEventListener('keydown', handleEsc);
  }, []);

  const filteredServices = useMemo(() => {
    return services.filter(service => {
      const matchesCategory = activeCategory === 'All' || service.category === activeCategory;
      const searchLower = searchQuery.toLowerCase();
      const matchesSearch = 
        (service.name || '').toLowerCase().includes(searchLower) ||
        (service.description || '').toLowerCase().includes(searchLower) ||
        (service.category || '').toLowerCase().includes(searchLower);
      return matchesCategory && matchesSearch;
    });
  }, [services, activeCategory, searchQuery]);

  const allCategories = ['All', ...new Set(services.map(s => s.category))];

  const clearFilters = () => {
    setActiveCategory('All');
    setSearchQuery('');
  };

  return (
    <>
      <SEO 
        title="Salon Services in Kalaburagi | Naturals Salon"
        description="Explore haircuts, hairstyling, facials, bridal services, makeup, waxing, manicure, pedicure and grooming services at Naturals Salon Kalaburagi."
        url="/services"
      />
      <div className="pt-28 pb-24 min-h-screen relative overflow-hidden bg-dark-950">
        <div className="absolute top-40 right-0 w-96 h-96 bg-brand-500/10 rounded-full blur-[120px] pointer-events-none"></div>
      <div className="absolute bottom-40 left-0 w-[500px] h-[500px] bg-brand-700/10 rounded-full blur-[150px] pointer-events-none"></div>
      
      <div className="max-w-7xl mx-auto px-4 md:px-8 relative z-10">
        
        {/* Hero Section */}
        <div className="text-center mb-16">
          <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-brand-800/50 border border-brand-500/30 text-brand-300 text-xs font-bold tracking-widest uppercase mb-6 shadow-3d">
             OUR SERVICES
          </span>
          <h1 className="text-4xl md:text-5xl font-serif font-bold mb-6 text-white">
            Hair, Beauty & Grooming Services
          </h1>
          <p className="text-brand-300/80 max-w-2xl mx-auto text-lg leading-relaxed mb-8">
            Explore professional hair, beauty, skin, grooming, bridal and nail services at Naturals Salon, Kalaburagi.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
            <Link to="/appointment" className="btn-primary px-8 py-3.5">
              Book Appointment
            </Link>
            <div className="flex items-center gap-4 text-brand-300/80">
              <div className="flex -space-x-2">
                {[...Array(4)].map((_, i) => (
                  <div key={i} className="w-8 h-8 rounded-full border-2 border-dark-900 bg-brand-800 flex items-center justify-center">
                    <Star className="w-3 h-3 text-gold-400 fill-gold-400" />
                  </div>
                ))}
              </div>
              <span className="text-sm font-medium">Trusted by 1000+ clients</span>
            </div>
          </div>
        </div>

        {/* Filters and Search */}
        <div className="mb-12 space-y-6">
          <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-6">
            <div className="flex flex-wrap items-center gap-2 md:gap-3 w-full lg:w-auto">
              {allCategories.map(category => (
                <button
                  key={category}
                  onClick={() => setActiveCategory(category)}
                  className={`px-5 py-2.5 rounded-xl text-sm font-semibold transition-all duration-300 ${
                    activeCategory === category
                      ? 'bg-brand-600 text-white shadow-[0_0_20px_rgba(142,97,214,0.3)] border border-brand-500/50'
                      : 'bg-dark-800/50 text-brand-300/70 border border-white/5 hover:bg-dark-800 hover:text-brand-300 hover:border-white/10'
                  }`}
                >
                  {category}
                </button>
              ))}
            </div>

            <div className="relative w-full lg:w-72 shrink-0 group">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-brand-300/50 group-focus-within:text-brand-400 transition-colors" />
              <input 
                type="text" 
                placeholder="Search services..." 
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-dark-900/50 border border-white/10 text-white placeholder-brand-300/40 py-3.5 pl-12 pr-4 rounded-xl focus:outline-none focus:border-brand-500/50 focus:ring-1 focus:ring-brand-500/50 transition-all shadow-inner"
              />
            </div>
          </div>

          <div className="flex justify-between items-center max-w-6xl mx-auto pt-4 border-t border-white/5">
            <span className="text-brand-300/70 text-sm">
              {!loading && !error && (
                <>{filteredServices.length} {filteredServices.length === 1 ? 'service' : 'services'} found</>
              )}
            </span>
            {(searchQuery || activeCategory !== 'All') && (
              <button 
                onClick={clearFilters}
                className="text-xs font-semibold text-brand-400 hover:text-white transition-colors uppercase tracking-wider"
              >
                Clear Filters
              </button>
            )}
          </div>
        </div>

        {/* Content Area */}
        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 animate-pulse">
            {[...Array(6)].map((_, i) => (
              <div key={i} className="glass-panel card-3d p-0 overflow-hidden border border-white/5 h-[420px]">
                <div className="h-48 bg-white/5 w-full"></div>
                <div className="p-6">
                  <div className="h-6 bg-white/5 rounded w-3/4 mb-4"></div>
                  <div className="h-4 bg-white/5 rounded w-full mb-2"></div>
                  <div className="h-4 bg-white/5 rounded w-5/6 mb-6"></div>
                  <div className="h-8 bg-white/5 rounded w-1/2 mb-6"></div>
                  <div className="flex gap-3">
                    <div className="h-12 bg-white/5 rounded-xl flex-1"></div>
                    <div className="h-12 bg-white/5 rounded-xl flex-1"></div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : error ? (
          <div className="text-center py-24 bg-dark-900/30 rounded-3xl border border-white/5 max-w-2xl mx-auto">
            <XCircle className="w-16 h-16 text-red-500/50 mx-auto mb-6" />
            <h3 className="text-2xl font-serif font-bold text-white mb-3">Unable to load services right now</h3>
            <p className="text-brand-300/70 mb-8">
              {error}
            </p>
            <button onClick={fetchServices} className="btn-primary flex items-center gap-2 mx-auto">
              <RefreshCw className="w-4 h-4" />
              Retry
            </button>
          </div>
        ) : services.length === 0 ? (
          <div className="text-center py-24 bg-dark-900/30 rounded-3xl border border-white/5 max-w-2xl mx-auto">
            <XCircle className="w-16 h-16 text-brand-500/50 mx-auto mb-6" />
            <h3 className="text-2xl font-serif font-bold text-white mb-3">No services are currently available</h3>
            <p className="text-brand-300/70 mb-8">
              Please check back later or contact the salon.
            </p>
            <Link to="/contact" className="btn-primary inline-flex">
              Contact Us
            </Link>
          </div>
        ) : filteredServices.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
            {filteredServices.map(service => (
              <div 
                key={service.id}
                className="glass-panel card-3d flex flex-col h-full transform transition-all duration-300 md:hover:-translate-y-2 md:hover:shadow-[0_15px_40px_rgba(142,97,214,0.15)] overflow-hidden p-0 border border-white/5 hover:border-brand-500/30 group"
              >
                <div className="relative h-48 w-full overflow-hidden shrink-0">
                  <div className="absolute inset-0 bg-dark-950/40 group-hover:bg-transparent transition-colors z-10" />
                  {service.image ? (
                    <img src={service.image} alt={service.name} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" loading="lazy" />
                  ) : (
                    <div className="w-full h-full bg-brand-900 flex items-center justify-center">
                      <Sparkles className="w-8 h-8 text-brand-500/50" />
                    </div>
                  )}
                  <span className="absolute top-4 right-4 z-20 text-[10px] font-bold uppercase tracking-wider text-brand-100 bg-dark-900/80 backdrop-blur-md px-3 py-1.5 rounded-full border border-white/10 shadow-lg">
                    {service.category}
                  </span>
                </div>

                <div className="p-6 flex flex-col flex-grow">
                  <h3 className="text-xl font-bold text-white mb-2 group-hover:text-brand-300 transition-colors">
                    {service.name}
                  </h3>
                  
                  <p className="text-brand-300/70 text-sm mb-6 flex-grow leading-relaxed">
                    {service.description}
                  </p>
                  
                  <div className="mb-6">
                    <span className="text-xs font-medium text-gold-400/90 bg-gold-400/10 px-3 py-1.5 rounded-lg border border-gold-400/20">
                      Contact salon for pricing
                    </span>
                  </div>

                  <div className="flex gap-3 mt-auto">
                    <button 
                      onClick={() => setSelectedService(service)}
                      className="flex-1 py-3 text-sm font-semibold text-brand-300 bg-dark-800 hover:bg-dark-700 rounded-xl transition-colors border border-white/5"
                    >
                      View Details
                    </button>
                    <Link 
                      to={`/appointment?service=${encodeURIComponent(service.slug || service.id)}`}
                      className="flex-1 py-3 text-sm font-semibold text-white bg-brand-600 hover:bg-brand-500 rounded-xl transition-colors text-center shadow-lg"
                    >
                      Book
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-24 bg-dark-900/30 rounded-3xl border border-white/5 max-w-2xl mx-auto">
            <XCircle className="w-16 h-16 text-brand-500/50 mx-auto mb-6" />
            <h3 className="text-2xl font-serif font-bold text-white mb-3">No services found</h3>
            <p className="text-brand-300/70 mb-8">
              We couldn't find a service matching "{searchQuery}".
            </p>
            <div className="flex justify-center gap-4">
              <button onClick={clearFilters} className="btn-primary bg-dark-800 text-white border border-white/10 hover:bg-dark-700 shadow-none">
                Clear Search
              </button>
              <Link to="/appointment" className="btn-primary">
                Book General Appointment
              </Link>
            </div>
          </div>
        )}

      </div>

      {/* Service Detail Modal */}
      {selectedService && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-6">
          <div 
            className="absolute inset-0 bg-black/80 backdrop-blur-sm"
            onClick={() => setSelectedService(null)}
          ></div>
          <div 
            className="relative w-full max-w-lg bg-dark-900 rounded-3xl shadow-2xl border border-white/10 overflow-hidden animate-in zoom-in-95 duration-200"
            role="dialog"
            aria-modal="true"
            aria-labelledby="modal-title"
          >
            {selectedService.image && (
              <div className="w-full h-48 md:h-56 relative overflow-hidden">
                <img src={selectedService.image} alt={selectedService.name} className="w-full h-full object-cover" />
                <div className="absolute inset-0 bg-gradient-to-t from-dark-900 via-transparent to-transparent"></div>
              </div>
            )}
            
            <div className={`p-6 md:p-8 ${selectedService.image ? 'pt-2' : ''}`}>
              <button 
                onClick={() => setSelectedService(null)}
                className={`absolute right-4 top-4 md:right-6 md:top-6 ${selectedService.image ? 'bg-dark-900/50 backdrop-blur-md rounded-full p-2 text-white hover:bg-dark-800' : 'text-brand-300/50 hover:text-white'} transition-colors z-10`}
                aria-label="Close details"
              >
                <X className="w-6 h-6" />
              </button>
              
              <div className="mb-2">
                <span className="text-[10px] font-bold uppercase tracking-wider text-brand-400">
                  {selectedService.category}
                </span>
              </div>
              
              <h2 id="modal-title" className="text-2xl md:text-3xl font-serif font-bold text-white mb-4">
                {selectedService.name}
              </h2>
              
              <p className="text-brand-300/80 text-base leading-relaxed mb-8">
                {selectedService.description}
              </p>
              
              <div className="bg-dark-800/50 rounded-xl p-5 mb-8 border border-white/5">
                <div className="flex justify-between items-center mb-2">
                  <span className="text-sm text-brand-300/70">Price</span>
                  <span className="text-sm font-semibold text-gold-400">Contact salon for pricing</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-brand-300/70">Location</span>
                  <span className="text-sm font-semibold text-white">Naturals Salon, Kalaburagi</span>
                </div>
              </div>
              
              <div className="flex flex-col sm:flex-row gap-4">
                <Link 
                  to={`/appointment?service=${encodeURIComponent(selectedService.slug || selectedService.id)}`}
                  className="btn-primary flex-1 text-center justify-center"
                >
                  Book This Service
                </Link>
                <a 
                  href={`tel:${businessInfo.phone}`}
                  className="flex-1 py-3.5 rounded-xl font-semibold text-white bg-dark-800 hover:bg-dark-700 transition-colors border border-white/10 flex items-center justify-center gap-2"
                >
                  <Phone className="w-4 h-4" /> Call Salon
                </a>
              </div>
            </div>
          </div>
        </div>
      )}

    </div>
    </>
  );
}
