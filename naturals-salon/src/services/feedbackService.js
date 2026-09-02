import { reviews as mockReviews } from '../data/reviews';

// Mock local storage key
const STORAGE_KEY = 'naturals_salon_feedback';

export const getFeedback = async (params = {}) => {
  await new Promise(resolve => setTimeout(resolve, 500));
  
  // Combine mock reviews and local storage reviews
  const localReviews = JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]');
  let combined = [...localReviews, ...mockReviews];
  
  if (params.sort === 'highest') {
    combined.sort((a, b) => b.rating - a.rating);
  } else if (params.sort === 'lowest') {
    combined.sort((a, b) => a.rating - b.rating);
  }
  
  return combined;
};

export const submitFeedback = async (feedbackData) => {
  await new Promise(resolve => setTimeout(resolve, 800));
  
  const newFeedback = {
    id: `web-review-${Date.now()}`,
    source: 'web',
    name: feedbackData.name,
    rating: feedbackData.rating,
    text: feedbackData.feedback,
    dateLabel: 'Just now',
    tags: []
  };
  
  const localReviews = JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]');
  localStorage.setItem(STORAGE_KEY, JSON.stringify([newFeedback, ...localReviews]));
  
  return { success: true, data: newFeedback };
};
