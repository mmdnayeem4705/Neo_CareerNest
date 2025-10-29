// pages/CareerGuidance.jsx
import React from 'react';
import { useNavigate } from 'react-router-dom';

export default function CareerGuidance() {
  const navigate = useNavigate();
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero */}
      <section className="bg-gradient-to-r from-blue-600 to-indigo-700 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Career Guidance & Development</h1>
          <p className="text-lg md:text-xl text-blue-100 max-w-3xl mx-auto">
            Discover your ideal path, understand the market, and grow your skills with curated resources and expert insights.
          </p>
        </div>
      </section>

      {/* Sections */}
      <section className="py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Career Path Planning */}
          <div className="bg-white rounded-xl shadow p-6 border border-gray-100">
            <div className="w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center text-2xl mb-4">🎯</div>
            <h3 className="text-xl font-semibold mb-2">Career Path Planning</h3>
            <p className="text-gray-600 mb-4">Discover your ideal career path with our comprehensive assessment tools</p>
            <ul className="text-sm text-gray-700 space-y-1 mb-6">
              <li>• Skills Assessment</li>
              <li>• Career Interest Test</li>
              <li>• Industry Analysis</li>
              <li>• Goal Setting</li>
            </ul>
            <button onClick={() => navigate('/career-guidance/path-planning')} className="inline-block bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md">Get Started</button>
          </div>

          {/* Industry Insights */}
          <div className="bg-white rounded-xl shadow p-6 border border-gray-100">
            <div className="w-12 h-12 rounded-full bg-purple-100 flex items-center justify-center text-2xl mb-4">📊</div>
            <h3 className="text-xl font-semibold mb-2">Industry Insights</h3>
            <p className="text-gray-600 mb-4">Stay updated with the latest trends and requirements in your field</p>
            <ul className="text-sm text-gray-700 space-y-1 mb-6">
              <li>• Market Reports</li>
              <li>• Salary Benchmarks</li>
              <li>• Skill Demands</li>
              <li>• Future Outlook</li>
            </ul>
            <button onClick={() => navigate('/career-guidance/industry-insights')} className="inline-block bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-md">Get Started</button>
          </div>

          {/* Professional Development */}
          <div className="bg-white rounded-xl shadow p-6 border border-gray-100">
            <div className="w-12 h-12 rounded-full bg-green-100 flex items-center justify-center text-2xl mb-4">📚</div>
            <h3 className="text-xl font-semibold mb-2">Professional Development</h3>
            <p className="text-gray-600 mb-4">Enhance your skills with our curated learning resources</p>
            <ul className="text-sm text-gray-700 space-y-1 mb-6">
              <li>• Online Courses</li>
              <li>• Certification Programs</li>
              <li>• Skill Workshops</li>
              <li>• Mentorship</li>
            </ul>
            <button onClick={() => navigate('/career-guidance/professional-development')} className="inline-block bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-md">Get Started</button>
          </div>
        </div>
      </section>
    </div>
  );
}


