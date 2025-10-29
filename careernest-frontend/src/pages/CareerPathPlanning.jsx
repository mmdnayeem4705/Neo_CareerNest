// pages/CareerPathPlanning.jsx
import React from 'react';
import { Link } from 'react-router-dom';

export default function CareerPathPlanning() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <section className="bg-gradient-to-r from-blue-600 to-indigo-700 text-white py-14">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-3xl md:text-4xl font-bold mb-2">Career Path Planning</h1>
          <p className="text-blue-100 max-w-3xl">Discover your ideal career path with practical assessments and structured goal-setting.</p>
        </div>
      </section>

      {/* Content */}
      <div className="max-w-6xl mx-auto py-10 px-4 sm:px-6 lg:px-8 grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left: Modules */}
        <div className="lg:col-span-2 space-y-6">
          {/* Skills Assessment */}
          <div className="bg-white rounded-xl border border-gray-100 shadow p-6">
            <h2 className="text-xl font-semibold mb-2">Skills Assessment</h2>
            <p className="text-gray-600 mb-4">Gauge your proficiency across core areas like problem solving, coding, communication, and domain knowledge.</p>
            <div className="flex flex-wrap gap-2 mb-4 text-sm">
              <span className="px-2 py-1 rounded bg-gray-100 text-gray-700">Beginner</span>
              <span className="px-2 py-1 rounded bg-gray-100 text-gray-700">Intermediate</span>
              <span className="px-2 py-1 rounded bg-gray-100 text-gray-700">Advanced</span>
            </div>
            <button className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700">Start Assessment</button>
          </div>

          {/* Career Interest Test */}
          <div className="bg-white rounded-xl border border-gray-100 shadow p-6">
            <h2 className="text-xl font-semibold mb-2">Career Interest Test</h2>
            <p className="text-gray-600 mb-4">Identify roles that match your interests—engineering, data, design, product, or marketing.</p>
            <div className="flex flex-wrap gap-2 mb-4 text-sm">
              {['Engineering','Data','Design','Product','Marketing','Business'].map(t => (
                <span key={t} className="px-2 py-1 rounded bg-gray-100 text-gray-700">{t}</span>
              ))}
            </div>
            <button className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700">Take Test</button>
          </div>

          {/* Industry Analysis */}
          <div className="bg-white rounded-xl border border-gray-100 shadow p-6">
            <h2 className="text-xl font-semibold mb-2">Industry Analysis</h2>
            <p className="text-gray-600 mb-4">Understand demand, salaries, and future outlook in your preferred industries.</p>
            <ul className="text-gray-700 list-disc pl-5 space-y-1 mb-4">
              <li>Market trends and reports</li>
              <li>Salary benchmarks by role and location</li>
              <li>Top skills in demand</li>
            </ul>
            <Link to="/career-guidance" className="px-4 py-2 bg-purple-600 text-white rounded-md hover:bg-purple-700">Explore Insights</Link>
          </div>

          {/* Goal Setting */}
          <div className="bg-white rounded-xl border border-gray-100 shadow p-6">
            <h2 className="text-xl font-semibold mb-2">Goal Setting</h2>
            <p className="text-gray-600 mb-4">Create SMART goals and a 30/60/90 day plan to reach your target role.</p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3 mb-4">
              {['30-Day Plan','60-Day Plan','90-Day Plan'].map(p => (
                <div key={p} className="border rounded-lg p-3 text-sm text-gray-700 bg-gray-50">{p}</div>
              ))}
            </div>
            <button className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700">Create Plan</button>
          </div>
        </div>

        {/* Right: Sidebar */}
        <aside className="space-y-6">
          <div className="bg-white rounded-xl border border-gray-100 shadow p-6">
            <h3 className="font-semibold mb-2">Recommended Next</h3>
            <ul className="text-sm text-gray-700 space-y-2">
              <li><Link className="text-blue-600 hover:underline" to="/resume-maker">Build your resume</Link></li>
              <li><Link className="text-blue-600 hover:underline" to="/interview-experiences">Interview experiences</Link></li>
              <li><Link className="text-blue-600 hover:underline" to="/expert-speak">Watch Expert Speak</Link></li>
            </ul>
          </div>
          <div className="bg-white rounded-xl border border-gray-100 shadow p-6">
            <h3 className="font-semibold mb-2">Need Guidance?</h3>
            <p className="text-gray-600 mb-3">Book a 30-min session with a mentor to review your plan.</p>
            <button className="px-4 py-2 bg-gray-900 text-white rounded-md hover:bg-black">Book Session</button>
          </div>
        </aside>
      </div>
    </div>
  );
}


