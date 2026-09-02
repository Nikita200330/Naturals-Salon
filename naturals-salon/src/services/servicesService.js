import { services, flatServices, categories } from '../data/services';

export const getServices = async (params = {}) => {
  // Simulate network delay
  await new Promise(resolve => setTimeout(resolve, 500));
  
  let result = [...services];
  
  if (params.category && params.category !== 'All') {
    result = result.filter(s => s.category === params.category);
  }
  
  if (params.q) {
    const q = params.q.toLowerCase();
    result = result.filter(s => 
      s.name.toLowerCase().includes(q) || 
      s.description.toLowerCase().includes(q) ||
      s.category.toLowerCase().includes(q)
    );
  }
  
  return { data: result };
};

export const getServiceBySlug = async (slug) => {
  await new Promise(resolve => setTimeout(resolve, 500));
  
  const service = services.find(s => s.id === slug || s.slug === slug);
  if (!service) {
    throw new Error('Service not found');
  }
  
  return { data: service };
};
