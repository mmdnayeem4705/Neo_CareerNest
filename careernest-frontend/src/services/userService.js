// services/userService.js
import api from './api';

export const userService = {
  login: (credentials) => api.post('/auth/login', credentials),
  register: (userData) => api.post('/auth/register', userData),
  verifyAuth: () => api.get('/auth/verify-auth'),
  getProfile: () => api.get('/users/profile'),
  updateProfile: (userData) => api.put('/users/profile', userData),
  changePassword: (passwordData) => api.put('/users/change-password', passwordData),
  resetPassword: (email) => api.post('/auth/reset-password', { email }),
  verifyEmail: (token) => api.post('/auth/verify-email', { token }),
  uploadResume: (formData) => api.post('/users/upload-resume', formData, {
    headers: { 'Content-Type': 'multipart/form-data' }
  }),
  deleteAccount: () => api.delete('/users/account'),
};