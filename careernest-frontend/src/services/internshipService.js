// services/internshipService.js
import api from './api';

export const internshipService = {
  getAllInternships: (filters = {}) => {
    const params = new URLSearchParams();
    Object.keys(filters).forEach(key => {
      if (filters[key]) params.append(key, filters[key]);
    });
    return api.get(`/internships?${params.toString()}`);
  },
  getInternshipById: (id) => api.get(`/internships/${id}`),
  createInternship: (internshipData) => api.post('/internships', internshipData),
  updateInternship: (id, internshipData) => api.put(`/internships/${id}`, internshipData),
  deleteInternship: (id) => api.delete(`/internships/${id}`),
  getMyInternships: () => api.get('/hr/internships'),
  getInternshipApplications: (internshipId) => api.get(`/applications/internship/${internshipId}`),
};