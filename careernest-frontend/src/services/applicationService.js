// services/applicationService.js
import api from './api';

export const applicationService = {
  createApplication: (applicationData) => api.post('/applications', applicationData),
  getMyApplications: () => api.get('/applications/my-applications'),
  getJobApplications: (jobId) => api.get(`/applications/job/${jobId}`),
  getInternshipApplications: (internshipId) => api.get(`/applications/internship/${internshipId}`),
  getHRApplications: () => api.get('/applications/hr'),
  updateApplicationStatus: (id, status, notes) => api.put(`/applications/${id}/status`, null, {
    params: { status, notes }
  }),
  getApplicationById: (id) => api.get(`/applications/${id}`),
};
