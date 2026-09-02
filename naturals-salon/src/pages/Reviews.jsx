import { useState, useEffect, useMemo, useCallback } from 'react';
import { getFeedback } from '../services/feedbackService';
import { RefreshCw, XCircle } from 'lucide-react';
import { reviews as googleReviewsData } from '../data/reviews';
import { businessInfo } from '../data/businessInfo';
import { Star, MessageSquareHeart, Search, Filter, ExternalLink } from 'lucide-react';
import ReviewCard from '../components/ReviewCard';
import FeedbackForm from '../components/FeedbackForm';
import { Link } from 'react-router-dom';

import SEO from '../components/SEO';

export default function Reviews() {
  const [websiteFeedback, setWebsiteFeedback] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [filterRating, setFilterRating] = useState('All');
  const [sortBy, setSortBy] = useState('Most Relevant');
  const [webSortBy, setWebSortBy] = useState('Newest');

  
  const [loadingFeedback, setLoadingFeedback] = useState(true);
  const [feedbackError, setFeedbackError] = useState(null);
  const [feedbackStats, setFeedbackStats] = useState({ count: 0, averageRating: 0 });

  const loadFeedback = useCallback(async () => {
    setLoadingFeedback(true);
    setFeedbackError(null);
    try {
      const data = await getFeedback({ sort: webSortBy === 'Highest Rating' ? 'highest' : webSortBy === 'Lowest Rating' ? 'lowest' : 'newest' });
      setWebsiteFeedback(data.data?.items || []);
      setFeedbackStats({
        count: data.data?.count || 0,
        averageRating: data.data?.averageRating || 0
      });
    } catch (err) {
      setFeedbackError(err.message || 'Unable to load feedback right now.');
    } finally {
      setLoadingFeedback(false);
    }
  }, [webSortBy]);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    loadFeedback();
  }, [loadFeedback]);


  const handleFeedbackSubmitted = (newFeedback) => {
    setWebsiteFeedback([newFeedback, ...websiteFeedback]);
  };

  // Google Reviews Filtering & Sorting
  const filteredGoogleReviews = useMemo(() => {
    let result = [...googleReviewsData];

    // Search
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase();
      result = result.filter(r => 
        r.name.toLowerCase().includes(query) || 
        r.text.toLowerCase().includes(query) ||
        (r.tags && r.tags.some(tag => tag.toLowerCase().includes(query)))
      );
    }

    // Filter
    if (filterRating !== 'All') {
      if (filterRating === '5 Star') result = result.filter(r => r.rating === 5);
      else if (filterRating === '4 Star') result = result.filter(r => r.rating === 4);
      else if (filterRating === '3 Star & Below') result = result.filter(r => r.rating <= 3);
    }

    // Sort
    if (sortBy === 'Highest Rating') {
      result.sort((a, b) => b.rating - a.rating);
    } else if (sortBy === 'Lowest Rating') {
      result.sort((a, b) => a.rating - b.rating);
    }
    // Note: 'Most Relevant' or 'Newest' just keeps default order as true dates aren't parsed for Google reviews

    return result;
  }, [searchQuery, filterRating, sortBy]);

  // Website Feedback Sorting
  const sortedWebsiteFeedback = useMemo(() => {
    let result = [...websiteFeedback];
    
    if (webSortBy === 'Highest Rating') {
      result.sort((a, b) => b.rating - a.rating);
    } else if (webSortBy === 'Lowest Rating') {
      result.sort((a, b) => a.rating - b.rating);
    } else {
      // Newest (Default)
      result.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
    }
    
    return result;
  }, [websiteFeedback, webSortBy]);

  const webAverage = useMemo(() => {
    if (websiteFeedback.length === 0) return 0;
    const sum = websiteFeedback.reduce((acc, curr) => acc + curr.rating, 0);
    return (sum / websiteFeedback.length).toFixed(1);
  }, [websiteFeedback]);

  return (
    <>
      <SEO 
        title="Naturals Salon Kalaburagi Reviews | Customer Experiences"
        description="Read customer reviews and share website feedback for Naturals Salon in Kalaburagi."
        url="/reviews"
      />
      <div className="pt-32 pb-24 min-h-screen relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 md:px-8 relative z-10">
        
        {/* 1. Reviews Hero */}
        <div className="text-center mb-16">
          <span className="inline-block text-gold-400 text-sm font-bold tracking-[0.2em] uppercase mb-4">
            Customer Experiences
          </span>
          <h1 className="text-4xl md:text-5xl font-serif font-bold mb-6 text-white tracking-wide">
            What Customers Say
          </h1>
          <p className="text-brand-300/80 max-w-2xl mx-auto text-lg leading-relaxed mb-8">
             Read customer experiences and share your own feedback about Naturals Salon, Kalaburagi.
          </p>
          
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <a href="#feedback-section" className="btn-primary px-8 py-3 w-full sm:w-auto">
              Write Feedback
            </a>
            <Link to="/appointment" className="btn-secondary px-8 py-3 w-full sm:w-auto">
              Book Appointment
            </Link>
          </div>
        </div>

        {/* 2. Google Rating Summary */}
        <div className="card-3d max-w-3xl mx-auto mb-16 flex flex-col sm:flex-row items-center justify-between p-6 sm:p-8">
          <div className="flex flex-col items-center sm:items-start mb-6 sm:mb-0">
            <h2 className="text-2xl font-serif font-bold text-white mb-2">Google Reviews</h2>
            <div className="flex items-center gap-3">
              <span className="text-4xl font-bold text-white">{businessInfo.googleRating}</span>
              <div className="flex flex-col">
                <div className="flex text-gold-400 mb-1">
                  {[1,2,3,4,5].map(i => <Star key={i} className={`w-4 h-4 ${i <= Math.round(businessInfo.googleRating) ? 'fill-current' : 'text-brand-800'}`} />)}
                </div>
                <span className="text-brand-300/80 text-sm">{businessInfo.googleReviewCount} Reviews</span>
              </div>
            </div>
          </div>
          
          {businessInfo.googleMapsUrl && (
            <a 
              href={businessInfo.googleMapsUrl} 
              target="_blank" 
              rel="noopener noreferrer"
              className="flex items-center gap-2 bg-brand-800/50 hover:bg-brand-700 text-white px-6 py-3 rounded-xl border border-brand-500/30 transition-all font-medium whitespace-nowrap"
            >
              View on Google <ExternalLink className="w-4 h-4" />
            </a>
          )}
        </div>

        {/* 3. Review Filters / Sorting */}
        <div className="mb-10 flex flex-col md:flex-row gap-4 justify-between items-center bg-brand-900/30 p-4 rounded-2xl border border-brand-800/50">
          <div className="relative w-full md:w-1/3">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-brand-400" />
            <input 
              type="text" 
              placeholder="Search reviews..." 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-dark-900/50 border border-white/10 rounded-xl pl-12 pr-4 py-3 text-white focus:ring-2 focus:ring-brand-500/50 outline-none"
            />
          </div>
          
          <div className="flex w-full md:w-auto gap-4">
            <select 
              value={filterRating}
              onChange={(e) => setFilterRating(e.target.value)}
              className="flex-1 md:w-40 bg-dark-900/50 border border-white/10 rounded-xl px-4 py-3 text-white focus:ring-2 focus:ring-brand-500/50 outline-none appearance-none"
            >
              <option value="All">All Ratings</option>
              <option value="5 Star">5 Star</option>
              <option value="4 Star">4 Star</option>
              <option value="3 Star & Below">3 Star & Below</option>
            </select>
            
            <select 
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="flex-1 md:w-48 bg-dark-900/50 border border-white/10 rounded-xl px-4 py-3 text-white focus:ring-2 focus:ring-brand-500/50 outline-none appearance-none"
            >
              <option value="Most Relevant">Most Relevant</option>
              <option value="Newest">Newest (If avail)</option>
              <option value="Highest Rating">Highest Rating</option>
              <option value="Lowest Rating">Lowest Rating</option>
            </select>
          </div>
        </div>

        {/* 4. Genuine Review Cards */}
        <div className="mb-6 text-brand-300 text-sm">
          {filteredGoogleReviews.length} review{filteredGoogleReviews.length !== 1 && 's'} shown
        </div>

        {filteredGoogleReviews.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-24">
            {filteredGoogleReviews.map((review) => (
              <ReviewCard key={review.id} review={review} />
            ))}
          </div>
        ) : (
          <div className="card-3d text-center py-20 mb-24">
             <Filter className="w-16 h-16 text-brand-600/30 mx-auto mb-6" />
             <h3 className="text-xl text-white font-bold mb-2">No reviews found</h3>
             <p className="text-brand-300/80 mb-6">Try changing your filters or search.</p>
             <button 
               onClick={() => { setSearchQuery(''); setFilterRating('All'); setSortBy('Most Relevant'); }}
               className="btn-secondary px-6 py-2"
             >
               Clear Filters
             </button>
          </div>
        )}

        {/* Divider */}
        <div className="w-full h-px bg-gradient-to-r from-transparent via-white/10 to-transparent my-16"></div>

        {/* 5. Website Feedback Section */}
        <div id="feedback-section" className="scroll-mt-32">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-serif font-bold text-white mb-4">Website Feedback</h2>
            <p className="text-brand-300/80">Share your experience directly on this website.</p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 mb-24">
            {/* 6. Submit Feedback Form */}
            <div className="lg:col-span-5 order-2 lg:order-1">
              <FeedbackForm onFeedbackSubmitted={handleFeedbackSubmitted} />
            </div>

            {/* 7. Feedback Summary & Cards */}
            <div className="lg:col-span-7 order-1 lg:order-2">
              <div className="card-3d mb-8 p-6 flex flex-col sm:flex-row items-center justify-between bg-dark-900/40">
                <div className="mb-4 sm:mb-0">
                  <h3 className="text-lg font-serif font-bold text-white mb-1">Website Rating</h3>
                  <p className="text-sm text-brand-300/80">Independent from Google Reviews</p>
                </div>
                <div className="flex items-center gap-4">
                  <div className="text-right">
                    <span className="text-3xl font-bold text-white">{feedbackStats.count > 0 ? Number(feedbackStats.averageRating).toFixed(1) : '-'} / 5</span>
                    <div className="text-sm text-brand-300/80 mt-1">{feedbackStats.count} Website Review{feedbackStats.count !== 1 && 's'}</div>
                  </div>
                </div>
              </div>

              {feedbackStats.count > 0 && (
                <div className="flex justify-end mb-6">
                  <select 
                    value={webSortBy}
                    onChange={(e) => setWebSortBy(e.target.value)}
                    className="bg-dark-900/50 border border-white/10 rounded-xl px-4 py-2 text-white focus:ring-2 focus:ring-brand-500/50 outline-none appearance-none text-sm"
                  >
                    <option value="Newest">Newest First</option>
                    <option value="Highest Rating">Highest Rating</option>
                    <option value="Lowest Rating">Lowest Rating</option>
                  </select>
                </div>
              )}

              <div className="space-y-6">
                {loadingFeedback ? (
  <div className="text-center py-12"><RefreshCw className="w-8 h-8 animate-spin mx-auto text-brand-500/50" /></div>
) : feedbackError ? (
  <div className="text-center py-12 card-3d">
    <XCircle className="w-12 h-12 text-red-400 mx-auto mb-4" />
    <p className="text-brand-300/80 mb-4">{feedbackError}</p>
    <button onClick={loadFeedback} className="text-sm underline">Retry</button>
  </div>
) : websiteFeedback.length > 0 ? (
                  sortedWebsiteFeedback.map(feedback => (
                    <ReviewCard key={feedback.id} review={{...feedback, source: 'website'}} />
                  ))
                ) : (
                  <div className="card-3d text-center py-16 bg-dark-900/30">
                    <MessageSquareHeart className="w-12 h-12 text-brand-600/30 mx-auto mb-4" />
                    <h3 className="text-lg font-bold text-white mb-2">No website feedback yet</h3>
                    <p className="text-brand-300/80 text-sm">Be the first to share your experience.</p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* 8. Final CTA */}
        <div className="text-center py-16 bg-gradient-to-t from-brand-900/20 to-transparent rounded-3xl border border-white/5">
          <h2 className="text-3xl font-serif font-bold text-white mb-6">Ready for a Transformation?</h2>
          <Link to="/appointment" className="btn-primary px-10 py-4 text-lg shadow-3d">
            Book Your Appointment
          </Link>
        </div>

      </div>
    </div>
    </>
  );
}
