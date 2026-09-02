import { Phone, MapPin, Calendar, Share2 } from 'lucide-react';
import { Link } from 'react-router-dom';
import { businessInfo } from '../data/businessInfo';
import { shareWebsite } from '../utils/share';

export default function QuickActions() {
  const actions = [
    {
      id: 'call',
      title: 'Call',
      desc: 'Reach us instantly',
      icon: Phone,
      type: 'link',
      href: `tel:${businessInfo.phone}`,
    },
    {
      id: 'directions',
      title: 'Directions',
      desc: 'Find our salon',
      icon: MapPin,
      type: 'link',
      href: businessInfo.googleMapsUrl,
      external: true,
    },
    {
      id: 'book',
      title: 'Book',
      desc: 'Reserve a time',
      icon: Calendar,
      type: 'router-link',
      href: '/appointment',
    },
    {
      id: 'share',
      title: 'Share',
      desc: 'Send to a friend',
      icon: Share2,
      type: 'button',
      onClick: shareWebsite,
    }
  ];

  return (
    <section className="relative z-30 -mt-10 mb-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {actions.map((action) => {
          const Icon = action.icon;
          const CardContent = () => (
            <div className="flex items-center gap-4 bg-brand-800/80 backdrop-blur-xl border border-brand-600/30 rounded-2xl p-4 sm:p-5 shadow-lg hover:shadow-[0_10px_30px_rgba(142,97,214,0.2)] hover:-translate-y-1 transition-all duration-300 group">
              <div className="flex-shrink-0 w-12 h-12 bg-brand-700/50 rounded-full flex items-center justify-center border border-brand-500/20 group-hover:bg-brand-600 transition-colors">
                <Icon className="w-5 h-5 text-gold-300" />
              </div>
              <div className="flex flex-col text-left">
                <span className="font-semibold text-white group-hover:text-gold-200 transition-colors">
                  {action.title}
                </span>
                <span className="text-xs text-brand-300 hidden sm:block">
                  {action.desc}
                </span>
              </div>
            </div>
          );

          if (action.type === 'link') {
            return (
              <a
                key={action.id}
                href={action.href}
                target={action.external ? '_blank' : '_self'}
                rel={action.external ? 'noopener noreferrer' : undefined}
                className="block outline-none focus-visible:ring-2 focus-visible:ring-gold-400 rounded-2xl"
                aria-label={action.title}
              >
                <CardContent />
              </a>
            );
          }
          if (action.type === 'router-link') {
            return (
              <Link
                key={action.id}
                to={action.href}
                className="block outline-none focus-visible:ring-2 focus-visible:ring-gold-400 rounded-2xl"
                aria-label={action.title}
              >
                <CardContent />
              </Link>
            );
          }
          return (
            <button
              key={action.id}
              onClick={action.onClick}
              className="block w-full outline-none focus-visible:ring-2 focus-visible:ring-gold-400 rounded-2xl text-left"
              aria-label={action.title}
            >
              <CardContent />
            </button>
          );
        })}
      </div>
    </section>
  );
}
