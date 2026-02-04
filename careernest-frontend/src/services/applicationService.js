// services/applicationService.js
import api from './api';

export const applicationService = {
  createApplication: (applicationData) => {
    // If FormData (file upload), send as multipart/form-data
    if (applicationData instanceof FormData) {
      return api.post('/applications', applicationData, {
        headers: { 'Content-Type': 'multipart/form-data' }
      });
    }
    return api.post('/applications', applicationData);
  },
  getMyApplications: () => api.get('/applications/my-applications'),
  getJobApplications: (jobId) => api.get(`/applications/job/${jobId}`),
  getInternshipApplications: (internshipId) => api.get(`/applications/internship/${internshipId}`),
  getHRApplications: () => api.get('/applications/hr'),
  updateApplicationStatus: (id, status, notes) => api.put(`/applications/${id}/status`, null, {
    params: { status, notes }
  }),
  getApplicationById: (id) => api.get(`/applications/${id}`),
  createApplicationJson: (applicationData) => api.post('/applications/simple', applicationData),
};
