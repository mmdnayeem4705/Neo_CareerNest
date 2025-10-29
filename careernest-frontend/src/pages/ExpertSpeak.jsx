// pages/ExpertSpeak.jsx
import React from 'react';

export default function ExpertSpeak() {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-5xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-4">Expert Speak</h1>
        <p className="text-gray-600 mb-8">Insights and advice from industry leaders to help you grow your career.</p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {[1,2,3,4].map((i) => (
            <div key={i} className="bg-white border border-gray-100 rounded-xl shadow p-6">
              <div className="text-sm text-gray-500 mb-2">Featured Talk</div>
              <h3 className="text-lg font-semibold mb-2">Building a Career in Tech #{i}</h3>
              <p className="text-gray-600 mb-4">Learn how to navigate your career from junior to senior roles, with practical tips on skill-building and networking.</p>
              <button className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700">Watch Now</button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}


