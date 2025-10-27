// services/hrService.js
import api from './api';

export const hrService = {
  getDashboard: () => api.get('/hr/dashboard'),
  getMyJobs: () => api.get('/hr/jobs'),
  getMyInternships: () => api.get('/hr/internships'),
  getMyApplications: () => api.get('/applications/hr'),
  updateApplicationStatus: (id, status, notes) => api.put(`/applications/${id}/status`, null, {
    params: { status, notes }
  }),
};