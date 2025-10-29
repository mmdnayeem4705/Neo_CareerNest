// pages/MockTestStart.jsx
import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';

export default function MockTestStart() {
  const { id } = useParams();
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-3xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-4">Mock Test</h1>
        <p className="text-gray-600 mb-6">You're about to start mock test #{id}. Make sure you have a stable internet connection.</p>

        <div className="bg-white rounded-xl border border-gray-100 shadow p-6 mb-6">
          <h2 className="text-lg font-semibold mb-2">Instructions</h2>
          <ul className="list-disc pl-5 text-gray-700 space-y-1">
            <li>Once started, the timer will begin and cannot be paused.</li>
            <li>Do not refresh the page during the test.</li>
            <li>Submit your answers before the time runs out.</li>
          </ul>
        </div>

        <div className="flex justify-end gap-3">
          <button onClick={() => navigate(-1)} className="px-4 py-2 border rounded-md">Cancel</button>
          <button onClick={() => { alert('Test started!'); navigate('/participate'); }} className="px-4 py-2 bg-orange-600 text-white rounded-md hover:bg-orange-700">Begin Test</button>
        </div>
      </div>
    </div>
  );
}


