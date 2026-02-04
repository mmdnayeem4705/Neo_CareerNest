import React from 'react';
import { Link } from 'react-router-dom';

const Home = () => {
  return (
    <div className="bg-gradient-to-br from-blue-50 to-indigo-100">

      {/* Hero Section */}
      <section className="flex items-center justify-center py-20 px-4">
        <div className="text-center max-w-3xl mx-auto">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Welcome to <span className="text-blue-600">NeoCareerNest</span>
          </h1>

          <p className="text-lg md:text-xl text-gray-600 mb-3">
            Your gateway to career opportunities at <strong>Neo Organization</strong>
          </p>

          <p className="text-base text-gray-500 mb-8">
            Discover jobs, internships, and grow your career with us
          </p>

          <Link
            to="/jobs"
            className="inline-block bg-blue-600 hover:bg-blue-700 text-white text-lg font-semibold px-10 py-3 rounded-lg shadow-md hover:scale-105 transition"
          >
            Apply for Job
          </Link>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-12 bg-white">
        <div className="max-w-6xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-10">
            Explore Your Career Journey
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">

            {/* Jobs */}
            <div className="text-center p-5 rounded-xl bg-white
              shadow-lg shadow-blue-200
              hover:shadow-2xl hover:shadow-blue-400
              hover:-translate-y-1 transition-all duration-300">
              <div className="w-14 h-14 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-3">
                <span className="text-2xl">💼</span>
              </div>
              <h3 className="text-lg font-semibold mb-2">Jobs</h3>
              <p className="text-gray-600 text-sm mb-3">
                Discover full-time opportunities
              </p>
              <Link to="/jobs" className="text-blue-600 font-medium hover:underline">
                Explore Jobs →
              </Link>
            </div>

            {/* Internships */}
            <div className="text-center p-5 rounded-xl bg-white
              shadow-lg shadow-green-200
              hover:shadow-2xl hover:shadow-green-400
              hover:-translate-y-1 transition-all duration-300">
              <div className="w-14 h-14 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-3">
                <span className="text-2xl">🎓</span>
              </div>
              <h3 className="text-lg font-semibold mb-2">Internships</h3>
              <p className="text-gray-600 text-sm mb-3">
                Gain real-world experience
              </p>
              <Link to="/internships" className="text-green-600 font-medium hover:underline">
                Find Internships →
              </Link>
            </div>

            {/* Prepare */}
            <div className="text-center p-5 rounded-xl bg-white
              shadow-lg shadow-purple-200
              hover:shadow-2xl hover:shadow-purple-400
              hover:-translate-y-1 transition-all duration-300">
              <div className="w-14 h-14 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-3">
                <span className="text-2xl">📚</span>
              </div>
              <h3 className="text-lg font-semibold mb-2">Prepare</h3>
              <p className="text-gray-600 text-sm mb-3">
                Resume & interview prep
              </p>
              <Link to="/prepare" className="text-purple-600 font-medium hover:underline">
                Start Preparing →
              </Link>
            </div>

            {/* Participate */}
            <div className="text-center p-5 rounded-xl bg-white
              shadow-lg shadow-orange-200
              hover:shadow-2xl hover:shadow-orange-400
              hover:-translate-y-1 transition-all duration-300">
              <div className="w-14 h-14 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-3">
                <span className="text-2xl">🏆</span>
              </div>
              <h3 className="text-lg font-semibold mb-2">Participate</h3>
              <p className="text-gray-600 text-sm mb-3">
                Contests & hackathons
              </p>
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
