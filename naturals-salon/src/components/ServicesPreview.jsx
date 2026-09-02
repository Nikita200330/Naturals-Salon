import { Scissors, Sparkles, Gem, Wind, Flower2, User } from 'lucide-react';
import { Link } from 'react-router-dom';

import haircutImg from '../assets/salon/haircut-01.jpg';
import beautyImg from '../assets/salon/beauty-01.jpg';
import bridalImg from '../assets/salon/bridal-01.jpg';
import waxingImg from '../assets/salon/waxing-01.jpg';
import nailsImg from '../assets/salon/nails-01.jpg';
import groomingImg from '../assets/salon/grooming-01.jpg';

export default function ServicesPreview() {
  const categories = [
    {
      id: 'Hair',
      name: 'Hair',
      desc: 'Haircut, Hairstyling, Balayage, Blow Dry',
      icon: Scissors,
      image: haircutImg,
    },
    {
      id: 'Beauty & Skin',
      name: 'Beauty & Skin',
      desc: 'Facials, Acne Treatments, Skin Care',
      icon: Sparkles,
      image: beautyImg,
    },
    {
      id: 'Bridal & Makeup',
      name: 'Bridal & Makeup',
      desc: 'Bridal Services, Makeup Services',
      icon: Gem,
      image: bridalImg,
    },
    {
      id: 'Waxing',
      name: 'Waxing',
      desc: 'Body Waxing, Brazilian Waxing, Waxing',
      icon: Wind,
      image: waxingImg,
    },
    {
      id: 'Nails',
      name: 'Nails',
      desc: 'Manicure, Pedicure',
      icon: Flower2,
      image: nailsImg,
    },
    {
      id: 'Grooming',
      name: 'Men\'s Grooming',
      desc: 'Haircut, Shaving, Grooming',
      icon: User,
      image: groomingImg,
    }
  ];

  return (
    <section className="py-20 px-4 md:px-8 max-w-7xl mx-auto w-full">
      <div className="text-center mb-16">
        <span className="text-gold-400 text-sm font-bold tracking-[0.2em] uppercase mb-4 block">
          Our Services
        </span>
        <h2 className="text-3xl md:text-5xl font-serif font-bold text-white mb-6">
          Beauty & Grooming Services
        </h2>
        <p className="text-brand-200 max-w-2xl mx-auto text-lg">
          Explore our wide range of professional treatments designed to elevate your style and well-being.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
        {categories.map((cat) => {
          const Icon = cat.icon;
          return (
            <div 
              key={cat.id} 
              className="relative group bg-brand-900/40 backdrop-blur-md rounded-2xl border border-brand-500/20 shadow-lg hover:shadow-[0_15px_40px_rgba(142,97,214,0.15)] hover:-translate-y-2 transition-all duration-300 overflow-hidden flex flex-col"
            >
              {/* Subtle top highlight */}
              <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-brand-400/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity z-10" />
              
              {/* Image Section */}
              <div className="relative h-48 overflow-hidden">
                <img 
                  src={cat.image} 
                  alt={cat.name} 
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" 
                />
                <div className="absolute inset-0 bg-brand-900/40 mix-blend-multiply group-hover:bg-brand-900/20 transition-colors duration-500" />
                
                <div className="absolute bottom-4 left-6 w-12 h-12 bg-brand-800/90 backdrop-blur-sm rounded-xl flex items-center justify-center border border-brand-500/30 shadow-lg group-hover:scale-110 transition-transform">
                  <Icon className="w-5 h-5 text-gold-300" />
                </div>
              </div>
              
              {/* Content Section */}
              <div className="p-6 flex-1 flex flex-col">
                <h3 className="text-xl font-bold text-white mb-3 group-hover:text-gold-200 transition-colors">
                  {cat.name}
                </h3>
                
                <p className="text-brand-200 text-sm mb-6 flex-1 leading-relaxed">
                  {cat.desc}
                </p>
                
                <Link 
                  to={`/services?category=${encodeURIComponent(cat.id)}`} 
                  className="inline-flex items-center text-sm font-semibold text-brand-300 group-hover:text-gold-300 transition-colors mt-auto"
                >
                  Explore {cat.name} <span className="ml-2 transition-transform group-hover:translate-x-1">→</span>
                </Link>
              </div>
            </div>
          );
        })}
      </div>

      <div className="mt-16 text-center">
        <Link to="/services" className="btn-primary inline-flex items-center justify-center px-10 py-4 text-lg">
          View All Services
        </Link>
      </div>
    </section>
  );
}
