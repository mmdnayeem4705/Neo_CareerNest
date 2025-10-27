// services/jobService.js
import api from './api';

export const jobService = {
  getAllJobs: (filters = {}) => {
    const params = new URLSearchParams();
    Object.keys(filters).forEach(key => {
      if (filters[key]) params.append(key, filters[key]);
    });
    return api.get(`/jobs?${params.toString()}`);
  },
  getJobById: (id) => api.get(`/jobs/${id}`),
  createJob: (jobData) => api.post('/jobs', jobData),
  updateJob: (id, jobData) => api.put(`/jobs/${id}`, jobData),
  deleteJob: (id) => api.delete(`/jobs/${id}`),
  getMyJobs: () => api.get('/hr/jobs'),
  getJobApplications: (jobId) => api.get(`/applications/job/${jobId}`),
};