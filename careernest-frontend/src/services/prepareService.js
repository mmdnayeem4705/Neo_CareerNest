// services/prepareService.js
import api from './api';

export const prepareService = {
  getCareerGuides: (filters = {}) => {
    const params = new URLSearchParams();
    Object.keys(filters).forEach(key => {
      if (filters[key]) params.append(key, filters[key]);
    });
    return api.get(`/prepare/career-guides?${params.toString()}`);
  },
  getFeaturedGuides: () => api.get('/prepare/career-guides/featured'),
  getCareerGuideById: (id) => api.get(`/prepare/career-guides/${id}`),
  getCategories: () => api.get('/prepare/categories'),
};
