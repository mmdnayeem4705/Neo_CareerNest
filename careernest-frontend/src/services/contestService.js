// services/contestService.js
import api from './api';

export const contestService = {
  getAllContests: (filters = {}) => {
    const params = new URLSearchParams();
    Object.keys(filters).forEach(key => {
      if (filters[key]) params.append(key, filters[key]);
    });
    return api.get(`/participate/contests?${params.toString()}`);
  },
  getOngoingContests: () => api.get('/participate/contests/ongoing'),
  getContestById: (id) => api.get(`/participate/contests/${id}`),
  getContestTypes: () => api.get('/participate/types'),
  getDifficultyLevels: () => api.get('/participate/difficulty-levels'),
};
