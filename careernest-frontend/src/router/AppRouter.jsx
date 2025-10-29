// router/AppRouter.jsx
import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import Home from '../pages/Home';
import Jobs from '../pages/Jobs';
import Prepare from '../pages/Prepare';
import Participate from '../pages/Participate';
import Internships from '../pages/Internships';
import Login from '../pages/Login';
import Signup from '../pages/Signup';
import JobApply from '../pages/JobApply';
import InternshipApply from '../pages/InternshipApply';
import HRDashboard from '../pages/HRDashboard';
import NotFound from '../pages/NotFound';

const ProtectedRoute = ({ children }) => {
  const { isAuthenticated, loading } = useAuth();
  
  if (loading) return <div>Loading...</div>;
  
  return isAuthenticated ? children : <Navigate to="/login" />;
};

const PublicRoute = ({ children }) => {
  const { isAuthenticated, loading } = useAuth();
  
  if (loading) return <div>Loading...</div>;
  
  return !isAuthenticated ? children : <Navigate to="/" />;
};

const AppRouter = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/jobs" element={<Jobs />} />
        <Route path="/prepare" element={<Prepare />} />
        <Route path="/participate" element={<Participate />} />
        <Route path="/internships" element={<Internships />} />
        <Route path="/login" element={
          <PublicRoute>
            <Login />
          </PublicRoute>
        } />
        <Route path="/signup" element={
          <PublicRoute>
            <Signup />
          </PublicRoute>
        } />
        <Route path="/jobs/apply/:id" element={
          <ProtectedRoute>
            <JobApply />
          </ProtectedRoute>
        } />
        <Route path="/internships/apply/:id" element={
          <ProtectedRoute>
            <InternshipApply />
          </ProtectedRoute>
        } />
        <Route path="/hr/dashboard" element={
          <ProtectedRoute>
            <HRDashboard />
          </ProtectedRoute>
        } />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Router>
  );
};

export default AppRouter;