// pages/IndustryInsights.jsx
import React from 'react';

export default function IndustryInsights() {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-6xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Industry Insights</h1>
        <p className="text-gray-600 mb-8">Stay updated with the latest trends and requirements in your field.</p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-white rounded-xl border border-gray-100 shadow p-6">
            <h2 className="text-lg font-semibold mb-2">Market Reports</h2>
            <p className="text-gray-600">Key highlights from recent industry reports and publications.</p>
          </div>
          <div className="bg-white rounded-xl border border-gray-100 shadow p-6">
            <h2 className="text-lg font-semibold mb-2">Salary Benchmarks</h2>
            <p className="text-gray-600">Typical salary ranges by role and experience level.</p>
          </div>
          <div className="bg-white rounded-xl border border-gray-100 shadow p-6">
            <h2 className="text-lg font-semibold mb-2">Skill Demands</h2>
            <p className="text-gray-600">What skills are most requested in current job listings.</p>
          </div>
          <div className="bg-white rounded-xl border border-gray-100 shadow p-6">
            <h2 className="text-lg font-semibold mb-2">Future Outlook</h2>
            <p className="text-gray-600">Roles and technologies projected to grow next.</p>
          </div>
        </div>
      </div>
    </div>
  );
}


