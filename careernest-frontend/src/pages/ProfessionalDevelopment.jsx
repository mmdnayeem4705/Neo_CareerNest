// pages/ProfessionalDevelopment.jsx
import React from 'react';

export default function ProfessionalDevelopment() {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-6xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Professional Development</h1>
        <p className="text-gray-600 mb-8">Enhance your skills with curated learning resources.</p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-white rounded-xl border border-gray-100 shadow p-6">
            <h2 className="text-lg font-semibold mb-2">Online Courses</h2>
            <p className="text-gray-600">Handpicked courses to build in-demand skills.</p>
          </div>
          <div className="bg-white rounded-xl border border-gray-100 shadow p-6">
            <h2 className="text-lg font-semibold mb-2">Certification Programs</h2>
            <p className="text-gray-600">Programs to validate your expertise.</p>
          </div>
          <div className="bg-white rounded-xl border border-gray-100 shadow p-6">
            <h2 className="text-lg font-semibold mb-2">Skill Workshops</h2>
            <p className="text-gray-600">Interactive sessions on practical topics.</p>
          </div>
          <div className="bg-white rounded-xl border border-gray-100 shadow p-6">
            <h2 className="text-lg font-semibold mb-2">Mentorship</h2>
            <p className="text-gray-600">Guidance from experienced professionals.</p>
          </div>
        </div>
      </div>
    </div>
  );
}


