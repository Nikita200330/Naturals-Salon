import { useState } from 'react';
import { Star, Quote } from 'lucide-react';

export default function ReviewCard({ review }) {
  const [expanded, setExpanded] = useState(false);
  
  const isWebsite = review.source !== 'google';
  const MAX_LENGTH = 200;
  
  // review.text or review.comment (from website feedback)
  const text = review.text || review.comment || '';
  const shouldTruncate = text.length > MAX_LENGTH;
  const displayText = expanded ? text : (shouldTruncate ? text.substring(0, MAX_LENGTH) + '...' : text);

  // Format date if it's a website feedback
  let displayDate = review.dateLabel;
  if (review.createdAt) {
    const date = new Date(review.createdAt);
    const now = new Date();
    if ((now - date) < 60000) { // less than a minute
      displayDate = 'Just now';
    } else {
      displayDate = date.toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' });
    }
  }

  return (
    <div className="card-3d relative flex flex-col h-full">
      <Quote className="absolute top-6 right-6 w-10 h-10 text-white/5" />
      
      <div className="flex items-center justify-between mb-4">
        <div className="flex text-gold-400">
          {[...Array(5)].map((_, i) => (
            <Star key={i} className={`w-4 h-4 ${i < review.rating ? 'fill-current' : 'text-brand-800'}`} />
          ))}
        </div>
        
        <span className={`text-xs px-2 py-1 rounded-full border ${isWebsite ? 'bg-brand-800/30 border-brand-500/30 text-brand-300' : 'bg-blue-900/30 border-blue-500/30 text-blue-300'}`}>
          {isWebsite ? 'Website Feedback' : 'Google Review'}
        </span>
      </div>
      
      <p className="text-light-200/90 text-sm md:text-base leading-relaxed mb-4 italic relative z-10 flex-grow whitespace-pre-wrap">
        "{displayText}"
        {shouldTruncate && (
          <button 
            onClick={() => setExpanded(!expanded)}
            className="ml-2 text-brand-400 hover:text-brand-300 font-medium text-sm underline-offset-4 hover:underline focus:outline-none focus:ring-2 focus:ring-brand-500 rounded px-1"
          >
            {expanded ? 'Show Less' : 'Read More'}
          </button>
        )}
      </p>
      
      {review.tags && review.tags.length > 0 && (
        <div className="flex flex-wrap gap-2 mb-4">
          {review.tags.map(tag => (
            <span key={tag} className="text-[10px] uppercase tracking-wider bg-white/5 px-2 py-1 rounded text-brand-300/60">
              {tag}
            </span>
          ))}
        </div>
      )}
      
      <div className="mt-auto border-t border-white/5 pt-4">
        <h4 className="font-serif font-medium text-white tracking-wide">{review.name}</h4>
        <p className="text-xs text-brand-300/60 uppercase tracking-widest mt-1">{displayDate}</p>
      </div>
    </div>
  );
}
