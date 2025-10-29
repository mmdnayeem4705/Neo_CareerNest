// pages/InterviewExperiences.jsx
import React from 'react';

export default function InterviewExperiences() {
  const experiences = [
    { role: 'Software Engineer', company: 'Neo Organization', difficulty: 'Medium', tips: 'Focus on DS&A and system design basics.' },
    { role: 'Data Scientist', company: 'Neo Organization', difficulty: 'Hard', tips: 'Brush up statistics, ML, and Python.' },
    { role: 'Product Manager', company: 'Neo Organization', difficulty: 'Medium', tips: 'Product sense and communication are key.' },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-5xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Interview Experiences</h1>
        <p className="text-gray-600 mb-8">Read real experiences to prepare better for your interviews.</p>
        <div className="space-y-4">
          {experiences.map((exp, idx) => (
            <div key={idx} className="bg-white border border-gray-100 rounded-xl shadow p-6">
              <div className="flex justify-between items-center mb-2">
                <h3 className="text-lg font-semibold">{exp.role} @ {exp.company}</h3>
                <span className="text-sm px-2 py-1 rounded bg-gray-100 text-gray-700">{exp.difficulty}</span>
              </div>
              <p className="text-gray-700">{exp.tips}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}


