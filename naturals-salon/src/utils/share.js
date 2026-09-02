import { businessInfo } from '../data/businessInfo';

export const shareWebsite = async () => {
  const urlToShare = businessInfo.websiteUrl || window.location.origin;
  const shareData = {
    title: 'Naturals Salon Kalaburagi',
    text: 'Naturals Salon — Hair, beauty, grooming and bridal services in Kalaburagi.',
    url: urlToShare
  };

  if (navigator.share) {
    try {
      await navigator.share(shareData);
    } catch (error) {
      console.log('Error sharing:', error);
    }
  } else {
    try {
      await navigator.clipboard.writeText(urlToShare);
      alert('Link copied successfully');
    } catch (err) {
      console.error('Failed to copy: ', err);
    }
  }
};
