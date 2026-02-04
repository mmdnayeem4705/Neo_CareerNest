// src/App.tsx
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './hooks/useAuth';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import Jobs from './pages/Jobs';
import Prepare from './pages/Prepare';
import Participate from './pages/Participate';
import Internships from './pages/Internships';
import CareerGuidance from './pages/CareerGuidance';
import ExpertSpeak from './pages/ExpertSpeak';
import ResumeMaker from './pages/ResumeMaker';
import InterviewExperiences from './pages/InterviewExperiences';
import CareerPathPlanning from './pages/CareerPathPlanning';
import IndustryInsights from './pages/IndustryInsights';
import ProfessionalDevelopment from './pages/ProfessionalDevelopment';
import Login from './pages/Login';
import Signup from './pages/Signup';
import JobApply from './pages/JobApply';
import InternshipApply from './pages/InternshipApply';
import HRDashboard from './pages/HRDashboard';
import Profile from './pages/Profile';
import MyApplications from './pages/MyApplications';
import NotFound from './pages/NotFound';
import ContestJoin from './pages/ContestJoin';
import ContestResults from './pages/ContestResults';
import MockTestStart from './pages/MockTestStart';
import './App.css';
import { Toaster } from 'react-hot-toast';

function App() {
  return (
    <AuthProvider>
      <Router>
        <div className="App min-h-screen flex flex-col">
          <Navbar />
          <main className="flex-grow">
            <Toaster position="top-right" />
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/jobs" element={<Jobs />} />
              <Route path="/prepare" element={<Prepare />} />
              <Route path="/participate" element={<Participate />} />
              <Route path="/mock-tests/:id/start" element={<MockTestStart />} />
              <Route path="/contests/:id/join" element={<ContestJoin />} />
              <Route path="/contests/:id/results" element={<ContestResults />} />
              <Route path="/internships" element={<Internships />} />
              <Route path="/career-guidance" element={<CareerGuidance />} />
              <Route path="/career-guidance/path-planning" element={<CareerPathPlanning />} />
              <Route path="/career-guidance/industry-insights" element={<IndustryInsights />} />
              <Route path="/career-guidance/professional-development" element={<ProfessionalDevelopment />} />
              <Route path="/expert-speak" element={<ExpertSpeak />} />
              <Route path="/resume-maker" element={<ResumeMaker />} />
              <Route path="/interview-experiences" element={<InterviewExperiences />} />
              <Route path="/login" element={<Login />} />
              <Route path="/signup" element={<Signup />} />
              <Route path="/profile" element={<Profile />} />
              <Route path="/my-applications" element={<MyApplications />} />
              <Route path="/jobs/apply/:id" element={<JobApply />} />
              <Route path="/internships/apply/:id" element={<InternshipApply />} />
              <Route path="/hr/dashboard" element={<HRDashboard />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </main>
          <Footer />
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;