import { useState, useEffect, useRef } from 'react';
import { Send, CheckCircle2, Star, AlertCircle, RefreshCw } from 'lucide-react';
import { submitFeedback } from '../services/feedbackService';

export default function FeedbackForm({ onFeedbackSubmitted }) {
  const [formData, setFormData] = useState({ name: '', comment: '', rating: 5 });
  const [status, setStatus] = useState('idle'); // idle, processing, success
  const [errorMsg, setErrorMsg] = useState(null);
  const [hoverRating, setHoverRating] = useState(0);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.name.trim() || !formData.comment.trim()) return;

    setStatus('processing');
    setErrorMsg(null);
    
    try {
      const payload = {
        name: formData.name,
        rating: formData.rating,
        feedback: formData.comment
      };
      
      const res = await submitFeedback(payload);
      
      const newFeedback = {
        ...formData,
        id: res.data?.id || `web-feedback-${Date.now()}`,
        createdAt: new Date().toISOString(),
        status: res.data?.status || 'PENDING'
      };
      
      setStatus('success');
      setFormData({ name: '', comment: '', rating: 5 });
      if (onFeedbackSubmitted) {
        onFeedbackSubmitted(newFeedback);
      }
    } catch (error) {
      console.error("Failed to save feedback", error);
      setStatus('idle');
      if (error.code === 'DUPLICATE_FEEDBACK') {
        setErrorMsg('You have already submitted similar feedback recently.');
      } else {
        setErrorMsg(error.message || 'Unable to submit feedback right now. Please try again later.');
      }
    }
  };

  if (status === 'success') {
    return (
      <div className="card-3d text-center py-12 animate-in fade-in duration-500">
        <CheckCircle2 className="w-16 h-16 text-green-400 mx-auto mb-4" />
        <h3 className="text-2xl font-serif font-bold text-white mb-2">Thank you!</h3>
        <p className="text-brand-300/80">Your feedback was submitted and is pending review.</p>
        <button onClick={() => setStatus('idle')} className="mt-6 text-sm text-brand-400 underline hover:text-white">
          Submit another response
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="card-3d text-left">
      <div className="space-y-6">
        {errorMsg && (
          <div className="p-4 rounded-xl bg-red-500/10 border border-red-500/20 text-red-400 text-sm flex items-start gap-3">
            <AlertCircle className="w-5 h-5 shrink-0 mt-0.5" />
            <p className="font-medium">{errorMsg}</p>
          </div>
        )}
        
        <div>
          <label htmlFor="feedback-name" className="block text-sm font-medium text-brand-300/80 mb-2">Your Name</label>
          <input 
            type="text" 
            id="feedback-name"
            required
            minLength={2} maxLength={100} autoComplete="name"
            value={formData.name}
            onChange={(e) => setFormData({...formData, name: e.target.value})}
            className="w-full px-4 py-3 bg-dark-900/50 border border-white/10 rounded-xl text-white focus:ring-2 focus:ring-brand-500/50 focus:border-brand-500 outline-none transition-all"
            placeholder="Your Name"
          />
        </div>
        
        <div>
          <label className="block text-sm font-medium text-brand-300/80 mb-2">Rating</label>
          <div className="flex items-center gap-2" role="radiogroup" aria-label="Rating">
            {[1, 2, 3, 4, 5].map((star) => (
              <button
                type="button"
                key={star}
                role="radio"
                aria-checked={formData.rating === star}
                aria-label={`${star} star${star !== 1 ? 's' : ''}`}
                className="focus:outline-none focus:ring-2 focus:ring-brand-500 rounded p-1"
                onClick={() => setFormData({...formData, rating: star})}
                onMouseEnter={() => setHoverRating(star)}
                onMouseLeave={() => setHoverRating(0)}
              >
                <Star 
                  className={`w-8 h-8 transition-colors ${
                    star <= (hoverRating || formData.rating) 
                      ? 'fill-gold-400 text-gold-400' 
                      : 'text-white/20'
                  }`} 
                />
              </button>
            ))}
            <span className="ml-3 text-brand-300/80 text-sm" aria-live="polite">
              {formData.rating} out of 5 stars
            </span>
          </div>
        </div>

        <div>
          <label htmlFor="feedback-comment" className="block text-sm font-medium text-brand-300/80 mb-2">Feedback</label>
          <textarea 
            id="feedback-comment"
            required
            minLength={10}
            maxLength={1000}
            rows="4"
            value={formData.comment}
            onChange={(e) => setFormData({...formData, comment: e.target.value})}
            className="w-full px-4 py-3 bg-dark-900/50 border border-white/10 rounded-xl text-white focus:ring-2 focus:ring-brand-500/50 focus:border-brand-500 outline-none transition-all resize-none"
            placeholder="Share your experience..."
          ></textarea>
          <div className="text-right text-xs text-brand-300/50 mt-1">
            {formData.comment.length}/1000
          </div>
        </div>

        <button 
          type="submit" 
          disabled={status === 'processing'}
          className="btn-primary w-full shadow-3d disabled:opacity-70 flex items-center justify-center gap-2"
        >
          {status === 'processing' && <RefreshCw className="w-5 h-5 animate-spin" />}
          {status === 'processing' ? 'Submitting...' : (
            <>Submit Feedback <Send className="w-4 h-4" /></>
          )}
        </button>
      </div>
    </form>
  );
}
