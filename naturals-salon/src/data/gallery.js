import salonInterior from '../assets/salon/salon-interior-01.jpg';
import haircut01 from '../assets/salon/haircut-01.jpg';
import bridal01 from '../assets/salon/bridal-01.jpg';
import reception01 from '../assets/salon/reception-01.jpg';
import nails01 from '../assets/salon/nails-01.jpg';
import grooming01 from '../assets/salon/grooming-01.jpg';
import beauty01 from '../assets/salon/beauty-01.jpg';

export const galleryData = [
  {
    id: "salon-interior-01",
    src: salonInterior,
    alt: "Salon interior at Naturals Salon Kalaburagi",
    category: "Salon",
    featured: true,
  },
  {
    id: "haircut-01",
    src: haircut01,
    alt: "Hair styling at Naturals Salon Kalaburagi",
    category: "Hair",
    service: "haircut",
    serviceName: "Haircut",
    featured: true,
  },
  {
    id: "beauty-01",
    src: beauty01,
    alt: "Relaxing facial and beauty treatment at Naturals Salon",
    category: "Beauty",
    service: "facials",
    serviceName: "Facial Treatment",
    featured: true,
  },
  {
    id: "bridal-01",
    src: bridal01,
    alt: "Bridal makeup at Naturals Salon Kalaburagi",
    category: "Bridal",
    service: "bridal-services",
    serviceName: "Bridal Makeup",
    featured: false,
  },
  {
    id: "nails-01",
    src: nails01,
    alt: "Premium manicure and nail art at Naturals Salon",
    category: "Nails",
    service: "manicure",
    serviceName: "Manicure",
    featured: false,
  },
  {
    id: "grooming-01",
    src: grooming01,
    alt: "Men's grooming and beard trim at Naturals Salon",
    category: "Grooming",
    service: "shaving",
    serviceName: "Grooming & Shaving",
    featured: true,
  },
  {
    id: "reception-01",
    src: reception01,
    alt: "Reception area at Naturals Salon",
    category: "Salon",
    featured: false,
  }
];

export const galleryCategories = ["All", ...new Set(galleryData.map(img => img.category))];
