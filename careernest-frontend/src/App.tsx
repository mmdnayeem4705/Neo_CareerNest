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
import Login from './pages/Login';
import Signup from './pages/Signup';
import JobApply from './pages/JobApply';
import HRDashboard from './pages/HRDashboard';
import NotFound from './pages/NotFound';
import './App.css';

function App() {
  return (
    <AuthProvider>
      <Router>
        <div className="App min-h-screen flex flex-col">
          <Navbar />
          <main className="flex-grow">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/jobs" element={<Jobs />} />
              <Route path="/prepare" element={<Prepare />} />
              <Route path="/participate" element={<Participate />} />
              <Route path="/internships" element={<Internships />} />
              <Route path="/login" element={<Login />} />
              <Route path="/signup" element={<Signup />} />
              <Route path="/jobs/apply/:id" element={<JobApply />} />
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