// pages/Home.jsx
import React from 'react';
import { Link } from 'react-router-dom';

const Home = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      {/* Hero Section */}
      <section className="flex items-center justify-center min-h-[80vh] px-4">
        <div className="text-center max-w-4xl mx-auto">
          <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6">
            Welcome to <span className="text-blue-600">NeoCareerNest</span>
          </h1>
          <p className="text-xl md:text-2xl text-gray-600 mb-8">
            Your gateway to career opportunities at <strong>Neo Organization</strong>
          </p>
          <p className="text-lg text-gray-500 mb-12">
            Discover jobs, internships, and grow your career with us
          </p>
          
          {/* Center Apply Button */}
          <div className="mb-16">
            <Link 
              to="/jobs" 
              className="inline-block bg-blue-600 hover:bg-blue-700 text-white text-xl font-semibold px-12 py-4 rounded-lg shadow-lg transform hover:scale-105 transition-all duration-200"
            >
              Apply for Job
            </Link>
          </div>
          
          {/* Quick Stats */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-3xl mx-auto">
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="text-2xl font-bold text-blue-600 mb-2">8+</h3>
              <p className="text-gray-600">Job Roles Available</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="text-2xl font-bold text-green-600 mb-2">6+</h3>
              <p className="text-gray-600">Internship Programs</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="text-2xl font-bold text-purple-600 mb-2">24/7</h3>
              <p className="text-gray-600">Career Support</p>
            </div>
          </div>
        </div>
      </section>
      
      {/* Features Section */}
      <section className="py-16 bg-white">
        <div className="max-w-6xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">
            Explore Your Career Journey
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="text-center p-6 rounded-lg hover:shadow-lg transition-shadow">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">💼</span>
              </div>
              <h3 className="text-xl font-semibold mb-3">Jobs</h3>
              <p className="text-gray-600 mb-4">Discover full-time opportunities at Neo Organization</p>
              <Link to="/jobs" className="text-blue-600 font-medium hover:underline">
                Explore Jobs →
              </Link>
            </div>
            
            <div className="text-center p-6 rounded-lg hover:shadow-lg transition-shadow">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">🎓</span>
              </div>
              <h3 className="text-xl font-semibold mb-3">Internships</h3>
              <p className="text-gray-600 mb-4">Gain valuable experience with our internship programs</p>
              <Link to="/internships" className="text-green-600 font-medium hover:underline">
                Find Internships →
              </Link>
            </div>
            
            <div className="text-center p-6 rounded-lg hover:shadow-lg transition-shadow">
              <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">📚</span>
              </div>
              <h3 className="text-xl font-semibold mb-3">Prepare</h3>
              <p className="text-gray-600 mb-4">Career guidance, resume maker, and interview prep</p>
              <Link to="/prepare" className="text-purple-600 font-medium hover:underline">
                Start Preparing →
              </Link>
            </div>
            
            <div className="text-center p-6 rounded-lg hover:shadow-lg transition-shadow">
              <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">🏆</span>
              </div>
              <h3 className="text-xl font-semibold mb-3">Participate</h3>
              <p className="text-gray-600 mb-4">Contests, mock tests, and hackathons</p>
              <Link to="/participate" className="text-orange-600 font-medium hover:underline">
                Join Contests →
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;