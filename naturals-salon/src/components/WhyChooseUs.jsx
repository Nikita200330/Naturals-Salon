import { Users, Heart, ShieldCheck, Sparkles } from 'lucide-react';
import stylingImg from '../assets/salon/hairstyling-01.jpg';
import interiorImg from '../assets/salon/salon-interior-01.jpg';
import shampooImg from '../assets/salon/shampoo-01.jpg';
import skincareImg from '../assets/salon/skincare-01.jpg';

export default function WhyChooseUs() {
  const reasons = [
    {
      id: 'professionals',
      title: 'Professional Stylists',
      desc: 'Professional care focused on understanding each customer\'s preferred style and service needs.',
      icon: Users,
      image: stylingImg,
    },
    {
      id: 'premium',
      title: 'Premium Salon Experience',
      desc: 'A comfortable, modern and welcoming salon environment.',
      icon: Sparkles,
      image: interiorImg,
    },
    {
      id: 'hygiene',
      title: 'Hygiene & Care',
      desc: 'Clean service spaces and attention to customer comfort.',
      icon: ShieldCheck,
      image: shampooImg,
    },
    {
      id: 'personalized',
      title: 'Personalized Service',
      desc: 'Services tailored to individual hair, skin, beauty and grooming requirements.',
      icon: Heart,
      image: skincareImg,
    }
  ];

  return (
    <section className="py-20 px-4 md:px-8 bg-brand-950/50 relative border-y border-brand-800/30">
      {/* Decorative background blur */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[400px] bg-brand-800/10 rounded-[100%] blur-[120px] pointer-events-none" />
      
      <div className="max-w-7xl mx-auto w-full relative z-10">
        <div className="text-center mb-16">
          <span className="text-gold-400 text-sm font-bold tracking-[0.2em] uppercase mb-4 block">
            Why Choose Us
          </span>
          <h2 className="text-3xl md:text-5xl font-serif font-bold text-white mb-6">
            The Naturals Difference
          </h2>
          <p className="text-brand-200 max-w-2xl mx-auto text-lg">
            Experience exceptional service standards designed around your unique beauty needs.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {reasons.map((reason) => {
            const Icon = reason.icon;
            return (
              <div 
                key={reason.id}
                className="group relative bg-brand-900/60 backdrop-blur-sm border border-brand-700/30 rounded-2xl overflow-hidden hover:-translate-y-2 transition-all duration-500 min-h-[280px]"
              >
                {/* Background Image that appears on hover */}
                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700 z-0">
                  <img 
                    src={reason.image} 
                    alt={reason.title} 
                    className="w-full h-full object-cover scale-110 group-hover:scale-100 transition-transform duration-700"
                  />
                  {/* Overlay to ensure text readability */}
                  <div className="absolute inset-0 bg-gradient-to-t from-brand-950 via-brand-950/80 to-brand-900/60" />
                </div>

                <div className="relative z-10 p-6 h-full flex flex-col">
                  <div className="w-12 h-12 bg-brand-800/80 rounded-xl flex items-center justify-center mb-5 border border-brand-600/30 group-hover:border-gold-500/50 group-hover:bg-brand-800/50 transition-all duration-300">
                    <Icon className="w-5 h-5 text-gold-300 group-hover:scale-110 transition-transform duration-300" />
                  </div>
                  <h3 className="text-lg font-bold text-white mb-3 group-hover:text-gold-300 transition-colors duration-300">
                    {reason.title}
                  </h3>
                  <p className="text-brand-300 text-sm leading-relaxed group-hover:text-brand-100 transition-colors duration-300 mt-auto">
                    {reason.desc}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
