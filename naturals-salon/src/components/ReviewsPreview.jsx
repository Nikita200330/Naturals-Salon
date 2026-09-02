import { Star, MessageSquare } from 'lucide-react';
import { Link } from 'react-router-dom';
import { businessInfo } from '../data/businessInfo';
import { reviews } from '../data/reviews';

export default function ReviewsPreview() {
  return (
    <section className="py-20 px-4 md:px-8 max-w-7xl mx-auto w-full relative">
      <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-8">
        <div>
          <span className="text-gold-400 text-sm font-bold tracking-[0.2em] uppercase mb-4 block">
            Client Experiences
          </span>
          <h2 className="text-3xl md:text-5xl font-serif font-bold text-white mb-6">
            Trusted by the Community
          </h2>
          
          {/* Google Review Summary */}
          <div className="flex items-center gap-4 bg-brand-900/50 p-4 rounded-xl border border-brand-700/50 inline-flex">
            <div className="flex flex-col items-center justify-center bg-brand-800 rounded-lg p-3">
              <span className="text-2xl font-bold text-white">{businessInfo.googleRating}</span>
              <div className="flex text-gold-400 mt-1">
                {[1,2,3,4,5].map(i => (
                  <Star key={i} className="w-3 h-3 fill-current" />
                ))}
              </div>
            </div>
            <div className="flex flex-col">
              <span className="text-white font-medium">Google Reviews</span>
              <span className="text-brand-300 text-sm">Based on {businessInfo.googleReviewCount} reviews</span>
            </div>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row gap-4">
          <Link to="/reviews" className="btn-primary px-6 py-3 text-sm">
            View All Reviews
          </Link>
          <a href="#feedback" className="btn-secondary px-6 py-3 text-sm flex items-center justify-center gap-2">
            <MessageSquare className="w-4 h-4" />
            Write Feedback
          </a>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {reviews.slice(0, 4).map((review) => (
          <div 
            key={review.id} 
            className="bg-brand-900/40 backdrop-blur-md rounded-2xl p-6 border border-brand-700/30 flex flex-col shadow-lg hover:-translate-y-1 transition-transform duration-300"
          >
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-full bg-brand-800 flex items-center justify-center text-brand-300 font-bold border border-brand-600/50">
                {review.name.charAt(0)}
              </div>
              <div className="flex flex-col">
                <span className="text-white font-medium text-sm">{review.name}</span>
                <span className="text-brand-400 text-xs">{review.dateLabel}</span>
              </div>
            </div>
            
            <div className="flex text-gold-400 mb-4">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className={`w-4 h-4 ${i < review.rating ? 'fill-current' : 'text-brand-800'}`} />
              ))}
            </div>
            
            <p className="text-brand-200 text-sm leading-relaxed flex-grow">
              "{review.text}"
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}
